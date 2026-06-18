import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/seo";

const ROUTES: MetadataRoute.Sitemap = [
  { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
  { url: `${BASE_URL}/platform`, changeFrequency: "weekly", priority: 0.9 },
  { url: `${BASE_URL}/for-schools`, changeFrequency: "weekly", priority: 0.85 },
  { url: `${BASE_URL}/early-access`, changeFrequency: "weekly", priority: 0.8 },
  { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.7 },
  { url: `${BASE_URL}/careers`, changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  { url: `${BASE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((entry) => ({ ...entry, lastModified }));
}
