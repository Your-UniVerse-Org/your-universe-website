import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const comp = (n) => path.join(root, "components", n);
const write = (p, c) => { fs.writeFileSync(p, c, "utf8"); console.log(`✓ ${path.basename(p)}`); };

// ─── HERO ────────────────────────────────────────────────────────────────────
write(comp("Hero.tsx"), `"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TRUST = [
  "Grade 9 to Postgrad",
  "B2B Decision Intelligence",
  "AI + Psychometrics",
  "SA-Built · SA-Focused",
];

const WORD_VARIANTS = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

const LINE_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

function AnimWord({ children, i }: { children: React.ReactNode; i: number }) {
  return (
    <motion.span
      custom={i}
      variants={WORD_VARIANTS}
      style={{ display: "inline-block", marginRight: "0.25em", willChange: "transform" }}
    >
      {children}
    </motion.span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: 108,
        paddingBottom: 140,
      }}
    >
      <div className="hero-grid" />
      <div className="hero-glow" />

      {/* Ambient orbs */}
      <div style={{ position: "absolute", top: "18%", right: "8%", width: 320, height: 320, background: "radial-gradient(circle, rgba(61,127,255,0.07) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "22%", left: "6%", width: 220, height: 220, background: "radial-gradient(circle, rgba(240,165,0,0.05) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <motion.div style={{ y, opacity: heroOpacity, willChange: "transform" }} className="container">
        <div style={{ maxWidth: 920 }}>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: 36 }}
          >
            <span className="pill">
              <span className="pill-dot" />
              South Africa&apos;s First Educational Decision Intelligence Platform
            </span>
          </motion.div>

          {/* Headline — word-by-word stagger for Apple feel */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={LINE_VARIANTS}
            className="display-1"
            style={{ marginBottom: 36, display: "block" }}
          >
            <AnimWord i={0}>The</AnimWord>
            <AnimWord i={1}>decision</AnimWord>
            <AnimWord i={2}>made</AnimWord>
            <motion.span
              custom={3}
              variants={WORD_VARIANTS}
              style={{ display: "inline-block", fontStyle: "italic", marginRight: "0.25em", willChange: "transform" }}
            >
              in&nbsp;Grade&nbsp;9
            </motion.span>
            <br />
            <AnimWord i={5}>determines</AnimWord>
            <motion.span
              custom={6}
              variants={WORD_VARIANTS}
              className="text-gradient"
              style={{ display: "inline-block", marginRight: "0.25em", willChange: "transform" }}
            >
              everything
            </motion.span>
            <br />
            <AnimWord i={8}>that</AnimWord>
            <AnimWord i={9}>follows.</AnimWord>
          </motion.div>

          {/* Subline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="body-lg"
            style={{ maxWidth: 580, marginBottom: 52 }}
          >
            Your Uni-Verse connects learners, schools, parents, and institutions through
            AI-powered career intelligence, psychometric analysis, and decision-grade
            analytics built for the South African context.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", flexWrap: "wrap", gap: 16, marginBottom: 80 }}
          >
            <a href="#waitlist" className="btn btn-primary" style={{ padding: "15px 34px", fontSize: 15 }}>
              Request Early Access
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="#how-it-works" className="btn btn-ghost" style={{ padding: "15px 34px", fontSize: 15 }}>
              See the Platform
            </a>
          </motion.div>

          {/* Trust bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.1 }}
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px 36px",
              borderTop: "1px solid var(--border)",
              paddingTop: 32,
            }}
          >
            {TRUST.map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--blue)", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500, color: "var(--text-3)", letterSpacing: "0.04em" }}>{t}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue — subtle chevron only, no text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--text-3)"
          strokeWidth="1.5"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" as const }}
        >
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
`);

// ─── JOURNEY ─────────────────────────────────────────────────────────────────
write(comp("Journey.tsx"), `"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

const PHASES = [
  {
    n: "01",
    phase: "Grade 9 Onboarding",
    headline: "The learner journey begins here.",
    body: "Students create accounts, complete psychometric assessments, and build their personal and academic profiles. Within minutes the platform holds more career insight than most counsellors gather in a year.",
    tags: ["Psychometric baseline", "Profile creation", "Career exploration"],
  },
  {
    n: "02",
    phase: "Subject Selection Intelligence",
    headline: "Data-driven Grade 10 choices.",
    body: "AI systems recommend Grade 10 subjects based on career interests, aptitude, personality, academic strengths, and labour-market demand. Learners stop guessing and start deciding.",
    tags: ["Subject mapping", "APS modelling", "Career alignment"],
  },
  {
    n: "03",
    phase: "Continuous Monitoring",
    headline: "No learner quietly falls behind.",
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
    headline: "One portal. Every institution.",
    body: "Students apply to universities, TVET colleges, skills programmes, and private institutions directly through the platform, with fit-score intelligence guiding every application decision.",
    tags: ["University", "TVET", "Private colleges", "Skills programmes"],
  },
  {
    n: "06",
    phase: "Institutional Matching",
    headline: "Institutions recruit with precision.",
    body: "Universities and colleges access predictive learner profiles, risk-adjusted recruitment data, and student-fit analytics. Expensive, imprecise recruitment replaced by data-grade precision.",
    tags: ["Predictive profiles", "Conversion intelligence", "B2B recruitment"],
  },
];

function PhaseItem({ p, i }: { p: typeof PHASES[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "36px 1fr",
        gap: "0 32px",
        paddingBottom: i < PHASES.length - 1 ? 52 : 0,
        position: "relative",
      }}
    >
      {/* Phase circle animates in */}
      <motion.div
        className="phase-num"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.18, ease: [0.34, 1.56, 0.64, 1] }}
        style={{ position: "relative", zIndex: 1 }}
      >
        {p.n}
      </motion.div>

      <div style={{ paddingTop: 6 }}>
        <motion.p
          className="label-gold"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.22 }}
          style={{ marginBottom: 10 }}
        >
          {p.phase}
        </motion.p>
        <motion.h3
          className="h3"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.27, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 14, fontSize: 20 }}
        >
          {p.headline}
        </motion.h3>
        <motion.p
          className="body"
          initial={{ opacity: 0, y: 8 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.33, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: 20, maxWidth: 620 }}
        >
          {p.body}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}
        >
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
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
              }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Journey() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.3"],
  });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="how-it-works" style={{ background: "var(--bg)", position: "relative" }}>
      <div className="section">
        <div className="container">

          {/* Header */}
          <div ref={headerRef} style={{ maxWidth: 680, marginBottom: 80 }}>
            <motion.p
              className="label"
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" as const }}
              style={{ marginBottom: 20 }}
            >
              The Learner Journey
            </motion.p>
            <motion.h2
              className="display-2"
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              From Grade 9{" "}
              <span className="text-italic">to graduation</span>
              <br />
              and beyond.
            </motion.h2>
            <motion.p
              className="body-lg"
              initial={{ opacity: 0, y: 16 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              style={{ marginTop: 24 }}
            >
              Six interconnected phases. One continuous intelligence system that grows with the learner across their entire academic lifecycle.
            </motion.p>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} style={{ position: "relative", display: "flex", flexDirection: "column" }}>
            {/* Animated draw line */}
            <motion.div
              style={{
                position: "absolute",
                left: 17,
                top: 36,
                bottom: 36,
                width: 1,
                background: "var(--border-blue)",
                transformOrigin: "top",
                scaleY: lineScaleY,
                willChange: "transform",
              }}
            />

            {PHASES.map((p, i) => (
              <PhaseItem key={p.n} p={p} i={i} />
            ))}
          </div>

        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
`);

// ─── PROBLEM (remove em dashes, improve phrasing) ────────────────────────────
write(comp("Problem.tsx"), `"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROBLEMS = [
  {
    stat: "80%",
    headline: "choose subjects without guidance",
    body: "Most learners select Grade 10 subjects based on peer influence or parental intuition. Career alignment and aptitude data play no role.",
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
    headline: "invested in decision support",
    body: "Billions are spent on education delivery but near-zero on the decision layer that determines whether that investment converts to real outcomes.",
  },
];

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 28 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] },
});

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null);
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
              The structural failure is not in the classroom. It lives in the decision layer that precedes it.
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
                whileHover={{ borderColor: "rgba(61,127,255,0.3)", translateY: -2 }}
                transition={{ duration: 0.2 }}
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
            {...an(0.55, inView)}
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
              <p style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(20px, 2.5vw, 28px)", color: "var(--text-1)", lineHeight: 1.5 }}>
                &ldquo;Traditional platforms function like digital directories.
                Your Uni-Verse functions like an{" "}
                <span className="text-gradient">educational operating system.</span>&rdquo;
              </p>
            </div>
            <div style={{ flexShrink: 0 }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text-3)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Your Uni-Verse · Platform Architecture
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

// ─── PLATFORM (remove em dashes) ─────────────────────────────────────────────
const platformPath = path.join(root, "components", "Platform.tsx");
let pt = fs.readFileSync(platformPath, "utf8");
pt = pt
  .replace("personalised per learner, updated continuously.", "personalised per learner and updated continuously.")
  .replace("not a generic quiz, a real intelligence system.", "not a generic quiz. A genuinely intelligent system.")
  .replace("driving long-term learner engagement.", "designed to sustain long-term learner engagement.")
  .replace("longitudinal intelligence built over years.", "longitudinal intelligence built over years of use.")
  .replace("with fit-score intelligence built in.", "with fit-score intelligence built into every step.");
fs.writeFileSync(platformPath, pt, "utf8");
console.log("✓ Platform.tsx (em dash patch)");

// ─── GLOBALS — add hide-mobile + smooth easing CSS ───────────────────────────
const cssPath = path.join(root, "app", "globals.css");
let css = fs.readFileSync(cssPath, "utf8");
// Add hide-mobile if missing
if (!css.includes(".hide-mobile")) {
  css = css.replace(
    "@keyframes fade-up",
    `.hide-mobile{display:flex}
@media(max-width:768px){.hide-mobile{display:none!important}}

@keyframes fade-up`
  );
}
// Tighten card hover transition
css = css.replace(
  ".card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);transition:border-color 0.25s,transform 0.25s}",
  ".card{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius-lg);transition:border-color 0.3s,transform 0.3s,box-shadow 0.3s}"
);
fs.writeFileSync(cssPath, css, "utf8");
console.log("✓ globals.css (hide-mobile + card hover)");

console.log("\nAll fixes applied.");
