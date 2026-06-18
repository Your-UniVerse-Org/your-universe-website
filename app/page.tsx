import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import HowItWorks from "@/components/HowItWorks";
import Ecosystem from "@/components/Ecosystem";
import Stats from "@/components/Stats";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";
import JsonLd from "@/components/seo/JsonLd";
import { BASE_URL, createPageMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: SITE_NAME,
  description:
    "Your-UniVerse — also known as Your Universe — is South Africa's #1 educational decision intelligence platform. AI career guidance from Grade 9 to graduation. Created with design vision by Abisola. Free for every student.",
  path: "/",
  keywords: [
    "your universe official",
    "your universe website",
    "your universe app",
    "Abisola",
  ],
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${BASE_URL}/#webpage`,
          url: BASE_URL,
          name: `${SITE_NAME} | Your Universe`,
          description:
            "Your Universe (Your-UniVerse) — South Africa's educational decision intelligence platform with AI career guidance, psychometrics, and APS intelligence.",
          isPartOf: { "@id": `${BASE_URL}/#website` },
          about: [
            { "@type": "Thing", name: "Your Universe" },
            { "@type": "Person", name: "Abisola", "@id": `${BASE_URL}/#abisola` },
          ],
          primaryImageOfPage: `${BASE_URL}/ORANGE%20LOGO.png`,
          inLanguage: "en-ZA",
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <HowItWorks />
        <Ecosystem />
        <Stats />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
