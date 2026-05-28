"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import type { BezierDefinition } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import HeroMockup from "./HeroMockup";
import { useLang } from "./LanguageContext";

const CUBIC: BezierDefinition = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const prefersReduced = useReducedMotion();

  // Detect mobile client-side — skip expensive parallax + blur on small screens
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const fn = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  const skipHeavy = isMobile || !!prefersReduced;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // On mobile: keep y=0 and opacity=1 — no scroll-driven compositing
  const y = useTransform(scrollYProgress, [0, 1], skipHeavy ? [0, 0] : [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, skipHeavy ? 1 : 0]);

  const TRUST = [t("trust_1"), t("trust_2"), t("trust_3"), t("trust_4")];

  // Headline animation: opacity + y only — no filter:blur anywhere.
  // blur() forces per-span GPU compositing layers and causes blank text on mobile
  // due to hydration timing (isMobile starts false, blur renders before effect fires).
  const lineAnim = (delay: number) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: skipHeavy ? 0.4 : 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number,number,number,number] },
    style: { display: "block" } as React.CSSProperties,
  });

  return (
    <section ref={ref} className="hero-section" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "center" }}>
      <div className="hero-grid" />
      <div className="hero-glow" />
      {/* Extra ambient orbs — desktop only to save mobile GPU */}
      {!isMobile && (
        <>
          <div style={{ position: "absolute", top: "18%", right: "8%", width: 480, height: 480, background: "radial-gradient(circle, rgba(61,127,255,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: "22%", left: "6%", width: 280, height: 280, background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "60%", left: "40%", width: 200, height: 200, background: "radial-gradient(circle, rgba(240,165,0,0.04) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        </>
      )}

      <motion.div style={{ y, opacity: heroOpacity, width: "100%" }} className="container">
        <div className="hero-cols">
          <div style={{ flex: "1 1 auto", minWidth: 0, maxWidth: 580 }}>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0, ease: CUBIC }} style={{ marginBottom: 36 }}>
              <span className="pill"><span className="pill-dot" />{t("hero_badge")}</span>
            </motion.div>

            {/* Headline — translated line by line */}
            <div className="display-1" style={{ marginBottom: 36 }}>
              <motion.span {...lineAnim(0.05)}>{t("hero_line1")}</motion.span>
              <motion.span {...lineAnim(0.15)} style={{ ...lineAnim(0.15).style, fontStyle: "italic" }}>
                {t("hero_line2")}
              </motion.span>
              <motion.span {...lineAnim(0.25)}>
                {t("hero_line3")}{" "}
                <span className="text-gradient">{t("hero_accent")}</span>
              </motion.span>
              <motion.span {...lineAnim(0.35)}>{t("hero_line4")}</motion.span>
            </div>

            {/* Subline */}
            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.45, ease: CUBIC }}
              className="body-lg" style={{ maxWidth: 460, marginBottom: 32 }}>
              {t("hero_sub")}
            </motion.p>

            {/* Mobile mockup */}
            <motion.div className="hero-mockup-mobile-inline" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.55, ease: CUBIC }} style={{ marginBottom: 40 }}>
              <HeroMockup />
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.55, ease: CUBIC }} className="hero-cta">
              <Link href="/early-access" className="btn btn-primary hero-btn">
                {t("hero_cta1")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <Link href="/platform" className="btn btn-ghost hero-btn">{t("hero_cta2")}</Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.65 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "10px 32px", borderTop: "1px solid var(--border)", paddingTop: 28 }}>
              {TRUST.map((tr) => (
                <div key={tr} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--blue)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500, color: "var(--text-3)", letterSpacing: "0.04em" }}>{tr}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Desktop mockup */}
          <motion.div className="hero-mockup-col hero-mockup-desktop" initial={{ opacity: 0, y: 32, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}>
            <HeroMockup />
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65, duration: 0.8 }} className="hero-scroll-cue">
        <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.5"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" as const }}>
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
