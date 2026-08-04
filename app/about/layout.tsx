import type { Metadata } from "next";
import { createPageMetadataFromKey } from "@/lib/seo";
import PageStructuredData from "@/components/seo/PageStructuredData";

export const metadata: Metadata = createPageMetadataFromKey("about");

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData pageKey="about" />
      {children}
    </>
  );
}
