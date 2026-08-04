import type { Metadata } from "next";
import { createPageMetadataFromKey } from "@/lib/seo";
import PageStructuredData from "@/components/seo/PageStructuredData";

export const metadata: Metadata = createPageMetadataFromKey("forSchools");

export default function ForSchoolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageStructuredData pageKey="forSchools" />
      {children}
    </>
  );
}
