import { LegacyPage } from "@/components/LegacyPage";
import { buildMetadata, sitePages } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = buildMetadata(sitePages.articleSchool);

export default function ArticleSchoolPage() {
  return <LegacyPage pageKey="articleSchool" />;
}
