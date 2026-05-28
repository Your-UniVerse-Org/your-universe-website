"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 24 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.65, delay: d, ease: "easeOut" as const },
});

const STEPS = [
  {
    n: "01",
    title: "Create your profile",
    body: "Tell Your Universe your grade, subjects, target institution, and goals. Two minutes of setup unlocks a completely personalised academic roadmap built just for you.",
    detail: "Grade · Subjects · Institution target · Learning goals",
  },
  {
    n: "02",
    title: "Your AI builds your plan",
    body: "Our AI analyses the SA curriculum, your performance baseline, and predicted exam patterns to generate a study roadmap that evolves as you progress.",
    detail: "Curriculum mapping · Pattern analysis · Adaptive scheduling",
  },
  {
    n: "03",
    title: "Study smarter, every single day",
    body: "Daily sessions, targeted practice, and real-time feedback keep you on track. Your Universe monitors your readiness and adjusts your plan so you never study the wrong thing.",
    detail: "Daily sessions · Practise sets · Progress feedback",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="how-it-works" style={{ background: "var(--bg)", position: "relative" }}>
      <div className="section">
        <div className="container" ref={ref}>
          <div style={{ maxWidth: 600, marginBottom: 72 }}>
            <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 16 }}>
              How It Works
            </motion.p>
            <motion.h2 {...an(0.15, inView)} className="display-2">
              From day one to exam day.
            </motion.h2>
            <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 20 }}>
              Your Universe doesn&apos;t hand you a list of videos. It builds you a living, breathing plan that changes as you change.
            </motion.p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {STEPS.map((s, i) => (
              <motion.div
                key={s.n}
                {...an(0.15 + i * 0.15, inView)}
                className="card"
                style={{ padding: "36px 40px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "0 40px", alignItems: "start" }}
              >
                <div style={{ paddingTop: 4 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", color: "var(--violet-text)", opacity: 0.6 }}>
                    {s.n}
                  </span>
                </div>
                <div>
                  <h3 className="h3" style={{ marginBottom: 12 }}>{s.title}</h3>
                  <p className="body" style={{ marginBottom: 20 }}>{s.body}</p>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500, color: "var(--text-3)", letterSpacing: "0.04em" }}>
                    {s.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="section-divider" />
    </section>
  );
}
