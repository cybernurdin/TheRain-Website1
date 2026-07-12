import type { MetadataRoute } from "next";
import { SITE_URL } from "@/data/site";

const lastModified = "2026-07-12";

const pages: MetadataRoute.Sitemap = [
  { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1.0 },
  { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.85 },
  { url: `${SITE_URL}/blog`, lastModified, changeFrequency: "weekly", priority: 0.85 },
  { url: `${SITE_URL}/how-it-works`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  { url: `${SITE_URL}/privacy-policy`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/terms-of-service`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/data-deletion`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "monthly", priority: 0.5 },
  {
    url: `${SITE_URL}/blog/therain-launches-in-yaounde`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75
  },
  {
    url: `${SITE_URL}/blog/school-transport-child-safety`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75
  },
  {
    url: `${SITE_URL}/blog/driver-earnings-tips-cameroon`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.75
  }
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages;
}
