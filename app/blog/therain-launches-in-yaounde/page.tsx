import type { Metadata } from "next";
import { getLegacyPage } from "@/lib/legacy";
import { LegacyPage } from "@/components/LegacyPage";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, breadcrumbSchema, blogPostingSchema } from "@/lib/seo";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "TheRain Launches in Yaounde — Smart Transport Platform in Cameroon",
  description:
    "TheRain launches in Yaoundé with ride-hailing, delivery, school transport, and driver verification. A new chapter in transport for Cameroon's capital.",
  alternates: { canonical: "https://therain.tech/blog/therain-launches-in-yaounde" },
  openGraph: {
    title: "TheRain Launches in Yaounde — Smart Transport Platform in Cameroon",
    description:
      "TheRain launches in Yaoundé with ride-hailing, delivery, school transport, and verified driver services.",
    url: "https://therain.tech/blog/therain-launches-in-yaounde",
    type: "article",
    images: [{ url: "https://therain.tech/images/blog_yaounde.jpg", width: 1200, height: 630, alt: "TheRain transport launch in Yaounde Cameroon" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "TheRain Launches in Yaounde — Smart Transport Platform",
    description: "TheRain launches in Yaoundé with ride-hailing, delivery, and school transport services.",
    images: ["https://therain.tech/images/blog_yaounde.jpg"]
  }
};

export default function ArticleYaoundePage() {
  const page = getLegacyPage("article1.html");
  const article = blogPostingSchema("articleYaounde", "en");
  return (
    <>
      <JsonLd data={organizationSchema("en")} />
      <JsonLd data={breadcrumbSchema("articleYaounde", "en", "default")} />
      {article && <JsonLd data={article} />}
      <LegacyPage {...page} />
    </>
  );
}
