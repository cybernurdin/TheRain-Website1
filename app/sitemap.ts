import type { MetadataRoute } from "next";

const SITE_URL = "https://therain.tech";

const pages: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, lastModified: "2026-06-30", changeFrequency: "weekly", priority: 1.0 },
  { url: `${SITE_URL}/about`, lastModified: "2026-06-30", changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_URL}/contact`, lastModified: "2026-06-30", changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_URL}/blog`, lastModified: "2026-06-30", changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_URL}/how-it-works`, lastModified: "2026-06-30", changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/privacy-policy`, lastModified: "2026-06-30", changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/terms-of-service`, lastModified: "2026-06-30", changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/data-deletion`, lastModified: "2026-06-30", changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/terms`, lastModified: "2026-06-30", changeFrequency: "monthly", priority: 0.5 },
  {
    url: `${SITE_URL}/blog/therain-launches-in-yaounde`,
    lastModified: "2026-06-30",
    changeFrequency: "monthly",
    priority: 0.75
  },
  {
    url: `${SITE_URL}/blog/school-transport-child-safety`,
    lastModified: "2026-06-30",
    changeFrequency: "monthly",
    priority: 0.75
  },
  {
    url: `${SITE_URL}/blog/driver-earnings-tips-cameroon`,
    lastModified: "2026-06-30",
    changeFrequency: "monthly",
    priority: 0.75
  }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages;
}
