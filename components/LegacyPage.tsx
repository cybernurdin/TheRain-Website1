import type { PageKey } from "@/lib/site";
import { getLegacyPage } from "@/lib/legacy";

type LegacyPageProps = {
  pageKey: PageKey;
};

export function LegacyPage({ pageKey }: LegacyPageProps) {
  const page = getLegacyPage(pageKey);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: page.css }} />
      <div dangerouslySetInnerHTML={{ __html: page.html }} />
    </>
  );
}
