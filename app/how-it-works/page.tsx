import type { Metadata } from "next";
import { getLegacyPage } from "@/lib/legacy";
import { LegacyPage } from "@/components/LegacyPage";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, breadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "How TheRain Works — Book Rides, Deliveries & School Transport in Cameroon",
  description:
    "See how TheRain lets you book rides, compare services, track deliveries, schedule school transport, and access support across Cameroon in just a few easy steps.",
  alternates: { canonical: "https://therain.cm/how-it-works" },
  openGraph: {
    title: "How TheRain Works — Book Rides, Deliveries & School Transport",
    description:
      "See how TheRain lets you book rides, track deliveries, and schedule school transport in Cameroon.",
    url: "https://therain.cm/how-it-works",
    images: [{ url: "https://therain.cm/images/car1.jpg", width: 1200, height: 630, alt: "TheRain vehicle on the road" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "How TheRain Works — Cameroon Transport Platform",
    description: "Book rides, deliveries, and school transport in Cameroon with TheRain.",
    images: ["https://therain.cm/images/car1.jpg"]
  }
};

export default function HowItWorksPage() {
  const page = getLegacyPage("how-it-works.html");
  return (
    <>
      <JsonLd data={organizationSchema("en")} />
      <JsonLd data={breadcrumbSchema("howItWorks", "en", "default")} />
      <LegacyPage {...page} />
    </>
  );
}
