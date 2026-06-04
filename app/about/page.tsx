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
          <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 32 }}>About Us</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: 32, color: "var(--text-2)", fontSize: 16, lineHeight: 1.8, textAlign: "center" }}>
            <div style={{ padding: "48px 32px", background: "var(--surface)", borderRadius: 12, border: "1px solid var(--border)" }}>
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: "0 auto 24px", opacity: 0.5 }}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                <path d="M12 6v6l5 2"/>
              </svg>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>Coming Soon</h2>
              <p style={{ color: "var(--text-3)", marginBottom: 24 }}>
                We're crafting our story. The About Us page is coming soon. In the meantime, learn more about what we're building on the main platform.
              </p>
              <Link href="/" style={{ display: "inline-block", paddingTop: 12, paddingBottom: 12, paddingLeft: 24, paddingRight: 24, background: "var(--purple)", color: "white", borderRadius: 8, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, textDecoration: "none", transition: "opacity 0.2s" }} onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.85"; }} onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}>
                Explore the Platform
              </Link>
            </div>
            <p style={{ fontSize: 14, color: "var(--text-3)" }}>
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
