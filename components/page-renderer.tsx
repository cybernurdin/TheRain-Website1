import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ContactForm, DataDeletionForm } from "@/components/forms";
import { SiteShell } from "@/components/site-shell";
import {
  BRAND_NAME,
  blogKeys,
  canonicalPath,
  localizedPath,
  pageMeta,
  type Locale,
  type PageKey
} from "@/data/site";
import {
  about,
  blogPosts,
  common,
  contactInfo,
  driverBenefits,
  faqs,
  home,
  legalSummaries,
  processSteps,
  safetyFeatures,
  services,
  text,
  ui
} from "@/data/content";
import { pageSchemas } from "@/lib/seo";

type PageRendererProps = {
  pageKey: PageKey;
  locale: Locale;
  variant?: "default" | "localized";
};

function SectionHeader({
  eyebrow,
  title,
  intro,
  align = "center"
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow && <p className="text-sm font-black uppercase tracking-[0.22em] text-sky-300">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{intro}</p>}
    </div>
  );
}

function CtaLink({ href, children, secondary = false }: { href: string; children: React.ReactNode; secondary?: boolean }) {
  return (
    <Link
      href={href}
      className={
        secondary
          ? "focus-ring inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white hover:border-sky-300"
          : "focus-ring inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-black text-white shadow-lg shadow-sky-950/30 hover:bg-sky-400"
      }
    >
      {children}
    </Link>
  );
}

function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/bg.jpg"
          alt={locale === "fr" ? "Voiture TheRain dans une scène de mobilité urbaine" : "TheRain vehicle in an urban mobility scene"}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-32"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#060E1F]/75 via-[#060E1F]/88 to-[#060E1F]" />
      </div>
      <div className="container-page grid min-h-[calc(100vh-80px)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.24em] text-sky-300">{text(home.heroEyebrow, locale)}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
            {text(home.title, locale)}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-9 text-slate-200 md:text-xl">{text(home.intro, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <CtaLink href={localizedPath("services", locale)}>{text(ui.exploreServices, locale)}</CtaLink>
            <CtaLink href={localizedPath("driver", locale)} secondary>
              {text(ui.becomeDriver, locale)}
            </CtaLink>
          </div>
        </div>
        <div className="card relative overflow-hidden rounded-[2rem] p-4">
          <Image
            src="/images/car1.jpg"
            alt={locale === "fr" ? "Voiture TheRain pour transport au Cameroun" : "TheRain car for transport in Cameroon"}
            width={900}
            height={760}
            priority
            className="aspect-[4/3] rounded-[1.5rem] object-cover"
          />
          <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/10 bg-[#061024]/85 p-4 backdrop-blur-md">
            <p className="text-sm font-bold text-sky-200">{text(common.official, locale)}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stats({ locale }: { locale: Locale }) {
  return (
    <section className="container-page -mt-10 grid gap-4 sm:grid-cols-3">
      {home.stats.map((stat) => (
        <div key={stat.value} className="card rounded-3xl p-6">
          <p className="text-3xl font-black text-white">{stat.value}</p>
          <p className="mt-2 text-sm font-semibold text-slate-300">{text(stat.label, locale)}</p>
        </div>
      ))}
    </section>
  );
}

function ServicesGrid({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const visible = compact ? services.slice(0, 5) : services;
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {visible.map((service) => (
        <article key={text(service.title, "en")} className="card overflow-hidden rounded-3xl">
          <Image
            src={service.image}
            alt={text(service.alt, locale)}
            width={640}
            height={420}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-black text-white">{text(service.title, locale)}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{text(service.summary, locale)}</p>
            {!compact && <p className="mt-4 text-sm leading-7 text-slate-400">{text(service.details, locale)}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

function ServiceSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-pad" id="services">
      <div className="container-page">
        <SectionHeader title={text(home.servicesTitle, locale)} intro={text(common.factual, locale)} />
        <ServicesGrid locale={locale} compact />
      </div>
    </section>
  );
}

function SplitFeature({
  locale,
  page,
  image,
  title,
  textValue,
  ctaHref,
  ctaLabel,
  reverse = false
}: {
  locale: Locale;
  page: PageKey;
  image: string;
  title: string;
  textValue: string;
  ctaHref: string;
  ctaLabel: string;
  reverse?: boolean;
}) {
  return (
    <section className="section-pad">
      <div className={`container-page grid items-center gap-10 lg:grid-cols-2 ${reverse ? "lg:[&>div:first-child]:order-2" : ""}`}>
        <div>
          <p className="text-sm font-black tracking-[0.08em] text-sky-300">{text(pageMeta[page].title, locale)}</p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>
          <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">{textValue}</p>
          <div className="mt-7">
            <CtaLink href={ctaHref}>{ctaLabel}</CtaLink>
          </div>
        </div>
        <div className="card overflow-hidden rounded-[2rem] p-3">
          <Image src={image} alt={title} width={760} height={620} loading="lazy" className="aspect-[4/3] rounded-[1.5rem] object-cover" />
        </div>
      </div>
    </section>
  );
}

function BlogCards({ locale, limit }: { locale: Locale; limit?: number }) {
  const posts = limit ? blogPosts.slice(0, limit) : blogPosts;
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-3">
      {posts.map((post) => (
        <article key={post.key} className="card overflow-hidden rounded-3xl">
          <Image src={post.image} alt={text(post.alt, locale)} width={640} height={420} loading="lazy" className="aspect-[16/10] w-full object-cover" />
          <div className="p-6">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-sky-300">{text(post.category, locale)}</p>
            <h3 className="mt-3 text-xl font-black text-white">{text(post.title, locale)}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-300">{text(post.excerpt, locale)}</p>
            <Link href={localizedPath(post.key, locale)} className="mt-5 inline-flex text-sm font-black text-sky-300 hover:text-sky-200">
              {text(ui.readMore, locale)}
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function FaqSection({ locale }: { locale: Locale }) {
  return (
    <section className="section-pad">
      <div className="container-page">
        <SectionHeader title={locale === "fr" ? "Questions fréquentes" : "Frequently asked questions"} />
        <div className="mx-auto mt-10 max-w-4xl divide-y divide-white/10 rounded-3xl border border-white/10 bg-white/[0.03]">
          {faqs.map((faq) => (
            <details key={text(faq.question, "en")} className="group p-6">
              <summary className="cursor-pointer list-none text-lg font-black text-white">{text(faq.question, locale)}</summary>
              <p className="mt-4 text-sm leading-7 text-slate-300">{text(faq.answer, locale)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomePage({ locale }: { locale: Locale }) {
  return (
    <>
      <Hero locale={locale} />
      <Stats locale={locale} />
      <ServiceSection locale={locale} />
      <SplitFeature
        locale={locale}
        page="driver"
        image="/images/team_ops.jpg"
        title={text(home.driverTitle, locale)}
        textValue={text(home.driverText, locale)}
        ctaHref={localizedPath("driver", locale)}
        ctaLabel={text(ui.becomeDriver, locale)}
      />
      <SplitFeature
        locale={locale}
        page="safety"
        image="/images/school_svc.jpg"
        title={text(home.safetyTitle, locale)}
        textValue={text(home.safetyText, locale)}
        ctaHref={localizedPath("safety", locale)}
        ctaLabel={text(ui.learnMore, locale)}
        reverse
      />
      <section className="section-pad">
        <div className="container-page">
          <SectionHeader title={locale === "fr" ? "Actualités transport et sécurité" : "Transport news and safety updates"} intro={text(pageMeta.blog.description, locale)} />
          <BlogCards locale={locale} limit={3} />
          <div className="mt-8 text-center">
            <CtaLink href={localizedPath("blog", locale)} secondary>
              {text(ui.viewBlog, locale)}
            </CtaLink>
          </div>
        </div>
      </section>
      <FaqSection locale={locale} />
    </>
  );
}

function StandardHero({ locale, pageKey, children }: { locale: Locale; pageKey: PageKey; children?: React.ReactNode }) {
  const page = pageMeta[pageKey];
  return (
    <section className="container-page py-16 text-center md:py-24">
      <p className="text-sm font-black tracking-[0.08em] text-sky-300">{BRAND_NAME}</p>
      <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">{text(page.title, locale)}</h1>
      <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{text(page.description, locale)}</p>
      {children}
    </section>
  );
}

function AboutPage({ locale }: { locale: Locale }) {
  return (
    <>
      <StandardHero locale={locale} pageKey="about" />
      <section className="section-pad pt-0">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div className="card overflow-hidden rounded-[2rem] p-3">
            <Image src="/images/about_car.jpg" alt={locale === "fr" ? "Équipe et véhicule TheRain au Cameroun" : "TheRain team and vehicle in Cameroon"} width={760} height={620} priority className="aspect-[4/3] rounded-[1.5rem] object-cover" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-white md:text-5xl">{locale === "fr" ? "Une innovation transport locale" : "Local transport innovation"}</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">{text(about.intro, locale)}</p>
            <p className="mt-5 text-base leading-8 text-slate-300">{text(about.mission, locale)}</p>
          </div>
        </div>
      </section>
      <section className="section-pad pt-0">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {about.values.map((value) => (
            <article key={text(value.title, "en")} className="card rounded-3xl p-6">
              <h2 className="text-xl font-black text-white">{text(value.title, locale)}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{text(value.text, locale)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function ServicesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <StandardHero locale={locale} pageKey="services" />
      <section className="section-pad pt-0">
        <div className="container-page">
          <ServicesGrid locale={locale} />
        </div>
      </section>
    </>
  );
}

function DriverPage({ locale }: { locale: Locale }) {
  return (
    <>
      <StandardHero locale={locale} pageKey="driver" />
      <section className="section-pad pt-0">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-black text-white md:text-5xl">{locale === "fr" ? "Conduire avec TheRain" : "Drive with TheRain"}</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">{text(home.driverText, locale)}</p>
            <ul className="mt-6 space-y-4">
              {driverBenefits.map((benefit) => (
                <li key={benefit.en} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-7 text-slate-200">
                  {text(benefit, locale)}
                </li>
              ))}
            </ul>
          </div>
          <Image src="/images/team_ops.jpg" alt={locale === "fr" ? "Chauffeur et opérations TheRain" : "TheRain driver and operations"} width={760} height={620} className="rounded-[2rem] object-cover" />
        </div>
      </section>
    </>
  );
}

function SafetyPage({ locale }: { locale: Locale }) {
  return (
    <>
      <StandardHero locale={locale} pageKey="safety" />
      <section className="section-pad pt-0">
        <div className="container-page grid gap-5 md:grid-cols-3">
          {safetyFeatures.map((feature) => (
            <article key={text(feature.title, "en")} className="card rounded-3xl p-6">
              <h2 className="text-xl font-black text-white">{text(feature.title, locale)}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{text(feature.text, locale)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function HowItWorksPage({ locale }: { locale: Locale }) {
  return (
    <>
      <StandardHero locale={locale} pageKey="howItWorks" />
      <section className="section-pad pt-0">
        <div className="container-page grid gap-5 md:grid-cols-4">
          {processSteps.map((step, index) => (
            <article key={text(step.title, "en")} className="card rounded-3xl p-6">
              <p className="text-sm font-black text-sky-300">0{index + 1}</p>
              <h2 className="mt-4 text-xl font-black text-white">{text(step.title, locale)}</h2>
              <p className="mt-4 text-sm leading-7 text-slate-300">{text(step.text, locale)}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function BlogPage({ locale }: { locale: Locale }) {
  return (
    <>
      <StandardHero locale={locale} pageKey="blog" />
      <section className="section-pad pt-0">
        <div className="container-page">
          <BlogCards locale={locale} />
        </div>
      </section>
    </>
  );
}

function ContactPage({ locale }: { locale: Locale }) {
  return (
    <>
      <StandardHero locale={locale} pageKey="contact" />
      <section className="section-pad pt-0">
        <div className="container-page grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="card rounded-3xl p-6">
            <h2 className="text-2xl font-black text-white">{locale === "fr" ? "Coordonnées" : "Contact details"}</h2>
            <dl className="mt-6 space-y-5 text-sm text-slate-300">
              <div>
                <dt className="font-black text-white">{locale === "fr" ? "Lieu" : "Location"}</dt>
                <dd className="mt-1">{text(contactInfo.location, locale)}</dd>
              </div>
              <div>
                <dt className="font-black text-white">Email</dt>
                <dd className="mt-1">{contactInfo.email}</dd>
                <dd>{contactInfo.support}</dd>
              </div>
              <div>
                <dt className="font-black text-white">{locale === "fr" ? "Téléphone" : "Phone"}</dt>
                {contactInfo.phones.map((phone) => (
                  <dd key={phone} className="mt-1">{phone}</dd>
                ))}
              </div>
              <div>
                <dt className="font-black text-white">{locale === "fr" ? "Assistance" : "Support"}</dt>
                <dd className="mt-1">{text(contactInfo.hours, locale)}</dd>
              </div>
            </dl>
          </div>
          <ContactForm locale={locale} />
        </div>
      </section>
    </>
  );
}

function LegalPage({ locale, pageKey }: { locale: Locale; pageKey: PageKey }) {
  const legalKey =
    pageKey === "privacyPolicy" ? "privacy" : pageKey === "termsOfService" ? "termsOfService" : pageKey === "dataDeletion" ? "dataDeletion" : "terms";
  const summary = legalSummaries[legalKey];
  return (
    <>
      <StandardHero locale={locale} pageKey={pageKey} />
      <section className="section-pad pt-0">
        <div className="container-page grid gap-8 lg:grid-cols-[0.7fr_1.3fr]">
          <aside className="card h-fit rounded-3xl p-6">
            <h2 className="text-lg font-black text-white">{locale === "fr" ? "Documents importants" : "Important documents"}</h2>
            <nav className="mt-4 grid gap-3" aria-label={locale === "fr" ? "Navigation légale" : "Legal navigation"}>
              {(["terms", "privacyPolicy", "termsOfService", "dataDeletion"] as PageKey[]).map((key) => (
                <Link key={key} href={localizedPath(key, locale)} className="rounded-2xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-200 hover:border-sky-300">
                  {text(pageMeta[key].title, locale)}
                </Link>
              ))}
            </nav>
          </aside>
          <article className="card rounded-3xl p-6 md:p-8">
            <h2 className="text-3xl font-black text-white">{text(summary.title, locale)}</h2>
            <p className="mt-5 text-base leading-8 text-slate-300">{text(summary.intro, locale)}</p>
            {legalKey === "terms" && "sections" in summary && (
              <div className="mt-8 grid gap-5">
                {summary.sections.map((section) => (
                  <section key={text(section.title, "en")} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="text-xl font-black text-white">{text(section.title, locale)}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{text(section.text, locale)}</p>
                  </section>
                ))}
              </div>
            )}
            {pageKey === "privacyPolicy" && (
              <div className="mt-8 grid gap-5">
                {[
                  {
                    title: locale === "fr" ? "Données collectées" : "Data we collect",
                    text: locale === "fr" ? "Nom, contact, informations de trajet, données de localisation pendant les services actifs, données de paiement et informations nécessaires aux opérations." : "Name, contact details, trip information, location data during active services, payment information, and records needed for operations."
                  },
                  {
                    title: locale === "fr" ? "Utilisation des données" : "How data is used",
                    text: locale === "fr" ? "Les données servent à fournir les services, vérifier les chauffeurs, traiter les paiements, améliorer la sécurité et répondre aux demandes d'assistance." : "Data is used to provide services, verify drivers, process payments, improve safety, and respond to support requests."
                  },
                  {
                    title: locale === "fr" ? "Vos droits" : "Your rights",
                    text: locale === "fr" ? "Vous pouvez demander l'accès, la correction, la portabilité ou la suppression de données éligibles en contactant TheRain." : "You may request access, correction, portability, or deletion of eligible data by contacting TheRain."
                  }
                ].map((item) => (
                  <section key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <h3 className="text-xl font-black text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                  </section>
                ))}
              </div>
            )}
            {pageKey === "termsOfService" && (
              <div className="mt-8 grid gap-5">
                {[
                  locale === "fr" ? "Les utilisateurs doivent fournir des informations exactes, respecter les autres utilisateurs et suivre les règles de sécurité." : "Users must provide accurate information, respect other users, and follow safety rules.",
                  locale === "fr" ? "Les chauffeurs doivent conserver des documents valides, conduire prudemment et maintenir la qualité de service." : "Drivers must keep valid documents, drive safely, and maintain service quality.",
                  locale === "fr" ? "TheRain peut enquêter sur les incidents, suspendre des comptes et traiter les litiges selon les politiques de la plateforme." : "TheRain may investigate incidents, suspend accounts, and process disputes under platform policies."
                ].map((item) => (
                  <p key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm leading-7 text-slate-300">{item}</p>
                ))}
              </div>
            )}
            {pageKey === "dataDeletion" && (
              <div className="mt-8">
                <DataDeletionForm locale={locale} />
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  );
}

function BlogArticle({ locale, pageKey }: { locale: Locale; pageKey: PageKey }) {
  const post = blogPosts.find((item) => item.key === pageKey);
  if (!post) return null;

  return (
    <>
      <article>
        <section className="container-page py-14 md:py-20">
          <Link href={localizedPath("blog", locale)} className="text-sm font-black text-sky-300 hover:text-sky-200">
            {locale === "fr" ? "Retour au blog" : "Back to blog"}
          </Link>
          <p className="mt-6 text-sm font-black uppercase tracking-[0.22em] text-sky-300">{text(post.category, locale)}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">{text(post.title, locale)}</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">{text(post.excerpt, locale)}</p>
          <p className="mt-4 text-sm text-slate-400">{new Date(post.date).toLocaleDateString(locale === "fr" ? "fr-CM" : "en-CM", { year: "numeric", month: "long", day: "numeric" })}</p>
          <Image src={post.image} alt={text(post.alt, locale)} width={1200} height={720} priority className="mt-10 aspect-[16/9] rounded-[2rem] object-cover" />
        </section>
        <section className="container-page max-w-3xl pb-20">
          {post.body.map((section) => (
            <section key={text(section.heading, "en")} className="mt-10">
              <h2 className="text-3xl font-black text-white">{text(section.heading, locale)}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={text(paragraph, "en")} className="mt-5 text-base leading-8 text-slate-300">
                  {text(paragraph, locale)}
                </p>
              ))}
            </section>
          ))}
        </section>
      </article>
    </>
  );
}

function renderPage(pageKey: PageKey, locale: Locale) {
  if (pageKey === "home") return <HomePage locale={locale} />;
  if (pageKey === "about") return <AboutPage locale={locale} />;
  if (pageKey === "services") return <ServicesPage locale={locale} />;
  if (pageKey === "driver") return <DriverPage locale={locale} />;
  if (pageKey === "safety") return <SafetyPage locale={locale} />;
  if (pageKey === "howItWorks") return <HowItWorksPage locale={locale} />;
  if (pageKey === "blog") return <BlogPage locale={locale} />;
  if (pageKey === "contact") return <ContactPage locale={locale} />;
  if (blogKeys.includes(pageKey)) return <BlogArticle locale={locale} pageKey={pageKey} />;
  return <LegalPage locale={locale} pageKey={pageKey} />;
}

export function PageRenderer({ pageKey, locale, variant = "localized" }: PageRendererProps) {
  const schemas = pageSchemas(pageKey, locale, variant);

  return (
    <SiteShell locale={locale} pageKey={pageKey}>
      {schemas.map((schema, index) => (
        <JsonLd key={index} data={schema} />
      ))}
      {renderPage(pageKey, locale)}
      <section className="container-page pb-16">
        <div className="card rounded-3xl p-6 text-center md:p-8">
          <h2 className="text-2xl font-black text-white">{locale === "fr" ? "Site officiel" : "Official website"}</h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            {locale === "fr"
              ? `therain.cm est le site officiel de ${BRAND_NAME}. Cette page est disponible en français et en anglais avec des URLs canoniques propres.`
              : `therain.cm is the official website of ${BRAND_NAME}. This page is available in English and French with clean canonical URLs.`}
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <CtaLink href={canonicalPath("contact", locale, variant)}>{text(ui.contactSupport, locale)}</CtaLink>
            <CtaLink href={localizedPath("home", locale)} secondary>
              {locale === "fr" ? "Accueil" : "Home"}
            </CtaLink>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
