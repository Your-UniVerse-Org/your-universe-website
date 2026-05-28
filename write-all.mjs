import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const comp = path.join(root, "components");
const app = path.join(root, "app");

const write = (dir, name, content) => {
  fs.writeFileSync(path.join(dir, name), content, "utf8");
  console.log(`✓ ${name}`);
};

// ──────────────────────────────────────────────
// layout.tsx
// ──────────────────────────────────────────────
write(app, "layout.tsx", `import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Your Uni-Verse | Decision Intelligence for South African Education",
  description: "Your Uni-Verse is South Africa's first decision intelligence platform — guiding learners from Grade 9 subject selection to university placement through AI, psychometrics, and predictive analytics.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
`);

// ──────────────────────────────────────────────
// page.tsx
// ──────────────────────────────────────────────
write(app, "page.tsx", `import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Platform from "@/components/Platform";
import Journey from "@/components/Journey";
import Ecosystem from "@/components/Ecosystem";
import Competitive from "@/components/Competitive";
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
        <Platform />
        <Journey />
        <Ecosystem />
        <Competitive />
        <Stats />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
`);

// ──────────────────────────────────────────────
// Navbar
// ──────────────────────────────────────────────
write(comp, "Navbar.tsx", `"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Platform", href: "#platform" },
  { label: "For Schools", href: "#ecosystem" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={\`nav\${scrolled ? " nav-scrolled" : ""}\`}>
      <div className="container">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Wordmark */}
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "var(--text-1)", letterSpacing: "-0.01em" }}>
              Your Uni-Verse
            </span>
          </a>

          {/* Desktop links */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 40 }}>
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} style={{ fontSize: 14, color: "var(--text-3)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-1)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-3)"; }}>
                {l.label}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="#waitlist" className="btn btn-primary hide-mobile" style={{ padding: "10px 22px", fontSize: 13 }}>
              Request Access
            </a>
            {/* Mobile hamburger */}
            <button aria-label="menu" onClick={() => setOpen(!open)} style={{ color: "var(--text-2)", padding: 8 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></> : <><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></>}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }}
            style={{ background: "rgba(3,5,14,0.97)", borderTop: "1px solid var(--border)", overflow: "hidden" }}>
            <div className="container" style={{ paddingTop: 24, paddingBottom: 32, display: "flex", flexDirection: "column", gap: 24 }}>
              {LINKS.map((l) => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{ fontSize: 16, color: "var(--text-2)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500 }}>
                  {l.label}
                </a>
              ))}
              <a href="#waitlist" className="btn btn-primary" onClick={() => setOpen(false)} style={{ alignSelf: "flex-start" }}>
                Request Access
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
`);

// ──────────────────────────────────────────────
// Hero
// ──────────────────────────────────────────────
write(comp, "Hero.tsx", `"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TRUST = [
  "Grade 9 to Postgrad",
  "B2B Decision Intelligence",
  "AI + Psychometrics",
  "SA-Built · SA-Focused",
];

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", paddingTop: 100 }}>
      <div className="hero-grid" />
      <div className="hero-glow" />

      {/* Subtle orbs */}
      <div style={{ position: "absolute", top: "20%", right: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(61,127,255,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "8%", width: 200, height: 200, background: "radial-gradient(circle, rgba(240,165,0,0.05) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <motion.div style={{ y, opacity }} className="container">
        <div style={{ maxWidth: 900, paddingBottom: 80 }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" as const }}
            style={{ marginBottom: 32 }}
          >
            <span className="pill">
              <span className="pill-dot" />
              South Africa&apos;s First Educational Decision Intelligence Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" as const }}
            className="display-1"
            style={{ marginBottom: 32 }}
          >
            The decision made{" "}
            <span className="text-italic">in Grade 9</span>
            <br />
            determines{" "}
            <span className="text-gradient">everything</span>
            <br />
            that follows.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" as const }}
            className="body-lg"
            style={{ maxWidth: 600, marginBottom: 48 }}
          >
            Your Uni-Verse is the infrastructure layer connecting learners, schools,
            parents, and institutions through AI-powered career intelligence, psychometric
            analysis, and decision-grade analytics — built for the South African context.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" as const }}
            style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 72 }}
          >
            <a href="#waitlist" className="btn btn-primary" style={{ padding: "15px 32px", fontSize: 15 }}>
              Request Early Access
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="#how-it-works" className="btn btn-ghost" style={{ padding: "15px 32px", fontSize: 15 }}>
              See the Platform
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", borderTop: "1px solid var(--border)", paddingTop: 32 }}
          >
            {TRUST.map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--blue)" }} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500, color: "var(--text-3)", letterSpacing: "0.03em" }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{ position: "absolute", bottom: 48, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}
      >
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" as const }}
          style={{ width: 1, height: 32, background: "linear-gradient(to bottom, var(--blue), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
`);

// ──────────────────────────────────────────────
// Problem
// ──────────────────────────────────────────────
write(comp, "Problem.tsx", `"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROBLEMS = [
  {
    stat: "80%",
    headline: "choose subjects without guidance",
    body: "Most learners select Grade 10 subjects based on peer influence or parental intuition — not career alignment or aptitude data.",
  },
  {
    stat: "Grade 12",
    headline: "is when planning begins",
    body: "By the time most students start thinking about the future, critical subject choices are already locked in. The window has closed.",
  },
  {
    stat: "Severe",
    headline: "information asymmetry",
    body: "Schools lack personalised career intelligence infrastructure. Parents lack visibility. Institutions recruit blind. Everyone loses.",
  },
  {
    stat: "R0",
    headline: "spent on decision support",
    body: "The SA government invests billions in education but near-zero in the decision layer that determines whether that investment converts to outcomes.",
  },
];

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 28 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.7, delay: d, ease: "easeOut" as const },
});

export default function Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: "var(--bg)", position: "relative" }}>
      <div className="section">
        <div className="container" ref={ref}>

          <div style={{ maxWidth: 680, marginBottom: 72 }}>
            <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>The Problem</motion.p>
            <motion.h2 {...an(0.15, inView)} className="display-2">
              South Africa has a{" "}
              <span className="text-italic text-gradient-gold">Grade 9 decision gap.</span>
            </motion.h2>
            <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 24 }}>
              The structural failure is not in the classroom — it&apos;s in the decision layer that precedes it.
              Subject selection happens before learners have any real intelligence to act on.
            </motion.p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={p.stat}
                {...an(0.1 + i * 0.1, inView)}
                className="card"
                style={{ padding: "36px", display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontSize: "clamp(36px, 4vw, 52px)",
                  fontWeight: 400,
                  lineHeight: 1,
                  background: "linear-gradient(135deg, #FBC94A 0%, #F0A500 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {p.stat}
                </div>
                <h3 className="h3" style={{ fontSize: 16 }}>{p.headline}</h3>
                <p className="body" style={{ fontSize: 14 }}>{p.body}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...an(0.6, inView)}
            style={{
              marginTop: 64,
              padding: "40px 48px",
              background: "var(--surface)",
              border: "1px solid var(--border-blue)",
              borderRadius: "var(--radius-xl)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 24,
            }}
          >
            <div style={{ flex: 1, minWidth: 280 }}>
              <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: "var(--text-1)", lineHeight: 1.4 }}>
                &ldquo;Traditional platforms function like digital directories.
                Your Uni-Verse functions like an{" "}
                <span className="text-gradient">educational operating system.</span>&rdquo;
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Your Uni-Verse · Internal Architecture Doc
              </span>
            </div>
          </motion.div>

        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
`);

// ──────────────────────────────────────────────
// Platform
// ──────────────────────────────────────────────
write(comp, "Platform.tsx", `"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PILLARS = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
    title: "AI Recommendation Engine",
    body: "Career suitability scores, subject recommendations, APS targets, and institution matching — personalised per learner, updated continuously.",
    tag: "AI · ML · NLP",
    gold: false,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>,
    title: "Psychometric Analysis",
    body: "Behavioural pattern analysis, personality profiling, learning style detection, and motivation modelling — not a generic quiz, a real intelligence system.",
    tag: "Psychometrics · Neuroscience",
    gold: false,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
    title: "Predictive Analytics",
    body: "Risk-adjusted performance alerts, APS trajectory forecasting, academic decline detection, and evidence-based intervention triggers.",
    tag: "Forecasting · Risk · Intelligence",
    gold: false,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    title: "Gamification System",
    body: "Career exploration missions, achievement badges, skill discovery games, and behavioural reward loops — driving long-term learner engagement.",
    tag: "Engagement · Retention · Progress",
    gold: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    title: "Learner Portfolio System",
    body: "Academic and personal development portfolios that travel with the learner from Grade 9 to employment — longitudinal intelligence built over years.",
    tag: "Portfolio · Identity · Credentials",
    gold: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    title: "Application Management",
    body: "Unified application portal for universities, TVET colleges, private institutions, and skills programmes — with fit-score intelligence built in.",
    tag: "Applications · Placement · TVET",
    gold: true,
  },
];

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 28 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.7, delay: d, ease: "easeOut" as const },
});

export default function Platform() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="platform" style={{ background: "var(--surface)", position: "relative" }}>
      <div className="glow-section" style={{ top: "50%", transform: "translate(-50%, -50%)" }} />
      <div className="section">
        <div className="container" ref={ref}>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px", alignItems: "start", marginBottom: 80 }}>
            <div>
              <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>The Platform</motion.p>
              <motion.h2 {...an(0.15, inView)} className="display-2">
                Decision intelligence.
                <br />
                <span className="text-italic text-gradient">Not information.</span>
              </motion.h2>
            </div>
            <motion.div {...an(0.25, inView)} style={{ paddingTop: 16 }}>
              <p className="body-lg">
                Your Uni-Verse combines six interconnected intelligence systems into a single ecosystem — built to transform the South African education-to-career pipeline.
              </p>
            </motion.div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 1, border: "1px solid var(--border)", borderRadius: "var(--radius-xl)", overflow: "hidden" }}>
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                {...an(0.05 + i * 0.08, inView)}
                style={{
                  padding: "36px",
                  background: "var(--surface)",
                  borderBottom: i < 3 ? "1px solid var(--border)" : "none",
                  borderRight: i % 2 === 0 ? "1px solid var(--border)" : "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}
              >
                <div className={\`icon-box\${p.gold ? " icon-box-gold" : ""}\`} style={{ marginBottom: 20 }}>
                  {p.icon}
                </div>
                <h3 className="h3" style={{ marginBottom: 10, fontSize: 17 }}>{p.title}</h3>
                <p className="body" style={{ marginBottom: 16, fontSize: 14, lineHeight: 1.7 }}>{p.body}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase" }}>{p.tag}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
`);

// ──────────────────────────────────────────────
// Journey
// ──────────────────────────────────────────────
write(comp, "Journey.tsx", `"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PHASES = [
  {
    n: "01",
    phase: "Grade 9 Onboarding",
    headline: "The learner journey begins here.",
    body: "Students create accounts, complete psychometric assessments, and build their personal and academic profiles. Two minutes in — the platform already knows more about their fit than most career counsellors discover in a year.",
    tags: ["Psychometric baseline", "Profile creation", "Career exploration"],
  },
  {
    n: "02",
    phase: "Subject Selection Intelligence",
    headline: "Data-driven Grade 10 choices.",
    body: "AI systems recommend Grade 10 subjects based on career interests, aptitude, personality, academic strengths, and labour-market demand. Learners stop guessing. They start deciding.",
    tags: ["Subject mapping", "APS modelling", "Career alignment"],
  },
  {
    n: "03",
    phase: "Continuous Monitoring",
    headline: "Never lose a learner to silent decline.",
    body: "Milestone tracking, APS monitoring, performance analytics, and adaptive recommendations keep learners on course. Parents and schools receive alerts before small problems become permanent failures.",
    tags: ["Risk alerts", "APS tracking", "Parent visibility"],
  },
  {
    n: "04",
    phase: "Career Mapping",
    headline: "The future updates as the learner evolves.",
    body: "Career recommendations continuously adapt to changing behaviour, improving grades, evolving interests, and shifting labour-market conditions. No static plans. Living intelligence.",
    tags: ["Adaptive pathways", "Market demand", "Behavioural evolution"],
  },
  {
    n: "05",
    phase: "Application Management",
    headline: "Centralised institutional applications.",
    body: "Students apply to universities, TVET colleges, skills programmes, and private institutions directly through the platform — with fit-score intelligence guiding every application decision.",
    tags: ["University", "TVET", "Private colleges", "Skills programmes"],
  },
  {
    n: "06",
    phase: "Institutional Matching",
    headline: "Institutions recruit with intelligence.",
    body: "Universities and colleges access predictive learner profiles, risk-adjusted recruitment data, and student-fit analytics — replacing expensive, imprecise recruitment with data-grade precision.",
    tags: ["Predictive profiles", "Conversion intelligence", "B2B recruitment"],
  },
];

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, x: -20 },
  animate: inView ? { opacity: 1, x: 0 } : {},
  transition: { duration: 0.65, delay: d, ease: "easeOut" as const },
});

export default function Journey() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" style={{ background: "var(--bg)", position: "relative" }}>
      <div className="section">
        <div className="container" ref={ref}>

          <div style={{ maxWidth: 680, marginBottom: 80 }}>
            <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>The Learner Journey</motion.p>
            <motion.h2 {...an(0.15, inView)} className="display-2">
              From Grade 9{" "}
              <span className="text-italic">to graduation</span>
              <br />
              and beyond.
            </motion.h2>
            <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 24 }}>
              Six interconnected phases. One continuous intelligence system that grows with the learner across their entire academic lifecycle.
            </motion.p>
          </div>

          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 0 }}>
            {/* Vertical timeline line */}
            <div style={{ position: "absolute", left: 17, top: 36, bottom: 0, width: 1, background: "linear-gradient(to bottom, var(--border-blue) 0%, transparent 100%)" }} />

            {PHASES.map((p, i) => (
              <motion.div
                key={p.n}
                {...an(0.1 + i * 0.1, inView)}
                style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: "0 32px", paddingBottom: 48, position: "relative" }}
              >
                {/* Phase num circle */}
                <div className="phase-num" style={{ position: "relative", zIndex: 1 }}>{p.n}</div>

                <div style={{ paddingTop: 6 }}>
                  <p className="label-gold" style={{ marginBottom: 10 }}>{p.phase}</p>
                  <h3 className="h3" style={{ marginBottom: 14, fontSize: 20 }}>{p.headline}</h3>
                  <p className="body" style={{ marginBottom: 20, maxWidth: 640 }}>{p.body}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {p.tags.map((t) => (
                      <span key={t} style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 11,
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: "var(--text-3)",
                        background: "var(--surface)",
                        border: "1px solid var(--border)",
                        padding: "4px 10px",
                        borderRadius: 100,
                      }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
`);

// ──────────────────────────────────────────────
// Ecosystem
// ──────────────────────────────────────────────
write(comp, "Ecosystem.tsx", `"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const STAKEHOLDERS = [
  {
    title: "Students",
    subtitle: "Always free.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
    features: [
      "Psychometric career profiling",
      "AI-generated subject recommendations",
      "APS target tracking",
      "Application management",
      "Gamified learning missions",
      "Personal development portfolio",
    ],
    cta: "Students get free access",
    gold: false,
  },
  {
    title: "High Schools",
    subtitle: "B2B Licensing.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    features: [
      "Whole-school learner dashboards",
      "Grade 9 counselling infrastructure",
      "Career guidance automation",
      "At-risk learner identification",
      "Performance benchmarking",
      "Institutional analytics reports",
    ],
    cta: "Annual school licensing",
    gold: true,
  },
  {
    title: "Parents",
    subtitle: "Subscription plans.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    features: [
      "Performance monitoring dashboards",
      "Academic decline alerts",
      "Career recommendation updates",
      "APS target monitoring",
      "Institution application status",
      "Career readiness progress reports",
    ],
    cta: "Monthly parent subscription",
    gold: false,
  },
  {
    title: "Universities & TVETs",
    subtitle: "Recruitment intelligence.",
    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
    features: [
      "Risk-adjusted student leads",
      "Predictive success indicators",
      "Filtered recruitment pipelines",
      "Student-fit analytics",
      "Conversion intelligence",
      "Market-demand alignment data",
    ],
    cta: "Institutional portal access",
    gold: true,
  },
];

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 28 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.7, delay: d, ease: "easeOut" as const },
});

export default function Ecosystem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ecosystem" style={{ background: "var(--surface)", position: "relative" }}>
      <div className="section">
        <div className="container" ref={ref}>

          <div style={{ maxWidth: 680, marginBottom: 72 }}>
            <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>Multi-Sided Ecosystem</motion.p>
            <motion.h2 {...an(0.15, inView)} className="display-2">
              One platform.{" "}
              <span className="text-italic">Four stakeholders.</span>
              <br />
              Infinite intelligence.
            </motion.h2>
            <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 24 }}>
              Your Uni-Verse is B2B-first. Institutions and parents are the commercial customers.
              Students always receive free access — because equitable guidance is the mission.
            </motion.p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {STAKEHOLDERS.map((s, i) => (
              <motion.div
                key={s.title}
                {...an(0.1 + i * 0.1, inView)}
                className="card"
                style={{ padding: "36px", display: "flex", flexDirection: "column", gap: 24 }}
              >
                <div>
                  <div className={\`icon-box\${s.gold ? " icon-box-gold" : ""}\`} style={{ marginBottom: 16 }}>
                    {s.icon}
                  </div>
                  <h3 className="h3" style={{ marginBottom: 4 }}>{s.title}</h3>
                  <p className={\`label\${s.gold ? "-gold" : ""}\`}>{s.subtitle}</p>
                </div>

                <ul style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid var(--border)", paddingTop: 24 }}>
                  {s.features.map((f) => (
                    <li key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div className="check-yes" style={{ marginTop: 2, flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="2 6 5 9 10 3"/></svg>
                      </div>
                      <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: "auto" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, color: s.gold ? "var(--gold-text)" : "var(--blue)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    {s.cta}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
`);

// ──────────────────────────────────────────────
// Competitive
// ──────────────────────────────────────────────
write(comp, "Competitive.tsx", `"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ROWS = [
  { feature: "Career guidance model", them: "Static directory", us: "AI decision intelligence" },
  { feature: "Guidance timing", them: "Grade 11–12", us: "Grade 9 onward" },
  { feature: "Psychometric analysis", them: "None", us: "Full behavioural profiling" },
  { feature: "Stakeholder ecosystem", them: "Student-only", us: "Students, schools, parents, institutions" },
  { feature: "Revenue model", them: "B2C advertising", us: "B2B institutional licensing" },
  { feature: "Parent visibility", them: "None", us: "Real-time monitoring dashboard" },
  { feature: "Institutional recruitment", them: "None / generic", us: "Risk-adjusted, predictive leads" },
  { feature: "APS intelligence", them: "None", us: "Live APS tracking + forecasting" },
  { feature: "Gamification", them: "None", us: "Career missions, badges, progression" },
  { feature: "Application management", them: "Separate utility", us: "Embedded, fit-scored, unified" },
];

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 24 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.65, delay: d, ease: "easeOut" as const },
});

export default function Competitive() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: "var(--bg)", position: "relative" }}>
      <div className="section">
        <div className="container" ref={ref}>

          <div style={{ maxWidth: 680, marginBottom: 72 }}>
            <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>Competitive Position</motion.p>
            <motion.h2 {...an(0.15, inView)} className="display-2">
              Not a competitor.
              <br />
              <span className="text-italic text-gradient">A different category.</span>
            </motion.h2>
            <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 24 }}>
              Traditional South African education platforms offer information. Your Uni-Verse offers intelligence.
              That distinction separates a utility from an ecosystem.
            </motion.p>
          </div>

          <motion.div
            {...an(0.3, inView)}
            className="card"
            style={{ overflow: "hidden" }}
          >
            {/* Header row */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", padding: "16px 24px", background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase" }}>Feature</span>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase" }}>Traditional Platforms</span>
              <span className="label" style={{ letterSpacing: "0.1em" }}>Your Uni-Verse</span>
            </div>

            {ROWS.map((r, i) => (
              <motion.div
                key={r.feature}
                initial={{ opacity: 0, x: -12 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.04, ease: "easeOut" as const }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  alignItems: "center",
                  padding: "14px 24px",
                  borderBottom: i < ROWS.length - 1 ? "1px solid var(--border)" : "none",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
              >
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, color: "var(--text-2)" }}>{r.feature}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="check-no">
                    <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="3" x2="9" y2="9"/><line x1="9" y1="3" x2="3" y2="9"/></svg>
                  </div>
                  <span style={{ fontSize: 13, color: "var(--text-3)" }}>{r.them}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div className="check-yes">
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="2 6 5 9 10 3"/></svg>
                  </div>
                  <span style={{ fontSize: 13, color: "var(--text-1)", fontWeight: 500 }}>{r.us}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
`);

// ──────────────────────────────────────────────
// Stats
// ──────────────────────────────────────────────
write(comp, "Stats.tsx", `"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function useCountUp(target: number, started: boolean, decimals = 0) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!started) return;
    if (target === 0) { setN(0); return; }
    const steps = 60;
    const step = target / steps;
    let c = 0;
    const t = setInterval(() => {
      c = Math.min(c + step, target);
      setN(parseFloat(c.toFixed(decimals)));
      if (c >= target) clearInterval(t);
    }, 2000 / steps);
    return () => clearInterval(t);
  }, [started, target, decimals]);
  return n;
}

const NUMBERS = [
  { prefix: "", target: 500, suffix: "",  unit: "000+", label: "Students — Year 1 Gauteng Target", note: "Starting with Grade 9s across Gauteng public and private schools" },
  { prefix: "", target: 9,   suffix: "",  unit: " provinces", label: "National expansion by Year 3", note: "Phase 1 Gauteng → Phase 3 full national integration" },
  { prefix: "", target: 4,   suffix: "",  unit: " revenue streams", label: "Diversified commercial model", note: "Schools · Parents · Institutions · Marketplace" },
  { prefix: "", target: 0,   suffix: "R", unit: " student cost", label: "Free access for all learners", note: "Equitable guidance — commercial B2B funds free student access" },
];

function StatCard({ item, started }: { item: typeof NUMBERS[0]; started: boolean }) {
  const n = useCountUp(item.target, started);
  const isR = item.suffix === "R";
  return (
    <div className="card card-padded" style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, color: "var(--white)", marginBottom: 8 }}>
        {isR ? "R" : ""}{n.toLocaleString()}{isR ? "" : item.unit}
      </div>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 10 }}>{item.label}</p>
      <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{item.note}</p>
    </div>
  );
}

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 24 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.65, delay: d, ease: "easeOut" as const },
});

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stats" style={{ background: "var(--surface)", position: "relative" }}>
      <div className="glow-section" style={{ top: "50%", transform: "translate(-50%,-50%)" }} />
      <div className="section">
        <div className="container" ref={ref}>

          <div style={{ maxWidth: 640, marginBottom: 72 }}>
            <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>Scale & Vision</motion.p>
            <motion.h2 {...an(0.15, inView)} className="display-2">
              Built to reach every{" "}
              <span className="text-italic text-gradient">South African learner.</span>
            </motion.h2>
            <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 24 }}>
              Phase 1 launches in Gauteng. Every data point, every learner, every school, builds the intelligence infrastructure that scales nationally — then continentally.
            </motion.p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {NUMBERS.map((item) => (
              <motion.div key={item.label} {...an(0.3, inView)}>
                <StatCard item={item} started={inView} />
              </motion.div>
            ))}
          </div>

          <motion.div
            {...an(0.5, inView)}
            style={{
              marginTop: 64,
              padding: "40px 48px",
              background: "var(--surface-2)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
            }}
          >
            <p className="label" style={{ marginBottom: 16 }}>Scalability Roadmap</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>
              {[
                { phase: "Phase 1", title: "Gauteng Pilot", detail: "School licensing + parent beta" },
                { phase: "Phase 2", title: "Urban Expansion", detail: "WC, KZN, EC provinces" },
                { phase: "Phase 3", title: "National Integration", detail: "All 9 provinces + DBE alignment" },
                { phase: "Phase 4", title: "AI Optimisation", detail: "Predictive analytics scaling" },
                { phase: "Phase 5", title: "Pan-African", detail: "Cross-border placement intelligence" },
              ].map((r) => (
                <div key={r.phase}>
                  <p className="label-gold" style={{ marginBottom: 6, fontSize: 10 }}>{r.phase}</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 4 }}>{r.title}</p>
                  <p style={{ fontSize: 13, color: "var(--text-3)" }}>{r.detail}</p>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
`);

// ──────────────────────────────────────────────
// Waitlist
// ──────────────────────────────────────────────
write(comp, "Waitlist.tsx", `"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const TIERS = [
  { label: "Schools", desc: "Request a pilot licensing proposal for your institution", cta: "School" },
  { label: "Parents", desc: "Join the waitlist for parent subscription access", cta: "Parent" },
  { label: "Institutions", desc: "Access predictive recruitment intelligence on request", cta: "Institution" },
  { label: "Student", desc: "Free access — just register to join the waitlist", cta: "Student" },
];

export default function Waitlist() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [org, setOrg] = useState("");
  const [type, setType] = useState("School");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 80px", alignItems: "start" }}>

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
                  <div style={{ width: 56, height: 56, borderRadius: "50%", background: "var(--blue-dim)", border: "1px solid var(--border-blue)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "var(--blue)" }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <h3 className="h3" style={{ marginBottom: 12 }}>Request received.</h3>
                  <p className="body" style={{ maxWidth: 320, margin: "0 auto" }}>
                    We&apos;ll be in touch at <strong style={{ color: "var(--blue)" }}>{email}</strong> as we approach launch. Welcome to the ecosystem.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="card" style={{ padding: "40px" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 15, fontWeight: 600, color: "var(--text-1)", marginBottom: 28 }}>Request access</p>

                  {/* Type selector */}
                  <div style={{ marginBottom: 16 }}>
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
                    <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} className="input" required />
                    <input type="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} className="input" required />
                    {type !== "Student" && (
                      <input type="text" placeholder={type === "School" ? "School name" : type === "Parent" ? "Child's school (optional)" : "Institution name"} value={org} onChange={(e) => setOrg(e.target.value)} className="input" />
                    )}
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ width: "100%", justifyContent: "center", padding: "15px", fontSize: 15, marginTop: 4, opacity: loading ? 0.75 : 1 }}
                      disabled={loading}
                    >
                      {loading ? "Submitting..." : "Request Early Access"}
                    </button>
                    <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-3)" }}>
                      No spam. Unsubscribe any time. 🇿🇦 Made in South Africa.
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

// ──────────────────────────────────────────────
// Footer
// ──────────────────────────────────────────────
write(comp, "Footer.tsx", `"use client";

const COL: Record<string, string[]> = {
  Platform: ["How It Works", "For Schools", "For Parents", "For Institutions", "Request Access"],
  Company: ["About Us", "Plantify Tech", "Lynxio Tech", "Careers"],
  Legal: ["Privacy Policy", "Terms of Service", "Data Protection"],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 48 }}>

        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: "48px 64px", marginBottom: 64 }}>
          {/* Brand col */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "var(--white)", marginBottom: 16, letterSpacing: "-0.01em" }}>
              Your Uni-Verse
            </div>
            <p className="body" style={{ fontSize: 14, marginBottom: 24, lineHeight: 1.75 }}>
              South Africa&apos;s first educational decision intelligence platform. Guiding learners from Grade 9 to graduation and beyond.
            </p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 8 }}>A product of</p>
            <a href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--blue)", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.75"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}>
              Lynxio Tech
            </a>
          </div>

          {/* Link cols */}
          {Object.entries(COL).map(([section, items]) => (
            <div key={section}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 20 }}>{section}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a href="#"
                      style={{ fontSize: 14, color: "var(--text-3)", fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-1)"; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-3)"; }}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 28, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <p className="small">&copy; {new Date().getFullYear()} Your Uni-Verse. All rights reserved. Built in South Africa.</p>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="mailto:hello@youruniverse.co.za" style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "'Space Grotesk', sans-serif", transition: "color 0.2s" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-1)"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-3)"; }}>
              hello@youruniverse.co.za
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
`);

console.log("\nAll files written successfully.");
