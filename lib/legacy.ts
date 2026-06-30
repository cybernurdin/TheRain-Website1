import fs from "node:fs";
import path from "node:path";
import type { PageKey } from "./site";
import { sitePages } from "./site";

type LegacyPageContent = {
  css: string;
  html: string;
};

const htmlRoutes: Record<string, string> = {
  "index.html": "/",
  "about.html": "/about",
  "how-it-works.html": "/how-it-works",
  "privacy-policy.html": "/privacy-policy",
  "terms-of-service.html": "/terms-of-service",
  "data-deletion.html": "/data-deletion",
  "terms.html": "/terms",
  "article1.html": "/blog/therain-launches-in-yaounde",
  "article2.html": "/blog/school-transport-child-safety",
  "article3.html": "/blog/driver-earnings-tips-cameroon"
};

const externalSocials = {
  facebook: "https://www.facebook.com/profile.php?id=61591416844183",
  instagram: "https://www.instagram.com/therain6026?igsh=MTBuMHU1MHBkZ240eg==",
  youtube: "https://youtube.com/@therain-tech?si=xyXaabvEzabOnu5b",
  whatsapp: "https://wa.me/237676011861"
};

function sourcePath(fileName: string): string {
  return path.join(process.cwd(), "content", "legacy", fileName);
}

function extractFirst(source: string, pattern: RegExp): string {
  return source.match(pattern)?.[1] ?? "";
}

function normalizeAssetPath(assetPath: string): string {
  const cleanPath = assetPath.replace(/&amp;/g, "&").split("?")[0];
  return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
}

function rewriteCss(css: string): string {
  return css.replace(/url\((['"]?)images\//gi, "url($1/images/");
}

function fallbackHref(innerHtml: string): string {
  const text = innerHtml.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
  const raw = innerHtml.toLowerCase();

  if (text.includes("app store") || text.includes("google play") || text.includes("download")) {
    return "/#download";
  }

  if (text.includes("register as driver") || text.includes("careers")) {
    return "/#driver";
  }

  if (text.includes("learn more")) {
    return "/#services";
  }

  if (raw.includes("fa-facebook")) return externalSocials.facebook;
  if (raw.includes("fa-instagram")) return externalSocials.instagram;
  if (raw.includes("fa-youtube")) return externalSocials.youtube;
  if (raw.includes("fa-whatsapp")) return externalSocials.whatsapp;

  return "/#contact";
}

function rewriteHref(href: string, innerHtml: string): string {
  const cleanHref = href.replace(/&amp;/g, "&").trim();

  if (cleanHref === "#") {
    return fallbackHref(innerHtml);
  }

  if (
    cleanHref.startsWith("http://") ||
    cleanHref.startsWith("https://") ||
    cleanHref.startsWith("mailto:") ||
    cleanHref.startsWith("tel:")
  ) {
    return cleanHref;
  }

  if (cleanHref.startsWith("#")) {
    return cleanHref;
  }

  const [fileName, hash = ""] = cleanHref.split("#");
  const mappedRoute = htmlRoutes[fileName];

  if (mappedRoute) {
    return hash ? `${mappedRoute}#${hash}` : mappedRoute;
  }

  if (cleanHref.startsWith("images/")) {
    return normalizeAssetPath(cleanHref);
  }

  return cleanHref;
}

function withSafeExternalAttrs(openingAttrs: string, href: string): string {
  if (!href.startsWith("http://") && !href.startsWith("https://")) {
    return openingAttrs;
  }

  let attrs = openingAttrs;
  if (!/\starget=/i.test(attrs)) {
    attrs += ' target="_blank"';
  }
  if (!/\srel=/i.test(attrs)) {
    attrs += ' rel="noopener noreferrer"';
  }
  return attrs;
}

function socialLabel(innerHtml: string): string | null {
  const raw = innerHtml.toLowerCase();
  if (raw.includes("fa-facebook")) return "Facebook";
  if (raw.includes("fa-instagram")) return "Instagram";
  if (raw.includes("fa-youtube")) return "YouTube";
  if (raw.includes("fa-whatsapp")) return "WhatsApp";
  if (raw.includes("fa-linkedin")) return "LinkedIn";
  if (raw.includes("fa-tiktok")) return "TikTok";
  if (raw.includes("viewbox=\"0 0 24 24\"")) return "X";
  return null;
}

function withAccessibleLabel(openingAttrs: string, innerHtml: string): string {
  if (/\saria-label=/i.test(openingAttrs)) {
    return openingAttrs;
  }

  const label = socialLabel(innerHtml);
  return label ? `${openingAttrs} aria-label="${label}"` : openingAttrs;
}

function rewriteAnchors(html: string): string {
  return html.replace(/<a\b([^>]*)href="([^"]*)"([^>]*)>([\s\S]*?)<\/a>/gi, (match, before, href, after, inner) => {
    const nextHref = rewriteHref(href, inner);
    let attrs = `${before}href="${nextHref}"${after}`;
    attrs = withSafeExternalAttrs(attrs, nextHref);
    attrs = withAccessibleLabel(attrs, inner);
    return `<a${attrs}>${inner}</a>`;
  });
}

function rewriteImages(html: string): string {
  return html.replace(/\b(src|href)="images\/([^"]*)"/gi, (_match, attr, assetPath) => {
    return `${attr}="${normalizeAssetPath(`images/${assetPath}`)}"`;
  });
}

function stripScripts(html: string): string {
  return html.replace(/<script\b[\s\S]*?<\/script>/gi, "");
}

function rewriteLegacyHtml(html: string): string {
  return rewriteAnchors(rewriteImages(stripScripts(html))).trim();
}

export function getLegacyPage(key: PageKey): LegacyPageContent {
  const sourceFile = sitePages[key].sourceFile;
  const source = fs.readFileSync(sourcePath(sourceFile), "utf8");
  const css = [...source.matchAll(/<style>([\s\S]*?)<\/style>/gi)].map((match) => match[1]).join("\n\n");
  const body = extractFirst(source, /<body[^>]*>([\s\S]*?)<\/body>/i);

  return {
    css: rewriteCss(css),
    html: rewriteLegacyHtml(body)
  };
}
