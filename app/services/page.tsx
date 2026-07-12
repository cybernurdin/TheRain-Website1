import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarClock,
  CarFront,
  CheckCircle2,
  Clock3,
  Gem,
  Headphones,
  MapPin,
  PackageCheck,
  Route,
  School,
  ShieldCheck,
  type LucideIcon
} from "lucide-react";
import { LegacyPage } from "@/components/LegacyPage";
import { brandText } from "@/components/brand-name";
import { JsonLd } from "@/components/json-ld";
import { BRAND_NAME, SITE_URL } from "@/data/site";
import { processSteps, safetyFeatures, services, text } from "@/data/content";
import { breadcrumbSchema, organizationSchema, serviceFaqSchema, servicesSchema, websiteSchema } from "@/lib/seo";
import { getLegacyPage } from "@/lib/legacy";
import { HERO_SLOT_MARKER } from "@/lib/hero-slot";
import styles from "./services.module.css";

export const dynamic = "force-static";

const pageTitle = "Transport Services in Cameroon | TheRain";
const pageDescription =
  "Explore TheRain ride-hailing, VIP rides, delivery, school transport, scheduled rides and fleet services designed for people and businesses in Cameroon.";
const pageUrl = `${SITE_URL}/services`;
const pageImage = `${SITE_URL}/images/classique.jpg`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pageUrl
  },
  openGraph: {
    type: "website",
    siteName: BRAND_NAME,
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    images: [
      {
        url: pageImage,
        width: 1200,
        height: 630,
        alt: "TheRain transport services in Cameroon"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
    images: [pageImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  }
};

type DetailCopy = {
  designedFor: string;
  benefits: string[];
  access: string;
  reliability: string;
  ctaHref: string;
  ctaLabel: string;
};

type ServiceItem = {
  id: string;
  title: string;
  summary: string;
  details: string;
  image: string;
  alt: string;
  icon: LucideIcon;
  copy: DetailCopy;
};

const serviceIcons: LucideIcon[] = [CarFront, Gem, PackageCheck, School, Building2, CalendarClock];

const serviceCopy: DetailCopy[] = [
  {
    designedFor: "Riders who need practical transport for daily movement, errands, appointments, and local trips.",
    benefits: ["Everyday ride option", "Verified driver onboarding", "Trip details and support access"],
    access: "Choose Classique Ride from the TheRain service flow or contact support when you need help planning a trip.",
    reliability: "Clear pickup details, driver verification, and support channels help keep everyday rides organized.",
    ctaHref: "/how-it-works",
    ctaLabel: "See how rides work"
  },
  {
    designedFor: "Professionals, visitors, event guests, and riders who want a more comfortable transport experience.",
    benefits: ["Comfort-focused rides", "Polished service expectations", "Useful for meetings, events, and airport movement"],
    access: "Request VIP Ride when the trip calls for a higher-comfort option or contact TheRain for business travel needs.",
    reliability: "VIP Ride keeps the same platform focus on verified drivers, clear communication, and support access.",
    ctaHref: "/contact",
    ctaLabel: "Ask about VIP rides"
  },
  {
    designedFor: "Individuals and businesses that need to move packages across town with practical logistics support.",
    benefits: ["Pickup and drop-off coordination", "Trackable delivery flow", "Support for delivery users"],
    access: "Start a delivery request through TheRain or speak with support about recurring delivery needs.",
    reliability: "Delivery requests rely on clear item details, handoff communication, and support channels for follow-up.",
    ctaHref: "/contact",
    ctaLabel: "Discuss delivery needs"
  },
  {
    designedFor: "Families, schools, and guardians who need structured student transport and clearer daily routines.",
    benefits: ["Verified drivers", "Structured routes", "Parent visibility", "Safer pickups", "Clear support processes"],
    access: "Schools and families can contact TheRain to discuss routes, pickup expectations, and student transport support.",
    reliability: "School Transport is built around driver verification, route structure, parent visibility, and safety-first checks.",
    ctaHref: "/contact",
    ctaLabel: "Contact TheRain for school transport"
  },
  {
    designedFor: "Businesses, schools, organizations, vehicle owners, and transport operators coordinating multiple vehicles.",
    benefits: ["Vehicle and driver coordination", "Operational support", "Compliance-aware transport processes"],
    access: "Contact TheRain with your fleet, school, or organization requirements so the operations team can review the request.",
    reliability: "Fleet Management focuses on coordination, driver management, reliability, compliance, and operational support.",
    ctaHref: "/contact",
    ctaLabel: "Plan fleet support"
  },
  {
    designedFor: "Users with appointments, school runs, airport travel, recurring routes, or time-sensitive commitments.",
    benefits: ["Plan trips ahead", "Reduce last-minute uncertainty", "Useful for recurring movement"],
    access: "Use Scheduled Rides when timing matters, or contact support when a planned trip needs extra coordination.",
    reliability: "Scheduling helps users share timing and route details earlier, giving TheRain more context for the request.",
    ctaHref: "/how-it-works",
    ctaLabel: "Learn how scheduling works"
  }
];

const capabilitySummary = [
  { label: "Driver verification", detail: "Identity and onboarding checks are part of the platform approach.", icon: ShieldCheck },
  { label: "Trip visibility", detail: "Users share route, timing, pickup, and contact details for clearer movement.", icon: MapPin },
  { label: "Support channels", detail: "Public contact routes help riders, drivers, schools, and businesses get help.", icon: Headphones }
] satisfies { label: string; detail: string; icon: LucideIcon }[];

const businessAudiences = [
  {
    title: "Businesses",
    text: "Coordinate transport requests for staff, customers, deliveries, or recurring operational movement."
  },
  {
    title: "Schools",
    text: "Discuss structured routes, safer pickups, parent visibility, and support processes for student movement."
  },
  {
    title: "Organizations",
    text: "Request transport coordination that fits programs, field activity, and planned movement needs."
  },
  {
    title: "Vehicle owners and operators",
    text: "Explore how TheRain can support driver management, service reliability, and platform operations."
  }
];

const serviceFaqs = [
  {
    question: "What services does TheRain offer?",
    answer:
      "TheRain offers Classique Ride, VIP Ride, Delivery, School Transport, Fleet Management, and Scheduled Rides for people and organizations in Cameroon."
  },
  {
    question: "How do schools or businesses request transport support?",
    answer:
      "Schools, businesses, and organizations can contact TheRain through the public contact page to discuss routes, fleet coordination, driver management, and operational support."
  },
  {
    question: "How does TheRain approach safety across services?",
    answer:
      "TheRain focuses on verified drivers, trip visibility, clear support channels, school transport checks, and platform policies."
  },
  {
    question: "Can users plan rides ahead of time?",
    answer:
      "Yes. Scheduled Rides are designed for users who need to plan transport for appointments, school runs, airport travel, and other time-sensitive commitments."
  }
];

function serviceId(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function serviceItems(): ServiceItem[] {
  return services.map((service, index) => ({
    id: serviceId(text(service.title, "en")),
    title: text(service.title, "en"),
    summary: text(service.summary, "en"),
    details: text(service.details, "en"),
    image: service.image,
    alt: text(service.alt, "en"),
    icon: serviceIcons[index],
    copy: serviceCopy[index]
  }));
}

function servicesShell() {
  const shell = getLegacyPage("index.html");
  const [beforeHero] = shell.bodyHtml.split(HERO_SLOT_MARKER);
  const footerStart = shell.bodyHtml.lastIndexOf("<footer");
  const footerHtml = footerStart >= 0 ? shell.bodyHtml.slice(footerStart) : "";
  const navHtml = beforeHero
    .replace('href="/" data-en="Home" data-fr="Accueil" class="active"', 'href="/" data-en="Home" data-fr="Accueil"')
    .replace('href="/services" data-en="Services" data-fr="Services"', 'href="/services" data-en="Services" data-fr="Services" class="active"');

  return {
    ...shell,
    bodyHtml: `${navHtml}${HERO_SLOT_MARKER}${footerHtml}`,
    heroContentHtml: ""
  };
}

function CtaLink({
  href,
  children,
  variant = "primary"
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "text";
}) {
  return (
    <Link className={`${styles.cta} ${styles[variant]}`} href={href}>
      {typeof children === "string" ? brandText(children) : children}
      {variant !== "text" && <ArrowRight aria-hidden="true" size={18} strokeWidth={2} />}
    </Link>
  );
}

function SectionIntro({
  id,
  eyebrow,
  title,
  intro
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <div className={styles.sectionIntro}>
      <p className={styles.eyebrow}>{brandText(eyebrow)}</p>
      <h2 id={id}>{brandText(title)}</h2>
      <p>{brandText(intro)}</p>
    </div>
  );
}

function ServicesContent() {
  const items = serviceItems();

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{brandText("TheRain services")}</p>
          <h1>Transport services designed for everyday life and business in Cameroon</h1>
          <p className={styles.heroIntro}>
            {brandText(
              "TheRain brings ride-hailing, VIP rides, delivery, school transport, scheduled rides, and fleet services into one public transport platform built for Cameroon."
            )}
          </p>
          <div className={styles.actionRow}>
            <CtaLink href="/#download">Download the app</CtaLink>
            <CtaLink href="/contact" variant="secondary">
              Talk to TheRain
            </CtaLink>
          </div>
          <dl className={styles.capabilityList} aria-label="Service capability summary">
            {capabilitySummary.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <dt>
                    <Icon aria-hidden="true" size={20} strokeWidth={1.9} />
                    {item.label}
                  </dt>
                  <dd>{brandText(item.detail)}</dd>
                </div>
              );
            })}
          </dl>
        </div>
        <div className={styles.heroMedia}>
          <Image
            src="/images/classique.jpg"
            alt="TheRain Classique Ride vehicle for daily trips in Cameroon"
            width={960}
            height={720}
            sizes="(max-width: 900px) 100vw, 46vw"
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroNote}>
            <ShieldCheck aria-hidden="true" size={20} strokeWidth={1.9} />
            <p>{brandText("Verified drivers, trip visibility, and clear support channels guide TheRain services.")}</p>
          </div>
        </div>
      </section>

      <section className={styles.overviewSection} aria-labelledby="services-overview">
        <SectionIntro
          id="services-overview"
          eyebrow="Service overview"
          title="Choose the service that fits the trip"
          intro="Each service is shaped around a practical transport need, from daily rides to school routes and business mobility."
        />
        <div className={styles.overviewGrid}>
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <article key={item.id} className={`${styles.overviewCard} ${index < 2 ? styles.overviewFeatured : ""}`}>
                <div className={styles.overviewImage}>
                  <Image src={item.image} alt={item.alt} width={640} height={420} sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className={styles.overviewBody}>
                  <div className={styles.cardTitle}>
                    <Icon aria-hidden="true" size={22} strokeWidth={1.9} />
                    <h3>{brandText(item.title)}</h3>
                  </div>
                  <p>{brandText(item.summary)}</p>
                  <Link className={styles.learnLink} href={`#${item.id}`}>
                    Learn more <ArrowRight aria-hidden="true" size={16} strokeWidth={2} />
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className={styles.detailsWrap} aria-labelledby="service-details">
        <SectionIntro
          id="service-details"
          eyebrow="Detailed services"
          title="Built for riders, families, schools, businesses, and operators"
          intro="TheRain services share the same platform foundations: verified drivers, clearer trip information, support access, and practical coordination."
        />
        <div className={styles.detailList}>
          {items.map((item, index) => {
            const Icon = item.icon;
            const isSchoolTransport = item.id === "school-transport";

            return (
              <section
                className={`${styles.detailSection} ${index % 2 === 1 ? styles.detailReverse : ""} ${
                  isSchoolTransport ? styles.schoolDetail : ""
                }`}
                id={item.id}
                key={item.id}
              >
                <div className={styles.detailMedia}>
                  <Image src={item.image} alt={item.alt} width={860} height={640} sizes="(max-width: 900px) 100vw, 42vw" />
                </div>
                <div className={styles.detailContent}>
                  <p className={styles.detailKicker}>
                    <Icon aria-hidden="true" size={20} strokeWidth={1.9} />
                    Service 0{index + 1}
                  </p>
                  <h2>{brandText(item.title)}</h2>
                  <p>{brandText(item.details)}</p>
                  <div className={styles.detailFacts}>
                    <div>
                      <h3>Designed for</h3>
                      <p>{brandText(item.copy.designedFor)}</p>
                    </div>
                    <div>
                      <h3>How users access it</h3>
                      <p>{brandText(item.copy.access)}</p>
                    </div>
                    <div>
                      <h3>Reliability focus</h3>
                      <p>{brandText(item.copy.reliability)}</p>
                    </div>
                  </div>
                  <ul className={styles.checkList}>
                    {item.copy.benefits.map((benefit) => (
                      <li key={benefit}>
                        <CheckCircle2 aria-hidden="true" size={18} strokeWidth={2} />
                        {brandText(benefit)}
                      </li>
                    ))}
                  </ul>
                  {isSchoolTransport && (
                    <div className={styles.trustPanel}>
                      <h3>School transport trust checks</h3>
                      <p>
                        {brandText(
                          "For schools and families, TheRain emphasizes verified drivers, structured routes, parent visibility, safer pickups, and clear support processes."
                        )}
                      </p>
                    </div>
                  )}
                  <CtaLink href={item.copy.ctaHref} variant="text">
                    {item.copy.ctaLabel}
                  </CtaLink>
                </div>
              </section>
            );
          })}
        </div>
      </section>

      <section className={styles.businessSection} id="business-transport">
        <div className={styles.businessHeader}>
          <p className={styles.eyebrow}>Fleet and business transport</p>
          <h2>Operational transport support for organizations</h2>
          <p>
            {brandText(
              "Fleet Management gives businesses, schools, organizations, vehicle owners, and transport operators a public path to discuss coordination, driver management, reliability, compliance, and operational support with TheRain."
            )}
          </p>
          <CtaLink href="/contact">Contact TheRain for enquiries</CtaLink>
        </div>
        <div className={styles.businessGrid}>
          {businessAudiences.map((item) => (
            <article key={item.title}>
              <Building2 aria-hidden="true" size={22} strokeWidth={1.9} />
              <h3>{item.title}</h3>
              <p>{brandText(item.text)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.safetySection} aria-labelledby="safety-and-support">
        <SectionIntro
          id="safety-and-support"
          eyebrow="Safety and support"
          title="Safety principles across TheRain services"
          intro="TheRain keeps safety visible in the transport experience through verification, trip context, support access, school transport checks, and platform policies."
        />
        <div className={styles.safetyGrid}>
          {safetyFeatures.map((feature, index) => {
            const icons = [ShieldCheck, Route, Headphones] as const;
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <article key={text(feature.title, "en")}>
                <Icon aria-hidden="true" size={24} strokeWidth={1.9} />
                <h3>{brandText(text(feature.title, "en"))}</h3>
                <p>{brandText(text(feature.text, "en"))}</p>
              </article>
            );
          })}
        </div>
        <div className={styles.policyLinks}>
          <Link href="/#safety">View safety tools</Link>
          <Link href="/terms-of-service">Read platform policies</Link>
          <Link href="/privacy-policy">Review privacy policy</Link>
        </div>
      </section>

      <section className={styles.processSection} aria-labelledby="how-services-work">
        <SectionIntro
          id="how-services-work"
          eyebrow="How it works"
          title="A simple path from request to support"
          intro="The process is designed to keep the service choice, trip details, matching, and support flow easy to understand."
        />
        <ol className={styles.processList}>
          {processSteps.map((step, index) => (
            <li key={text(step.title, "en")}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{brandText(text(step.title, "en"))}</h3>
              <p>{brandText(text(step.text, "en"))}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.faqSection} aria-labelledby="services-faq">
        <SectionIntro
          id="services-faq"
          eyebrow="Frequently asked questions"
          title="Service questions"
          intro="Straight answers for riders, parents, schools, businesses, drivers, and operators reviewing TheRain services."
        />
        <div className={styles.faqList}>
          {serviceFaqs.map((faq) => (
            <details key={faq.question}>
              <summary>{brandText(faq.question)}</summary>
              <p>{brandText(faq.answer)}</p>
            </details>
          ))}
        </div>
      </section>

      <section className={styles.finalCta} id="download">
        <div>
          <p className={styles.eyebrow}>Ready when transport matters</p>
          <h2>Choose the next step for your transport need</h2>
          <p>
            {brandText(
              "Whether you are moving across town, coordinating school routes, becoming a driver, or planning business transport, TheRain keeps the public path clear."
            )}
          </p>
        </div>
        <div className={styles.ctaGrid}>
          <article>
            <CarFront aria-hidden="true" size={22} strokeWidth={1.9} />
            <h3>Riders and customers</h3>
            <p>Explore how rides, delivery, and scheduled transport work before you request a service.</p>
            <CtaLink href="/how-it-works" variant="text">
              Explore how it works
            </CtaLink>
          </article>
          <article>
            <Clock3 aria-hidden="true" size={22} strokeWidth={1.9} />
            <h3>Drivers</h3>
            <p>Learn about verified transport work and the service quality expected on the platform.</p>
            <CtaLink href="/#driver" variant="text">
              Become a driver
            </CtaLink>
          </article>
          <article>
            <School aria-hidden="true" size={22} strokeWidth={1.9} />
            <h3>Schools or businesses</h3>
            <p>Contact TheRain to discuss school routes, fleet coordination, or organizational transport needs.</p>
            <CtaLink href="/contact" variant="text">
              Start an enquiry
            </CtaLink>
          </article>
        </div>
      </section>
    </main>
  );
}

export default function ServicesPage() {
  const shell = servicesShell();

  return (
    <>
      <JsonLd data={organizationSchema("en")} />
      <JsonLd data={websiteSchema("en")} />
      <JsonLd data={breadcrumbSchema("services", "en", "default")} />
      <JsonLd data={servicesSchema("en")} />
      <JsonLd data={serviceFaqSchema(serviceFaqs)} />
      <LegacyPage {...shell}>
        <ServicesContent />
      </LegacyPage>
    </>
  );
}
