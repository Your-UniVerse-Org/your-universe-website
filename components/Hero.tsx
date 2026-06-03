"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLang } from "./LanguageContext";
import HeroVisual from "./HeroVisual";

const FLY = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

export default function Hero() {
  const { t } = useLang();
  const reduced = useReducedMotion();

  return (
    <section
      className="hero-section"
      aria-label="Hero"
      style={{
        position: "relative",
        background: "var(--bg)",
        overflow: "hidden",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Background grid */}
      <div className="hero-grid" aria-hidden="true" />

      {/* Radial glow */}
      <div className="hero-glow" aria-hidden="true" />

      {/* Accent orbs — subtle, not dominant */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.05, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{
              position: "absolute",
              top: "6%",
              right: "10%",
              width: 340,
              height: 340,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(119,77,255,0.11) 0%, transparent 70%)",
              filter: "blur(50px)",
              pointerEvents: "none",
            }}
          />
          <motion.div
            aria-hidden="true"
            animate={{ opacity: [0.12, 0.28, 0.12], scale: [1, 1.06, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            style={{
              position: "absolute",
              bottom: "20%",
              left: "4%",
              width: 260,
              height: 260,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(254,74,35,0.08) 0%, transparent 70%)",
              filter: "blur(40px)",
              pointerEvents: "none",
            }}
          />
        </>
      )}

      <div className="container" style={{ width: "100%", position: "relative", zIndex: 1, flex: 1, display: "flex", alignItems: "center", paddingTop: "clamp(80px,12vh,140px)", paddingBottom: "clamp(40px,6vh,80px)" }}>
        <div className="hero-cols" style={{ width: "100%" }}>

          {/* ── Left content ──────────────────────────────────── */}
          <div style={{ flex: "1 1 0", minWidth: 0, maxWidth: 560 }}>

            {/* Eyebrow pill */}
            <motion.div {...FLY(0.15)}>
              <span className="pill" style={{ marginBottom: 28, display: "inline-flex" }}>
                <span className="pill-dot" />
                {t("hero_badge")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 {...FLY(0.25)} className="display-1" style={{ marginBottom: 28 }}>
              {t("hero_line1")}{" "}
              <em className="serif text-italic" style={{ color: "var(--text-2)" }}>
                {t("hero_line2")}
              </em>
              <br />
              {t("hero_line3")}{" "}
              <span className="text-gradient">{t("hero_accent")}</span>
              <br />
              <span style={{ color: "var(--text-2)", fontStyle: "italic" }}>
                {t("hero_line4")}
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              {...FLY(0.35)}
              className="body-lg"
              style={{ maxWidth: 440, marginBottom: 40 }}
            >
              {t("hero_sub")}
            </motion.p>

            {/* CTAs */}
            <motion.div {...FLY(0.42)} className="hero-cta">
              <Link
                href="/early-access"
                className="btn btn-primary hero-btn"
                aria-label="Request early access"
              >
                {t("hero_cta1")}
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"
                >
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
              <Link
                href="/platform"
                className="btn btn-ghost hero-btn"
                aria-label="See the platform"
              >
                {t("hero_cta2")}
                <svg
                  width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
                >
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div {...FLY(0.50)} className="trust-strip">
              {(["trust_1", "trust_2", "trust_3", "trust_4"] as const).map((k) => (
                <span key={k} className="trust-item">
                  <svg
                    width="13" height="13" viewBox="0 0 24 24"
                    fill="none" stroke="var(--purple)" strokeWidth="2.5" aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {t(k)}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Real human photo ─────────────────────── */}
          <div className="hero-illustration-col">
            <HeroVisual />
          </div>
        </div>
      </div>

      {/* Institutional partner strip — in normal document flow with generous spacing */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          borderTop: "1px solid var(--border)",
          paddingTop: "clamp(28px, 4vh, 48px)",
          paddingBottom: "clamp(28px, 4vh, 48px)",
          marginTop: "auto",
        }}
      >
        <div className="container">
          <motion.div {...FLY(0.6)} className="institutions-strip">
            {[
              "Departments of Education",
              "Public & Independent Schools",
              "Universities",
              "TVET Colleges",
              "Skills Providers",
              "Parents",
            ].map((name) => (
              <span key={name} className="institution-badge">
                {name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="hero-scroll-cue" aria-hidden="true">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg
            width="24" height="24" viewBox="0 0 24 24"
            fill="none" stroke="var(--text-3)" strokeWidth="1.5"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
