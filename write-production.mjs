import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const write = (rel, content) => {
  const abs = path.join(root, ...rel.split("/"));
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content, "utf8");
  console.log(`✓ ${rel}`);
};

// ─── 1. LAYOUT — full SEO + OG + fonts ───────────────────────────────────────
write("app/layout.tsx", `import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

const BASE_URL = "https://your-universe-five.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Your Uni-Verse | Decision Intelligence for South African Education",
    template: "%s | Your Uni-Verse",
  },
  description:
    "South Africa's first educational decision intelligence platform. AI-powered career guidance, psychometric profiling, and institutional recruitment — from Grade 9 to graduation.",
  keywords: [
    "South Africa education platform",
    "Grade 9 subject selection",
    "career guidance South Africa",
    "decision intelligence education",
    "APS calculator",
    "university application South Africa",
    "TVET career guidance",
    "psychometric career testing",
    "school career counselling software",
    "Your Uni-Verse",
  ],
  authors: [{ name: "Lynxio Tech", url: "https://lynxio.tech" }],
  creator: "Lynxio Tech",
  publisher: "Your Uni-Verse",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: BASE_URL,
    siteName: "Your Uni-Verse",
    title: "Your Uni-Verse | Decision Intelligence for South African Education",
    description:
      "South Africa's first educational decision intelligence platform. AI-powered career guidance, psychometric profiling, and institutional recruitment — from Grade 9 to graduation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your Uni-Verse — Decision Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Uni-Verse | Decision Intelligence for South African Education",
    description:
      "South Africa's first educational decision intelligence platform. From Grade 9 to graduation.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: BASE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
        {GA_ID && (
          <>
            <Script
              src={\`https://www.googletagmanager.com/gtag/js?id=\${GA_ID}\`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{
              \`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','\${GA_ID}',{page_path:window.location.pathname});\`
            }</Script>
          </>
        )}
      </body>
    </html>
  );
}
`);

// ─── 2. FAVICON SVG ─────────────────────────────────────────────────────────
write("public/favicon.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
  <rect width="32" height="32" rx="8" fill="#03050E"/>
  <text x="16" y="22" text-anchor="middle" font-family="Georgia, serif" font-size="18" font-style="italic" fill="#3D7FFF" letter-spacing="-1">UV</text>
</svg>
`);

// ─── 3. WEBMANIFEST ─────────────────────────────────────────────────────────
write("public/site.webmanifest", JSON.stringify({
  name: "Your Uni-Verse",
  short_name: "Uni-Verse",
  description: "South Africa's first educational decision intelligence platform.",
  start_url: "/",
  display: "standalone",
  background_color: "#03050E",
  theme_color: "#3D7FFF",
  icons: [
    { src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }
  ]
}, null, 2));

// ─── 4. SITEMAP ─────────────────────────────────────────────────────────────
write("app/sitemap.ts", `import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://your-universe-five.vercel.app";
  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: \`\${base}/privacy\`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: \`\${base}/terms\`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
  ];
}
`);

// ─── 5. ROBOTS ──────────────────────────────────────────────────────────────
write("app/robots.ts", `import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: "https://your-universe-five.vercel.app/sitemap.xml",
  };
}
`);

// ─── 6. WAITLIST API ROUTE ──────────────────────────────────────────────────
write("app/api/waitlist/route.ts", `import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

interface WaitlistEntry {
  id: string;
  name: string;
  email: string;
  org: string;
  type: string;
  timestamp: string;
  ip: string;
}

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "No RESEND_API_KEY" };
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: \`Bearer \${apiKey}\`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Your Uni-Verse <noreply@youruniverse.co.za>",
      to,
      subject,
      html,
    }),
  });
  return { ok: res.ok, status: res.status };
}

function logEntry(entry: WaitlistEntry) {
  try {
    const logDir = path.join(process.cwd(), "data");
    fs.mkdirSync(logDir, { recursive: true });
    const logFile = path.join(logDir, "waitlist.json");
    const existing: WaitlistEntry[] = fs.existsSync(logFile)
      ? JSON.parse(fs.readFileSync(logFile, "utf8"))
      : [];
    existing.push(entry);
    fs.writeFileSync(logFile, JSON.stringify(existing, null, 2));
  } catch { /* non-fatal on serverless */ }
}

const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL ?? "hello@youruniverse.co.za";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, org, type } = body as Partial<WaitlistEntry>;

    if (!name?.trim() || !email?.trim() || !type?.trim()) {
      return NextResponse.json({ error: "Name, email, and type are required." }, { status: 400 });
    }
    const emailRx = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRx.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const entry: WaitlistEntry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      org: org?.trim() ?? "",
      type: type.trim(),
      timestamp: new Date().toISOString(),
      ip: req.headers.get("x-forwarded-for") ?? "unknown",
    };

    // Log to file (works locally, no-op on Vercel read-only fs)
    logEntry(entry);

    // Notify team
    await sendEmail(
      NOTIFY_EMAIL,
      \`New \${entry.type} registration: \${entry.name}\`,
      \`<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#03050E;color:#EDF2FF;border-radius:12px">
        <h2 style="color:#3D7FFF;margin:0 0 24px">New Waitlist Registration</h2>
        <table style="width:100%;border-collapse:collapse">
          <tr><td style="padding:10px 0;color:#8899BB;width:100px">Type</td><td style="color:#EDF2FF;font-weight:600">\${entry.type}</td></tr>
          <tr><td style="padding:10px 0;color:#8899BB">Name</td><td style="color:#EDF2FF">\${entry.name}</td></tr>
          <tr><td style="padding:10px 0;color:#8899BB">Email</td><td style="color:#3D7FFF">\${entry.email}</td></tr>
          <tr><td style="padding:10px 0;color:#8899BB">Organisation</td><td style="color:#EDF2FF">\${entry.org || "—"}</td></tr>
          <tr><td style="padding:10px 0;color:#8899BB">Submitted</td><td style="color:#EDF2FF">\${new Date(entry.timestamp).toLocaleString("en-ZA")}</td></tr>
        </table>
      </div>\`
    );

    // Confirm to registrant
    const isSchool = entry.type === "School";
    const isInstitution = entry.type === "Institution";
    const biz = isSchool || isInstitution;
    await sendEmail(
      entry.email,
      "You're on the list — Your Uni-Verse",
      \`<div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:40px 32px;background:#03050E;color:#EDF2FF;border-radius:12px">
        <p style="font-family:Georgia,serif;font-size:28px;font-style:italic;color:#EDF2FF;margin:0 0 8px">Your Uni-Verse</p>
        <p style="font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#3D7FFF;margin:0 0 32px">Decision Intelligence Platform</p>
        <h1 style="font-size:22px;font-weight:600;color:#EDF2FF;margin:0 0 16px">You&rsquo;re on the list, \${entry.name}.</h1>
        <p style="color:#8899BB;line-height:1.7;margin:0 0 24px">
          \${biz
            ? \`Thank you for registering as a <strong style="color:#EDF2FF">\${entry.type}</strong>. Our team will be in touch with a tailored early access proposal before we open to the general waitlist.\`
            : \`Thank you for registering. We are building South Africa's first decision intelligence platform for learners and you will be among the first to access it when we launch.\`
          }
        </p>
        <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:24px;margin-top:24px">
          <p style="color:#46557A;font-size:13px;margin:0">Questions? Reply to this email or reach us at <a href="mailto:hello@youruniverse.co.za" style="color:#3D7FFF">hello@youruniverse.co.za</a></p>
          <p style="color:#46557A;font-size:11px;margin:12px 0 0">A Lynxio Tech product &middot; Built in South Africa</p>
        </div>
      </div>\`
    );

    return NextResponse.json({ success: true, message: "Registration received." });
  } catch (err) {
    console.error("[waitlist]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
`);

// ─── 7. WAITLIST COMPONENT — real API call ──────────────────────────────────
write("components/Waitlist.tsx", `"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const TIERS = [
  { label: "Schools", desc: "Request a pilot licensing proposal for your institution", cta: "School" },
  { label: "Parents", desc: "Join the waitlist for parent dashboard access", cta: "Parent" },
  { label: "Institutions", desc: "Access predictive recruitment intelligence on request", cta: "Institution" },
  { label: "Students", desc: "Free access — register to join the waitlist", cta: "Student" },
];

export default function Waitlist() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [type, setType] = useState("School");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, org, type }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Submission failed.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const an = (d: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.65, delay: d, ease: "easeOut" as const },
  });

  return (
    <section id="waitlist" style={{ background: "var(--bg)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 800, height: 600, background: "radial-gradient(ellipse at top, rgba(61,127,255,0.10) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div className="section">
        <div className="container" ref={ref}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px 80px", alignItems: "start" }}>

            {/* Left */}
            <div>
              <motion.p {...an(0.05)} className="label" style={{ marginBottom: 20 }}>Early Access</motion.p>
              <motion.h2 {...an(0.15)} className="display-2" style={{ marginBottom: 28 }}>
                Be part of{" "}
                <span className="text-italic">the infrastructure</span>
                <br />
                shaping Africa&apos;s future.
              </motion.h2>
              <motion.p {...an(0.25)} className="body-lg" style={{ marginBottom: 48 }}>
                We are in pre-launch. Schools, parents, universities, and learners can register now to secure priority access and shape the platform from day one.
              </motion.p>

              <motion.div {...an(0.35)} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {TIERS.map((t) => (
                  <div key={t.label} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <div className="check-yes" style={{ marginTop: 2, flexShrink: 0 }}>
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="2 6 5 9 10 3"/></svg>
                    </div>
                    <div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: 14, color: "var(--text-1)", marginBottom: 3 }}>{t.label}</p>
                      <p style={{ fontSize: 13, color: "var(--text-3)" }}>{t.desc}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right: Form */}
            <motion.div {...an(0.2)}>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="card"
                  style={{ padding: "56px 40px", textAlign: "center" }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
                    style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--blue-dim)", border: "1px solid var(--border-blue)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--blue)" }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </motion.div>
                  <h3 className="h3" style={{ marginBottom: 12 }}>You&apos;re on the list.</h3>
                  <p className="body" style={{ maxWidth: 300, margin: "0 auto" }}>
                    A confirmation is on its way to <strong style={{ color: "var(--blue)" }}>{email}</strong>. Welcome to the ecosystem.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card" style={{ padding: "40px" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text-1)", marginBottom: 28 }}>Request access</p>

                  <div style={{ marginBottom: 20 }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 10 }}>I am a</p>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                      {TIERS.map((t) => (
                        <button
                          key={t.cta}
                          type="button"
                          onClick={() => setType(t.cta)}
                          style={{
                            padding: "10px 14px",
                            borderRadius: "var(--radius-md)",
                            border: type === t.cta ? "1px solid var(--border-blue)" : "1px solid var(--border)",
                            background: type === t.cta ? "var(--blue-dim)" : "var(--surface-2)",
                            color: type === t.cta ? "var(--blue)" : "var(--text-3)",
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.15s",
                          }}
                        >
                          {t.cta}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <input
                      type="text"
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                      required
                    />
                    {type !== "Student" && (
                      <input
                        type="text"
                        placeholder={
                          type === "School" ? "School name"
                          : type === "Parent" ? "Child's school (optional)"
                          : "Institution name"
                        }
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                        className="input"
                      />
                    )}

                    {error && (
                      <p style={{ fontSize: 13, color: "#F87171", background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", padding: "10px 14px", borderRadius: "var(--radius-md)" }}>
                        {error}
                      </p>
                    )}

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "100%", justifyContent: "center", padding: "15px", fontSize: 15, marginTop: 4, opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}
                      disabled={loading}
                    >
                      {loading ? (
                        <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                          Submitting...
                        </span>
                      ) : "Request Early Access"}
                    </button>
                    <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-3)" }}>
                      No spam. Unsubscribe any time. Made in South Africa.
                    </p>
                  </div>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
`);

// ─── 8. PRIVACY PAGE ────────────────────────────────────────────────────────
const legalShell = (title, lastUpdated, bodyHtml) => `import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "${title}" };

export default function Page() {
  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: 100, paddingBottom: 120 }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, color: "var(--text-3)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, marginBottom: 48, transition: "color 0.2s" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
          Back to home
        </Link>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 16 }}>Legal</p>
        <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--text-1)", marginBottom: 12 }}>${title}</h1>
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "var(--text-3)", marginBottom: 56 }}>Last updated: ${lastUpdated}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 40, color: "var(--text-2)", fontSize: 15, lineHeight: 1.8 }}>
${bodyHtml}
        </div>
      </div>
    </div>
  );
}
`;

const privacySections = `          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>1. Who we are</h2>
            <p>Your Uni-Verse is operated by Lynxio Tech (Pty) Ltd, a South African technology company. We build decision intelligence tools for the education sector. References to &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo; in this policy refer to Lynxio Tech (Pty) Ltd.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>2. Information we collect</h2>
            <p>When you register for early access we collect your name, email address, and organisation name (optional). We collect this information solely to manage early access communications and to understand the composition of our prospective user base.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>3. How we use your information</h2>
            <p>Your information is used to send you registration confirmations, early access updates, and launch announcements related to Your Uni-Verse. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>4. Data retention</h2>
            <p>We retain your registration data until you request deletion or until we determine the information is no longer necessary for the purpose it was collected. You may request deletion at any time by emailing us at the address below.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>5. POPIA compliance</h2>
            <p>We process personal information in accordance with the Protection of Personal Information Act 4 of 2013 (POPIA). You have the right to access, correct, and request deletion of your personal information at any time. To exercise these rights, contact us at <a href="mailto:privacy@youruniverse.co.za" style={{ color: "var(--blue)" }}>privacy@youruniverse.co.za</a>.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>6. Cookies</h2>
            <p>This landing page uses analytics cookies (if Google Analytics is enabled) to understand how visitors interact with the site. No personal information is stored in cookies. You may disable cookies in your browser settings at any time.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>7. Contact</h2>
            <p>Questions about this policy may be directed to <a href="mailto:privacy@youruniverse.co.za" style={{ color: "var(--blue)" }}>privacy@youruniverse.co.za</a>.</p>
          </section>`;

write("app/privacy/page.tsx", legalShell("Privacy Policy", "19 May 2026", privacySections));

const termsSections = `          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>1. Acceptance</h2>
            <p>By accessing or registering on the Your Uni-Verse platform you agree to these Terms of Service. If you do not agree, please do not use the platform.</p>
          </section>
          <section>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--text-1)", marginBottom: 16 }}>2. Platform status</h2>
            <p>Your Uni-Verse is currently in pre-launch. Features, pricing, and availability are subject to change. Registration for early access does not constitute a binding commercial agreement.</p>
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
          </section>`;

write("app/terms/page.tsx", legalShell("Terms of Service", "19 May 2026", termsSections));

// ─── 9. SPINNER KEYFRAME IN GLOBALS ─────────────────────────────────────────
const cssPath = path.join(root, "app", "globals.css");
let css = fs.readFileSync(cssPath, "utf8");
if (!css.includes("@keyframes spin")) {
  css += `\n@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}\n`;
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("✓ globals.css (@keyframes spin)");
}

// ─── 10. .env.example ───────────────────────────────────────────────────────
write(".env.example", `# ─── Email (Resend) ─────────────────────────────────────
# Sign up at https://resend.com — free tier sends 3,000 emails/month
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Where waitlist notifications are sent (your team inbox)
NOTIFY_EMAIL=hello@youruniverse.co.za

# ─── Analytics ───────────────────────────────────────────
# Google Analytics 4 Measurement ID (optional)
# Leave blank to disable analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
`);

// ─── 11. FOOTER — update legal links ────────────────────────────────────────
const footerPath = path.join(root, "components", "Footer.tsx");
let footer = fs.readFileSync(footerPath, "utf8");
footer = footer
  .replace(
    `"Legal: ["Privacy Policy", "Terms of Service", "Data Protection"],`,
    `"Legal": ["Privacy Policy", "Terms of Service", "Data Protection"],`
  );
// Fix href for Privacy Policy and Terms of Service
footer = footer.replace(
  `{items.map((item) => (
                  <li key={item}>
                    <a href="#"`,
  `{items.map((item) => (
                  <li key={item}>
                    <a href={item === "Privacy Policy" ? "/privacy" : item === "Terms of Service" ? "/terms" : "#"}`
);
fs.writeFileSync(footerPath, footer, "utf8");
console.log("✓ Footer.tsx (legal links)");

console.log("\n✅ All done.");
