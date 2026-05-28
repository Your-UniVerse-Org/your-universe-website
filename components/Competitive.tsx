"use client";
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
