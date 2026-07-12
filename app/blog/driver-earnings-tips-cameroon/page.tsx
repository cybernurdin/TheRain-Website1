import type { Metadata } from "next";
import { getLegacyPage } from "@/lib/legacy";
import { LegacyPage } from "@/components/LegacyPage";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, breadcrumbSchema, blogPostingSchema } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "5 Tips to Earn More as a TheRain Driver in Cameroon",
  description:
    "Practical tips for TheRain drivers to improve ratings, choose better routes, use peak hours, and grow income on the platform in Cameroon.",
  alternates: { canonical: "https://therain.cm/blog/driver-earnings-tips-cameroon" },
  openGraph: {
    title: "5 Tips to Earn More as a TheRain Driver in Cameroon",
    description:
      "Practical tips for TheRain drivers to improve ratings, choose better routes, and grow income on the platform.",
    url: "https://therain.cm/blog/driver-earnings-tips-cameroon",
    type: "article",
    images: [{ url: "https://therain.cm/images/blog_driver.jpg", width: 1200, height: 630, alt: "TheRain driver earning tips in Cameroon" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "5 Tips to Earn More as a TheRain Driver in Cameroon",
    description: "Practical tips for TheRain drivers to improve ratings and grow income on the platform.",
    images: ["https://therain.cm/images/blog_driver.jpg"]
  }
};

export default function ArticleDriverPage() {
  const page = getLegacyPage("article3.html");
  const article = blogPostingSchema("articleDriver", "en");
  return (
    <>
      <JsonLd data={organizationSchema("en")} />
      <JsonLd data={breadcrumbSchema("articleDriver", "en", "default")} />
      {article && <JsonLd data={article} />}
      <LegacyPage {...page} />
    </>
  );
}
