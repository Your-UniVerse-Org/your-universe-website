"use client";
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
                  <div className={`icon-box${s.gold ? " icon-box-gold" : ""}`} style={{ marginBottom: 16 }}>{s.icon}</div>
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
