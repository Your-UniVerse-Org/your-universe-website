import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "For Schools & Institutions",
  description:
    "Your-UniVerse (Your Universe) partners with South African schools, universities, and TVET colleges. Whole-school guidance infrastructure powered by decision intelligence.",
  path: "/for-schools",
  keywords: [
    "your universe schools",
    "your universe institutions",
    "your universe universities",
  ],
});

export default function ForSchoolsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
