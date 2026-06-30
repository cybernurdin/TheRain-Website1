import { LegacyPage } from "@/components/LegacyPage";
import { buildMetadata, sitePages } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = buildMetadata(sitePages.privacyPolicy);

export default function PrivacyPolicyPage() {
  return <LegacyPage pageKey="privacyPolicy" />;
}
