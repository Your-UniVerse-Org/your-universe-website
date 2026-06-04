"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= breakpoint);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, [breakpoint]);
  return isMobile;
}

/**
 * HeroVisual — Real human photography + EdTech floating icon badges
 *
 * Photo credit: Pexels.com (free commercial license)
 * Source: https://www.pexels.com/photo/3769021/
 * Photographer: Andrea Piacquadio
 *
 * Floating icons inspired by Dribbble EdTech Course Website shot
 * (https://dribbble.com/shots/26226575-Edtech-Course-Website)
 * Pattern: small rounded icon-badges orbit the hero content.
 */

/* ── Floating icon badge component ── */
function IconBadge({
  icon,
  label,
  style,
  delay = 0,
  accent = "#774DFF",
}: {
  icon: React.ReactNode;
  label: string;
  style: React.CSSProperties;
  delay?: number;
  accent?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.34, 1.56, 0.64, 1] }}
      aria-hidden="true"
      style={{
        position: "absolute",
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "rgba(15,24,40,0.92)",
        border: `1px solid ${accent}44`,
        borderRadius: 99,
        padding: "8px 14px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: `0 8px 24px rgba(0,0,0,0.30), 0 0 0 1px ${accent}22`,
        zIndex: 10,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <span style={{ color: accent, display: "flex", flexShrink: 0 }}>{icon}</span>
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 11,
        fontWeight: 700,
        color: "rgba(241,245,249,0.82)",
        letterSpacing: "0.03em",
      }}>
        {label}
      </span>
    </motion.div>
  );
}

export default function HeroVisual() {
  const isMobile = useIsMobile();

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 440, flexShrink: 0 }}>

      {/* ── EdTech floating icon badges — evenly distributed around all 4 corners/sides ── */}

      {/* Top-left corner — AI Guidance */}
      <IconBadge
        delay={0.55}
        accent="#774DFF"
        label="AI Guidance"
        style={isMobile ? { top: -14, left: -8 } : { top: -14, left: -20 }}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
            <path d="M9 18h6"/><path d="M10 22h4"/>
          </svg>
        }
      />

      {/* Top-right corner — Free for Students */}
      <IconBadge
        delay={0.68}
        accent="#FE4A23"
        label="Free for Students"
        style={isMobile ? { top: -14, right: -8 } : { top: -14, right: -20 }}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
          </svg>
        }
      />

      {/* Mid-right — Career Match */}
      <IconBadge
        delay={0.82}
        accent="#FE4A23"
        label="Career Match"
        style={isMobile ? { top: "28%", right: -8 } : { top: "32%", right: -28 }}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
          </svg>
        }
      />

      {/* Mid-left — Smart Plan */}
      <IconBadge
        delay={0.96}
        accent="#774DFF"
        label="Smart Plan"
        style={isMobile ? { top: "38%", left: -8 } : { top: "38%", left: -24 }}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"/>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/>
            <path d="M12 2v4m0 12v4M2 12h4m12 0h4"/>
          </svg>
        }
      />

      {/* Bottom — Grade 9 Ready (bottom-right on mobile, bottom-left on desktop) */}
      <IconBadge
        delay={1.1}
        accent="#A78BFF"
        label="Grade 9 Ready"
        style={isMobile ? { bottom: -14, right: -8 } : { bottom: -14, left: -20 }}
        icon={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        }
      />

      {/* ── Main photo frame ── */}
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          aspectRatio: "4 / 5",
          boxShadow: "0 32px 80px rgba(0,0,0,0.45), 0 0 0 1px rgba(119,77,255,0.18)",
        }}
      >
        {/* Gradient overlay */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "var(--media-overlay-hero)",
        }}/>
        {/* Brand tint */}
        <div aria-hidden="true" style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "rgba(119,77,255,0.05)",
        }}/>

        {/*
          Photo: Pexels — "Student studying"
          Source: https://www.pexels.com/photo/3769021/
          Photographer: Andrea Piacquadio
          License: Free to use (Pexels License)
        */}
        <Image
          src="https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=880&h=1100&fit=crop"
          alt="South African student studying with books and technology"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 440px"
          style={{ objectFit: "cover", objectPosition: "center 20%" }}
        />

      </motion.div>

      {/* APS score card — on desktop: left side; on mobile: lower to avoid covering face */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute",
          top: isMobile ? 230 : 110,
          left: isMobile ? -8 : -24,
          zIndex: 10,
          background: "rgba(15,24,40,0.94)",
          border: "1px solid rgba(119,77,255,0.32)",
          borderRadius: 12, padding: "9px 12px",
          backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
          boxShadow: "0 6px 24px rgba(0,0,0,0.32)",
          minWidth: 0,
        }}
      >
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 8.5, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(148,163,184,0.55)", marginBottom: 6, textTransform: "uppercase" }}>
          APS Score
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
            background: "conic-gradient(#774DFF 0% 87%, var(--surface-3) 87% 100%)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: "50%",
              background: "rgba(15,24,40,0.98)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Space Grotesk',sans-serif", fontSize: 7.5, fontWeight: 700, color: "#A78BFF",
            }}>87%</div>
          </div>
          <div>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 10.5, fontWeight: 600, color: "rgba(241,245,249,0.90)" }}>Medical Sciences</p>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 8.5, color: "rgba(148,163,184,0.55)" }}>Top career match</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
