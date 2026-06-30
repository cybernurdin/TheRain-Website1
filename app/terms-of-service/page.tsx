import { LegacyPage } from "@/components/LegacyPage";
import { buildMetadata, sitePages } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = buildMetadata(sitePages.termsOfService);

export default function TermsOfServicePage() {
  return <LegacyPage pageKey="termsOfService" />;
}
