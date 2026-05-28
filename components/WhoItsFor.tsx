"use client";
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
