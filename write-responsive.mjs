import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.dirname(fileURLToPath(import.meta.url));
const comp = (n) => path.join(root, "components", n);
const write = (p, c) => { fs.writeFileSync(p, c, "utf8"); console.log(`✓ ${path.basename(p)}`); };

// ─── 1. GLOBALS — all responsive helpers ─────────────────────────────────────
const cssPath = path.join(root, "app", "globals.css");
let css = fs.readFileSync(cssPath, "utf8");

// Replace hide-mobile rule (it exists but may be wrong)
css = css.replace(/\.hide-mobile\{[^}]+\}\n?@media[^{]+\{\.hide-mobile\{[^}]+\}\}/g, "");

// Append responsive utilities at end
const responsive = `
/* ── Responsive utilities ─────────────────────────────────── */

/* Nav desktop links + CTA */
.hide-mobile { display: flex !important }
@media(max-width: 767px) { .hide-mobile { display: none !important } }

/* Two-column split that stacks below 768px */
.split-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 80px;
  align-items: start;
}
@media(max-width: 900px) {
  .split-2 { grid-template-columns: 1fr; gap: 40px 0; }
}

/* Footer grid: 1.5fr + 3× 1fr → stacks below 640px */
.footer-cols {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 48px 64px;
}
@media(max-width: 900px) {
  .footer-cols { grid-template-columns: 1fr 1fr; gap: 40px 32px; }
}
@media(max-width: 520px) {
  .footer-cols { grid-template-columns: 1fr; gap: 36px 0; }
}

/* Competitive table — horizontal scroll on mobile */
.table-scroll {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}
.table-scroll-inner {
  min-width: 560px;
}

/* Stats roadmap row */
.roadmap-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 24px;
}
@media(max-width: 900px) {
  .roadmap-grid { grid-template-columns: repeat(3, 1fr); }
}
@media(max-width: 520px) {
  .roadmap-grid { grid-template-columns: 1fr 1fr; }
}

/* Section padding tighter on very small screens */
@media(max-width: 480px) {
  .section { padding: 64px 0; }
  .container { padding: 0 20px; }
}

/* Waitlist form grid */
.waitlist-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px 80px;
  align-items: start;
}
@media(max-width: 860px) {
  .waitlist-grid { grid-template-columns: 1fr; gap: 56px 0; }
}

/* Platform features grid border fix on mobile */
@media(max-width: 768px) {
  .platform-grid > div { border-right: none !important; }
}

/* Journey timeline gutter */
@media(max-width: 520px) {
  .timeline-row { gap: 0 20px !important; }
}

/* Navbar mobile padding */
@media(max-width: 480px) {
  .nav { padding: 16px 0; }
}
`;

if (!css.includes("Responsive utilities")) {
  css = css.trimEnd() + "\n" + responsive + "\n";
  fs.writeFileSync(cssPath, css, "utf8");
  console.log("✓ globals.css (responsive utilities)");
}

// ─── 2. PLATFORM — split-2 class + platform-grid ────────────────────────────
write(comp("Platform.tsx"), `"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PILLARS = [
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
    title: "AI Recommendation Engine",
    body: "Career suitability scores, subject recommendations, APS targets, and institution matching — personalised per learner and updated continuously.",
    tag: "AI · ML · NLP",
    gold: false,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>,
    title: "Psychometric Analysis",
    body: "Behavioural pattern analysis, personality profiling, learning style detection, and motivation modelling. Not a generic quiz — a genuinely intelligent system.",
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
    body: "Career exploration missions, achievement badges, skill discovery games, and behavioural reward loops designed to sustain long-term learner engagement.",
    tag: "Engagement · Retention · Progress",
    gold: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    title: "Learner Portfolio System",
    body: "Academic and personal development portfolios that travel with the learner from Grade 9 to employment — longitudinal intelligence built over years of use.",
    tag: "Portfolio · Identity · Credentials",
    gold: true,
  },
  {
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
    title: "Application Management",
    body: "Unified application portal for universities, TVET colleges, private institutions, and skills programmes with fit-score intelligence built into every step.",
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

          <div className="split-2" style={{ marginBottom: 80 }}>
            <div>
              <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>The Platform</motion.p>
              <motion.h2 {...an(0.15, inView)} className="display-2">
                Decision intelligence.
                <br />
                <span className="text-italic text-gradient">Not information.</span>
              </motion.h2>
            </div>
            <motion.div {...an(0.25, inView)} style={{ paddingTop: 8 }}>
              <p className="body-lg">
                Your Uni-Verse combines six interconnected intelligence systems into a single ecosystem built to transform the South African education-to-career pipeline.
              </p>
            </motion.div>
          </div>

          <div
            className="platform-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-xl)",
              overflow: "hidden",
            }}
          >
            {PILLARS.map((p, i) => (
              <motion.div
                key={p.title}
                {...an(0.05 + i * 0.08, inView)}
                style={{
                  padding: "36px",
                  background: "var(--surface)",
                  borderBottom: "1px solid var(--border)",
                  borderRight: "1px solid var(--border)",
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

// ─── 3. COMPETITIVE — table-scroll wrapper ────────────────────────────────────
write(comp("Competitive.tsx"), `"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ROWS = [
  { feature: "Career guidance model", them: "Static directory", us: "AI decision intelligence" },
  { feature: "Guidance timing", them: "Grade 11–12", us: "Grade 9 onward" },
  { feature: "Psychometric analysis", them: "None", us: "Full behavioural profiling" },
  { feature: "Stakeholder ecosystem", them: "Student-only", us: "Students, schools, parents, institutions" },
  { feature: "Revenue model", them: "B2C advertising", us: "B2B institutional licensing" },
  { feature: "Parent visibility", them: "None", us: "Real-time monitoring dashboard" },
  { feature: "Institutional recruitment", them: "None", us: "Risk-adjusted, predictive leads" },
  { feature: "APS intelligence", them: "None", us: "Live APS tracking and forecasting" },
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

          <motion.div {...an(0.3, inView)} className="card" style={{ overflow: "hidden" }}>
            {/* Scroll hint on mobile */}
            <div className="table-scroll">
              <div className="table-scroll-inner">
                {/* Header row */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1.2fr",
                  padding: "14px 24px",
                  background: "var(--surface-2)",
                  borderBottom: "1px solid var(--border)",
                }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase" }}>Feature</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase" }}>Traditional Platforms</span>
                  <span className="label" style={{ letterSpacing: "0.1em" }}>Your Uni-Verse</span>
                </div>

                {ROWS.map((r, i) => (
                  <motion.div
                    key={r.feature}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.04, ease: "easeOut" as const }}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1.2fr 1fr 1.2fr",
                      alignItems: "center",
                      padding: "13px 24px",
                      borderBottom: i < ROWS.length - 1 ? "1px solid var(--border)" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, color: "var(--text-2)", paddingRight: 12 }}>{r.feature}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 12 }}>
                      <div className="check-no" style={{ flexShrink: 0 }}>
                        <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="3" x2="9" y2="9"/><line x1="9" y1="3" x2="3" y2="9"/></svg>
                      </div>
                      <span style={{ fontSize: 13, color: "var(--text-3)" }}>{r.them}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="check-yes" style={{ flexShrink: 0 }}>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="2 6 5 9 10 3"/></svg>
                      </div>
                      <span style={{ fontSize: 13, color: "var(--text-1)", fontWeight: 500 }}>{r.us}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
`);

// ─── 4. FOOTER — footer-cols responsive class ────────────────────────────────
write(comp("Footer.tsx"), `"use client";

const COL: Record<string, string[]> = {
  Platform: ["How It Works", "For Schools", "For Parents", "For Institutions", "Request Access"],
  Company: ["About Us", "Plantify Tech", "Lynxio Tech", "Careers"],
  Legal: ["Privacy Policy", "Terms of Service", "Data Protection"],
};

export default function Footer() {
  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 48 }}>

        <div className="footer-cols" style={{ marginBottom: 64 }}>
          {/* Brand col */}
          <div style={{ maxWidth: 300 }}>
            <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "var(--white)", marginBottom: 16, letterSpacing: "-0.01em" }}>
              Your Uni-Verse
            </div>
            <p className="body" style={{ fontSize: 14, marginBottom: 24, lineHeight: 1.75 }}>
              South Africa&apos;s first educational decision intelligence platform. Guiding learners from Grade 9 to graduation and beyond.
            </p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 8 }}>A product of</p>
            <a
              href="#"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--blue)", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.75"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
            >
              Lynxio Tech
            </a>
          </div>

          {/* Link cols */}
          {Object.entries(COL).map(([section, items]) => (
            <div key={section}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 20 }}>
                {section}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href={item === "Privacy Policy" ? "/privacy" : item === "Terms of Service" ? "/terms" : "#"}
                      style={{ fontSize: 14, color: "var(--text-3)", fontFamily: "'Inter', sans-serif", transition: "color 0.2s" }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-1)"; }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-3)"; }}
                    >
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
          <a
            href="mailto:hello@youruniverse.co.za"
            style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "'Space Grotesk', sans-serif", transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-1)"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-3)"; }}
          >
            hello@youruniverse.co.za
          </a>
        </div>

      </div>
    </footer>
  );
}
`);

// ─── 5. STATS — roadmap-grid class ───────────────────────────────────────────
const statsPath = comp("Stats.tsx");
let stats = fs.readFileSync(statsPath, "utf8");
stats = stats.replace(
  `gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24`,
  `gap: 24`
).replace(
  `<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 24 }}>`,
  `<div className="roadmap-grid">`
);
fs.writeFileSync(statsPath, stats, "utf8");
console.log("✓ Stats.tsx (roadmap-grid)");

// ─── 6. WAITLIST — waitlist-grid class ────────────────────────────────────────
const waitlistPath = comp("Waitlist.tsx");
let wl = fs.readFileSync(waitlistPath, "utf8");
wl = wl.replace(
  `style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "64px 80px", alignItems: "start" }}`,
  `className="waitlist-grid"`
);
fs.writeFileSync(waitlistPath, wl, "utf8");
console.log("✓ Waitlist.tsx (waitlist-grid)");

// ─── 7. ECOSYSTEM — fix the body copy em dash ─────────────────────────────────
const ecoPath = comp("Ecosystem.tsx");
let eco = fs.readFileSync(ecoPath, "utf8");
eco = eco.replace(
  "Students always receive free access — because equitable guidance is the mission.",
  "Students always receive free access, because equitable guidance is the mission."
);
fs.writeFileSync(ecoPath, eco, "utf8");
console.log("✓ Ecosystem.tsx (em dash)");

console.log("\n✅ All responsive fixes applied.");
