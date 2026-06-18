import Navbar from "@/components/Navbar";
import SchoolsHero from "@/components/SchoolsHero";
import Ecosystem from "@/components/Ecosystem";
import WhoItsFor from "@/components/WhoItsFor";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";

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
