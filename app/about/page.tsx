import { LegacyPage } from "@/components/LegacyPage";
import { buildMetadata, sitePages } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = buildMetadata(sitePages.about);

export default function AboutPage() {
  return <LegacyPage pageKey="about" />;
}
