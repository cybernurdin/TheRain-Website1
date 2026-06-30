import type { MetadataRoute } from "next";
import { absoluteUrl, orderedPages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return orderedPages.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: page.modifiedTime ?? "2026-06-30",
    changeFrequency: page.type === "article" ? "monthly" : "weekly",
    priority: page.path === "/" ? 1 : page.type === "article" ? 0.7 : 0.8
  }));
}
