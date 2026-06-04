"use client";

import type React from "react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "./LanguageContext";
import Link from "next/link";

/* SVG icons — no emojis */
const ICONS: Record<string, React.ReactNode> = {
  s1: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
    </svg>
  ),
  s2: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  s3: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  ),
  s4: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="7" width="20" height="15" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
    </svg>
  ),
};

const STAKEHOLDERS = [
  {
    key:   "s1",
    color: "#774DFF",
    features: ["eco_s1_f1","eco_s1_f2","eco_s1_f3","eco_s1_f4","eco_s1_f5","eco_s1_f6"],
    free: true,
  },
  {
    key:   "s2",
    color: "#FE4A23",
    features: ["eco_s2_f1","eco_s2_f2","eco_s2_f3","eco_s2_f4","eco_s2_f5","eco_s2_f6"],
    free: false,
  },
  {
    key:   "s3",
    color: "#A78BFF",
    features: ["eco_s3_f1","eco_s3_f2","eco_s3_f3","eco_s3_f4","eco_s3_f5","eco_s3_f6"],
    free: false,
  },
  {
    key:   "s4",
    color: "#FF6B47",
    features: ["eco_s4_f1","eco_s4_f2","eco_s4_f3","eco_s4_f4","eco_s4_f5","eco_s4_f6"],
    free: false,
  },
] as const;

export default function Ecosystem() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      id="ecosystem"
      className="section"
      aria-labelledby="ecosystem-heading"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 80px" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label" style={{ marginBottom: 20 }}
          >
            {t("eco_label")}
          </motion.p>
          <motion.h2
            id="ecosystem-heading"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="display-2"
          >
            {t("eco_h2_1")}<br />
            <span className="text-gradient">{t("eco_h2_2")}</span>{" "}{t("eco_h2_3")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg" style={{ marginTop: 20 }}
          >
            {t("eco_sub")}
          </motion.p>
        </div>

        {/* Stakeholder cards: 2×2 desktop, 4-across on wide, stacked on mobile */}
        <div
          className="ecosystem-grid"
          role="list"
          aria-label="Stakeholder groups"
        >
          {STAKEHOLDERS.map((s, i) => (
            <motion.div
              key={s.key}
              role="listitem"
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="ecosystem-card"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 20,
                padding: "32px 28px 28px",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                height: "100%",
                transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = `${s.color}40`; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)"; }}
            >
              {/* Icon + title */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: `${s.color}18`,
                    border: `1px solid ${s.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                >
                  {ICONS[s.key]}
                </div>
                <div>
                  <h3 className="h3">{t(`eco_${s.key}_title` as Parameters<typeof t>[0])}</h3>
                  <p style={{ fontSize: 12, color: "var(--text-3)", marginTop: 2 }}>
                    {t(`eco_${s.key}_sub` as Parameters<typeof t>[0])}
                  </p>
                </div>
              </div>

              {s.free && (
                <span className="pill" style={{ alignSelf: "flex-start", marginBottom: 20, marginTop: 4 }}>
                  <span className="pill-dot" />
                  {t(`eco_${s.key}_cta` as Parameters<typeof t>[0])}
                </span>
              )}
              {!s.free && (
                <span className="pill pill-orange" style={{ alignSelf: "flex-start", marginBottom: 20, marginTop: 4 }}>
                  {t(`eco_${s.key}_cta` as Parameters<typeof t>[0])}
                </span>
              )}

              {/* Feature list */}
              <ul style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                {s.features.map((fk) => (
                  <li key={fk} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.color} strokeWidth="2.5" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden="true">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    <span style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>
                      {t(fk as Parameters<typeof t>[0])}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Footer CTA */}
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: "1px solid var(--border)" }}>
                <Link
                  href="/early-access"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Space Grotesk', sans-serif",
                    color: s.color,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.75"; }}
                  onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
                >
                  Get early access
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
