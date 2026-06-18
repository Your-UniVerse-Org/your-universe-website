import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Request Early Access",
  description:
    "Join the Your-UniVerse (Your Universe) waitlist. South Africa's first AI-powered educational decision intelligence platform. Free for every student, always.",
  path: "/early-access",
  keywords: ["your universe early access", "your universe waitlist", "join your universe"],
});

export default function EarlyAccessLayout({ children }: { children: React.ReactNode }) {
  return children;
}
