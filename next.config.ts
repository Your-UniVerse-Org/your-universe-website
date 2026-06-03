import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
