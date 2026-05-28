"use client";

import { motion } from "framer-motion";

const CUBIC: [number, number, number, number] = [0.22, 1, 0.36, 1];

const an = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: CUBIC },
});

const metrics = [
  { label: "APS Score", value: "38", change: "+4", color: "#3D7FFF" },
  { label: "Career Match", value: "94%", change: "↑12%", color: "#A78BFA" },
  { label: "Readiness", value: "High", change: "✓", color: "#22C55E" },
];

const subjects = [
  { name: "Mathematics", grade: "A", pct: 86, color: "#3D7FFF" },
  { name: "Physical Science", grade: "B+", pct: 74, color: "#A78BFA" },
  { name: "Life Science", grade: "A−", pct: 81, color: "#22C55E" },
];

export default function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.1, delay: 0.4, ease: CUBIC }}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 440,
        flexShrink: 0,
      }}
    >
      {/* Glow behind card */}
      <div style={{
        position: "absolute",
        inset: "-40px",
        background: "radial-gradient(ellipse at 50% 40%, rgba(61,127,255,0.18) 0%, rgba(167,139,250,0.08) 50%, transparent 70%)",
        pointerEvents: "none",
        borderRadius: "50%",
      }} />

      {/* Main card */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(135deg, rgba(12,17,36,0.95) 0%, rgba(7,11,24,0.98) 100%)",
          border: "1px solid rgba(61,127,255,0.18)",
          borderRadius: 20,
          padding: "24px",
          backdropFilter: "blur(24px)",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(61,127,255,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8,
            background: "linear-gradient(135deg, #3D7FFF, #A78BFA)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.798-1.442 2.798H4.24c-1.472 0-2.441-1.798-1.442-2.798L4.2 15.3" />
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: "#EDF2FF", lineHeight: 1.2 }}>Your Profile</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(137,153,187,0.7)" }}>Grade 11 · Gauteng</p>
          </div>
          <div style={{ marginLeft: "auto", display: "flex", gap: 5 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 6px #22C55E" }} />
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 600, color: "#22C55E", letterSpacing: "0.06em" }}>LIVE</span>
          </div>
        </div>

        {/* Metric chips */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 20 }}>
          {metrics.map((m) => (
            <div key={m.label} style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${m.color}22`,
              borderRadius: 10,
              padding: "10px 10px 8px",
              textAlign: "center",
            }}>
              <p style={{ fontFamily: "'Instrument Serif',serif", fontSize: 18, fontWeight: 400, color: m.color, lineHeight: 1, marginBottom: 3 }}>{m.value}</p>
              <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 9, color: "rgba(137,153,187,0.6)", lineHeight: 1.2, marginBottom: 3 }}>{m.label}</p>
              <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 9, fontWeight: 600, color: m.color }}>{m.change}</span>
            </div>
          ))}
        </div>

        {/* Subject bars */}
        <div style={{ marginBottom: 20 }}>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(137,153,187,0.5)", marginBottom: 12 }}>Subject Performance</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {subjects.map((s) => (
              <div key={s.name}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontFamily: "'Inter',sans-serif", fontSize: 12, color: "rgba(237,242,255,0.8)" }}>{s.name}</span>
                  <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 600, color: s.color }}>{s.grade}</span>
                </div>
                <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 99, overflow: "hidden" }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${s.pct}%` }}
                    transition={{ duration: 1.2, delay: 0.8 + subjects.indexOf(s) * 0.15, ease: CUBIC }}
                    style={{ height: "100%", background: `linear-gradient(90deg, ${s.color}, ${s.color}88)`, borderRadius: 99 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI recommendation chip */}
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            background: "linear-gradient(135deg, rgba(61,127,255,0.08), rgba(167,139,250,0.06))",
            border: "1px solid rgba(61,127,255,0.2)",
            borderRadius: 10,
            padding: "10px 12px",
          }}
        >
          <div style={{ width: 20, height: 20, borderRadius: 6, background: "linear-gradient(135deg, #3D7FFF, #A78BFA)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 600, color: "#6EADFF", letterSpacing: "0.06em", marginBottom: 2 }}>AI RECOMMENDATION</p>
            <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 11, color: "rgba(237,242,255,0.7)", lineHeight: 1.5 }}>Based on your profile, <span style={{ color: "#EDF2FF", fontWeight: 500 }}>Engineering at UCT</span> is a strong match. APS target: 42.</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating badge — top right */}
      <motion.div
        animate={{ y: [0, -8, 0], rotate: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{
          position: "absolute",
          top: -18,
          right: -18,
          background: "linear-gradient(135deg, rgba(12,17,36,0.95), rgba(7,11,24,0.98))",
          border: "1px solid rgba(240,165,0,0.3)",
          borderRadius: 12,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(240,165,0,0.1)",
          zIndex: 2,
        }}
      >
        <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(240,165,0,0.12)", border: "1px solid rgba(240,165,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F0A500" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
          </svg>
        </div>
        <div>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, color: "#FBC94A", lineHeight: 1 }}>94% Match</p>
          <p style={{ fontFamily: "'Inter',sans-serif", fontSize: 10, color: "rgba(137,153,187,0.7)" }}>Career fit score</p>
        </div>
      </motion.div>

      {/* Floating badge — bottom left */}
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -1, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{
          position: "absolute",
          bottom: -16,
          left: -20,
          background: "linear-gradient(135deg, rgba(12,17,36,0.95), rgba(7,11,24,0.98))",
          border: "1px solid rgba(61,127,255,0.25)",
          borderRadius: 12,
          padding: "10px 14px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          zIndex: 2,
        }}
      >
        <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E", flexShrink: 0 }} />
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 600, color: "rgba(237,242,255,0.85)" }}>12,400+ learners guided</p>
      </motion.div>
    </motion.div>
  );
}
