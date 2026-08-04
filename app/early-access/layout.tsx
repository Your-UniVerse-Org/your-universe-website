import type { Metadata } from "next";
import { createPageMetadataFromKey } from "@/lib/seo";
import PageStructuredData from "@/components/seo/PageStructuredData";

export const metadata: Metadata = createPageMetadataFromKey("earlyAccess");

export default function EarlyAccessLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData pageKey="earlyAccess" />
      {children}
    </>
  );
}
