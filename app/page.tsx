import { LegacyPage } from "@/components/LegacyPage";
import { buildMetadata, sitePages } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = buildMetadata(sitePages.home);

export default function HomePage() {
  return <LegacyPage pageKey="home" />;
}
