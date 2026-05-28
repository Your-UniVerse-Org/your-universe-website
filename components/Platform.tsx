"use client";
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
                <div className={`icon-box${p.gold ? " icon-box-gold" : ""}`} style={{ marginBottom: 20 }}>{p.icon}</div>
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
