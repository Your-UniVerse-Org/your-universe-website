import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Keep builds scoped to this repo (avoids picking up parent lockfiles on local/Vercel) */
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      /* Pexels — free commercial license, attribution appreciated */
      { protocol: "https", hostname: "images.pexels.com" },
      /* Unsplash — free commercial license */
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
