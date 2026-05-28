import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Stats from "@/components/Stats";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <Stats />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
