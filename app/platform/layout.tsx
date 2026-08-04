import type { Metadata } from "next";
import { createPageMetadataFromKey } from "@/lib/seo";

export const metadata: Metadata = createPageMetadataFromKey("platform");

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return children;
}
