import { LegacyPage } from "@/components/LegacyPage";
import { buildMetadata, sitePages } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = buildMetadata(sitePages.articleYaounde);

export default function ArticleYaoundePage() {
  return <LegacyPage pageKey="articleYaounde" />;
}
