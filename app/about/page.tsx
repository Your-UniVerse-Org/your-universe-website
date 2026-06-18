"use client";

import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ flex: 1, paddingTop: 120, paddingBottom: 120 }}>
        <div className="container" style={{ maxWidth: 760 }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text-3)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, marginBottom: 48, transition: "color 0.2s" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
            Back to home
          </Link>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 16 }}>Company</p>
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 24 }}>About Your-UniVerse</h1>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 17, color: "var(--text-2)", lineHeight: 1.8, marginBottom: 40, textAlign: "left" }}>
            <strong>Your-UniVerse</strong> — also known as <strong>Your Universe</strong> — is South Africa&apos;s first educational decision intelligence platform. Built by Lynxio Tech, Your Universe guides learners from Grade 9 subject selection through to university placement using AI, psychometrics, and predictive analytics.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, color: "var(--text-2)", fontSize: 16, lineHeight: 1.8 }}>
            <section style={{ padding: "40px 32px", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", textAlign: "left" }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>Design vision by Abisola</h2>
              <p style={{ color: "var(--text-2)", marginBottom: 0 }}>
                The human-centred design and creative direction behind Your-UniVerse (Your Universe) is led by <strong>Abisola</strong>. Abisola&apos;s vision shapes the platform&apos;s visual identity, user experience, and the way South African learners connect with their educational future.
              </p>
            </section>
            <section style={{ padding: "40px 32px", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)", textAlign: "center" }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>Our mission</h2>
              <p style={{ color: "var(--text-3)", marginBottom: 24 }}>
                Every South African learner deserves intelligent guidance before critical decisions are made — not after. Your Universe exists to close the Grade 9 decision gap.
              </p>
              <Link href="/platform" style={{ display: "inline-block", paddingTop: 12, paddingBottom: 12, paddingLeft: 24, paddingRight: 24, background: "var(--purple)", color: "white", borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "opacity 0.2s" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.85"; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}>
                Explore the Platform
              </Link>
            </section>
            <p style={{ fontSize: 14, color: "var(--text-3)", textAlign: "center" }}>
              For inquiries about Lynxio Tech, visit{" "}
              <a href="https://lynxiotech.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--purple)", textDecoration: "none", fontWeight: 600 }}>lynxiotech.com</a>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
