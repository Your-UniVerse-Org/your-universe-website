import { writeFileSync } from 'fs';
const A = 'C:/Users/ayand/Documents/VILATECH/your-universe/app/';

writeFileSync(A + 'for-schools/page.tsx', `import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SchoolsHero from "@/components/SchoolsHero";
import Ecosystem from "@/components/Ecosystem";
import WhoItsFor from "@/components/WhoItsFor";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "For Schools",
  description: "How Your Uni-Verse partners with schools, universities, TVET colleges, and businesses across South Africa to transform educational outcomes for every learner.",
};

export default function ForSchoolsPage() {
  return (
    <>
      <Navbar />
      <main>
        <SchoolsHero />
        <Ecosystem />
        <WhoItsFor />
        <Stats />
      </main>
      <Footer />
    </>
  );
}
`);

writeFileSync(A + 'platform/page.tsx', `import type { Metadata } from "next";
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
`);

console.log('Pages updated');
