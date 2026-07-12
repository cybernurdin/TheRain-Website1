export const BRAND_NAME = "TheRain";
export const SITE_URL = "https://therain.cm";
export const DEFAULT_OG_IMAGE = "/images/bg.jpg";

export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type PageKey =
  | "home"
  | "about"
  | "services"
  | "driver"
  | "safety"
  | "howItWorks"
  | "blog"
  | "contact"
  | "terms"
  | "privacyPolicy"
  | "termsOfService"
  | "dataDeletion"
  | "articleYaounde"
  | "articleSchool"
  | "articleDriver";

export type LocalizedText = Record<Locale, string>;

export type PageMeta = {
  key: PageKey;
  path: string;
  title: LocalizedText;
  description: LocalizedText;
  keywords: string[];
  image: string;
  type: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export const pageMeta: Record<PageKey, PageMeta> = {
  home: {
    key: "home",
    path: "/",
    title: {
      en: "TheRain - Official Ride-Hailing, Delivery, and Transport Platform in Cameroon",
      fr: "TheRain - Plateforme officielle de VTC, livraison et transport au Cameroun"
    },
    description: {
      en: "TheRain is a Cameroon transport technology platform offering ride-hailing, delivery, school transport, and fleet services for riders, drivers, families, schools, and businesses.",
      fr: "TheRain est une plateforme camerounaise de technologie de transport proposant VTC, livraison, transport scolaire et gestion de flotte pour passagers, chauffeurs, familles, écoles et entreprises."
    },
    keywords: [
      "TheRain",
      "therain.cm",
      "TheRain Cameroon",
      "TheRain ride hailing",
      "TheRain delivery",
      "TheRain school transport",
      "TheRain Bamenda",
      "TheRain Yaounde"
    ],
    image: "/images/bg.jpg",
    type: "website"
  },
  about: {
    key: "about",
    path: "/about",
    title: {
      en: "About TheRain - Cameroon Mobility and Transport Technology",
      fr: "À propos de TheRain - Mobilité et technologie de transport au Cameroun"
    },
    description: {
      en: "Learn who TheRain is, why the platform was built in Cameroon, and how it improves trust, safety, ride-hailing, delivery, and school transport.",
      fr: "Découvrez TheRain, sa mission au Cameroun et sa façon d'améliorer la confiance, la sécurité, les trajets VTC, la livraison et le transport scolaire."
    },
    keywords: ["About TheRain", "Cameroon mobility", "Bamenda transport", "transport innovation Cameroon"],
    image: "/images/about_car.jpg",
    type: "website"
  },
  services: {
    key: "services",
    path: "/services",
    title: {
      en: "TheRain Services - Rides, Delivery, School Transport, and Fleet Management",
      fr: "Services TheRain - Trajets, livraison, transport scolaire et gestion de flotte"
    },
    description: {
      en: "Explore TheRain services including Classique Ride, VIP Ride, Delivery, School Transport, Fleet Management, and scheduled mobility across Cameroon.",
      fr: "Découvrez les services TheRain : Classique Ride, VIP Ride, livraison, transport scolaire, gestion de flotte et mobilité programmée au Cameroun."
    },
    keywords: ["TheRain services", "Classique Ride", "VIP Ride Cameroon", "delivery Cameroon", "school transport Cameroon"],
    image: "/images/classique.jpg",
    type: "website"
  },
  driver: {
    key: "driver",
    path: "/become-a-driver",
    title: {
      en: "Become a TheRain Driver - Driver Registration in Cameroon",
      fr: "Devenir chauffeur TheRain - Inscription chauffeur au Cameroun"
    },
    description: {
      en: "Register to drive with TheRain, earn with verified rides, access driver support, and join a safer transport platform in Cameroon.",
      fr: "Inscrivez-vous comme chauffeur TheRain, gagnez avec des trajets vérifiés, bénéficiez de l'assistance chauffeur et rejoignez une plateforme de transport plus sûre au Cameroun."
    },
    keywords: ["TheRain driver", "driver registration Cameroon", "earn as driver Cameroon", "ride hailing driver"],
    image: "/images/team_ops.jpg",
    type: "website"
  },
  safety: {
    key: "safety",
    path: "/safety-tool",
    title: {
      en: "TheRain Certify Safety Tools - Trusted Rides and Verified Transport",
      fr: "Outils de sécurité certifiée TheRain - Trajets fiables et transport vérifié"
    },
    description: {
      en: "TheRain safety tools support verified drivers, trusted rides, monitored school transport, rider protection, and incident response.",
      fr: "Les outils de sécurité TheRain soutiennent les chauffeurs vérifiés, les trajets fiables, le transport scolaire surveillé, la protection des passagers et la réponse aux incidents."
    },
    keywords: ["TheRain safety", "safe ride Cameroon", "verified drivers Cameroon", "school transport safety"],
    image: "/images/school_svc.jpg",
    type: "website"
  },
  howItWorks: {
    key: "howItWorks",
    path: "/how-it-works",
    title: {
      en: "How TheRain Works - Book Rides, Deliveries, and Transport Services",
      fr: "Comment fonctionne TheRain - Réserver trajets, livraisons et transport"
    },
    description: {
      en: "See how TheRain helps users book rides, compare services, track deliveries, schedule school transport, and access support in Cameroon.",
      fr: "Voyez comment TheRain permet de réserver des trajets, comparer les services, suivre les livraisons, programmer le transport scolaire et contacter l'assistance au Cameroun."
    },
    keywords: ["how TheRain works", "book ride Cameroon", "transport app Cameroon", "TheRain app"],
    image: "/images/car1.jpg",
    type: "website"
  },
  blog: {
    key: "blog",
    path: "/blog",
    title: {
      en: "TheRain Blog - Cameroon Transport News, Safety Tips, and Driver Guides",
      fr: "Blog TheRain - Actualités transport, sécurité et conseils chauffeurs au Cameroun"
    },
    description: {
      en: "Read TheRain updates about Cameroon mobility, safe school transport, ride-hailing launches, delivery, and driver earnings tips.",
      fr: "Lisez les actualités TheRain sur la mobilité au Cameroun, le transport scolaire sûr, les lancements VTC, la livraison et les conseils aux chauffeurs."
    },
    keywords: ["TheRain blog", "Cameroon transport news", "ride hailing tips Cameroon", "driver tips Cameroon"],
    image: "/images/blog_yaounde.jpg",
    type: "website"
  },
  contact: {
    key: "contact",
    path: "/contact",
    title: {
      en: "Contact TheRain - Support for Riders, Drivers, Schools, and Businesses",
      fr: "Contacter TheRain - Assistance passagers, chauffeurs, écoles et entreprises"
    },
    description: {
      en: "Contact TheRain support in Cameroon for ride-hailing, delivery, school transport, fleet services, partnerships, and platform help.",
      fr: "Contactez l'assistance TheRain au Cameroun pour les trajets VTC, la livraison, le transport scolaire, la flotte, les partenariats et l'aide plateforme."
    },
    keywords: ["Contact TheRain", "TheRain support", "TheRain Bamenda", "TheRain Cameroon contact"],
    image: "/images/bg.jpg",
    type: "website"
  },
  terms: {
    key: "terms",
    path: "/terms",
    title: {
      en: "TheRain Terms and Policies - Rider, Driver, Safety, and Data Rules",
      fr: "Conditions et politiques TheRain - Règles passagers, chauffeurs, sécurité et données"
    },
    description: {
      en: "Review TheRain platform policies for riders, drivers, fleet users, privacy, CCTV safety, fraud prevention, and data usage.",
      fr: "Consultez les politiques TheRain pour passagers, chauffeurs, flottes, confidentialité, sécurité CCTV, prévention de la fraude et utilisation des données."
    },
    keywords: ["TheRain policies", "TheRain terms", "TheRain rider policy", "TheRain driver policy"],
    image: "/images/logo_dark.png",
    type: "website"
  },
  privacyPolicy: {
    key: "privacyPolicy",
    path: "/privacy-policy",
    title: {
      en: "Privacy Policy - TheRain",
      fr: "Politique de confidentialité - TheRain"
    },
    description: {
      en: "Read how TheRain collects, uses, protects, and retains rider, driver, parent, guest, and fleet data for transport services in Cameroon.",
      fr: "Découvrez comment TheRain collecte, utilise, protège et conserve les données des passagers, chauffeurs, parents, invités et flottes au Cameroun."
    },
    keywords: ["TheRain privacy", "TheRain data", "transport privacy Cameroon"],
    image: "/images/logo_dark.png",
    type: "website"
  },
  termsOfService: {
    key: "termsOfService",
    path: "/terms-of-service",
    title: {
      en: "Terms of Service - TheRain",
      fr: "Conditions d'utilisation - TheRain"
    },
    description: {
      en: "Read TheRain terms for ride-hailing, delivery, school transport, driver accounts, payments, safety, support, and platform responsibilities.",
      fr: "Lisez les conditions TheRain pour VTC, livraison, transport scolaire, comptes chauffeurs, paiements, sécurité, assistance et responsabilités plateforme."
    },
    keywords: ["TheRain terms of service", "TheRain driver terms", "TheRain rider terms"],
    image: "/images/logo_dark.png",
    type: "website"
  },
  dataDeletion: {
    key: "dataDeletion",
    path: "/data-deletion",
    title: {
      en: "Data Deletion Policy - TheRain",
      fr: "Politique de suppression des données - TheRain"
    },
    description: {
      en: "Request deletion of TheRain account data and learn what rider, driver, parent, guest, and fleet information can be deleted or retained.",
      fr: "Demandez la suppression des données TheRain et découvrez quelles informations passager, chauffeur, parent, invité et flotte peuvent être supprimées ou conservées."
    },
    keywords: ["TheRain data deletion", "delete TheRain account", "data rights Cameroon"],
    image: "/images/logo_dark.png",
    type: "website"
  },
  articleYaounde: {
    key: "articleYaounde",
    path: "/blog/therain-launches-in-yaounde",
    title: {
      en: "TheRain Launches in Yaounde - Smart Transport Platform in Cameroon",
      fr: "TheRain se lance à Yaoundé - Plateforme de transport intelligent au Cameroun"
    },
    description: {
      en: "TheRain launches in Yaounde with ride-hailing, delivery, school transport, driver verification, and safer mobility services.",
      fr: "TheRain se lance à Yaoundé avec VTC, livraison, transport scolaire, vérification chauffeur et services de mobilité plus sûrs."
    },
    keywords: ["TheRain Yaounde", "ride hailing Yaounde", "transport platform Cameroon"],
    image: "/images/blog_yaounde.jpg",
    type: "article",
    publishedTime: "2026-06-01",
    modifiedTime: "2026-06-30"
  },
  articleSchool: {
    key: "articleSchool",
    path: "/blog/school-transport-child-safety",
    title: {
      en: "How TheRain School Transport Helps Keep Children Safe",
      fr: "Comment le transport scolaire TheRain aide à protéger les enfants"
    },
    description: {
      en: "Learn how TheRain school transport supports parents with verified drivers, pickup checks, route monitoring, and real-time notifications.",
      fr: "Découvrez comment le transport scolaire TheRain aide les parents avec chauffeurs vérifiés, contrôles de prise en charge, suivi d'itinéraire et notifications."
    },
    keywords: ["TheRain school transport", "child safety transport Cameroon", "school bus Cameroon"],
    image: "/images/blog_school.jpg",
    type: "article",
    publishedTime: "2026-05-28",
    modifiedTime: "2026-06-30"
  },
  articleDriver: {
    key: "articleDriver",
    path: "/blog/driver-earnings-tips-cameroon",
    title: {
      en: "5 Tips to Earn More as a TheRain Driver in Cameroon",
      fr: "5 conseils pour mieux gagner comme chauffeur TheRain au Cameroun"
    },
    description: {
      en: "Practical tips for TheRain drivers to improve ratings, choose better routes, use peak hours, and grow income on the platform.",
      fr: "Conseils pratiques pour les chauffeurs TheRain afin d'améliorer leurs notes, choisir de meilleurs trajets, utiliser les heures de pointe et augmenter leurs revenus."
    },
    keywords: ["TheRain driver earnings", "driver tips Cameroon", "ride hailing driver Cameroon"],
    image: "/images/blog_driver.jpg",
    type: "article",
    publishedTime: "2026-05-20",
    modifiedTime: "2026-06-30"
  }
};

export const orderedPageKeys: PageKey[] = [
  "home",
  "about",
  "services",
  "driver",
  "safety",
  "howItWorks",
  "blog",
  "contact",
  "terms",
  "privacyPolicy",
  "termsOfService",
  "dataDeletion",
  "articleYaounde",
  "articleSchool",
  "articleDriver"
];

export const blogKeys: PageKey[] = ["articleYaounde", "articleSchool", "articleDriver"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export function localizedPath(pageKey: PageKey, locale: Locale): string {
  const basePath = pageMeta[pageKey].path;
  if (locale === "en") return basePath === "/" ? "/en" : `/en${basePath}`;
  return basePath === "/" ? "/fr" : `/fr${basePath}`;
}

export function canonicalPath(pageKey: PageKey, locale: Locale, variant: "default" | "localized" = "localized"): string {
  if (variant === "default" && locale === "en") return pageMeta[pageKey].path;
  return localizedPath(pageKey, locale);
}

export function resolvePageKeyFromSlug(slug: string[] = []): PageKey | null {
  const path = `/${slug.join("/")}`.replace(/\/$/, "") || "/";
  return orderedPageKeys.find((key) => pageMeta[key].path === path) ?? null;
}

export const navItems: { key: PageKey; label: LocalizedText }[] = [
  { key: "home", label: { en: "Home", fr: "Accueil" } },
  { key: "services", label: { en: "Services", fr: "Services" } },
  { key: "driver", label: { en: "Drive", fr: "Chauffeurs" } },
  { key: "safety", label: { en: "Safety", fr: "Sécurité" } },
  { key: "blog", label: { en: "Blog", fr: "Blog" } },
  { key: "contact", label: { en: "Contact", fr: "Contact" } }
];

export const footerGroups = [
  {
    title: { en: "Company", fr: "Entreprise" },
    links: [
      { key: "about" as const, label: { en: "About TheRain", fr: "À propos de TheRain" } },
      { key: "blog" as const, label: { en: "Blog and News", fr: "Blog et actualités" } },
      { key: "driver" as const, label: { en: "Become a Driver", fr: "Devenir chauffeur" } },
      { key: "contact" as const, label: { en: "Contact Us", fr: "Nous contacter" } }
    ]
  },
  {
    title: { en: "Services", fr: "Services" },
    links: [
      { key: "services" as const, label: { en: "Classique Ride", fr: "Trajet classique" } },
      { key: "services" as const, label: { en: "VIP Ride", fr: "Trajet VIP" } },
      { key: "services" as const, label: { en: "Delivery", fr: "Livraison" } },
      { key: "services" as const, label: { en: "School Transport", fr: "Transport scolaire" } },
      { key: "services" as const, label: { en: "Fleet Management", fr: "Gestion de flotte" } }
    ]
  },
  {
    title: { en: "Legal", fr: "Légal" },
    links: [
      { key: "privacyPolicy" as const, label: { en: "Privacy Policy", fr: "Politique de confidentialité" } },
      { key: "termsOfService" as const, label: { en: "Terms of Service", fr: "Conditions d'utilisation" } },
      { key: "dataDeletion" as const, label: { en: "Data Deletion", fr: "Suppression des données" } },
      { key: "terms" as const, label: { en: "Terms and Policies", fr: "Conditions et politiques" } }
    ]
  }
];

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61591416844183" },
  { label: "Instagram", href: "https://www.instagram.com/therain6026" },
  { label: "YouTube", href: "https://youtube.com/@therain-tech" },
  { label: "WhatsApp", href: "https://wa.me/237676011861" }
];
