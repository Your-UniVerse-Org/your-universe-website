import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ paddingTop: 120, paddingBottom: 120 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text-3)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, marginBottom: 48, transition: "color 0.2s" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
          Back to home
        </Link>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 12 }}>Terms of Service</h1>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "var(--text-3)", marginBottom: 56 }}>Last updated: 19 May 2026</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 40, color: "var(--text-2)", fontSize: 15, lineHeight: 1.8 }}>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>1. Acceptance</h2>
            <p>By accessing or registering on the Your-UniVerse platform you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>2. Platform status</h2>
            <p>Your-UniVerse is currently in pre-launch. Features, pricing, and availability are subject to change. Registration for early access does not constitute a binding commercial agreement.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>3. Intellectual property</h2>
            <p>All content on this site, including design, copy, graphics, and source code, is the proprietary property of Lynxio Tech (Pty) Ltd. Reproduction or redistribution without written permission is prohibited.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>4. Limitation of liability</h2>
            <p>The platform is provided on an &ldquo;as is&rdquo; basis during pre-launch. Lynxio Tech (Pty) Ltd makes no warranties, express or implied, regarding availability, accuracy, or fitness for purpose. We are not liable for any indirect or consequential loss arising from use of the platform.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>5. Governing law</h2>
            <p>These terms are governed by the laws of the Republic of South Africa. Any disputes arising will be subject to the jurisdiction of the South African courts.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>6. Contact</h2>
            <p>Questions about these terms may be directed to <a href="mailto:legal@youruniverse.co.za" style={{ color: "var(--blue)" }}>legal@youruniverse.co.za</a>.</p>
          </section>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}
