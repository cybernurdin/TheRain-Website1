import { LegacyPage } from "@/components/LegacyPage";
import { buildMetadata, sitePages } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = buildMetadata(sitePages.howItWorks);

export default function HowItWorksPage() {
  return <LegacyPage pageKey="howItWorks" />;
}
