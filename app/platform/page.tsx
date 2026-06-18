import Navbar from "@/components/Navbar";
import PlatformHero from "@/components/PlatformHero";
import Platform from "@/components/Platform";
import Journey from "@/components/Journey";
import Competitive from "@/components/Competitive";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export default function PlatformPage() {
  return (
    <>
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
