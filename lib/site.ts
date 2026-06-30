import type { Metadata } from "next";

export const SITE_URL = "https://therain.tech";
export const SITE_NAME = "TheRain";
export const DEFAULT_OG_IMAGE = "/images/logo_dark.png";

export type PageKey =
  | "home"
  | "about"
  | "howItWorks"
  | "privacyPolicy"
  | "termsOfService"
  | "dataDeletion"
  | "terms"
  | "articleYaounde"
  | "articleSchool"
  | "articleDriver";

export type SitePage = {
  key: PageKey;
  sourceFile: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  image?: string;
  publishedTime?: string;
  modifiedTime?: string;
  type?: "website" | "article";
};

export const sitePages: Record<PageKey, SitePage> = {
  home: {
    key: "home",
    sourceFile: "index.html",
    path: "/",
    title: "TheRain - Ride, Delivery, and Comfort in Cameroon",
    description:
      "TheRain is Cameroon's intelligent transportation ecosystem for ride-hailing, delivery, school transport, fleet services, and safer mobility across Bamenda and Cameroon.",
    keywords: [
      "TheRain",
      "therain.tech",
      "ride hailing Cameroon",
      "transport Bamenda",
      "Cameroon riders",
      "Cameroon drivers",
      "delivery Cameroon"
    ],
    image: "/images/bg.jpg",
    type: "website"
  },
  about: {
    key: "about",
    sourceFile: "about.html",
    path: "/about",
    title: "About TheRain - Smart Mobility Built in Cameroon",
    description:
      "Learn about TheRain, the Cameroon mobility company building ride-hailing, delivery, fleet, and safer transportation services for riders, drivers, and families.",
    keywords: ["About TheRain", "Cameroon mobility company", "Bamenda transport", "TheRain team"],
    image: "/images/about_car.jpg",
    type: "website"
  },
  howItWorks: {
    key: "howItWorks",
    sourceFile: "how-it-works.html",
    path: "/how-it-works",
    title: "How TheRain Works - Book Rides and Transport Services",
    description:
      "See how TheRain helps riders book safe rides, compare pricing, download the app, and access transport services across Cameroon.",
    keywords: ["how TheRain works", "book ride Cameroon", "TheRain pricing", "TheRain app"],
    image: "/images/car1.jpg",
    type: "website"
  },
  privacyPolicy: {
    key: "privacyPolicy",
    sourceFile: "privacy-policy.html",
    path: "/privacy-policy",
    title: "Privacy Policy - TheRain",
    description:
      "Read TheRain's privacy policy for riders, drivers, parents, and fleet users, including location data, CCTV, retention, rights, and contact details.",
    keywords: ["TheRain privacy policy", "TheRain CCTV policy", "Cameroon transport privacy"],
    type: "website"
  },
  termsOfService: {
    key: "termsOfService",
    sourceFile: "terms-of-service.html",
    path: "/terms-of-service",
    title: "Terms of Service - TheRain",
    description:
      "Read TheRain's terms of service for riders, drivers, payments, safety, accounts, suspensions, and transport platform responsibilities.",
    keywords: ["TheRain terms", "TheRain driver terms", "TheRain rider terms"],
    type: "website"
  },
  dataDeletion: {
    key: "dataDeletion",
    sourceFile: "data-deletion.html",
    path: "/data-deletion",
    title: "Data Deletion Policy - TheRain",
    description:
      "Request deletion of TheRain account data and learn what rider, driver, guest, parent, and fleet information can be removed or retained.",
    keywords: ["TheRain data deletion", "delete TheRain account", "transport data rights Cameroon"],
    type: "website"
  },
  terms: {
    key: "terms",
    sourceFile: "terms.html",
    path: "/terms",
    title: "Terms and Policies - TheRain",
    description:
      "Review TheRain rider, driver, and fleet policies covering privacy, terms of service, CCTV, safety, fraud prevention, and data usage.",
    keywords: ["TheRain policies", "TheRain rider policies", "TheRain driver policies", "TheRain fleet policies"],
    type: "website"
  },
  articleYaounde: {
    key: "articleYaounde",
    sourceFile: "article1.html",
    path: "/blog/therain-launches-in-yaounde",
    title: "TheRain Launches in Yaounde - Smart Ride Platform in Cameroon",
    description:
      "TheRain launches in Yaounde with smart ride-hailing, safety tools, flexible payments, and transportation services for Cameroon.",
    keywords: ["TheRain Yaounde", "Cameroon ride platform", "smart ride hailing Cameroon"],
    image: "/images/blog_yaounde.jpg",
    publishedTime: "2026-06-01",
    modifiedTime: "2026-06-01",
    type: "article"
  },
  articleSchool: {
    key: "articleSchool",
    sourceFile: "article2.html",
    path: "/blog/school-transport-child-safety",
    title: "How TheRain School Transport Keeps Children Safe",
    description:
      "Learn how TheRain school transport uses safety checks, pickup PINs, subscriptions, and trusted drivers to protect children in Cameroon.",
    keywords: ["TheRain school transport", "child safety transport Cameroon", "school rides Cameroon"],
    image: "/images/blog_school.jpg",
    publishedTime: "2026-05-28",
    modifiedTime: "2026-05-28",
    type: "article"
  },
  articleDriver: {
    key: "articleDriver",
    sourceFile: "article3.html",
    path: "/blog/driver-earnings-tips-cameroon",
    title: "5 Tips to Maximize Earnings as a TheRain Driver",
    description:
      "Practical tips for TheRain drivers in Cameroon to earn more, improve ratings, choose routes, and use the platform effectively.",
    keywords: ["TheRain driver", "driver earnings Cameroon", "ride hailing driver tips"],
    image: "/images/blog_driver.jpg",
    publishedTime: "2026-05-20",
    modifiedTime: "2026-05-20",
    type: "article"
  }
};

export const orderedPages: SitePage[] = [
  sitePages.home,
  sitePages.about,
  sitePages.howItWorks,
  sitePages.privacyPolicy,
  sitePages.termsOfService,
  sitePages.dataDeletion,
  sitePages.terms,
  sitePages.articleYaounde,
  sitePages.articleSchool,
  sitePages.articleDriver
];

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function buildMetadata(page: SitePage): Metadata {
  const canonical = absoluteUrl(page.path);
  const image = absoluteUrl(page.image ?? DEFAULT_OG_IMAGE);

  return {
    metadataBase: new URL(SITE_URL),
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: {
      canonical
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: page.title
        }
      ],
      locale: "en_US",
      type: page.type === "article" ? "article" : "website",
      publishedTime: page.publishedTime,
      modifiedTime: page.modifiedTime
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image]
    },
    icons: {
      icon: "/images/favicon.png",
      apple: "/images/favicon.png"
    }
  };
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "TransportationService", "LocalBusiness"],
  name: SITE_NAME,
  url: SITE_URL,
  logo: absoluteUrl("/images/logo_dark.png"),
  image: absoluteUrl("/images/bg.jpg"),
  description:
    "TheRain is a Cameroon transportation technology company providing ride-hailing, delivery, school transport, fleet services, and safer mobility tools.",
  areaServed: [
    {
      "@type": "Country",
      name: "Cameroon"
    },
    {
      "@type": "City",
      name: "Bamenda"
    }
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Commercial Avenue",
    addressLocality: "Bamenda",
    addressCountry: "CM"
  },
  email: "info@therain.cm",
  telephone: ["+237676011861", "+237674321486"],
  sameAs: [
    "https://www.facebook.com/profile.php?id=61591416844183",
    "https://www.instagram.com/therain6026",
    "https://youtube.com/@therain-tech"
  ],
  serviceType: ["Ride hailing", "Delivery", "School transport", "Fleet management"]
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  }
};
