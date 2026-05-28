"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SAMapGraphic } from "./SectionGraphics";
import { useLang } from "./LanguageContext";

function useCountUp(target: number, started: boolean, decimals = 0) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!started) return;
    if (target === 0) { setN(0); return; }
    const steps = 60;
    const step = target / steps;
    let c = 0;
    const timer = setInterval(() => {
      c = Math.min(c + step, target);
      setN(parseFloat(c.toFixed(decimals)));
      if (c >= target) clearInterval(timer);
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, [started, target, decimals]);
  return n;
}

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 24 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.65, delay: d, ease: "easeOut" as const },
});

function StatCard({ target, suffix, unit, label, note, started }: { target: number; suffix: string; unit: string; label: string; note: string; started: boolean }) {
  const n = useCountUp(target, started);
  const isR = suffix === "R";
  return (
    <div className="card card-padded" style={{ textAlign: "center" }}>
      <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 400, lineHeight: 1, color: "var(--white)", marginBottom: 8 }}>
        {isR ? "R" : ""}{n.toLocaleString()}{isR ? "" : unit}
      </div>
      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--text-1)", marginBottom: 10 }}>{label}</p>
      <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.5 }}>{note}</p>
    </div>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  const NUMBERS = [
    { target: 500, suffix: "", unit: t("stats_n1_unit"), label: t("stats_n1_label"), note: t("stats_n1_note") },
    { target: 9,   suffix: "", unit: t("stats_n2_unit"), label: t("stats_n2_label"), note: t("stats_n2_note") },
    { target: 0,   suffix: "R", unit: t("stats_n3_unit"), label: t("stats_n3_label"), note: t("stats_n3_note") },
  ];

  return (
    <section id="stats" style={{ background: "var(--surface)", position: "relative" }}>
      <div className="glow-section" style={{ top: "50%", transform: "translate(-50%,-50%)" }} />
      <div className="section">
        <div className="container" ref={ref}>
          <div className="sg-row" style={{ marginBottom: 72 }}>
            <div className="sg-col">
              <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>{t("stats_label")}</motion.p>
              <motion.h2 {...an(0.15, inView)} className="display-2">
                {t("stats_h2_a")}{" "}
                <span className="text-italic text-gradient">{t("stats_h2_b")}</span>
              </motion.h2>
              <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 24 }}>{t("stats_sub")}</motion.p>
            </div>
            <motion.div {...an(0.1, inView)}><SAMapGraphic /></motion.div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {NUMBERS.map((item, i) => (
              <motion.div key={i} {...an(0.3, inView)}>
                <StatCard {...item} started={inView} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
