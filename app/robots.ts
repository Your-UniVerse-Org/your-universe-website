import type { MetadataRoute } from "next";

function siteUrl(): string {
  return (process.env.NEXT_PUBLIC_BASE_URL ?? "https://youruniverse.co.za").replace(/\/$/, "");
}

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
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
