import type { Metadata, Viewport } from "next";
import { SiteInteractions } from "@/components/SiteInteractions";
import { DEFAULT_OG_IMAGE, organizationSchema, SITE_NAME, SITE_URL, websiteSchema } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "TheRain - Ride, Delivery, and Comfort in Cameroon",
    template: "%s"
  },
  description:
    "TheRain is Cameroon's intelligent transportation ecosystem for ride-hailing, delivery, school transport, fleet services, and safer mobility.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png"
  },
  openGraph: {
    siteName: SITE_NAME,
    images: [DEFAULT_OG_IMAGE]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060E1F"
};

const themeBootScript = `
try {
  var theme = localStorage.getItem('therain_theme') || 'dark';
  var lang = localStorage.getItem('therain_lang') || 'en';
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-lang', lang);
} catch (_) {
  document.documentElement.setAttribute('data-theme', 'dark');
  document.documentElement.setAttribute('data-lang', 'en');
}
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationSchema, websiteSchema])
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <SiteInteractions />
        {children}
      </body>
    </html>
  );
}
