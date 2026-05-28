"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  color: string;
}

const COLORS = [
  "rgba(61,127,255,",
  "rgba(110,173,255,",
  "rgba(167,139,250,",
  "rgba(240,165,0,",
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "reveal" | "exit">("loading");
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);

  /* ── Canvas particle field ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const count = Math.min(120, Math.floor(window.innerWidth / 10));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 1.8 + 0.3,
      alpha: Math.random() * 0.6 + 0.1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      // Draw connecting lines between nearby particles
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const a = particlesRef.current[i];
          const b = particlesRef.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(61,127,255,${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  /* ── Progress simulation ── */
  useEffect(() => {
    let current = 0;
    // Progress completes in ~1.2s (30ms × ~40 ticks @ 2.8 inc/tick)
    const interval = setInterval(() => {
      current += Math.random() * 3.5 + 2.0;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => setPhase("reveal"), 200);
        setTimeout(() => setPhase("exit"), 700);
        setTimeout(() => onComplete(), 1200);
      } else {
        setProgress(Math.floor(current));
      }
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {phase !== "exit" && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#03050E",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          {/* Particle canvas */}
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          />

          {/* Central glow */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            background: "radial-gradient(circle, rgba(61,127,255,0.12) 0%, transparent 65%)",
            pointerEvents: "none",
          }} />

          {/* Logo + wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", textAlign: "center", zIndex: 1 }}
          >
            {/* Orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "1px solid rgba(61,127,255,0.25)",
                borderTopColor: "rgba(61,127,255,0.8)",
                margin: "0 auto 28px",
                position: "relative",
              }}
            >
              {/* Inner dot */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--blue)",
                boxShadow: "0 0 16px rgba(61,127,255,0.8)",
              }} />
              {/* Orbit dot */}
              <div style={{
                position: "absolute",
                top: -3,
                left: "50%",
                transform: "translateX(-50%)",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#6EADFF",
                boxShadow: "0 0 10px rgba(110,173,255,0.9)",
              }} />
            </motion.div>

            <h1 style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontSize: "clamp(26px, 4vw, 40px)",
              fontWeight: 400,
              color: "#EDF2FF",
              letterSpacing: "-0.02em",
              lineHeight: 1,
              marginBottom: 8,
            }}>
              Your Uni-Verse
            </h1>
            <p style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(61,127,255,0.7)",
            }}>
              Decision Intelligence
            </p>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{
              position: "absolute",
              bottom: 60,
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(320px, 80vw)",
              zIndex: 1,
            }}
          >
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}>
              <span style={{ color: "rgba(255,255,255,0.25)" }}>Initialising</span>
              <span style={{ color: "rgba(61,127,255,0.7)" }}>{progress}%</span>
            </div>
            <div style={{
              width: "100%",
              height: 1,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 99,
              overflow: "hidden",
            }}>
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg, #3D7FFF, #A78BFA)",
                  borderRadius: 99,
                  boxShadow: "0 0 12px rgba(61,127,255,0.6)",
                }}
              />
            </div>
          </motion.div>

          {/* Reveal flash */}
          <AnimatePresence>
            {phase === "reveal" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.15, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at 50% 50%, rgba(61,127,255,0.4), transparent 60%)",
                  pointerEvents: "none",
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
