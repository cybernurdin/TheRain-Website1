import { BRAND_NAME, type Locale, type LocalizedText, type PageKey } from "./site";

export type Service = {
  title: LocalizedText;
  summary: LocalizedText;
  details: LocalizedText;
  image: string;
  alt: LocalizedText;
};

export const common = {
  official: {
    en: `therain.cm is the official website of ${BRAND_NAME}.`,
    fr: `therain.cm est le site officiel de ${BRAND_NAME}.`
  },
  factual: {
    en: `${BRAND_NAME} is a Cameroon transport technology platform offering ride-hailing, delivery, school transport, and fleet services.`,
    fr: `${BRAND_NAME} est une plateforme camerounaise de technologie de transport proposant VTC, livraison, transport scolaire et gestion de flotte.`
  },
  audience: {
    en: `${BRAND_NAME} serves riders, drivers, schools, families, businesses, and delivery users.`,
    fr: `${BRAND_NAME} sert les passagers, chauffeurs, écoles, familles, entreprises et utilisateurs de livraison.`
  }
} satisfies Record<string, LocalizedText>;

export const ui = {
  appStore: { en: "App Store", fr: "App Store" },
  googlePlay: { en: "Google Play", fr: "Google Play" },
  downloadApp: { en: "Download App", fr: "Télécharger l'application" },
  becomeDriver: { en: "Become a Driver", fr: "Devenir chauffeur" },
  exploreServices: { en: "Explore Services", fr: "Découvrir les services" },
  contactSupport: { en: "Contact Support", fr: "Contacter l'assistance" },
  readMore: { en: "Read More", fr: "Lire la suite" },
  viewBlog: { en: "View Blog", fr: "Voir le blog" },
  bookRide: { en: "Book Your Ride", fr: "Réserver un trajet" },
  learnMore: { en: "Learn More", fr: "En savoir plus" },
  submit: { en: "Send Message", fr: "Envoyer le message" },
  submitDeletion: { en: "Submit Deletion Request", fr: "Soumettre la demande de suppression" }
} satisfies Record<string, LocalizedText>;

export const services: Service[] = [
  {
    title: { en: "Classique Ride", fr: "Trajet classique" },
    summary: {
      en: "Affordable everyday rides for city travel, errands, appointments, and reliable local mobility.",
      fr: "Trajets quotidiens abordables pour la ville, les courses, les rendez-vous et la mobilité locale fiable."
    },
    details: {
      en: "Classique Ride connects riders with verified drivers for safe, practical trips across supported Cameroon cities.",
      fr: "Trajet classique met les passagers en relation avec des chauffeurs vérifiés pour des déplacements sûrs et pratiques dans les villes desservies au Cameroun."
    },
    image: "/images/classique.jpg",
    alt: { en: "TheRain Classique Ride vehicle for daily trips", fr: "Véhicule TheRain pour trajets classiques quotidiens" }
  },
  {
    title: { en: "VIP Ride", fr: "Trajet VIP" },
    summary: {
      en: "Premium rides with higher comfort, polished service, and top-rated verified drivers.",
      fr: "Trajets premium avec plus de confort, un service soigné et des chauffeurs vérifiés les mieux notés."
    },
    details: {
      en: "VIP Ride is designed for business meetings, airport movements, events, and users who want an elevated transport experience.",
      fr: "Trajet VIP est conçu pour les rendez-vous professionnels, déplacements aéroport, événements et utilisateurs recherchant une expérience supérieure."
    },
    image: "/images/vip.jpg",
    alt: { en: "Premium TheRain VIP Ride car", fr: "Voiture premium TheRain pour trajet VIP" }
  },
  {
    title: { en: "Delivery", fr: "Livraison" },
    summary: {
      en: "Fast package delivery with trackable pickups, drop-offs, and user support.",
      fr: "Livraison rapide de colis avec prises en charge, dépôts suivis et assistance utilisateur."
    },
    details: {
      en: "TheRain delivery helps individuals and businesses send items across town with practical logistics support.",
      fr: "La livraison TheRain aide les particuliers et les entreprises à envoyer des colis en ville avec un soutien logistique pratique."
    },
    image: "/images/delivery.jpg",
    alt: { en: "TheRain delivery service package handling", fr: "Service de livraison TheRain pour colis" }
  },
  {
    title: { en: "School Transport", fr: "Transport scolaire" },
    summary: {
      en: "Monitored transport for children with verified drivers, parent updates, and safety-first processes.",
      fr: "Transport surveillé pour les enfants avec chauffeurs vérifiés, notifications parents et processus axés sécurité."
    },
    details: {
      en: "School Transport gives families and schools structured routes, safer pickups, and visibility into daily student movement.",
      fr: "Le transport scolaire offre aux familles et écoles des itinéraires structurés, des prises en charge plus sûres et une visibilité quotidienne."
    },
    image: "/images/school_svc.jpg",
    alt: { en: "TheRain school transport safety service", fr: "Service de sécurité pour transport scolaire TheRain" }
  },
  {
    title: { en: "Fleet Management", fr: "Gestion de flotte" },
    summary: {
      en: "Transport operations support for businesses, schools, organizations, and vehicle owners.",
      fr: "Support des opérations de transport pour entreprises, écoles, organisations et propriétaires de véhicules."
    },
    details: {
      en: "Fleet tools help operators coordinate vehicles, drivers, performance, compliance, and service reliability.",
      fr: "Les outils de flotte aident les opérateurs à coordonner véhicules, chauffeurs, performance, conformité et fiabilité du service."
    },
    image: "/images/fleet.jpg",
    alt: { en: "TheRain fleet management vehicles", fr: "Véhicules de gestion de flotte TheRain" }
  },
  {
    title: { en: "Scheduled Rides", fr: "Trajets programmés" },
    summary: {
      en: "Plan trips ahead for school runs, appointments, airport travel, and important commitments.",
      fr: "Planifiez vos trajets pour l'école, les rendez-vous, l'aéroport et les engagements importants."
    },
    details: {
      en: "Scheduled rides reduce last-minute uncertainty for recurring transport and time-sensitive travel.",
      fr: "Les trajets programmés réduisent l'incertitude de dernière minute pour les déplacements récurrents et sensibles au temps."
    },
    image: "/images/scheduled.jpg",
    alt: { en: "Scheduled TheRain ride booking", fr: "Réservation de trajet programmé TheRain" }
  }
];

export const home = {
  heroEyebrow: { en: "Official Cameroon transport platform", fr: "Plateforme officielle de transport au Cameroun" },
  title: {
    en: "Smart rides, delivery, school transport, and fleet services in Cameroon",
    fr: "Trajets intelligents, livraison, transport scolaire et flotte au Cameroun"
  },
  intro: {
    en: `${common.factual.en} ${common.official.en} ${common.audience.en}`,
    fr: `${common.factual.fr} ${common.official.fr} ${common.audience.fr}`
  },
  stats: [
    { value: "24/7", label: { en: "support readiness", fr: "assistance disponible" } },
    { value: "5", label: { en: "core transport services", fr: "services de transport clés" } },
    { value: "CM", label: { en: "built for Cameroon", fr: "conçu pour le Cameroun" } }
  ],
  servicesTitle: { en: "Transport services built around real daily needs", fr: "Services de transport conçus pour les besoins quotidiens" },
  driverTitle: { en: "Earn with verified transport work", fr: "Gagnez avec un travail de transport vérifié" },
  driverText: {
    en: "Drivers can register with TheRain to access ride requests, delivery opportunities, safety guidance, and platform support.",
    fr: "Les chauffeurs peuvent s'inscrire avec TheRain pour accéder aux demandes de trajet, aux opportunités de livraison, aux conseils de sécurité et à l'assistance plateforme."
  },
  safetyTitle: { en: "Safety is part of the product, not an afterthought", fr: "La sécurité fait partie du produit, elle n'est pas ajoutée après coup" },
  safetyText: {
    en: "TheRain combines driver verification, trip visibility, school transport checks, emergency support, and clear policies to build trust.",
    fr: "TheRain combine vérification chauffeur, visibilité des trajets, contrôles du transport scolaire, assistance d'urgence et politiques claires pour renforcer la confiance."
  }
} satisfies Record<string, unknown>;

export const about = {
  title: { en: "About TheRain", fr: "À propos de TheRain" },
  intro: {
    en: `${BRAND_NAME} is building a safer, more organized transport technology platform for Cameroon. The platform connects riders, drivers, families, schools, delivery users, and businesses through practical mobility services.`,
    fr: `${BRAND_NAME} construit une plateforme de technologie de transport plus sûre et mieux organisée pour le Cameroun. La plateforme connecte passagers, chauffeurs, familles, écoles, utilisateurs de livraison et entreprises grâce à des services de mobilité pratiques.`
  },
  mission: {
    en: "Our mission is to make local transportation more reliable, safer, and easier to access while creating fair opportunities for verified drivers.",
    fr: "Notre mission est de rendre le transport local plus fiable, plus sûr et plus accessible, tout en créant des opportunités équitables pour les chauffeurs vérifiés."
  },
  values: [
    {
      title: { en: "Local trust", fr: "Confiance locale" },
      text: {
        en: "TheRain is designed around real mobility needs in Cameroon, including Bamenda, Yaounde, families, schools, and businesses.",
        fr: "TheRain est conçu autour des besoins réels de mobilité au Cameroun, y compris Bamenda, Yaoundé, les familles, les écoles et les entreprises."
      }
    },
    {
      title: { en: "Safety systems", fr: "Systèmes de sécurité" },
      text: {
        en: "Verification, transparent policies, school transport checks, and incident response support make safer transport a core goal.",
        fr: "La vérification, les politiques transparentes, les contrôles du transport scolaire et la réponse aux incidents font de la sécurité un objectif central."
      }
    },
    {
      title: { en: "Transport innovation", fr: "Innovation transport" },
      text: {
        en: "TheRain brings ride-hailing, delivery, school transport, and fleet coordination into one clean transport ecosystem.",
        fr: "TheRain rassemble VTC, livraison, transport scolaire et coordination de flotte dans un écosystème de transport clair."
      }
    }
  ]
};

export const processSteps = [
  {
    title: { en: "Choose a service", fr: "Choisissez un service" },
    text: {
      en: "Select a ride, delivery, school transport, fleet request, or scheduled trip based on your need.",
      fr: "Sélectionnez un trajet, une livraison, un transport scolaire, une demande de flotte ou un trajet programmé selon votre besoin."
    }
  },
  {
    title: { en: "Share trip details", fr: "Ajoutez les détails" },
    text: {
      en: "Enter pickup, destination, timing, contact details, and the service type required.",
      fr: "Indiquez la prise en charge, la destination, l'heure, les contacts et le type de service souhaité."
    }
  },
  {
    title: { en: "Get matched", fr: "Soyez mis en relation" },
    text: {
      en: "The platform helps connect requests with verified drivers or transport operations support.",
      fr: "La plateforme aide à connecter les demandes aux chauffeurs vérifiés ou au support opérationnel de transport."
    }
  },
  {
    title: { en: "Track and receive support", fr: "Suivez et recevez de l'aide" },
    text: {
      en: "Users receive practical visibility, communication, and support for safer transport outcomes.",
      fr: "Les utilisateurs bénéficient de visibilité, communication et assistance pour des déplacements plus sûrs."
    }
  }
];

export const safetyFeatures = [
  {
    title: { en: "Driver verification", fr: "Vérification chauffeur" },
    text: {
      en: "TheRain emphasizes verified driver onboarding, identity checks, and transport accountability.",
      fr: "TheRain met l'accent sur l'intégration vérifiée des chauffeurs, les contrôles d'identité et la responsabilité transport."
    }
  },
  {
    title: { en: "School transport checks", fr: "Contrôles transport scolaire" },
    text: {
      en: "Families and schools need predictable pickup, route visibility, and trusted transport processes.",
      fr: "Les familles et écoles ont besoin de prises en charge prévisibles, de visibilité d'itinéraire et de processus fiables."
    }
  },
  {
    title: { en: "Clear support channels", fr: "Canaux d'assistance clairs" },
    text: {
      en: "Contact options, safety reporting, and policy pages make support easier to find.",
      fr: "Les options de contact, le signalement de sécurité et les pages de politique rendent l'assistance plus facile à trouver."
    }
  }
];

export const driverBenefits = [
  { en: "Access transport and delivery opportunities through one platform.", fr: "Accédez aux opportunités de transport et de livraison via une seule plateforme." },
  { en: "Build trust with verification, ratings, and service quality.", fr: "Renforcez la confiance avec la vérification, les notes et la qualité de service." },
  { en: "Receive platform guidance, safety expectations, and support.", fr: "Recevez des conseils plateforme, des attentes de sécurité et de l'assistance." }
] satisfies LocalizedText[];

export const faqs = [
  {
    question: { en: "What is TheRain?", fr: "Qu'est-ce que TheRain ?" },
    answer: common.factual
  },
  {
    question: { en: "What is the official TheRain website?", fr: "Quel est le site officiel de TheRain ?" },
    answer: common.official
  },
  {
    question: { en: "Who does TheRain serve?", fr: "Qui utilise TheRain ?" },
    answer: common.audience
  },
  {
    question: { en: "Where is TheRain focused?", fr: "Où TheRain est-il actif ?" },
    answer: {
      en: "TheRain is focused on Cameroon transport needs, including Bamenda, Yaounde, schools, families, riders, drivers, and businesses.",
      fr: "TheRain se concentre sur les besoins de transport au Cameroun, notamment Bamenda, Yaoundé, les écoles, familles, passagers, chauffeurs et entreprises."
    }
  }
];

export type BlogPost = {
  key: PageKey;
  category: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  date: string;
  image: string;
  alt: LocalizedText;
  body: { heading: LocalizedText; paragraphs: LocalizedText[] }[];
};

export const blogPosts: BlogPost[] = [
  {
    key: "articleYaounde",
    category: { en: "Company News", fr: "Actualités" },
    title: {
      en: "TheRain launches in Yaounde with smart transport services",
      fr: "TheRain se lance à Yaoundé avec des services de transport intelligent"
    },
    excerpt: {
      en: "TheRain expands its Cameroon transport vision with ride-hailing, delivery, school transport, and driver verification in Yaounde.",
      fr: "TheRain développe sa vision du transport au Cameroun avec VTC, livraison, transport scolaire et vérification chauffeur à Yaoundé."
    },
    date: "2026-06-01",
    image: "/images/blog_yaounde.jpg",
    alt: { en: "Yaounde city transport announcement for TheRain", fr: "Annonce TheRain de transport à Yaoundé" },
    body: [
      {
        heading: { en: "A transport platform built for Cameroon", fr: "Une plateforme de transport conçue pour le Cameroun" },
        paragraphs: [
          {
            en: "TheRain is expanding its mission to make urban transport in Cameroon more organized, safer, and easier to access. The Yaounde launch brings the platform closer to riders, drivers, delivery users, schools, and businesses.",
            fr: "TheRain développe sa mission visant à rendre le transport urbain au Cameroun plus organisé, plus sûr et plus accessible. Le lancement à Yaoundé rapproche la plateforme des passagers, chauffeurs, utilisateurs de livraison, écoles et entreprises."
          },
          common.official
        ]
      },
      {
        heading: { en: "Services available through one ecosystem", fr: "Des services réunis dans un même écosystème" },
        paragraphs: [
          {
            en: "The platform brings together ride-hailing, delivery, school transport, fleet management, and safety support so users can choose the transport option that fits each situation.",
            fr: "La plateforme réunit VTC, livraison, transport scolaire, gestion de flotte et support sécurité afin que chaque utilisateur choisisse l'option adaptée à sa situation."
          }
        ]
      }
    ]
  },
  {
    key: "articleSchool",
    category: { en: "Safety", fr: "Sécurité" },
    title: {
      en: "How TheRain school transport helps keep children safe",
      fr: "Comment le transport scolaire TheRain aide à protéger les enfants"
    },
    excerpt: {
      en: "School transport needs predictable routines, verified drivers, parent visibility, and clear safety procedures.",
      fr: "Le transport scolaire demande des routines fiables, des chauffeurs vérifiés, une visibilité parentale et des procédures de sécurité claires."
    },
    date: "2026-05-28",
    image: "/images/blog_school.jpg",
    alt: { en: "TheRain school transport child safety", fr: "Sécurité des enfants avec le transport scolaire TheRain" },
    body: [
      {
        heading: { en: "Why school transport needs structure", fr: "Pourquoi le transport scolaire demande de la structure" },
        paragraphs: [
          {
            en: "Families need to know who is transporting their children, when pickup happens, and how to get support when something changes. TheRain school transport is designed around visibility, driver verification, and consistent procedures.",
            fr: "Les familles doivent savoir qui transporte leurs enfants, quand la prise en charge a lieu et comment obtenir de l'aide en cas de changement. Le transport scolaire TheRain est conçu autour de la visibilité, de la vérification chauffeur et de procédures cohérentes."
          }
        ]
      },
      {
        heading: { en: "Parent confidence and safer routines", fr: "Confiance des parents et routines plus sûres" },
        paragraphs: [
          {
            en: "TheRain helps schools and parents plan safer routes, communicate clearly, and reduce uncertainty around daily student movement.",
            fr: "TheRain aide les écoles et les parents à planifier des trajets plus sûrs, communiquer clairement et réduire l'incertitude autour des déplacements quotidiens des élèves."
          }
        ]
      }
    ]
  },
  {
    key: "articleDriver",
    category: { en: "Drivers", fr: "Chauffeurs" },
    title: {
      en: "5 tips to earn more as a TheRain driver in Cameroon",
      fr: "5 conseils pour mieux gagner comme chauffeur TheRain au Cameroun"
    },
    excerpt: {
      en: "Reliable service, safe driving, good timing, and strong ratings can help drivers grow on the platform.",
      fr: "Un service fiable, une conduite sûre, un bon timing et de bonnes notes peuvent aider les chauffeurs à progresser sur la plateforme."
    },
    date: "2026-05-20",
    image: "/images/blog_driver.jpg",
    alt: { en: "TheRain driver earning tips in Cameroon", fr: "Conseils de revenus pour chauffeurs TheRain au Cameroun" },
    body: [
      {
        heading: { en: "Build trust first", fr: "Construire d'abord la confiance" },
        paragraphs: [
          {
            en: "The strongest driver profiles are reliable, respectful, punctual, and safety-minded. Better service quality can support better ratings and more opportunities over time.",
            fr: "Les meilleurs profils chauffeurs sont fiables, respectueux, ponctuels et attentifs à la sécurité. Une meilleure qualité de service peut soutenir de meilleures notes et davantage d'opportunités."
          }
        ]
      },
      {
        heading: { en: "Use demand patterns wisely", fr: "Utiliser intelligemment les périodes de demande" },
        paragraphs: [
          {
            en: "Peak movement times, school runs, errands, business hours, and delivery windows can create useful earning opportunities for prepared drivers.",
            fr: "Les heures de pointe, trajets scolaires, courses, horaires professionnels et créneaux de livraison peuvent créer de bonnes opportunités pour les chauffeurs préparés."
          }
        ]
      }
    ]
  }
];

export const contactInfo = {
  location: { en: "Bamenda, Cameroon - Commercial Avenue", fr: "Bamenda, Cameroun - Commercial Avenue" },
  phones: ["+237 676 011 861", "+237 674 321 486"],
  email: "info@therain.cm",
  support: "support@therain.cm",
  hours: { en: "Support available for riders, drivers, schools, and business partners.", fr: "Assistance disponible pour passagers, chauffeurs, écoles et partenaires professionnels." }
};

export const legalSummaries = {
  terms: {
    title: { en: "Platform terms and policies", fr: "Conditions et politiques de la plateforme" },
    intro: {
      en: "These summaries help users understand the rules that support safe, respectful, and reliable use of TheRain services.",
      fr: "Ces résumés aident les utilisateurs à comprendre les règles qui soutiennent une utilisation sûre, respectueuse et fiable des services TheRain."
    },
    sections: [
      {
        title: { en: "Rider responsibilities", fr: "Responsabilités des passagers" },
        text: {
          en: "Riders should provide accurate pickup details, respect drivers, follow safety instructions, and report concerns through official support channels.",
          fr: "Les passagers doivent fournir des informations de prise en charge exactes, respecter les chauffeurs, suivre les consignes de sécurité et signaler les problèmes via les canaux officiels."
        }
      },
      {
        title: { en: "Driver responsibilities", fr: "Responsabilités des chauffeurs" },
        text: {
          en: "Drivers should maintain valid documents, provide respectful service, keep vehicles safe, and follow TheRain quality and safety expectations.",
          fr: "Les chauffeurs doivent maintenir des documents valides, offrir un service respectueux, garder leurs véhicules sûrs et suivre les attentes qualité et sécurité de TheRain."
        }
      },
      {
        title: { en: "Data and safety", fr: "Données et sécurité" },
        text: {
          en: "TheRain uses data, verification, and policies to operate the platform, improve service quality, and support transport safety.",
          fr: "TheRain utilise les données, la vérification et les politiques pour exploiter la plateforme, améliorer la qualité du service et soutenir la sécurité transport."
        }
      }
    ]
  },
  privacy: {
    title: { en: "Privacy policy", fr: "Politique de confidentialité" },
    intro: {
      en: "TheRain collects only the information needed to operate transport services, support users, improve safety, process requests, and meet legal obligations.",
      fr: "TheRain collecte uniquement les informations nécessaires pour exploiter les services de transport, assister les utilisateurs, améliorer la sécurité, traiter les demandes et respecter les obligations légales."
    }
  },
  termsOfService: {
    title: { en: "Terms of service", fr: "Conditions d'utilisation" },
    intro: {
      en: "By using TheRain services, users agree to follow platform rules for accounts, rides, deliveries, payments, safety, respectful conduct, and support.",
      fr: "En utilisant les services TheRain, les utilisateurs acceptent de suivre les règles de la plateforme concernant les comptes, trajets, livraisons, paiements, sécurité, respect et assistance."
    }
  },
  dataDeletion: {
    title: { en: "Data deletion policy", fr: "Politique de suppression des données" },
    intro: {
      en: "Users may request deletion of eligible account data. Some records may be retained for legal, safety, financial, dispute, or operational reasons.",
      fr: "Les utilisateurs peuvent demander la suppression des données de compte éligibles. Certains dossiers peuvent être conservés pour des raisons légales, de sécurité, financières, de litige ou opérationnelles."
    }
  }
};

export function text(value: LocalizedText, locale: Locale): string {
  return value[locale];
}
