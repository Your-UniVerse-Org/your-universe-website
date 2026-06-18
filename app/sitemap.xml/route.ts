import { NextRequest, NextResponse } from "next/server";

const PAGES: { path: string; changefreq: string; priority: string }[] = [
  { path: "", changefreq: "weekly", priority: "1.0" },
  { path: "/platform", changefreq: "weekly", priority: "0.9" },
  { path: "/for-schools", changefreq: "weekly", priority: "0.8" },
  { path: "/early-access", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/careers", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

function siteUrl(request: NextRequest): string {
  const configured = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  if (host) return `${proto}://${host}`;

  return "https://your-universe-five.vercel.app";
}

function xmlEscape(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET(request: NextRequest) {
  const base = siteUrl(request);
  const lastmod = new Date().toISOString();

  const urls = PAGES.map(
    ({ path, changefreq, priority }) => `  <url>
    <loc>${xmlEscape(`${base}${path}`)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  ).join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new NextResponse(body, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
