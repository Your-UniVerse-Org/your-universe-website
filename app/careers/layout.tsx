import type { Metadata } from "next";
import { createPageMetadataFromKey } from "@/lib/seo";
import PageStructuredData from "@/components/seo/PageStructuredData";

export const metadata: Metadata = createPageMetadataFromKey("careers");

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData pageKey="careers" />
      {children}
    </>
  );
}
