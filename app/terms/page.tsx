import { LegacyPage } from "@/components/LegacyPage";
import { buildMetadata, sitePages } from "@/lib/site";

export const dynamic = "force-static";
export const metadata = buildMetadata(sitePages.terms);

export default function TermsPage() {
  return <LegacyPage pageKey="terms" />;
}
