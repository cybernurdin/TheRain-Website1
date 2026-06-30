import type { Metadata } from "next";
import { getLegacyPage } from "@/lib/legacy";
import { LegacyPage } from "@/components/LegacyPage";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, breadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Terms and Policies — TheRain",
  description:
    "Review therain platform policies covering riders, drivers, fleet users, privacy, CCTV safety, fraud prevention, and data usage in Cameroon.",
  alternates: { canonical: "https://therain.tech/terms" },
  openGraph: {
    title: "Terms and Policies — TheRain",
    description: "Review therain policies covering riders, drivers, privacy, and data usage in Cameroon.",
    url: "https://therain.tech/terms",
    images: [{ url: "https://therain.tech/images/bg.jpg", width: 1200, height: 630, alt: "TheRain terms and policies" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms and Policies — TheRain",
    description: "Review therain policies for transport users in Cameroon.",
    images: ["https://therain.tech/images/bg.jpg"]
  }
};

export default function TermsPage() {
  const page = getLegacyPage("terms.html");
  return (
    <>
      <JsonLd data={organizationSchema("en")} />
      <JsonLd data={breadcrumbSchema("terms", "en", "default")} />
      <LegacyPage {...page} />
    </>
  );
}
