import Navbar from "@/components/Navbar";
import PlatformHero from "@/components/PlatformHero";
import Platform from "@/components/Platform";
import Journey from "@/components/Journey";
import Competitive from "@/components/Competitive";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { PLATFORM_FAQS } from "@/lib/seo";

export default function PlatformPage() {
  return (
    <>
      <PageStructuredData pageKey="platform" faqs={PLATFORM_FAQS} />
      <Navbar />
      <main>
        <PlatformHero />
        <Platform />
        <div id="how-it-works">
          <Journey />
        </div>
        <Competitive />
        <Features />
      </main>
      <Footer />
    </>
  );
}
