import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Ecosystem from "@/components/Ecosystem";
import Stats from "@/components/Stats";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import PageStructuredData from "@/components/seo/PageStructuredData";
import SeoDiscoverySection from "@/components/seo/SeoDiscoverySection";
import { createPageMetadataFromKey, HOME_FAQS } from "@/lib/seo";

export const metadata: Metadata = createPageMetadataFromKey("home");

export default function Page() {
  return (
    <>
      <PageStructuredData pageKey="home" faqs={HOME_FAQS} />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Ecosystem />
        <Stats />
        <Waitlist />
        <SeoDiscoverySection />
      </main>
      <Footer />
    </>
  );
}
