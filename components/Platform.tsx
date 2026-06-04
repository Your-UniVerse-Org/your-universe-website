"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "./LanguageContext";

const PLATFORM_CARDS = [
  {
    key: "p1",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20z"/><path d="m4.93 4.93 14.14 14.14"/><path d="m12 2-3 10 3 2 3-2-3-10z"/>
      </svg>
    ),
    accent: "purple",
  },
  {
    key: "p2",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    accent: "purple",
  },
  {
    key: "p3",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
      </svg>
    ),
    accent: "purple",
  },
  {
    key: "p4",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    accent: "orange",
  },
  {
    key: "p5",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      </svg>
    ),
    accent: "orange",
  },
  {
    key: "p6",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
        <polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
      </svg>
    ),
    accent: "orange",
  },
] as const;

export default function Platform() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      id="platform"
      className="section"
      aria-labelledby="platform-heading"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">

        {/* Header + intro */}
        <div className="split-2" style={{ marginBottom: 72 }}>
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="label" style={{ marginBottom: 20 }}
            >
              {t("platform_label")}
            </motion.p>
            <motion.h2
              id="platform-heading"
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="display-2"
            >
              {t("plat_h2_a")}<br />
              <span className="text-gradient">{t("plat_h2_b")}</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2 }}
          >
            <p className="body-lg" style={{ marginBottom: 28 }}>
              {t("plat_body")}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              <span className="pill"><span className="pill-dot" />6 Intelligence Systems</span>
              <span className="pill pill-orange">NSC + IEB Ready</span>
              <span className="pill">Free for Students</span>
            </div>
          </motion.div>
        </div>

        {/* ── Human photo strip ── */}
        {/* Photos: Unsplash (free commercial use under Unsplash License) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 64,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          {[
            /* photo-1509062522246-3755977927d7 – student with notes at desk */
            { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=340&fit=crop&q=80", alt: "Student reviewing career and subject options" },
            /* pexels/6238043 — Monstera Production education series */
            { src: "https://images.pexels.com/photos/6238043/pexels-photo-6238043.jpeg?auto=compress&cs=tinysrgb&w=600&h=340&fit=crop", alt: "Student building their academic profile" },
            /* photo-1517486808906-6ca8b3f04846 – students at laptops together */
            { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600&h=340&fit=crop&q=80", alt: "Students discovering career pathways with YourUniverse" },
          ].map((img, i) => (
            <div key={i} style={{ position: "relative", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
              <div className="media-overlay-hero" style={{ position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none" }} />
              <Image src={img.src} alt={img.alt} fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectFit: "cover" }} />
            </div>
          ))}
        </motion.div>

        {/* Cards grid */}
        <div
          className="features-grid"
          role="list"
          aria-label="Platform intelligence systems"
        >
          {PLATFORM_CARDS.map((card, i) => {
            const isOrange = card.accent === "orange";
            return (
              <motion.article
                key={card.key}
                role="listitem"
                initial={{ opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.3 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="feature-card"
                style={{ padding: "32px 28px" }}
              >
                <div
                  className={isOrange ? "icon-box icon-box-orange" : "icon-box"}
                  style={{ marginBottom: 20 }}
                  aria-hidden="true"
                >
                  {card.icon}
                </div>

                <h3 className="h3" style={{ marginBottom: 12 }}>
                  {t(`plat_${card.key}_title` as Parameters<typeof t>[0])}
                </h3>

                <p className="body">
                  {t(`plat_${card.key}_body` as Parameters<typeof t>[0])}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
