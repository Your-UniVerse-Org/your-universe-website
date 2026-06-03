"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/**
 * HowItWorks — From Grade 9 to graduation and beyond.
 *
 * Desktop: Side-by-side two-column layout. Steps on left, real photo on right.
 * Mobile: Sticky scroll experience — each step is locked to the viewport
 *         until the user scrolls past it, creating an immersive reading flow.
 *         Scroll → Step 1 appears → scroll scroll → Step 2 → etc.
 */

const STEPS = [
  {
    n: "01",
    label: "Discover",
    title: "Know who you are before choosing what to study",
    body: "Complete a short psychometric profile. YourUniverse builds a picture of your strengths, learning style, and interests — giving you a starting point rooted in real self-knowledge, not guesswork.",
    detail: "Psychometrics · Personality insights · Strength mapping",
    accent: "#774DFF",
    /*
     * Photo: Pexels — diverse students discussing project at table
     * Source: https://www.pexels.com/photo/6238033/
     * Photographer: Monstera Production — Pexels License (free commercial use)
     */
    photo: "https://images.pexels.com/photos/6238033/pexels-photo-6238033.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    photoAlt: "Diverse students collaborating on a project",
  },
  {
    n: "02",
    label: "Plan",
    title: "Match your Grade 9 subject choices to your future",
    body: "Our AI cross-references your profile with university entry requirements, career earnings data, and SA curriculum pathways. You see exactly which subjects open which doors — before you choose.",
    detail: "Subject matching · APS calculator · Career pathways",
    accent: "#FE4A23",
    /*
     * Photo: Pexels — woman taking notes from laptop
     * Source: https://www.pexels.com/photo/5905852/
     * Photographer: Katerina Holmes — Pexels License (free commercial use)
     */
    photo: "https://images.pexels.com/photos/5905852/pexels-photo-5905852.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    photoAlt: "Student planning their academic pathway with notes and laptop",
  },
  {
    n: "03",
    label: "Grow",
    title: "Build your portfolio from Grade 9 to Matric",
    body: "Track academic progress, co-curricular activities, and achievements year by year. YourUniverse generates a verified learner portfolio that schools, universities, and employers can trust.",
    detail: "Progress tracking · Portfolio builder · Institution reports",
    accent: "#774DFF",
    /*
     * Photo: Unsplash — students studying together in a group
     * Source: https://unsplash.com/photos/photo-1522202176988-66273c2fd55f
     * Photographer: Unsplash (free commercial use under Unsplash License)
     */
    photo: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&q=80",
    photoAlt: "Students building their portfolios and tracking academic progress together",
  },
  {
    n: "04",
    label: "Connect",
    title: "Get discovered by universities and employers",
    body: "Institutions on the YourUniverse network receive anonymised talent intelligence. When your profile is a strong match, they come to you — reversing the traditional application process.",
    detail: "Institutional matching · Talent discovery · Direct outreach",
    accent: "#FE4A23",
    /*
     * Photo: Pexels — graduation / achievement
     * Source: https://www.pexels.com/photo/1205651/
     * Photographer: Godisable Jacob
     */
    photo: "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
    photoAlt: "Graduate celebrating achievement",
  },
];

/* ── Desktop: standard step row ── */
function StepRow({ step, index, inView }: { step: typeof STEPS[0]; index: number; inView: boolean }) {
  const isEven = index % 2 === 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        alignItems: "center",
        padding: "48px 0",
        borderBottom: "1px solid var(--border)",
        direction: isEven ? "ltr" : "ltr",
      }}
    >
      {/* Text — alternates side */}
      <div style={{ order: isEven ? 0 : 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
          <span style={{
            fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.12em", color: step.accent, opacity: 0.8,
          }}>STEP {step.n}</span>
          <span style={{
            background: `${step.accent}18`,
            border: `1px solid ${step.accent}35`,
            color: step.accent,
            borderRadius: 99, padding: "2px 10px",
            fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
          }}>{step.label}</span>
        </div>
        <h3 style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: "clamp(20px, 2.5vw, 28px)",
          fontWeight: 700, color: "var(--text-1)", lineHeight: 1.25, marginBottom: 16,
        }}>{step.title}</h3>
        <p style={{
          fontFamily: "'Inter',sans-serif", fontSize: 15, color: "var(--text-2)",
          lineHeight: 1.7, marginBottom: 20, maxWidth: 440,
        }}>{step.body}</p>
        <p style={{
          fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 500,
          color: "var(--text-3)", letterSpacing: "0.04em",
        }}>{step.detail}</p>
      </div>

      {/* Photo */}
      <div style={{
        order: isEven ? 1 : 0,
        borderRadius: 20, overflow: "hidden", aspectRatio: "16/10",
        position: "relative",
        boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
        border: `1px solid ${step.accent}25`,
      }}>
        <div style={{
          position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none",
          background: "linear-gradient(135deg, rgba(15,23,42,0.3) 0%, transparent 60%)",
        }}/>
        <Image src={step.photo} alt={step.photoAlt} fill sizes="50vw"
          style={{ objectFit: "cover" }}/>
        {/* Step badge on photo */}
        <div style={{
          position: "absolute", top: 16, left: 16, zIndex: 2,
          background: step.accent, borderRadius: 8, padding: "4px 12px",
          fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 800,
          color: "white", letterSpacing: "0.1em",
        }}>{step.label}</div>
      </div>
    </motion.div>
  );
}

/* ── Mobile sticky step card ── */
function MobileStepCard({ step, progress }: { step: typeof STEPS[0]; progress: number }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: 20,
      justifyContent: "center",
      padding: "0 24px",
      height: "100%",
    }}>
      {/* Photo */}
      <motion.div
        style={{
          borderRadius: 20, overflow: "hidden", aspectRatio: "16/9",
          position: "relative",
          boxShadow: "0 16px 40px rgba(0,0,0,0.40)",
          border: `1px solid ${step.accent}30`,
          opacity: progress,
          scale: 0.92 + progress * 0.08,
        }}
      >
        <Image src={step.photo} alt={step.photoAlt} fill
          sizes="100vw" style={{ objectFit: "cover" }}/>
        <div style={{
          position: "absolute", top: 12, left: 12, zIndex: 2,
          background: step.accent, borderRadius: 8, padding: "4px 12px",
          fontFamily: "'Space Grotesk',sans-serif", fontSize: 10, fontWeight: 800,
          color: "white", letterSpacing: "0.1em",
        }}>Step {step.n} · {step.label}</div>
      </motion.div>

      {/* Text */}
      <motion.div style={{ opacity: progress, y: (1 - progress) * 20 }}>
        <h3 style={{
          fontFamily: "'Space Grotesk',sans-serif",
          fontSize: 22, fontWeight: 700, color: "var(--text-1)",
          lineHeight: 1.25, marginBottom: 12,
        }}>{step.title}</h3>
        <p style={{
          fontFamily: "'Inter',sans-serif", fontSize: 15, color: "var(--text-2)",
          lineHeight: 1.7, marginBottom: 16,
        }}>{step.body}</p>
        <p style={{
          fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 500,
          color: step.accent, letterSpacing: "0.04em",
        }}>{step.detail}</p>
      </motion.div>

      {/* Progress dots */}
      <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
        {STEPS.map((s, i) => (
          <div key={s.n} style={{
            width: s.n === step.n ? 20 : 6,
            height: 6, borderRadius: 99,
            background: s.n === step.n ? step.accent : "rgba(255,255,255,0.15)",
            transition: "all 0.3s ease",
          }}/>
        ))}
      </div>
    </div>
  );
}

/* ── Mobile scroll container for ONE step ── */
function MobileStep({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.15"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.4, 0.85, 1], [0, 1, 1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 0.4], [40, 0]);

  return (
    <div ref={ref} style={{ minHeight: "95svh", display: "flex", alignItems: "center", padding: "20px 0", position: "relative" }}>
      <motion.div style={{ opacity, y, width: "100%" }}>
        <MobileStepCard step={step} progress={1} />
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const headerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="how-it-works"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container" style={{ paddingTop: 96, paddingBottom: 96 }}>

        {/* Section header */}
        <div ref={headerRef} style={{ maxWidth: 640, marginBottom: 64 }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label" style={{ marginBottom: 16 }}
          >
            How It Works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            style={{
              fontFamily: "'Space Grotesk',sans-serif",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 700, color: "var(--text-1)", lineHeight: 1.15, marginBottom: 16,
            }}
          >
            From Grade 9 to graduation — <span className="text-gradient">and beyond.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg"
          >
            YourUniverse meets you where you are and walks alongside you at every stage of your educational journey.
          </motion.p>
        </div>

        {/* ── DESKTOP layout: step rows ── */}
        <div className="how-desktop">
          {STEPS.map((step, i) => (
            <StepRow key={step.n} step={step} index={i} inView={inView} />
          ))}
        </div>

        {/* ── MOBILE layout: scroll-reveal steps ── */}
        <div className="how-mobile">
          {STEPS.map((step, i) => (
            <MobileStep key={step.n} step={step} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
