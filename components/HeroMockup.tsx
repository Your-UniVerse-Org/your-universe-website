"use client";

import { motion } from "framer-motion";

interface HeroMockupProps {
  compact?: boolean;
}

const CARD = {
  bg: "rgba(26,39,68,0.9)",
  border: "rgba(119,77,255,0.18)",
};

function ProgressBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{ height: "100%", borderRadius: 99, background: color }}
      />
    </div>
  );
}

function ScoreRing({ score, size = 52, color = "#774DFF" }: { score: number; size?: number; color?: string }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" />
        <motion.circle
          cx={size/2} cy={size/2} r={r}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.4, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      </svg>
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Space Grotesk', sans-serif", fontSize: size * 0.26, fontWeight: 700, color: "#F1F5F9",
      }}>
        {score}
      </div>
    </div>
  );
}

export default function HeroMockup({ compact = false }: HeroMockupProps) {
  const scale = compact ? 0.78 : 1;
  const w = compact ? 290 : 440;

  return (
    <div
      aria-label="Dashboard preview"
      style={{
        width: w,
        fontFamily: "'Inter', sans-serif",
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        position: "relative",
      }}
    >
      {/* ── Main dashboard card ─────────────────────────────────── */}
      <div
        style={{
          background: "rgba(20,30,46,0.95)",
          border: "1px solid rgba(119,77,255,0.20)",
          borderRadius: 20,
          padding: "24px",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(119,77,255,0.10), inset 0 1px 0 rgba(255,255,255,0.05)",
          backdropFilter: "blur(20px)",
        }}
      >

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <p style={{ fontSize: 11, color: "var(--text-3)", marginBottom: 3, fontWeight: 500, letterSpacing: "0.06em" }}>
              DECISION INTELLIGENCE
            </p>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--text-1)", fontFamily: "'Space Grotesk', sans-serif" }}>
              Your Career Profile
            </p>
          </div>
          <motion.div
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              padding: "5px 12px",
              background: "rgba(119,77,255,0.15)",
              border: "1px solid rgba(119,77,255,0.3)",
              borderRadius: 100,
              fontSize: 10,
              fontWeight: 700,
              color: "var(--purple)",
              letterSpacing: "0.08em",
            }}
          >
            AI ACTIVE
          </motion.div>
        </div>

        {/* Score rings row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
          <div style={{ textAlign: "center" }}>
            <ScoreRing score={87} color="#774DFF" />
            <p style={{ fontSize: 10, color: "var(--text-3)", marginTop: 6, fontWeight: 600 }}>Career Fit</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <ScoreRing score={72} color="#FE4A23" />
            <p style={{ fontSize: 10, color: "var(--text-3)", marginTop: 6, fontWeight: 600 }}>APS Score</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <ScoreRing score={94} color="#A78BFF" />
            <p style={{ fontSize: 10, color: "var(--text-3)", marginTop: 6, fontWeight: 600 }}>Profile</p>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{
              background: "rgba(119,77,255,0.08)",
              border: "1px solid rgba(119,77,255,0.18)",
              borderRadius: 12,
              padding: "10px 14px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 4,
            }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: "var(--purple)", letterSpacing: "0.08em" }}>TOP MATCH</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-1)", fontFamily: "'Space Grotesk', sans-serif" }}>
                Engineering
              </p>
              <p style={{ fontSize: 10, color: "var(--text-3)" }}>Grade 11 learner</p>
            </div>
          </div>
        </div>

        {/* Subject progress */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-3)", letterSpacing: "0.06em" }}>SUBJECT PROGRESS</p>
            <p style={{ fontSize: 10, color: "var(--purple)" }}>Grade 11</p>
          </div>
          {[
            { sub: "Mathematics",       pct: 78, color: "#774DFF" },
            { sub: "Physical Sciences", pct: 65, color: "#FE4A23" },
            { sub: "Life Sciences",     pct: 82, color: "#A78BFF" },
          ].map((row) => (
            <div key={row.sub} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: "var(--text-2)" }}>{row.sub}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-1)" }}>{row.pct}%</span>
              </div>
              <ProgressBar value={row.pct} color={row.color} />
            </div>
          ))}
        </div>

        {/* AI insight card */}
        <motion.div
          animate={{ borderColor: ["rgba(119,77,255,0.15)", "rgba(119,77,255,0.35)", "rgba(119,77,255,0.15)"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "rgba(119,77,255,0.07)",
            border: "1px solid rgba(119,77,255,0.20)",
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
          }}
        >
          <div style={{ fontSize: 16 }} aria-hidden="true">✦</div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--purple)", marginBottom: 3, letterSpacing: "0.04em" }}>
              AI INSIGHT
            </p>
            <p style={{ fontSize: 11, color: "var(--text-2)", lineHeight: 1.5 }}>
              Adding Technical Drawing unlocks 4 additional engineering pathways at UCT and Wits.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ── Floating card: Career match ─────────────────────────── */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          style={{
            position: "absolute",
            top: -32,
            right: -40,
            background: CARD.bg,
            border: `1px solid ${CARD.border}`,
            borderRadius: 14,
            padding: "12px 16px",
            width: 180,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(254,74,35,0.15)", border: "1px solid rgba(254,74,35,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--orange-text)" strokeWidth="2.5" aria-hidden="true">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--text-1)", fontFamily: "'Space Grotesk', sans-serif" }}>
              3 universities
            </p>
          </div>
          <p style={{ fontSize: 10, color: "var(--text-3)", lineHeight: 1.4 }}>
            matched to your current APS trajectory
          </p>
          <div style={{ marginTop: 8, height: 2, borderRadius: 99, background: "rgba(254,74,35,0.2)" }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "68%" }}
              transition={{ delay: 1.5, duration: 1 }}
              style={{ height: "100%", borderRadius: 99, background: "var(--orange)" }}
            />
          </div>
        </motion.div>
      )}

      {/* ── Floating card: Psychometric ─────────────────────────── */}
      {!compact && (
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{
            position: "absolute",
            bottom: 60,
            left: -48,
            background: CARD.bg,
            border: `1px solid ${CARD.border}`,
            borderRadius: 14,
            padding: "12px 16px",
            width: 175,
            boxShadow: "0 20px 50px rgba(0,0,0,0.4)",
            backdropFilter: "blur(16px)",
          }}
        >
          <p style={{ fontSize: 10, fontWeight: 700, color: "var(--purple)", marginBottom: 6, letterSpacing: "0.06em" }}>
            PSYCHOMETRIC
          </p>
          {[
            { label: "Analytical", pct: 91, color: "#774DFF" },
            { label: "Creative",   pct: 64, color: "#FE4A23" },
          ].map((row) => (
            <div key={row.label} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                <span style={{ fontSize: 10, color: "var(--text-2)" }}>{row.label}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-1)" }}>{row.pct}%</span>
              </div>
              <ProgressBar value={row.pct} color={row.color} />
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
