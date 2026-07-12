import type { Metadata } from "next";
import { getLegacyPage } from "@/lib/legacy";
import { LegacyPage } from "@/components/LegacyPage";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, breadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "About TheRain — Cameroon Transport Technology Platform",
  description:
    "Learn who TheRain is, why it was built in Cameroon, and how it improves trust, safety, ride-hailing, delivery, and school transport across the country.",
  alternates: { canonical: "https://therain.cm/about" },
  openGraph: {
    title: "About TheRain — Cameroon Transport Technology Platform",
    description:
      "Learn who TheRain is, why it was built in Cameroon, and how it improves trust, safety, ride-hailing, delivery, and school transport.",
    url: "https://therain.cm/about",
    images: [{ url: "https://therain.cm/images/about_car.jpg", width: 1200, height: 630, alt: "TheRain team and vehicle in Cameroon" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "About TheRain — Cameroon Transport Technology Platform",
    description: "Learn who TheRain is and how it transforms transportation in Cameroon.",
    images: ["https://therain.cm/images/about_car.jpg"]
  }
};

export default function AboutPage() {
  const page = getLegacyPage("about.html");
  return (
    <>
      <JsonLd data={organizationSchema("en")} />
      <JsonLd data={breadcrumbSchema("about", "en", "default")} />
      <LegacyPage {...page} />
    </>
  );
}
