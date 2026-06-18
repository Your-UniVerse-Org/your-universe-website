import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Platform",
  description:
    "Explore Your-UniVerse (Your Universe): AI recommendation engine, psychometric analysis, predictive analytics, and gamified career guidance built for South African learners from Grade 9.",
  path: "/platform",
  keywords: [
    "your universe platform",
    "your universe AI",
    "your universe career guidance",
  ],
});

export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return children;
}
