import { writeFileSync } from 'fs';
const B = 'C:/Users/ayand/Documents/VILATECH/your-universe/components/';
const A = 'C:/Users/ayand/Documents/VILATECH/your-universe/app/';

// ─── Platform.tsx ────────────────────────────────────────────────────────────
writeFileSync(B + 'Platform.tsx', `"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AINeuralGraphic } from "./SectionGraphics";
import { useLang } from "./LanguageContext";

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 28 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.7, delay: d, ease: "easeOut" as const },
});

const ICONS = [
  <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M2 12h3M19 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"/></svg>,
  <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18"/></svg>,
  <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
  <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  <svg key="5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>,
];
const GOLD = [false, false, false, true, true, true];
const TAGS = ["AI · ML · NLP", "Psychometrics · Neuroscience", "Forecasting · Risk · Intelligence", "Engagement · Retention · Progress", "Portfolio · Identity · Credentials", "Applications · Placement · TVET"];

export default function Platform() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  const PILLARS = [
    { title: t("plat_p1_title"), body: t("plat_p1_body"), icon: ICONS[0], gold: GOLD[0], tag: TAGS[0] },
    { title: t("plat_p2_title"), body: t("plat_p2_body"), icon: ICONS[1], gold: GOLD[1], tag: TAGS[1] },
    { title: t("plat_p3_title"), body: t("plat_p3_body"), icon: ICONS[2], gold: GOLD[2], tag: TAGS[2] },
    { title: t("plat_p4_title"), body: t("plat_p4_body"), icon: ICONS[3], gold: GOLD[3], tag: TAGS[3] },
    { title: t("plat_p5_title"), body: t("plat_p5_body"), icon: ICONS[4], gold: GOLD[4], tag: TAGS[4] },
    { title: t("plat_p6_title"), body: t("plat_p6_body"), icon: ICONS[5], gold: GOLD[5], tag: TAGS[5] },
  ];

  return (
    <section id="platform" style={{ background: "var(--surface)", position: "relative" }}>
      <div className="glow-section" style={{ top: "50%", transform: "translate(-50%, -50%)" }} />
      <div className="section">
        <div className="container" ref={ref}>
          <div className="sg-row" style={{ marginBottom: 80 }}>
            <div className="sg-col">
              <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>{t("platform_label")}</motion.p>
              <motion.h2 {...an(0.15, inView)} className="display-2">
                {t("plat_h2_a")}
                <br />
                <span className="text-italic text-gradient">{t("plat_h2_b")}</span>
              </motion.h2>
              <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 20 }}>{t("plat_body")}</motion.p>
            </div>
            <motion.div {...an(0.1, inView)}><AINeuralGraphic /></motion.div>
          </div>
          <div className="platform-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", border: "1px solid var(--border)", borderRadius: "var(--radius-xl)" }}>
            {PILLARS.map((p, i) => (
              <motion.div key={i} {...an(0.05 + i * 0.08, inView)}
                style={{ padding: "36px", background: "var(--surface)", borderBottom: "1px solid var(--border)", borderRight: "1px solid var(--border)", transition: "background 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}>
                <div className={\`icon-box\${p.gold ? " icon-box-gold" : ""}\`} style={{ marginBottom: 20 }}>{p.icon}</div>
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

// ─── Features.tsx ─────────────────────────────────────────────────────────────
writeFileSync(B + 'Features.tsx', `"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { StudyDashboardGraphic } from "./SectionGraphics";
import { useLang } from "./LanguageContext";

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 24 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.65, delay: d, ease: "easeOut" as const },
});

const ICONS = [
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  <svg key="4" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
  <svg key="5" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
];
const TAGS = ["Curriculum-aligned · Adaptive · Daily", "NSC · IEB · Trend analysis", "University benchmarks · Faculty-specific", "Mastery scores · Streaks · Weekly reports", "Timed sessions · Adaptive sets · Deep focus", "Matric · Undergrad · Postgrad"];

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  const FEATURES = [
    { title: t("feat_f1_title"), body: t("feat_f1_body"), icon: ICONS[0], tag: TAGS[0] },
    { title: t("feat_f2_title"), body: t("feat_f2_body"), icon: ICONS[1], tag: TAGS[1] },
    { title: t("feat_f3_title"), body: t("feat_f3_body"), icon: ICONS[2], tag: TAGS[2] },
    { title: t("feat_f4_title"), body: t("feat_f4_body"), icon: ICONS[3], tag: TAGS[3] },
    { title: t("feat_f5_title"), body: t("feat_f5_body"), icon: ICONS[4], tag: TAGS[4] },
    { title: t("feat_f6_title"), body: t("feat_f6_body"), icon: ICONS[5], tag: TAGS[5] },
  ];

  return (
    <section id="features" style={{ background: "var(--surface)", position: "relative" }}>
      <div className="section">
        <div className="container" ref={ref}>
          <div className="sg-row" style={{ marginBottom: 64 }}>
            <div className="sg-col">
              <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 16 }}>{t("features_label")}</motion.p>
              <motion.h2 {...an(0.15, inView)} className="display-2">{t("features_h2")}</motion.h2>
              <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 20 }}>{t("features_sub")}</motion.p>
            </div>
            <motion.div {...an(0.1, inView)}><StudyDashboardGraphic /></motion.div>
          </div>
          <div className="features-grid">
            {FEATURES.map((f, i) => (
              <motion.div key={i} {...an(0.1 + i * 0.07, inView)}
                style={{ padding: "32px", background: "var(--surface)", transition: "background 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}>
                <div className="icon-box" style={{ marginBottom: 20, color: "var(--violet-text)" }}>{f.icon}</div>
                <h3 className="h3" style={{ marginBottom: 10, fontSize: 18 }}>{f.title}</h3>
                <p className="body" style={{ marginBottom: 16, fontSize: 14 }}>{f.body}</p>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.07em", color: "var(--text-3)", textTransform: "uppercase" }}>{f.tag}</p>
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

// ─── Competitive.tsx ──────────────────────────────────────────────────────────
writeFileSync(B + 'Competitive.tsx', `"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ComparisonGraphic } from "./SectionGraphics";
import { useLang } from "./LanguageContext";

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 24 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.65, delay: d, ease: "easeOut" as const },
});

export default function Competitive() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  const ROWS = [
    { feature: t("comp_r1_feat"), them: t("comp_r1_them"), us: t("comp_r1_us") },
    { feature: t("comp_r2_feat"), them: t("comp_r2_them"), us: t("comp_r2_us") },
    { feature: t("comp_r3_feat"), them: t("comp_r3_them"), us: t("comp_r3_us") },
    { feature: t("comp_r4_feat"), them: t("comp_r4_them"), us: t("comp_r4_us") },
    { feature: t("comp_r5_feat"), them: t("comp_r5_them"), us: t("comp_r5_us") },
    { feature: t("comp_r6_feat"), them: t("comp_r6_them"), us: t("comp_r6_us") },
    { feature: t("comp_r7_feat"), them: t("comp_r7_them"), us: t("comp_r7_us") },
    { feature: t("comp_r8_feat"), them: t("comp_r8_them"), us: t("comp_r8_us") },
  ];

  return (
    <section style={{ background: "var(--bg)", position: "relative" }}>
      <div className="section">
        <div className="container" ref={ref}>
          <div className="sg-row" style={{ marginBottom: 72 }}>
            <div className="sg-col">
              <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>{t("comp_label")}</motion.p>
              <motion.h2 {...an(0.15, inView)} className="display-2">
                {t("comp_h2_1")}
                <br />
                <span className="text-italic text-gradient">{t("comp_h2_2")}</span>
              </motion.h2>
              <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 24 }} dangerouslySetInnerHTML={{ __html: t("comp_sub") }} />
            </div>
            <motion.div {...an(0.1, inView)}><ComparisonGraphic /></motion.div>
          </div>
          <motion.div {...an(0.3, inView)} className="card" style={{ overflow: "hidden" }}>
            {/* Desktop table */}
            <div className="table-scroll comp-table-desktop">
              <div className="table-scroll-inner">
                <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.2fr", padding: "14px 24px", background: "var(--surface-2)", borderBottom: "1px solid var(--border)" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase" }}>{t("comp_hdr_feature")}</span>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase" }}>{t("comp_hdr_trad")}</span>
                  <span className="label" style={{ letterSpacing: "0.1em" }}>Your Uni-Verse</span>
                </div>
                {ROWS.map((r, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.35 + i * 0.04, ease: "easeOut" as const }}
                    style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1.2fr", alignItems: "center", padding: "13px 24px", borderBottom: i < ROWS.length - 1 ? "1px solid var(--border)" : "none", transition: "background 0.15s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}>
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, color: "var(--text-2)", paddingRight: 12 }}>{r.feature}</span>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, paddingRight: 12 }}>
                      <div className="check-no" style={{ flexShrink: 0 }}><svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="3" x2="9" y2="9"/><line x1="9" y1="3" x2="3" y2="9"/></svg></div>
                      <span style={{ fontSize: 13, color: "var(--text-3)" }}>{r.them}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div className="check-yes" style={{ flexShrink: 0 }}><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="2 6 5 9 10 3"/></svg></div>
                      <span style={{ fontSize: 13, color: "var(--text-1)", fontWeight: 500 }}>{r.us}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Mobile stacked */}
            <div className="comp-cards-mobile">
              {ROWS.map((r, i) => (
                <motion.div key={i + "-mobile"} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.3 + i * 0.04, ease: "easeOut" as const }}
                  style={{ padding: "18px 20px", borderBottom: i < ROWS.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 12 }}>{r.feature}</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                    <div style={{ background: "var(--surface-2)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 8 }}>{t("comp_mobile_other")}</p>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                        <div className="check-no" style={{ flexShrink: 0, marginTop: 1 }}><svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="3" y1="3" x2="9" y2="9"/><line x1="9" y1="3" x2="3" y2="9"/></svg></div>
                        <span style={{ fontSize: 12, color: "var(--text-3)", lineHeight: 1.45 }}>{r.them}</span>
                      </div>
                    </div>
                    <div style={{ background: "var(--blue-dim)", border: "1px solid var(--blue-border)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 8 }}>{t("comp_mobile_us")}</p>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 7 }}>
                        <div className="check-yes" style={{ flexShrink: 0, marginTop: 1 }}><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="2 6 5 9 10 3"/></svg></div>
                        <span style={{ fontSize: 12, color: "var(--text-1)", fontWeight: 500, lineHeight: 1.45 }}>{r.us}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
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

// ─── Journey.tsx ──────────────────────────────────────────────────────────────
writeFileSync(B + 'Journey.tsx', `"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { PHASE_ICONS } from "./SectionGraphics";
import { useLang } from "./LanguageContext";

function PhaseItem({ phase, headline, body, tags, n, i, inView: _inView }: { phase: string; headline: string; body: string; tags: string[]; n: string; i: number; inView?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
      style={{ display: "grid", gridTemplateColumns: "36px 1fr", gap: "0 32px", paddingBottom: i < 5 ? 52 : 0, position: "relative" }}>
      <motion.div className="phase-num" initial={{ scale: 0.6, opacity: 0 }} animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.45, delay: 0.18, ease: [0.34, 1.56, 0.64, 1] as [number,number,number,number] }}
        style={{ position: "relative", zIndex: 1 }}>{n}</motion.div>
      <div style={{ paddingTop: 6 }}>
        <motion.p className="label-gold" initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.22 }}
          style={{ marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ color: "var(--gold-text)", opacity: 0.7 }}>{PHASE_ICONS[i]}</span>{phase}
        </motion.p>
        <motion.h3 className="h3" initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.27, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{ marginBottom: 14, fontSize: 20 }}>{headline}</motion.h3>
        <motion.p className="body" initial={{ opacity: 0, y: 8 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.33, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
          style={{ marginBottom: 20, maxWidth: 620 }}>{body}</motion.p>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.4 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {tags.map((tag) => (
            <span key={tag} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--text-3)", background: "var(--surface)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 100 }}>{tag}</span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

const PHASE_TAGS = [
  ["Psychometric baseline", "Profile creation", "Career exploration"],
  ["Subject mapping", "APS modelling", "Career alignment"],
  ["Risk alerts", "APS tracking", "Parent visibility"],
  ["Adaptive pathways", "Market demand", "Behavioural evolution"],
  ["University", "TVET", "Private colleges", "Skills programmes"],
  ["Predictive profiles", "Student-fit", "Smart recruitment"],
];

export default function Journey() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });
  const timelineRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 0.85", "end 0.3"] });
  const lineScaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const PHASES = [
    { n: "01", phase: t("phase1_name"), headline: t("phase1_head"), body: t("phase1_body"), tags: PHASE_TAGS[0] },
    { n: "02", phase: t("phase2_name"), headline: t("phase2_head"), body: t("phase2_body"), tags: PHASE_TAGS[1] },
    { n: "03", phase: t("phase3_name"), headline: t("phase3_head"), body: t("phase3_body"), tags: PHASE_TAGS[2] },
    { n: "04", phase: t("phase4_name"), headline: t("phase4_head"), body: t("phase4_body"), tags: PHASE_TAGS[3] },
    { n: "05", phase: t("phase5_name"), headline: t("phase5_head"), body: t("phase5_body"), tags: PHASE_TAGS[4] },
    { n: "06", phase: t("phase6_name"), headline: t("phase6_head"), body: t("phase6_body"), tags: PHASE_TAGS[5] },
  ];

  return (
    <section id="how-it-works" style={{ background: "var(--bg)", position: "relative" }}>
      <div className="section">
        <div className="container">
          <div ref={headerRef} style={{ maxWidth: 680, marginBottom: 80 }}>
            <motion.p className="label" initial={{ opacity: 0, y: 12 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: "easeOut" as const }} style={{ marginBottom: 20 }}>{t("journey_label")}</motion.p>
            <motion.h2 className="display-2" initial={{ opacity: 0, y: 20 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}>
              {t("journey_h2_a")}{" "}<span className="text-italic">{t("journey_h2_b")}</span><br />{t("journey_h2_c")}
            </motion.h2>
            <motion.p className="body-lg" initial={{ opacity: 0, y: 16 }} animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.22, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] }}
              style={{ marginTop: 24 }}>{t("journey_sub")}</motion.p>
          </div>
          <div ref={timelineRef} style={{ position: "relative", display: "flex", flexDirection: "column" }}>
            <motion.div style={{ position: "absolute", left: 17, top: 36, bottom: 36, width: 1, background: "var(--border-blue)", transformOrigin: "top", scaleY: lineScaleY, willChange: "transform" }} />
            {PHASES.map((p, i) => <PhaseItem key={p.n} {...p} i={i} />)}
          </div>
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
`);

// ─── Ecosystem.tsx ─────────────────────────────────────────────────────────────
writeFileSync(B + 'Ecosystem.tsx', `"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { EcosystemNetworkGraphic } from "./SectionGraphics";
import { useLang } from "./LanguageContext";

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 28 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.7, delay: d, ease: "easeOut" as const },
});

const ICONS = [
  <svg key="0" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>,
  <svg key="1" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  <svg key="2" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
  <svg key="3" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>,
];
const GOLD = [false, true, false, true];

export default function Ecosystem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  const STAKEHOLDERS = [
    { title: t("eco_s1_title"), subtitle: t("eco_s1_sub"), icon: ICONS[0], gold: GOLD[0], cta: t("eco_s1_cta"), features: [t("eco_s1_f1"), t("eco_s1_f2"), t("eco_s1_f3"), t("eco_s1_f4"), t("eco_s1_f5"), t("eco_s1_f6")] },
    { title: t("eco_s2_title"), subtitle: t("eco_s2_sub"), icon: ICONS[1], gold: GOLD[1], cta: t("eco_s2_cta"), features: [t("eco_s2_f1"), t("eco_s2_f2"), t("eco_s2_f3"), t("eco_s2_f4"), t("eco_s2_f5"), t("eco_s2_f6")] },
    { title: t("eco_s3_title"), subtitle: t("eco_s3_sub"), icon: ICONS[2], gold: GOLD[2], cta: t("eco_s3_cta"), features: [t("eco_s3_f1"), t("eco_s3_f2"), t("eco_s3_f3"), t("eco_s3_f4"), t("eco_s3_f5"), t("eco_s3_f6")] },
    { title: t("eco_s4_title"), subtitle: t("eco_s4_sub"), icon: ICONS[3], gold: GOLD[3], cta: t("eco_s4_cta"), features: [t("eco_s4_f1"), t("eco_s4_f2"), t("eco_s4_f3"), t("eco_s4_f4"), t("eco_s4_f5"), t("eco_s4_f6")] },
  ];

  return (
    <section id="ecosystem" style={{ background: "var(--surface)", position: "relative" }}>
      <div className="section">
        <div className="container" ref={ref}>
          <div className="sg-row" style={{ marginBottom: 72 }}>
            <div className="sg-col">
              <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>{t("eco_label")}</motion.p>
              <motion.h2 {...an(0.15, inView)} className="display-2">
                {t("eco_h2_1")}{" "}<span className="text-italic">{t("eco_h2_2")}</span><br />
                <span className="text-gradient">{t("eco_h2_3")}</span>
              </motion.h2>
              <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 24 }}>{t("eco_sub")}</motion.p>
            </div>
            <motion.div {...an(0.1, inView)}><EcosystemNetworkGraphic /></motion.div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {STAKEHOLDERS.map((s, i) => (
              <motion.div key={i} {...an(0.1 + i * 0.1, inView)} className="card"
                style={{ padding: "36px", display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <div className={\`icon-box\${s.gold ? " icon-box-gold" : ""}\`} style={{ marginBottom: 16 }}>{s.icon}</div>
                  <h3 className="h3" style={{ marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{s.subtitle}</p>
                </div>
                <ul style={{ display: "flex", flexDirection: "column", gap: 12, borderTop: "1px solid var(--border)", paddingTop: 24 }}>
                  {s.features.map((f, fi) => (
                    <li key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <div className="check-yes" style={{ marginTop: 2, flexShrink: 0 }}><svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="2 6 5 9 10 3"/></svg></div>
                      <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{f}</span>
                    </li>
                  ))}
                </ul>
                <div style={{ marginTop: "auto" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, color: s.gold ? "var(--gold-text)" : "var(--blue)", letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.cta}</span>
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

// ─── WhoItsFor.tsx ─────────────────────────────────────────────────────────────
writeFileSync(B + 'WhoItsFor.tsx', `"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PersonasGraphic } from "./SectionGraphics";
import { useLang } from "./LanguageContext";

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 24 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.65, delay: d, ease: "easeOut" as const },
});

const PERSONA_TAGS = [
  ["NSC · IEB", "University benchmarks", "Subject coaching"],
  ["Transition support", "Habit building", "Module structure"],
  ["Deep focus", "Research scaffolding", "Milestone tracking"],
];

export default function WhoItsFor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  const PERSONAS = [
    { title: t("who_p1_title"), quote: t("who_p1_quote"), body: t("who_p1_body"), tags: PERSONA_TAGS[0] },
    { title: t("who_p2_title"), quote: t("who_p2_quote"), body: t("who_p2_body"), tags: PERSONA_TAGS[1] },
    { title: t("who_p3_title"), quote: t("who_p3_quote"), body: t("who_p3_body"), tags: PERSONA_TAGS[2] },
  ];

  return (
    <section id="who-its-for" style={{ background: "var(--surface)", position: "relative" }}>
      <div className="section">
        <div className="container" ref={ref}>
          <div className="sg-row" style={{ marginBottom: 64 }}>
            <div className="sg-col">
              <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 16 }}>{t("who_label")}</motion.p>
              <motion.h2 {...an(0.15, inView)} className="display-2">{t("who_h2")}</motion.h2>
              <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 20 }}>{t("who_sub")}</motion.p>
            </div>
            <motion.div {...an(0.1, inView)}><PersonasGraphic /></motion.div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {PERSONAS.map((p, i) => (
              <motion.div key={i} {...an(0.2 + i * 0.12, inView)} className="card"
                style={{ padding: "40px 36px", display: "flex", flexDirection: "column", gap: 24 }}>
                <div>
                  <h3 className="h3" style={{ marginBottom: 12 }}>{p.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, fontStyle: "italic", color: "var(--violet-text)", lineHeight: 1.55 }}>
                    &ldquo;{p.quote}&rdquo;
                  </p>
                </div>
                <div style={{ borderTop: "1px solid var(--border)", paddingTop: 24 }}>
                  <p className="body" style={{ marginBottom: 20 }}>{p.body}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {p.tags.map((tag) => (
                      <span key={tag} style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--text-3)", background: "var(--surface-2)", border: "1px solid var(--border)", padding: "4px 10px", borderRadius: 100 }}>{tag}</span>
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

// ─── Footer.tsx ────────────────────────────────────────────────────────────────
writeFileSync(B + 'Footer.tsx', `"use client";
import Link from "next/link";
import { useLang } from "./LanguageContext";

export default function Footer() {
  const { t } = useLang();

  const COL: Record<string, { label: string; href: string }[]> = {
    [t("foot_col_platform")]: [
      { label: t("foot_how_it_works"),  href: "/platform#how-it-works" },
      { label: t("foot_ai_features"),   href: "/platform" },
      { label: t("foot_for_schools"),   href: "/for-schools" },
      { label: t("foot_for_inst"),      href: "/for-schools" },
      { label: t("foot_req_access"),    href: "/early-access" },
    ],
    [t("foot_col_company")]: [
      { label: t("foot_about"),   href: "#" },
      { label: t("foot_lynxio"),  href: "#" },
      { label: t("foot_careers"), href: "#" },
    ],
    [t("foot_col_legal")]: [
      { label: t("foot_privacy"), href: "/privacy" },
      { label: t("foot_terms"),   href: "/terms" },
      { label: t("foot_data"),    href: "/privacy" },
    ],
  };

  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 48 }}>
        <div className="footer-cols" style={{ marginBottom: 64 }}>
          <div style={{ maxWidth: 300 }}>
            <Link href="/" style={{ display: "inline-block", fontFamily: "'Instrument Serif', Georgia, serif", fontSize: 22, color: "var(--white)", marginBottom: 16, letterSpacing: "-0.01em" }}>Your Uni-Verse</Link>
            <p className="body" style={{ fontSize: 14, marginBottom: 24, lineHeight: 1.75 }}>{t("foot_tagline")}</p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 8 }}>{t("foot_product_of")}</p>
            <a href="#" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--blue)", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.75"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}>Lynxio Tech</a>
          </div>
          {Object.entries(COL).map(([section, items]) => (
            <div key={section}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 20 }}>{section}</p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {items.map((item) => (
                  <li key={item.href + item.label}><Link href={item.href} className="footer-link">{item.label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 28, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <p className="small">{t("foot_copyright").replace("{year}", String(new Date().getFullYear()))}</p>
          <a href="mailto:hello@youruniverse.co.za" style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "'Space Grotesk', sans-serif", transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-1)"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-3)"; }}>
            hello@youruniverse.co.za
          </a>
        </div>
      </div>
    </footer>
  );
}
`);

console.log('Platform, Features, Competitive, Journey, Ecosystem, WhoItsFor, Footer written');
