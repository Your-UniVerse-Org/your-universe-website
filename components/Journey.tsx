"use client";
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
