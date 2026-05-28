"use client";
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
