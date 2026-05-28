import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import PlatformHero from "@/components/PlatformHero";
import Platform from "@/components/Platform";
import Journey from "@/components/Journey";
import Competitive from "@/components/Competitive";
import Features from "@/components/Features";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Platform",
  description: "Explore how Your Uni-Verse works — AI recommendation engine, psychometric analysis, predictive analytics, gamification, and more. Built exclusively for South African learners.",
};

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
