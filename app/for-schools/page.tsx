import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SchoolsHero from "@/components/SchoolsHero";
import Ecosystem from "@/components/Ecosystem";
import WhoItsFor from "@/components/WhoItsFor";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "For Schools",
  description: "How Your-UniVerse partners with schools, universities, TVET colleges, and businesses across South Africa to transform educational outcomes for every learner.",
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
