"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    applyLang?: (lang: string) => void;
    closeMobileNav?: () => void;
    copyLink?: () => void;
    goSlide?: (index: number) => void;
    nextSlide?: () => void;
    prevSlide?: () => void;
    resetTimer?: () => void;
    scrollCarousel?: (direction: number) => void;
    submitDeletion?: () => void;
    submitForm?: (button: HTMLButtonElement) => void;
    switchTab?: (role: string) => void;
    toggleLang?: () => void;
    toggleMobileNav?: () => void;
    togglePolicy?: (header: HTMLElement) => void;
    toggleTheme?: () => void;
  }
}

const LOGO_DARK = "/images/logo_dark.png";
const LOGO_LIGHT = "/images/logo_light.png";
const CONTACT_ENDPOINT = "/api/contact";
const DATA_DELETION_ENDPOINT = "/api/data-deletion";

function getTheme(): "dark" | "light" {
  if (typeof window === "undefined") return "dark";
  return window.localStorage.getItem("therain_theme") === "light" ? "light" : "dark";
}

function updateLogos(theme: "dark" | "light") {
  document.querySelectorAll<HTMLImageElement>(".nav-logo-img,.footer-logo-img,#navLogo").forEach((img) => {
    img.src = theme === "dark" ? LOGO_DARK : LOGO_LIGHT;
  });
}

function setTheme(theme: "dark" | "light") {
  document.documentElement.setAttribute("data-theme", theme);
  window.localStorage.setItem("therain_theme", theme);
  const icon = document.getElementById("themeIcon");
  if (icon) icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
  updateLogos(theme);
}

function getLang(): "en" | "fr" {
  return window.localStorage.getItem("therain_lang") === "fr" ? "fr" : "en";
}

function applyLang(lang: "en" | "fr") {
  document.documentElement.setAttribute("data-lang", lang);
  window.localStorage.setItem("therain_lang", lang);

  const label = document.getElementById("langLabel");
  if (label) label.textContent = lang === "en" ? "FR" : "EN";

  document.querySelectorAll<HTMLElement>("[data-en]").forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (!text) return;

    if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
      el.placeholder = text;
      return;
    }

    if (!el.querySelector("span.hl,a,button,i.fas,i.fab,img,svg")) {
      el.innerHTML = text;
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initScrollEffects() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => entry.target.classList.add("visible"), index * 100);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".aos").forEach((el) => observer.observe(el));

  const onScroll = () => {
    const navbar = document.getElementById("navbar") ?? document.querySelector<HTMLElement>(".navbar");
    if (navbar) {
      navbar.style.boxShadow = window.scrollY > 50 ? "0 4px 30px rgba(0,0,0,0.3)" : "none";
    }

    const scrollPos = window.scrollY + 100;
    ["home", "services", "safety", "driver", "blog", "contact"].forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.offsetTop;
      const bottom = top + el.offsetHeight;
      if (scrollPos < top || scrollPos >= bottom) return;

      document.querySelectorAll(".nav-links a").forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(
        `.nav-links a[href="/#${id}"], .nav-links a[href="#${id}"], .nav-links a[href="index.html#${id}"]`
      );
      activeLink?.classList.add("active");
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener("scroll", onScroll);
    observer.disconnect();
  };
}

function initCarousel() {
  const carousel = document.getElementById("regionsCarousel");
  if (!carousel) return undefined;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let touchStartX = 0;

  const onMouseDown = (event: MouseEvent) => {
    isDown = true;
    carousel.classList.add("grabbing");
    startX = event.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  };
  const stopMouse = () => {
    isDown = false;
    carousel.classList.remove("grabbing");
  };
  const onMouseMove = (event: MouseEvent) => {
    if (!isDown) return;
    event.preventDefault();
    const x = event.pageX - carousel.offsetLeft;
    carousel.scrollLeft = scrollLeft - (x - startX) * 1.5;
  };
  const onTouchStart = (event: TouchEvent) => {
    touchStartX = event.touches[0]?.clientX ?? 0;
  };
  const onTouchMove = (event: TouchEvent) => {
    const currentX = event.touches[0]?.clientX ?? touchStartX;
    carousel.scrollLeft += (touchStartX - currentX) * 0.5;
    touchStartX = currentX;
  };

  carousel.addEventListener("mousedown", onMouseDown);
  carousel.addEventListener("mouseleave", stopMouse);
  carousel.addEventListener("mouseup", stopMouse);
  carousel.addEventListener("mousemove", onMouseMove);
  carousel.addEventListener("touchstart", onTouchStart, { passive: true });
  carousel.addEventListener("touchmove", onTouchMove, { passive: true });

  return () => {
    carousel.removeEventListener("mousedown", onMouseDown);
    carousel.removeEventListener("mouseleave", stopMouse);
    carousel.removeEventListener("mouseup", stopMouse);
    carousel.removeEventListener("mousemove", onMouseMove);
    carousel.removeEventListener("touchstart", onTouchStart);
    carousel.removeEventListener("touchmove", onTouchMove);
  };
}

function initHeroSlider() {
  let current = 0;
  let timer: number | undefined;
  const slides = Array.from(document.querySelectorAll<HTMLElement>(".hero-slide"));
  const dots = Array.from(document.querySelectorAll<HTMLElement>(".sdot"));

  const goSlide = (index: number) => {
    if (slides.length === 0) return;
    slides[current]?.classList.remove("active");
    dots[current]?.classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current]?.classList.add("active");
    dots[current]?.classList.add("active");
  };

  const resetTimer = () => {
    if (timer) window.clearInterval(timer);
    if (slides.length > 0) timer = window.setInterval(() => goSlide(current + 1), 5000);
  };

  window.goSlide = goSlide;
  window.resetTimer = resetTimer;
  window.nextSlide = () => {
    goSlide(current + 1);
    resetTimer();
  };
  window.prevSlide = () => {
    goSlide(current - 1);
    resetTimer();
  };

  resetTimer();

  return () => {
    if (timer) window.clearInterval(timer);
  };
}

async function postJson(endpoint: string, payload: Record<string, unknown>) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const result = (await response.json().catch(() => null)) as { error?: string } | null;
    throw new Error(result?.error ?? "Request failed");
  }

  return response.json();
}

function wireGlobals() {
  window.toggleTheme = () => setTheme(getTheme() === "dark" ? "light" : "dark");

  window.applyLang = (lang: string) => applyLang(lang === "fr" ? "fr" : "en");

  window.toggleLang = () => applyLang(getLang() === "en" ? "fr" : "en");

  window.toggleMobileNav = () => {
    const nav = document.getElementById("mobileNav");
    if (!nav) return;
    const isOpen = nav.classList.contains("open") || nav.style.display === "flex";
    nav.classList.toggle("open", !isOpen);
    nav.style.display = isOpen ? "none" : "flex";
  };

  window.closeMobileNav = () => {
    const nav = document.getElementById("mobileNav");
    if (!nav) return;
    nav.classList.remove("open");
    nav.style.display = "none";
  };

  window.scrollCarousel = (direction: number) => {
    const carousel = document.getElementById("regionsCarousel");
    carousel?.scrollBy({ left: direction * 400, behavior: "smooth" });
  };

  window.switchTab = (role: string) => {
    document.querySelectorAll(".role-section").forEach((section) => section.classList.remove("active"));
    document.querySelectorAll(".tab-btn").forEach((button) => button.classList.remove("active"));
    document.getElementById(role)?.classList.add("active");
    document.getElementById(`tab-${role}`)?.classList.add("active");
    const tabNav = document.querySelector<HTMLElement>(".tab-nav");
    if (tabNav) window.scrollTo({ top: tabNav.offsetTop - 72, behavior: "smooth" });
  };

  window.togglePolicy = (header: HTMLElement) => {
    const body = header.nextElementSibling;
    const toggle = header.querySelector(".policy-toggle");
    body?.classList.toggle("collapsed");
    toggle?.classList.toggle("open");
  };

  window.copyLink = async () => {
    const button = document.getElementById("shareBtn");
    try {
      await navigator.clipboard.writeText(window.location.href);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = window.location.href;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    if (button) {
      button.innerHTML = '<i class="fas fa-check"></i> Copied!';
      button.classList.add("copied");
      window.setTimeout(() => {
        button.innerHTML = '<i class="fas fa-copy"></i> Copy Link';
        button.classList.remove("copied");
      }, 3000);
    }
  };

  window.submitForm = async (button: HTMLButtonElement) => {
    const form = button.closest(".contact-form");
    const firstName = form?.querySelector<HTMLInputElement>('input[type="text"]:nth-of-type(1)')?.value.trim() ?? "";
    const lastName = form?.querySelectorAll<HTMLInputElement>('input[type="text"]')[1]?.value.trim() ?? "";
    const email = form?.querySelector<HTMLInputElement>('input[type="email"]')?.value.trim() ?? "";
    const topic = form?.querySelector<HTMLSelectElement>("select")?.value.trim() ?? "";
    const message = form?.querySelector<HTMLTextAreaElement>("textarea")?.value.trim() ?? "";

    if (!firstName || !lastName || !email || !topic || !message) {
      window.alert("Please fill in all contact fields before submitting.");
      return;
    }

    const original = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      await postJson(CONTACT_ENDPOINT, { firstName, lastName, email, topic, message });
      button.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      button.style.background = "linear-gradient(135deg,#22C55E,#16A34A)";
      form?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea").forEach((field) => {
        field.value = "";
      });
    } catch (error) {
      button.innerHTML = '<i class="fas fa-exclamation-circle"></i> Try Again';
      window.alert(error instanceof Error ? error.message : "Unable to send message.");
    } finally {
      window.setTimeout(() => {
        button.disabled = false;
        button.innerHTML = original;
        button.style.background = "";
      }, 3000);
    }
  };

  window.submitDeletion = async () => {
    const getValue = (id: string) => document.getElementById(id) instanceof HTMLInputElement || document.getElementById(id) instanceof HTMLSelectElement || document.getElementById(id) instanceof HTMLTextAreaElement
      ? (document.getElementById(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement).value.trim()
      : "";
    const isChecked = (id: string) => (document.getElementById(id) as HTMLInputElement | null)?.checked ?? false;

    const payload = {
      name: getValue("del_name"),
      accountType: getValue("del_type"),
      phone: getValue("del_phone"),
      email: getValue("del_email"),
      scope: getValue("del_scope"),
      reason: getValue("del_reason"),
      details: getValue("del_details")
    };

    if (!payload.name || !payload.accountType || !payload.phone || !payload.scope) {
      window.alert("Please fill in all required fields.");
      return;
    }

    if (!isChecked("del_confirm") || !isChecked("del_understand")) {
      window.alert("Please confirm both checkboxes before submitting.");
      return;
    }

    const button = document.getElementById("submitBtn") as HTMLButtonElement | null;
    if (button) {
      button.disabled = true;
      button.classList.add("loading");
      button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    }

    try {
      const result = (await postJson(DATA_DELETION_ENDPOINT, payload)) as { reference?: string };
      const reference = result.reference ?? `TRD-DEL-${Date.now().toString().slice(-8).toUpperCase()}`;
      const refEl = document.getElementById("refNum");
      if (refEl) refEl.textContent = reference;
      const msg = document.getElementById("successMsg");
      if (msg) {
        msg.style.display = "block";
        msg.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      if (button) {
        button.classList.remove("loading");
        button.classList.add("success");
        button.innerHTML = '<i class="fas fa-check"></i> Request Submitted!';
      }
    } catch (error) {
      if (button) {
        button.classList.remove("loading");
        button.disabled = false;
        button.innerHTML = '<i class="fas fa-trash-alt"></i> Submit Deletion Request';
      }
      window.alert(error instanceof Error ? error.message : "Unable to submit deletion request.");
    }
  };
}

function updateStoreLinks() {
  const appStoreUrl = process.env.NEXT_PUBLIC_APP_STORE_URL;
  const googlePlayUrl = process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL;

  document.querySelectorAll<HTMLAnchorElement>("a").forEach((anchor) => {
    const text = anchor.textContent?.toLowerCase() ?? "";
    if (appStoreUrl && text.includes("app store")) {
      anchor.href = appStoreUrl;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
    if (googlePlayUrl && text.includes("google play")) {
      anchor.href = googlePlayUrl;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
  });
}

export function SiteInteractions() {
  useEffect(() => {
    wireGlobals();
    setTheme(getTheme());
    applyLang(getLang());
    updateStoreLinks();
    initSmoothScroll();
    const destroySlider = initHeroSlider();
    const destroyScroll = initScrollEffects();
    const destroyCarousel = initCarousel();

    return () => {
      destroySlider();
      destroyScroll();
      destroyCarousel?.();
    };
  }, []);

  return null;
}
