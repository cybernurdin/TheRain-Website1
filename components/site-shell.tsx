import Image from "next/image";
import Link from "next/link";
import { BrandName, brandText } from "@/components/brand-name";
import { BRAND_NAME, footerGroups, localizedPath, navItems, pageMeta, socialLinks, type Locale, type PageKey } from "@/data/site";
import { contactInfo, text, ui } from "@/data/content";

type SiteShellProps = {
  children: React.ReactNode;
  locale: Locale;
  pageKey: PageKey;
};

function linkFor(key: PageKey, locale: Locale) {
  return localizedPath(key, locale);
}

function ThemeLogo({
  alt,
  width,
  height,
  priority = false,
  className
}: {
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className: string;
}) {
  return (
    <>
      <Image src="/images/logo_dark.png" alt={alt} width={width} height={height} priority={priority} className={`${className} theme-logo theme-logo-light`} />
      <Image src="/images/logo_light.png" alt={alt} width={width} height={height} priority={priority} className={`${className} theme-logo theme-logo-dark`} />
    </>
  );
}

export function SiteShell({ children, locale, pageKey }: SiteShellProps) {
  const alternateLocale = locale === "en" ? "fr" : "en";
  const alternateLabel = alternateLocale.toUpperCase();
  const currentAlternate = localizedPath(pageKey, alternateLocale);

  return (
    <div className="min-h-screen overflow-x-clip">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#060E1F]/92 backdrop-blur-xl">
        <nav className="container-page flex min-h-20 items-center justify-between gap-4" aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"}>
          <Link href={linkFor("home", locale)} className="focus-ring flex items-center gap-3 rounded-lg" aria-label={`${BRAND_NAME} home`}>
            <ThemeLogo alt={`${BRAND_NAME} logo`} width={44} height={44} priority className="h-11 w-auto" />
            <span className="text-xl font-black tracking-tight text-white"><BrandName /></span>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={linkFor(item.key, locale)}
                className="focus-ring rounded-full px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/8 hover:text-white"
              >
                {brandText(text(item.label, locale))}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link href={currentAlternate} hrefLang={alternateLocale} className="focus-ring rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white hover:border-sky-300">
              {alternateLabel}
            </Link>
            <Link href={linkFor("contact", locale)} className="focus-ring rounded-full bg-sky-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sky-950/30 hover:bg-sky-400">
              {text(ui.contactSupport, locale)}
            </Link>
          </div>

          <details className="group relative lg:hidden">
            <summary className="focus-ring flex cursor-pointer list-none items-center rounded-full border border-white/15 px-4 py-2 text-sm font-bold text-white">
              Menu
            </summary>
            <div className="absolute right-0 mt-3 w-72 rounded-2xl border border-white/12 bg-[#081529] p-3 shadow-2xl">
              {navItems.map((item) => (
                <Link key={item.key} href={linkFor(item.key, locale)} className="block rounded-xl px-4 py-3 text-sm font-semibold text-slate-100 hover:bg-white/8">
                  {brandText(text(item.label, locale))}
                </Link>
              ))}
              <div className="mt-2 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                <Link href={currentAlternate} hrefLang={alternateLocale} className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-bold">
                  {alternateLabel}
                </Link>
                <Link href={linkFor("contact", locale)} className="rounded-xl bg-sky-500 px-4 py-3 text-center text-sm font-bold text-white">
                  {locale === "fr" ? "Aide" : "Help"}
                </Link>
              </div>
            </div>
          </details>
        </nav>
      </header>

      <main id="main-content">{children}</main>

      <footer className="site-footer border-t border-white/10 bg-[#050B18]">
        <div className="site-footer-content container-page grid gap-10 py-12 lg:grid-cols-[1.4fr_2fr] lg:py-16">
          <div>
            <Link href={linkFor("home", locale)} className="inline-flex items-center gap-3">
              <ThemeLogo alt={`${BRAND_NAME} logo`} width={48} height={48} className="h-12 w-auto" />
              <span className="text-2xl font-black"><BrandName /></span>
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              {locale === "fr"
                ? "Plateforme camerounaise de technologie de transport pour VTC, livraison, transport scolaire et gestion de flotte."
                : "Cameroon transport technology platform for ride-hailing, delivery, school transport, and fleet management."}
            </p>
            <p className="mt-4 text-sm text-slate-400">
              {contactInfo.email} · {contactInfo.support}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-slate-200">{text(ui.appStore, locale)}</span>
              <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-slate-200">{text(ui.googlePlay, locale)}</span>
            </div>
          </div>

          <div className="footer-links-grid grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerGroups.map((group) => {
              const title = text(group.title, "en");
              const columnClass =
                title === "Company" ? "company-column" : title === "Services" ? "services-column" : "legal-column col-span-2 sm:col-span-1";

              return (
              <div key={title} className={`footer-column ${columnClass}`}>
                <h2 className="text-sm font-black uppercase tracking-[0.18em] text-sky-300">{text(group.title, locale)}</h2>
                <ul className="mt-4 space-y-3">
                  {group.links.map((link, index) => (
                    <li key={`${link.key}-${index}`}>
                      <Link href={linkFor(link.key, locale)} className="text-sm text-slate-300 hover:text-white">
                        {brandText(text(link.label, locale))}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
            })}
          </div>
        </div>

        <div className="container-page flex flex-col gap-4 border-t border-white/10 py-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 <BrandName />. {locale === "fr" ? "Tous droits réservés." : "All rights reserved."}</p>
          <div className="flex flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

export function PageIntro({ locale, pageKey }: { locale: Locale; pageKey: PageKey }) {
  const page = pageMeta[pageKey];
  return (
    <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-8 text-slate-300 md:text-lg">
      {brandText(text(page.description, locale))}
    </p>
  );
}
