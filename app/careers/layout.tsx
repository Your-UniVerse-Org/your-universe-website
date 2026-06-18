import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Careers",
  description:
    "Careers at Your-UniVerse (Your Universe) and Lynxio Tech. Join the team building South Africa's educational decision intelligence platform.",
  path: "/careers",
  keywords: ["your universe careers", "your universe jobs"],
});

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
