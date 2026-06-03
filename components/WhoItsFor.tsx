"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "./LanguageContext";

const PERSONAS = [
  {
    key:   "p1",
    icon:  (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
      </svg>
    ),
  },
  {
    key:   "p2",
    icon:  (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2z"/><path d="M12 16v-4M12 8h.01"/>
      </svg>
    ),
  },
  {
    key:   "p3",
    icon:  (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
      </svg>
    ),
  },
] as const;

export default function WhoItsFor() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      id="who-its-for"
      className="section"
      aria-labelledby="who-heading"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ maxWidth: 640, marginBottom: 72 }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label" style={{ marginBottom: 20 }}
          >
            {t("who_label")}
          </motion.p>
          <motion.h2
            id="who-heading"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="display-2" style={{ marginBottom: 20 }}
          >
            {t("who_h2")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg"
          >
            {t("who_sub")}
          </motion.p>
        </div>

        {/* Persona cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))",
            gap: 20,
          }}
          role="list"
        >
          {PERSONAS.map((p, i) => (
            <motion.div
              key={p.key}
              role="listitem"
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="grad-border"
              style={{ padding: "36px 32px" }}
            >
              {/* Icon */}
              <div className="icon-box" style={{ marginBottom: 24 }} aria-hidden="true">
                {p.icon}
              </div>

              {/* Title */}
              <h3 className="h3" style={{ marginBottom: 16 }}>
                {t(`who_${p.key}_title` as Parameters<typeof t>[0])}
              </h3>

              {/* Quote */}
              <blockquote
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontStyle: "italic",
                  fontSize: "clamp(15px, 1.5vw, 18px)",
                  color: "var(--text-1)",
                  lineHeight: 1.5,
                  paddingLeft: 16,
                  borderLeft: "2px solid var(--purple)",
                  marginBottom: 20,
                }}
              >
                &ldquo;{t(`who_${p.key}_quote` as Parameters<typeof t>[0])}&rdquo;
              </blockquote>

              {/* Body */}
              <p className="body">
                {t(`who_${p.key}_body` as Parameters<typeof t>[0])}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
