"use client";

import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useLang } from "./LanguageContext";

/**
 * Journey — From Grade 9 to graduation and beyond.
 *
 * Desktop: Tabbed phase selector (left list) + animated detail panel (right).
 * Mobile:  Sticky scroll experience — each phase gets its own viewport height.
 *          Scroll → Phase 1 → scroll scroll → Phase 2 → etc.
 *          Forces the learner to read and understand each stage of their journey.
 */

const PHASES = [
  { key: "phase1", color: "#774DFF",
    /*
     * Photo: Pexels — young black woman working with laptop
     * Source: https://www.pexels.com/photo/6457538/
     * Photographer: Alexander Suhorucov — Pexels License (free commercial use)
     */
    photo: "https://images.pexels.com/photos/6457538/pexels-photo-6457538.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    photoAlt: "Student discovering their strengths with technology",
  },
  { key: "phase2", color: "#774DFF",
    /*
     * Photo: Pexels — African American male student on laptop
     * Source: https://www.pexels.com/photo/5749152/
     * Photographer: Zen Chung — Pexels License (free commercial use)
     */
    photo: "https://images.pexels.com/photos/5749152/pexels-photo-5749152.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    photoAlt: "Student planning their academic pathway",
  },
  { key: "phase3", color: "#FE4A23",
    /*
     * Photo: Pexels — student preparing homework outdoors
     * Source: https://www.pexels.com/photo/4498093/
     * Photographer: Kaboompics — Pexels License (free commercial use)
     */
    photo: "https://images.pexels.com/photos/4498093/pexels-photo-4498093.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    photoAlt: "Student building their academic portfolio",
  },
  { key: "phase4", color: "#FE4A23",
    /*
     * Photo: Pexels — student with books and study materials
     * Source: https://www.pexels.com/photo/6238056/
     * Photographer: Monstera Production — Pexels License (free commercial use)
     */
    photo: "https://images.pexels.com/photos/6238056/pexels-photo-6238056.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    photoAlt: "Student preparing for matric examinations",
  },
  { key: "phase5", color: "#774DFF",
    /*
     * Photo: Pexels — students in school environment
     * Source: https://www.pexels.com/photo/5905893/
     * Photographer: Katerina Holmes — Pexels License (free commercial use)
     */
    photo: "https://images.pexels.com/photos/5905893/pexels-photo-5905893.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    photoAlt: "Student connecting with university and career opportunities",
  },
  { key: "phase6", color: "#A78BFF",
    /*
     * Photo: Pexels — woman taking notes from laptop
     * Source: https://www.pexels.com/photo/9429372/
     * Photographer: Monstera Production — Pexels License (free commercial use)
     */
    photo: "https://images.pexels.com/photos/9429372/pexels-photo-9429372.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    photoAlt: "Graduate thriving in their chosen career",
  },
] as const;

/* ── Mobile: single phase scroll card ── */
function MobilePhaseCard({ phase, index }: { phase: typeof PHASES[number]; index: number }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.1"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0.4]);
  const y = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.95, 1]);

  return (
    <div
      ref={ref}
      style={{ minHeight: "90svh", display: "flex", alignItems: "center", padding: "32px 0", position: "relative" }}
    >
      <motion.div style={{ opacity, y, scale, width: "100%" }}>
        {/* Step indicator */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginBottom: 16,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%",
            background: `${phase.color}22`,
            border: `1.5px solid ${phase.color}55`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 13, fontWeight: 800, color: phase.color,
          }}>
            {index + 1}
          </div>
          <span style={{
            fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.12em", textTransform: "uppercase", color: phase.color,
            opacity: 0.85,
          }}>
            {(t as unknown as (k: string) => string)(`${phase.key}_name`)}
          </span>
        </div>

        {/* Photo */}
        <div style={{
          borderRadius: 18, overflow: "hidden", aspectRatio: "16/9",
          position: "relative", marginBottom: 20,
          boxShadow: "0 16px 40px rgba(0,0,0,0.40)",
          border: `1px solid ${phase.color}30`,
        }}>
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(180deg, transparent 60%, rgba(15,23,42,0.6) 100%)",
            pointerEvents: "none",
          }}/>
          <Image
            src={phase.photo}
            alt={phase.photoAlt}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
          />
        </div>

        {/* Text */}
        <h3 style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 22, fontWeight: 700,
          color: "var(--text-1)", lineHeight: 1.25, marginBottom: 12,
        }}>
          {(t as unknown as (k: string) => string)(`${phase.key}_head`)}
        </h3>
        <p style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: 15, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 20,
        }}>
          {(t as unknown as (k: string) => string)(`${phase.key}_body`)}
        </p>

        {/* Progress dots */}
        <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
          {PHASES.map((_, j) => (
            <div
              key={j}
              style={{
                width: j === index ? 22 : 6,
                height: 6, borderRadius: 99,
                background: j === index ? phase.color : "rgba(255,255,255,0.12)",
                transition: "all 0.3s",
              }}
            />
          ))}
          <span style={{
            fontFamily: "'Space Grotesk',sans-serif",
            fontSize: 10, color: "var(--text-3)",
            marginLeft: 8, fontWeight: 600,
          }}>
            {index + 1}/{PHASES.length}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default function Journey() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [active, setActive] = useState(0);

  return (
    <section
      ref={ref}
      id="journey"
      className="section"
      aria-labelledby="journey-heading"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 80px" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label" style={{ marginBottom: 20 }}
          >
            {t("journey_label")}
          </motion.p>
          <motion.h2
            id="journey-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="display-2"
          >
            {t("journey_h2_a")}{" "}
            <span className="text-gradient">{t("journey_h2_b")}</span>
            <br />
            {t("journey_h2_c")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg" style={{ marginTop: 20 }}
          >
            {t("journey_sub")}
          </motion.p>
        </div>

        {/* ── DESKTOP: tabbed phase selector — hidden on mobile via CSS ── */}
        <div className="journey-desktop">
          <div
            style={{
              display: "flex",
              gap: "clamp(24px, 6vw, 80px)",
              alignItems: "flex-start",
            }}
          >
            {/* Phase list */}
            <div
              role="tablist"
              aria-label="Journey phases"
              style={{ flex: "0 0 260px", display: "flex", flexDirection: "column", gap: 8 }}
            >
              {PHASES.map((phase, i) => {
                const isActive = active === i;
                return (
                  <motion.button
                    key={phase.key}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${i}`}
                    id={`tab-${i}`}
                    onClick={() => setActive(i)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.07 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "14px 16px",
                      borderRadius: 12,
                      background: isActive ? "rgba(119,77,255,0.10)" : "transparent",
                      border: `1px solid ${isActive ? "rgba(119,77,255,0.25)" : "transparent"}`,
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "all 0.2s",
                    }}
                  >
                    <div
                      className="phase-num"
                      style={{
                        background: isActive ? phase.color : "var(--purple-dim)",
                        color: isActive ? "#fff" : "var(--purple)",
                        transition: "all 0.25s",
                      }}
                    >
                      {i + 1}
                    </div>
                    <span style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 13, fontWeight: 600,
                      color: isActive ? "var(--text-1)" : "var(--text-3)",
                      lineHeight: 1.35, transition: "color 0.2s",
                    }}>
                      {(t as unknown as (k: string) => string)(`${phase.key}_name`)}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            {/* Detail panel */}
            <div style={{ flex: 1, minWidth: 260 }}>
              {PHASES.map((phase, i) => (
                <motion.div
                  key={phase.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={active === i ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  role="tabpanel"
                  id={`panel-${i}`}
                  aria-labelledby={`tab-${i}`}
                  style={{
                    display: active === i ? "grid" : "none",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 28,
                    alignItems: "center",
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    borderRadius: 20,
                    padding: "clamp(28px, 4vw, 44px)",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Accent top bar */}
                  <div style={{
                    height: 3,
                    background: `linear-gradient(90deg, ${phase.color}, transparent)`,
                    position: "absolute", top: 0, left: 0, right: 0,
                    borderRadius: "20px 20px 0 0",
                  }}/>

                  {/* Left: text content */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                      <div style={{
                        width: 44, height: 44, borderRadius: "50%",
                        background: `${phase.color}20`,
                        border: `1px solid ${phase.color}40`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontFamily: "'Space Grotesk',sans-serif",
                        fontSize: 16, fontWeight: 800, color: phase.color,
                      }}>
                        {i + 1}
                      </div>
                      <span style={{
                        fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700,
                        color: "var(--text-3)", letterSpacing: "0.10em", textTransform: "uppercase",
                      }}>
                        {(t as unknown as (k: string) => string)(`${phase.key}_name`)}
                      </span>
                    </div>

                    <h3 className="display-3" style={{ marginBottom: 16 }}>
                      {(t as unknown as (k: string) => string)(`${phase.key}_head`)}
                    </h3>
                    <p className="body-lg" style={{ marginBottom: 28 }}>
                      {(t as unknown as (k: string) => string)(`${phase.key}_body`)}
                    </p>

                    {/* Progress steps */}
                    <div style={{ display: "flex", gap: 6 }}>
                      {PHASES.map((_, j) => (
                        <div
                          key={j}
                          style={{
                            flex: 1, height: 3, borderRadius: 99,
                            background: j <= i ? phase.color : "rgba(255,255,255,0.07)",
                            transition: "background 0.3s",
                          }}
                        />
                      ))}
                    </div>
                    <p style={{
                      fontFamily: "'Space Grotesk',sans-serif",
                      fontSize: 11, color: "var(--text-3)", marginTop: 8,
                    }}>
                      Phase {i + 1} of {PHASES.length}
                    </p>
                  </div>

                  {/* Right: photo */}
                  <div style={{
                    borderRadius: 14, overflow: "hidden", aspectRatio: "4/3",
                    position: "relative",
                    boxShadow: "0 12px 32px rgba(0,0,0,0.35)",
                    border: `1px solid ${phase.color}25`,
                  }}>
                    <Image
                      src={phase.photo}
                      alt={phase.photoAlt}
                      fill
                      sizes="300px"
                      style={{ objectFit: "cover" }}
                    />
                    <div style={{
                      position: "absolute", bottom: 10, left: 10, zIndex: 2,
                      background: phase.color, borderRadius: 6, padding: "3px 10px",
                      fontFamily: "'Space Grotesk',sans-serif", fontSize: 9,
                      fontWeight: 800, color: "white", letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}>
                      {(t as unknown as (k: string) => string)(`${phase.key}_name`)}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MOBILE: sticky scroll phases — hidden on desktop via CSS ── */}
        <div className="journey-mobile">
          {PHASES.map((phase, i) => (
            <MobilePhaseCard key={phase.key} phase={phase} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
