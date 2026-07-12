import type { Metadata } from "next";
import { getLegacyPage } from "@/lib/legacy";
import { LegacyPage } from "@/components/LegacyPage";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, breadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Contact TheRain — Get in Touch | Bamenda, Cameroon",
  description:
    "Contact TheRain support team in Cameroon. Call, email, or visit us in Bamenda. Available 24/7 for riders, drivers, and business inquiries.",
  alternates: { canonical: "https://therain.cm/contact" },
  openGraph: {
    type: "website",
    siteName: "TheRain",
    title: "Contact TheRain — Get in Touch",
    description: "Contact TheRain in Cameroon. Available 24/7 for riders, drivers, and business inquiries.",
    url: "https://therain.cm/contact",
    images: [{ url: "https://therain.cm/images/bg.jpg", width: 1200, height: 630, alt: "TheRain Contact" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TheRain — Get in Touch",
    description: "Contact TheRain in Cameroon. Available 24/7 for all inquiries.",
    images: ["https://therain.cm/images/bg.jpg"],
  },
};

export default function ContactPage() {
  const page = getLegacyPage("contact.html");
  return (
    <>
      <JsonLd data={organizationSchema("en")} />
      <JsonLd data={breadcrumbSchema("contact", "en", "default")} />
      <LegacyPage {...page} />
    </>
  );
}
