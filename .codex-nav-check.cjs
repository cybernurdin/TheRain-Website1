/* eslint-disable @typescript-eslint/no-require-imports */
const cp = require("child_process");
const os = require("os");
const fs = require("fs");
const path = require("path");

const edge = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const port = 10000 + Math.floor(Math.random() * 40000);
const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "therain-nav-check-"));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function connect() {
  const proc = cp.spawn(
    edge,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${userDataDir}`,
      "--remote-debugging-address=127.0.0.1",
      `--remote-debugging-port=${port}`,
      "--window-size=390,900",
      "about:blank"
    ],
    { stdio: "ignore" }
  );

  let wsUrl;
  for (let i = 0; i < 150; i += 1) {
    try {
      await (await fetch(`http://127.0.0.1:${port}/json/version`)).json();
      const target = await (await fetch(`http://127.0.0.1:${port}/json/new?http://127.0.0.1:3001`, { method: "PUT" })).json();
      wsUrl = target.webSocketDebuggerUrl;
      break;
    } catch {
      await sleep(100);
    }
  }

  if (!wsUrl) throw new Error("Unable to open Edge CDP target");

  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      pending.get(message.id)(message);
      pending.delete(message.id);
    }
  };
  await new Promise((resolve) => {
    ws.onopen = resolve;
  });

  const send = (method, params = {}) =>
    new Promise((resolve) => {
      const message = { id: ++id, method, params };
      pending.set(message.id, resolve);
      ws.send(JSON.stringify(message));
    });

  return { proc, ws, send };
}

async function main() {
  const { proc, ws, send } = await connect();
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 390, height: 900, deviceScaleFactor: 1, mobile: true });
  await send("Page.navigate", { url: "http://127.0.0.1:3001" });
  await sleep(5000);

  const expression = `(() => {
    const menu = document.querySelector("#mobileNav");
    const button = document.querySelector("#hamburgerBtn, .hamburger");
    const link = document.querySelector("#mobileNav a");
    const outside = document.querySelector("main, section, .hero") || document.body;
    const open = () => menu && (menu.classList.contains("open") || menu.style.display === "flex");
    const pointer = (target) => target.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true }));
    const click = (target) => target.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    const states = {};

    click(button);
    states.afterOpen = open();

    pointer(menu);
    states.afterInsidePointer = open();

    pointer(outside);
    states.afterOutsidePointer = open();

    click(button);
    states.afterReopen = open();

    click(button);
    states.afterHamburgerToggle = open();

    click(button);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    states.afterEscape = open();

    click(button);
    link.addEventListener("click", (event) => event.preventDefault(), { once: true });
    click(link);
    states.afterLinkClick = open();

    return states;
  })()`;

  const result = await send("Runtime.evaluate", { returnByValue: true, expression });
  console.log(JSON.stringify(result.result.result.value));
  ws.close();
  proc.kill();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
