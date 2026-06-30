import { LegacyPage } from "@/components/LegacyPage";
import { buildMetadata, sitePages } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = buildMetadata(sitePages.articleDriver);

export default function ArticleDriverPage() {
  return <LegacyPage pageKey="articleDriver" />;
}
