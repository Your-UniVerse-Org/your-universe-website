"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "./LanguageContext";
import Image from "next/image";

const FLY = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

const STAT_DATA = [
  {
    key:    "problem_stat1",
    num:    "73%",
    color:  "var(--purple)",
  },
  {
    key:    "problem_stat2",
    num:    "Grade 12",
    color:  "var(--orange-text)",
  },
  {
    key:    "problem_stat3",
    num:    "40%",
    color:  "var(--purple)",
  },
  {
    key:    "problem_stat4",
    num:    "R0",
    color:  "var(--orange-text)",
  },
] as const;

export default function Problem() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      id="problem"
      className="section problem-section-bottom"
      aria-labelledby="problem-heading"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">

        {/* Header — two-column on wide, stacked on mobile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 48,
            marginBottom: 72,
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: "1 1 360px", minWidth: 0 }}>
            <motion.p {...FLY(0.05)} className="label" style={{ marginBottom: 20 }}>
              {t("problem_label")}
            </motion.p>

            <motion.h2
              id="problem-heading"
              {...FLY(0.15)}
              className="display-2"
              style={{ marginBottom: 20 }}
            >
              {t("problem_h2_1")}{" "}
              <span className="text-gradient-orange">{t("problem_h2_2")}</span>
            </motion.h2>

            <motion.p
              {...FLY(0.25)}
              className="body-lg"
            >
              {t("problem_sub")}
            </motion.p>
          </div>

          {/* Real photo — students in a learning moment */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flex: "0 0 auto",
              width: "clamp(240px, 32vw, 360px)",
              borderRadius: 20,
              overflow: "hidden",
              aspectRatio: "4 / 5",
              position: "relative",
              boxShadow: "0 24px 60px rgba(0,0,0,0.40)",
              border: "1px solid rgba(254,74,35,0.18)",
            }}
          >
            <div style={{
              position: "absolute", inset: 0, zIndex: 1,
              background: "linear-gradient(180deg, transparent 50%, rgba(15,23,42,0.75) 100%)",
              pointerEvents: "none",
            }}/>
            {/*
              Photo: Pexels — "Student writing on blackboard"
              Source: https://www.pexels.com/photo/6238037/
              Photographer: Monstera Production
              License: Pexels License (free commercial use)
            */}
            <Image
              src="https://images.pexels.com/photos/6238037/pexels-photo-6238037.jpeg?auto=compress&cs=tinysrgb&w=720&h=900&fit=crop"
              alt="Student writing subject choices on a blackboard"
              fill
              sizes="360px"
              style={{ objectFit: "cover" }}
            />
            <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, zIndex: 2 }}>
              <span className="pill pill-orange" style={{ fontSize: 10 }}>
                The Grade 9 Decision Gap
              </span>
            </div>
          </motion.div>
        </div>

        {/* Stats grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))",
            gap: 20,
          }}
        >
          {STAT_DATA.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="feature-card card card-padded"
              style={{ position: "relative", overflow: "hidden" }}
            >
              {/* Top accent line */}
              <div style={{ height: 2, background: `linear-gradient(90deg, ${stat.color}, transparent)`, marginBottom: 24, borderRadius: 99, opacity: 0.7 }} />

              <p
                className="stat-number-display"
                style={{ marginBottom: 14 }}
                aria-label={stat.num}
              >
                {stat.num}
              </p>

              <p className="h3" style={{ marginBottom: 10 }}>
                {(t as unknown as (k: string) => string)(`${stat.key}_h`)}
              </p>

              <p className="body" style={{ color: "var(--text-3)" }}>
                {(t as unknown as (k: string) => string)(`${stat.key}_b`)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Divider insight banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: 56,
            borderRadius: 20,
            padding: "28px 36px",
            background: "linear-gradient(135deg, rgba(119,77,255,0.09) 0%, rgba(254,74,35,0.05) 100%)",
            border: "1px solid var(--border-purple)",
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ maxWidth: 540 }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: "var(--text-1)", marginBottom: 8 }}>
              The decision layer is broken.
            </p>
            <p className="body-lg">
              Billions are invested in education delivery. Near-zero goes into helping learners make the right decisions before it&apos;s too late.
            </p>
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span className="pill">
              <span className="pill-dot" />
              Grade 9 Decision Gap
            </span>
            <span className="pill pill-orange">
              YourUniverse solves this
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
