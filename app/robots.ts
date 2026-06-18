import type { MetadataRoute } from "next";
import { headers } from "next/headers";

async function siteUrl(): Promise<string> {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  try {
    const h = await headers();
    const host = h.get("x-forwarded-host") ?? h.get("host");
    const proto = h.get("x-forwarded-proto") ?? "https";
    if (host) return `${proto}://${host}`;
  } catch {
    /* headers() unavailable during static generation */
  }

  return "https://your-universe-five.vercel.app";
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const base = await siteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
