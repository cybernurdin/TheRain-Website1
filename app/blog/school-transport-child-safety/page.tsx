import type { Metadata } from "next";
import { getLegacyPage } from "@/lib/legacy";
import { LegacyPage } from "@/components/LegacyPage";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, breadcrumbSchema, blogPostingSchema } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "How TheRain School Transport Helps Keep Children Safe in Cameroon",
  description:
    "Learn how TheRain School Transport keeps children safe with verified drivers, pickup PIN checks, live parent tracking, and real-time notifications in Cameroon.",
  alternates: { canonical: "https://therain.cm/blog/school-transport-child-safety" },
  openGraph: {
    title: "How TheRain School Transport Helps Keep Children Safe",
    description:
      "TheRain School Transport supports parents with verified drivers, pickup checks, and real-time notifications for children in Cameroon.",
    url: "https://therain.cm/blog/school-transport-child-safety",
    type: "article",
    images: [{ url: "https://therain.cm/images/blog_school.jpg", width: 1200, height: 630, alt: "School transport and child safety with TheRain" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "How TheRain School Transport Helps Keep Children Safe",
    description: "TheRain School Transport with verified drivers and real-time notifications for parents in Cameroon.",
    images: ["https://therain.cm/images/blog_school.jpg"]
  }
};

export default function ArticleSchoolPage() {
  const page = getLegacyPage("article2.html");
  const article = blogPostingSchema("articleSchool", "en");
  return (
    <>
      <JsonLd data={organizationSchema("en")} />
      <JsonLd data={breadcrumbSchema("articleSchool", "en", "default")} />
      {article && <JsonLd data={article} />}
      <LegacyPage {...page} />
    </>
  );
}
