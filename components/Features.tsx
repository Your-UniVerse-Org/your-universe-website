"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "./LanguageContext";

const FEATURES = [
  {
    key:  "f1",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
  },
  {
    key:  "f2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    key:  "f3",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
      </svg>
    ),
  },
  {
    key:  "f4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
  },
  {
    key:  "f5",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
  },
  {
    key:  "f6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
  },
] as const;

export default function Features() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      id="features"
      className="section"
      aria-labelledby="features-heading"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 72px" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label" style={{ marginBottom: 20 }}
          >
            {t("features_label")}
          </motion.p>
          <motion.h2
            id="features-heading"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="display-2" style={{ marginBottom: 20 }}
          >
            {t("features_h2")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg"
          >
            {t("features_sub")}
          </motion.p>
        </div>

        {/* ── Human photo banner — taller for visual impact ── */}
        {/* Photo: Pexels — Monstera Production, Pexels License (free commercial use) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            minHeight: "clamp(260px, 38vw, 480px)",
            marginBottom: 72,
            border: "1px solid var(--border)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.32)",
          }}
        >
          {/* Dark vignette — heavier on left for text legibility */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.50) 45%, rgba(15,23,42,0.20) 100%)", zIndex: 1, pointerEvents: "none" }} />
          {/* Purple brand tint */}
          <div style={{ position: "absolute", inset: 0, background: "rgba(119,77,255,0.07)", zIndex: 1, pointerEvents: "none" }} />
          <Image
            src="https://images.pexels.com/photos/6238089/pexels-photo-6238089.jpeg?auto=compress&cs=tinysrgb&w=1600&h=700&fit=crop&crop=center"
            alt="Students and educators using the YourUniverse platform"
            fill sizes="(max-width:768px) 100vw, 100vw"
            style={{ objectFit: "cover", objectPosition: "center 35%" }}
          />
          {/* Overlay text content */}
          <div style={{ position: "absolute", inset: 0, zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: "clamp(32px,6vw,88px)" }}>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(167,139,255,0.95)", marginBottom: 14 }}>
              Built exclusively for South Africa
            </p>
            <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: "clamp(26px,4.5vw,48px)", color: "rgba(241,245,249,0.97)", lineHeight: 1.2, maxWidth: 560, marginBottom: 24 }}>
              Every feature designed around the learner, not the institution.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {["NSC + IEB Ready", "Free for Students", "AI-Powered", "Grade 9 to 12"].map(tag => (
                <span key={tag} style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 600, color: "rgba(241,245,249,0.80)", background: "rgba(119,77,255,0.22)", border: "1px solid rgba(119,77,255,0.35)", borderRadius: 99, padding: "5px 14px", backdropFilter: "blur(8px)" }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Grid */}
        <div
          className="features-grid"
          role="list"
          aria-label="Platform features"
        >
          {FEATURES.map((feat, i) => (
            <motion.article
              key={feat.key}
              role="listitem"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.3 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              className="feature-card"
              style={{ padding: "32px 28px" }}
            >
              <div className="icon-box" style={{ marginBottom: 20 }} aria-hidden="true">
                {feat.icon}
              </div>
              <h3 className="h3" style={{ marginBottom: 12 }}>
                {t(`feat_${feat.key}_title` as Parameters<typeof t>[0])}
              </h3>
              <p className="body">
                {t(`feat_${feat.key}_body` as Parameters<typeof t>[0])}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
