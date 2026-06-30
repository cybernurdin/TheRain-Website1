"use client";

import { useEffect, useRef } from "react";
import type { LegacyPageData } from "@/lib/legacy";

export function LegacyPage({ css, bodyHtml, inlineScripts }: LegacyPageData) {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;
    inlineScripts.forEach((src) => {
      const el = document.createElement("script");
      el.textContent = src;
      document.body.appendChild(el);
    });
  }, [inlineScripts]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </>
  );
}
