import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PageStructuredData from "@/components/seo/PageStructuredData";
import { createPageMetadataFromKey } from "@/lib/seo";

export const metadata: Metadata = createPageMetadataFromKey("privacy");

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <PageStructuredData pageKey="privacy" />
      <Navbar />
      <div style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text-3)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, marginBottom: 48, transition: "color 0.2s" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
          Back to home
        </Link>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 12 }}>Privacy Policy</h1>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "var(--text-3)", marginBottom: 56 }}>Last updated: 19 May 2026</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 40, color: "var(--text-2)", fontSize: 15, lineHeight: 1.8 }}>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>1. Who we are</h2>
            <p>Your-UniVerse is operated by Lynxio Tech (Pty) Ltd, a South African technology company. We build decision intelligence tools for the education sector. References to &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo; in this policy refer to Lynxio Tech (Pty) Ltd.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>2. Information we collect</h2>
            <p>When you register for early access we collect your name, email address, and organisation name (optional). We collect this information solely to manage early access communications and to understand the composition of our prospective user base.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>3. How we use your information</h2>
            <p>Your information is used to send you registration confirmations, early access updates, and launch announcements related to Your-UniVerse. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>4. Data retention</h2>
            <p>We retain your registration data until you request deletion or until we determine the information is no longer necessary for the purpose it was collected. You may request deletion at any time by emailing us at the address below.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>5. POPIA compliance</h2>
            <p>We process personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA). You have the right to access, correct, and request deletion of your personal information at any time. To exercise these rights, contact us at <a href="mailto:privacy@youruniversehub.com" style={{ color: "var(--blue)" }}>privacy@youruniversehub.com</a>.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>6. Cookies &amp; analytics</h2>
            <p>This site uses Google Analytics (when enabled) to understand how visitors interact with Your-UniVerse. Analytics cookies collect anonymised usage data such as pages visited and session duration. No personally identifiable information is stored in analytics cookies. You may disable cookies in your browser settings at any time.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>7. Contact</h2>
            <p>Questions about this policy may be directed to <a href="mailto:privacy@youruniversehub.com" style={{ color: "var(--blue)" }}>privacy@youruniversehub.com</a>.</p>
          </section>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
