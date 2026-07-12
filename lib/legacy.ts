import fs from "node:fs";
import path from "node:path";
import { HERO_SLOT_MARKER } from "./hero-slot";

const htmlRoutes: Record<string, string> = {
  "index.html": "/",
  "about.html": "/about",
  "how-it-works.html": "/how-it-works",
  "contact.html": "/contact",
  "blog.html": "/blog",
  "privacy-policy.html": "/privacy-policy",
  "terms-of-service.html": "/terms-of-service",
  "data-deletion.html": "/data-deletion",
  "terms.html": "/terms",
  "article1.html": "/blog/therain-launches-in-yaounde",
  "article2.html": "/blog/school-transport-child-safety",
  "article3.html": "/blog/driver-earnings-tips-cameroon"
};

function sourcePath(fileName: string): string {
  return path.join(process.cwd(), "content", "legacy", fileName);
}

function rewriteHref(href: string): string {
  const clean = href.replace(/&amp;/g, "&").trim();
  if (
    clean.startsWith("http") ||
    clean.startsWith("//") ||
    clean.startsWith("#") ||
    clean.startsWith("mailto:") ||
    clean.startsWith("tel:") ||
    clean.startsWith("/")
  ) {
    return clean;
  }
  const [file, hash] = clean.split("#");
  const route = htmlRoutes[file];
  if (route) return hash ? `${route}#${hash}` : route;
  if (clean.startsWith("images/")) return `/${clean}`;
  return clean;
}

function rewriteAnchors(html: string): string {
  return html.replace(/<a(\s[^>]*)href="([^"]*)"([^>]*)>/gi, (_m, before, href, after) => {
    return `<a${before}href="${rewriteHref(href)}"${after}>`;
  });
}

function rewriteAssetPaths(html: string): string {
  // Rewrite src="images/..." and href="images/..." in HTML attributes
  return html.replace(/\b(src|href)="images\/([^"]*)"/gi, (_m, attr, rest) => `${attr}="/images/${rest}"`);
}

function rewriteBrandDomain(html: string): string {
  return html.replace(/therain\.tech/gi, "therain.cm");
}

function rewriteEmojiIcons(html: string): string {
  const icons: Record<string, string> = {
    "ðŸ“": '<i class="fas fa-map-marker-alt" aria-hidden="true"></i>',
    "ðŸ“ž": '<i class="fas fa-phone" aria-hidden="true"></i>',
    "ðŸ“§": '<i class="fas fa-envelope" aria-hidden="true"></i>',
    "ðŸ•": '<i class="fas fa-clock" aria-hidden="true"></i>',
    "ðŸ“‹": '<i class="fas fa-clipboard-list" aria-hidden="true"></i>',
    "&#x1F7E2;": '<i class="fas fa-circle" aria-hidden="true"></i>',
    "&#x2713;": '<i class="fas fa-check" aria-hidden="true"></i>',
    "&#x23F3;": '<i class="fas fa-hourglass-half" aria-hidden="true"></i>',
    "ðŸ‡¨ðŸ‡²": "Cameroon"
  };
  return Object.entries(icons).reduce((result, [emoji, icon]) => result.replaceAll(emoji, icon), html);
}

// The hero slideshow (backgrounds/dots/arrows) is rendered by real React
// state in LegacyPage, not by regex-rewritten static markup - that was the
// source of duplicated controls. We cut the whole legacy hero section out of
// the static HTML here, keep only the fixed hero-content markup (badge,
// heading, paragraph, buttons, stats) for LegacyPage to drop back in, and
// leave a marker so LegacyPage knows where to mount the real hero JSX.
function extractHeroSection(html: string): { withoutHero: string; heroContentHtml: string } {
  const sectionMatch = html.match(/<section class="hero" id="home">([\s\S]*?)<\/section>/i);
  if (!sectionMatch) return { withoutHero: html, heroContentHtml: "" };

  const contentMatch = sectionMatch[1].match(/<div class="hero-content">([\s\S]*?)<\/div>\s*<div class="slider-controls">/i);
  const heroContentHtml = contentMatch ? contentMatch[1] : "";
  const withoutHero = html.replace(sectionMatch[0], HERO_SLOT_MARKER);

  return { withoutHero, heroContentHtml };
}

function withThemeLogoClass(attrs: string, className: string): string {
  const cleaned = attrs
    .replace(/\s+id=(["'])navLogo\1/gi, "")
    .replace(/\s+class=(["'])(.*?)\1/gi, (_m, quote, value) => {
      const kept = value
        .split(/\s+/)
        .filter((name: string) => name && name !== "nav-logo-img" && name !== "footer-logo-img")
        .join(" ");
      return kept ? ` class=${quote}${kept}${quote}` : "";
    });

  if (/\sclass=(["'])(.*?)\1/i.test(cleaned)) {
    return cleaned.replace(/\sclass=(["'])(.*?)\1/i, (_m, quote, value) => ` class=${quote}${value} ${className}${quote}`);
  }

  return `${cleaned} class="${className}"`;
}

function rewriteThemeLogos(html: string): string {
  return html.replace(/<img\b([^>]*?)\bsrc="\/images\/logo_(?:light|dark)\.png"([^>]*?)(\/?)>/gi, (_match, before, after, slash) => {
    const attrs = `${before}${after}`;
    const lightAttrs = withThemeLogoClass(attrs, "theme-logo theme-logo-light");
    const darkAttrs = withThemeLogoClass(attrs, "theme-logo theme-logo-dark");
    const close = slash ? " />" : ">";

    return [
      `<img${lightAttrs} src="/images/logo_dark.png"${close}`,
      `<img${darkAttrs} src="/images/logo_light.png"${close}`
    ].join("");
  });
}

function rewriteScriptPaths(script: string): string {
  // Rewrite "images/..." string literals inside scripts
  return script
    .replace(/"images\//g, '"/images/')
    .replace(/\/\/ SLIDER[\s\S]*?(?=\/\/ THEME)/g, "")
    .replace(/\/\/ Slider[\s\S]*?(?=document\.addEventListener\('DOMContentLoaded')/g, "")
    .replace(/\s*\/\/ Init slider\s*_slides = Array\.from\(document\.querySelectorAll\('\.hero-slide'\)\);\s*_dots = Array\.from\(document\.querySelectorAll\('\.sdot'\)\);\s*if\(_slides\.length > 0\) _timer = setInterval\(function\(\)\{ goSlide\(_cur \+ 1\); \}, 5000\);\s*/g, "\n")
    .replace(/\bel\.textContent\s*=\s*t\s*;/g, "window.__therainSetTranslatedText ? window.__therainSetTranslatedText(el, t) : el.textContent = t;")
    .replace(/\bel\.innerHTML\s*=\s*t\s*;/g, "window.__therainSetTranslatedText ? window.__therainSetTranslatedText(el, t) : el.textContent = t;");
}

function rewriteImages(html: string): string {
  let lcpMarked = false;
  return html.replace(
    /<img([^>]*?)\bsrc="(\/images\/[^"]+\.(jpg|jpeg|png))"([^>]*?)(\/?>\s*)/gi,
    (_match, before, src, _ext, after, closing) => {
      const srcLow = src.toLowerCase();
      // Keep logo/favicon images simple – they are in the navbar and must load immediately
      if (srcLow.includes("logo") || srcLow.includes("favicon") || srcLow.includes("appstore")) {
        return `<img${before}src="${src}"${after}${closing}`;
      }
      const alreadyHasLoading = before.includes("loading=") || after.includes("loading=");
      let extra = "";
      if (!lcpMarked) {
        // First content image is the LCP hero — eager load with high priority
        extra = ' fetchpriority="high"';
        lcpMarked = true;
      } else if (!alreadyHasLoading) {
        extra = ' loading="lazy"';
      }
      if (srcLow === "/images/team_ops.jpg") {
        return `<img${before}src="${src}"${after}${extra}${closing}`;
      }
      const webp = src.replace(/\.(jpg|jpeg|png)$/i, ".webp");
      return `<picture><source srcset="${webp}" type="image/webp"><img${before}src="${src}"${after}${extra}${closing}</picture>`;
    }
  );
}

function rewriteIframes(html: string): string {
  // Add loading="lazy" to Google Maps iframes that are missing it
  return html.replace(/<iframe([^>]*?)(\/?>\s*)/gi, (_m, attrs, closing) => {
    if (attrs.includes("loading=")) return `<iframe${attrs}${closing}`;
    return `<iframe${attrs} loading="lazy"${closing}`;
  });
}

const brandNoTranslateHtml = '<span class="notranslate" translate="no">TheRain</span>';

const responsiveTextCss = `
h1,h2,h3,h4,h5,h6,p,span,a,button,li{overflow-wrap:anywhere;word-break:normal}
section,div,article,main{min-width:0}
.section-title,.sec-title,.download-title,.dl-title,.hero-title{font-size:clamp(2rem,8vw,4.5rem);line-height:1.05;max-width:100%}
.download-title,.dl-title{max-width:100%;white-space:normal;overflow-wrap:anywhere;word-break:normal}
.app-store-buttons,.store-btns{display:flex;flex-wrap:wrap;gap:12px;width:100%}
.download-stats,.stats-row,.hero-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr));gap:12px;width:100%}
.download-stats>*,.stats-row>*,.hero-stats>*{min-width:0}
.svc-card,.service-card,.price-card,.blog-card,.team-card-new,.contact-card,.safety-card,.step-card,.feature-card,.policy-card,.policy-section{min-width:0;max-width:100%}
.btn-primary,.btn-outline,.nav-btn,.tab-btn,.contact-card-btn,.acceptance-btn,.share-btn,.store-btn{max-width:100%;white-space:normal}
@media(max-width:640px){
  h1,h2,h3,p,.section-title,.sec-title,.download-title,.dl-title,.hero-title{white-space:normal!important}
  .app-store-buttons,.store-btns{flex-direction:column}
  .download-stats,.stats-row,.hero-stats{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(90px,1fr))!important;gap:12px!important;width:100%!important}
  .app-store-buttons a,.app-store-buttons button,.store-btns a,.store-btns button,.store-button,.store-btn{width:100%;max-width:100%;justify-content:center}
  .hero-actions,.blog-cta-btns,.nav-controls{min-width:0;max-width:100%;flex-wrap:wrap}
  .hero-actions a,.blog-cta-btns a,.nav-controls a,.nav-controls button{max-width:100%}
  .mobile-nav{max-width:100vw;overflow-x:hidden}
  .mobile-nav a{white-space:normal}
  .price-grid,.svc-grid,.blog-grid,.contact-cards-grid,.team-grid-new,.team-row-2{grid-template-columns:1fr!important;width:100%;max-width:100%}
  .price-card.feat{transform:none!important}
  .price-card.feat:hover{transform:translateY(-8px)!important}
  .price-feats li,.svc-feats li,.policy-list li{align-items:flex-start}
  .footer [style*="grid-template-columns:2fr 1fr 1fr 1fr"]{display:grid!important;grid-template-columns:1fr!important;gap:24px!important;width:100%!important;max-width:100%!important}
  .footer [style*="max-width:280px"]{max-width:100%!important}
}
`;

function stripTags(value: string): string {
  return value.replace(/<[^>]*>/g, "");
}

function protectBrandText(value: string, replacement = brandNoTranslateHtml): string {
  return value.replace(/\bTheRain\b/g, replacement);
}

function sanitizeLanguageAttributes(html: string): string {
  return html.replace(/\s(data-(?:en|fr))="([^"]*)"/gi, (_match, attr, value) => {
    return ` ${attr}="${stripTags(value)}"`;
  });
}

function protectBrandName(html: string): string {
  return html
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith("<") ? part : protectBrandText(part)))
    .join("");
}

function structureFooterLinks(html: string): string {
  return html
    .replace(
      /<div>\s*\n\s*<div class="footer-col-title" data-en="Company"/g,
      '<div class="footer-links-grid">\n    <div class="footer-column company-column">\n      <div class="footer-col-title" data-en="Company"'
    )
    .replace(
      /<div>\s*\n\s*<div class="footer-col-title" data-en="Services"/g,
      '<div class="footer-column services-column">\n      <div class="footer-col-title" data-en="Services"'
    )
    .replace(
      /<div>\s*\n\s*<div class="footer-col-title" data-en="Legal"/g,
      '<div class="footer-column legal-column">\n      <div class="footer-col-title" data-en="Legal"'
    )
    .replace(
      /(<div class="footer-column legal-column">[\s\S]*?<ul class="footer-links">[\s\S]*?<\/ul>\s*<\/div>)\s*<\/div>\s*<div class="footer-bottom">/g,
      '$1\n  </div>\n  </div>\n  <div class="footer-bottom">'
    );
}

export type LegacyPageData = {
  css: string;
  bodyHtml: string;
  inlineScripts: string[];
  heroContentHtml: string;
};

export function getLegacyPage(sourceFile: string): LegacyPageData {
  const source = fs.readFileSync(sourcePath(sourceFile), "utf8");

  // Extract all CSS from <style> blocks
  const cssBlocks = [...source.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)];
  const css = cssBlocks.map((m) => m[1]).join("\n");

  // Extract body content
  const bodyMatch = source.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const rawBody = bodyMatch ? bodyMatch[1] : "";

  // Extract inline scripts (those without a src attribute)
  const scriptMatches = [...rawBody.matchAll(/<script(?![^>]*\bsrc\s*=)[^>]*>([\s\S]*?)<\/script>/gi)];
  const inlineScripts = scriptMatches
    .map((m) => rewriteScriptPaths(m[1]))
    .filter((s) => !s.includes("googleTranslateElementInit"))
    .filter((s) => s.trim().length > 0);

  // Strip all script tags from body HTML
  const noScripts = rawBody
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<div[^>]*\bid=(["'])google_translate_element\1[^>]*>\s*<\/div>/gi, "");

  const assetRewritten = rewriteAssetPaths(noScripts);
  const { withoutHero, heroContentHtml } =
    sourceFile === "index.html" ? extractHeroSection(assetRewritten) : { withoutHero: assetRewritten, heroContentHtml: "" };

  // Rewrite asset paths, anchor hrefs, add WebP picture tags and lazy loading
  const rewritten = structureFooterLinks(
    protectBrandName(
      sanitizeLanguageAttributes(
        rewriteThemeLogos(
          rewriteEmojiIcons(rewriteBrandDomain(rewriteImages(rewriteIframes(rewriteAnchors(withoutHero)))))
        )
      )
    )
  );

  const heroContentRewritten = heroContentHtml
    ? protectBrandName(sanitizeLanguageAttributes(rewriteEmojiIcons(rewriteBrandDomain(rewriteAnchors(heroContentHtml)))))
    : "";

  // Fix: .aos elements start with opacity:0 in CSS, waiting for IntersectionObserver
  // which only runs after client-side JS hydration. This causes blank sections on load.
  // Remove the hide-by-default so content is always visible; keep the transition
  // so if JS does fire the class change it still animates smoothly.
  const fixedCss = css
    .replace(/\.aos\{opacity:0;/g, ".aos{opacity:1;")
    .replace(/\.aos \{ opacity: 0;/g, ".aos { opacity: 1;")
    .replace(/\.skiptranslate\s*\{\s*display\s*:\s*none\s*!important;\s*\}/g, ".skiptranslate{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;}")
    .concat(
      sourceFile === "index.html"
        ? "\n.hero-section{position:relative;overflow:hidden;isolation:isolate}.hero-backgrounds{position:absolute;inset:0;z-index:0;pointer-events:none}.hero-background{position:absolute;inset:0;background-position:center;background-repeat:no-repeat;background-size:cover;opacity:0;transform:scale(1.02);transition:opacity 1.2s ease-in-out,transform 10s ease;will-change:opacity,transform}.hero-background-active{opacity:1;transform:scale(1)}.hero-overlay{position:absolute;inset:0;z-index:1;pointer-events:none}.hero-content{position:relative;z-index:2}.hero-slider-dots{position:absolute;left:clamp(20px,5vw,80px);bottom:32px;z-index:4;display:flex;align-items:center;gap:10px}.hero-slider-dot{width:8px;height:8px;padding:0;border:0;border-radius:999px;background:rgba(255,255,255,0.4);cursor:pointer;transition:width 0.25s ease,background-color 0.25s ease}.hero-slider-dot.active{width:24px;background:#1294ff}.hero-slider-controls{position:absolute;right:clamp(20px,5vw,80px);bottom:32px;z-index:4;display:flex;align-items:center;gap:10px}.hero-slider-arrow{width:46px;height:46px;display:inline-flex;align-items:center;justify-content:center;border:1px solid rgba(255,255,255,0.3);border-radius:12px;background:rgba(9,28,54,0.45);color:white;font-size:30px;cursor:pointer;backdrop-filter:blur(8px)}.hero-slider-arrow:hover{background:rgba(18,148,255,0.8)}@media(max-width:640px){.hero-slider-dots{left:16px;bottom:18px}.hero-slider-controls{right:16px;bottom:14px}.hero-slider-arrow{width:40px;height:40px;font-size:26px}}@media(prefers-reduced-motion:reduce){.hero-background{transition:none;transform:none}}\n"
        : ""
    )
    .concat(
      "\n.theme-logo-light{display:none!important}[data-theme=\"light\"] .theme-logo-light{display:block!important}[data-theme=\"light\"] .theme-logo-dark{display:none!important}[data-theme=\"dark\"] .theme-logo-dark{display:block!important}\n"
    )
    .concat(
      "\n.footer-grid:has(.footer-links-grid){grid-template-columns:2fr 3fr}.footer-links-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:32px;align-items:start}.footer-column{min-width:0}.footer-column .footer-col-title{margin:0 0 20px}.footer-column .footer-links{margin:0;padding:0;list-style:none}\n@media(max-width:1024px) and (min-width:641px){.footer-grid:has(.footer-links-grid){grid-template-columns:1fr 1fr}.footer-links-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}\n@media(max-width:640px){.footer{padding:24px 16px!important;min-height:auto!important}.footer-grid,.footer-grid:has(.footer-links-grid){display:flex!important;flex-direction:column!important;gap:24px!important;margin-bottom:24px!important}.footer-main,.footer-inner,.footer-container,.footer-logo,.footer-links-grid{width:100%!important}.footer-links-grid{display:grid!important;grid-template-columns:minmax(0,1fr) minmax(0,1fr)!important;column-gap:18px!important;row-gap:20px!important;align-items:start!important}.company-column{grid-column:1!important;grid-row:1!important}.services-column{grid-column:2!important;grid-row:1!important}.legal-column{grid-column:1/-1!important;grid-row:2!important}.footer-column{min-width:0!important;width:100%!important;margin:0!important;padding:0!important}.footer-column .footer-col-title,.footer-column h3{margin:0 0 10px!important}.footer-column ul{margin:0!important;padding:0!important;list-style:none!important;display:flex!important;flex-direction:column!important;gap:0!important}.footer-column li{margin:0 0 8px!important}.footer-column li:last-child{margin-bottom:0!important}.footer-bottom{padding-top:20px!important}}\n"
    )
    .concat(responsiveTextCss);

  return { css: fixedCss, bodyHtml: rewritten, inlineScripts, heroContentHtml: heroContentRewritten };
}
