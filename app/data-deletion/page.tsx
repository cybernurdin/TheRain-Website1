import type { Metadata } from "next";
import { getLegacyPage } from "@/lib/legacy";
import { LegacyPage } from "@/components/LegacyPage";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, breadcrumbSchema } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Data Deletion Policy — TheRain",
  description:
    "Request deletion of your TheRain account data and learn what rider, driver, parent, guest, and fleet information can be deleted or retained.",
  alternates: { canonical: "https://therain.tech/data-deletion" },
  openGraph: {
    title: "Data Deletion Policy — TheRain",
    description: "Request deletion of TheRain account data for riders, drivers, and fleet users in Cameroon.",
    url: "https://therain.tech/data-deletion",
    images: [{ url: "https://therain.tech/images/bg.jpg", width: 1200, height: 630, alt: "TheRain data deletion policy" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Data Deletion Policy — TheRain",
    description: "Request deletion of your TheRain data in Cameroon.",
    images: ["https://therain.tech/images/bg.jpg"]
  }
};

export default function DataDeletionPage() {
  const page = getLegacyPage("data-deletion.html");
  return (
    <>
      <JsonLd data={organizationSchema("en")} />
      <JsonLd data={breadcrumbSchema("dataDeletion", "en", "default")} />
      <LegacyPage {...page} />
    </>
  );
}
