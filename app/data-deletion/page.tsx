import { LegacyPage } from "@/components/LegacyPage";
import { buildMetadata, sitePages } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = buildMetadata(sitePages.dataDeletion);

export default function DataDeletionPage() {
  return <LegacyPage pageKey="dataDeletion" />;
}
