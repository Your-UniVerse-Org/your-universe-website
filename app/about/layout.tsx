import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Your-UniVerse",
  description:
    "About Your-UniVerse (Your Universe) — South Africa's educational decision intelligence platform built by Lynxio Tech with creative direction from Abisola.",
  path: "/about",
  keywords: [
    "about your universe",
    "your universe about",
    "Abisola your universe",
    "Abisola Your-UniVerse",
    "who built your universe",
  ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
