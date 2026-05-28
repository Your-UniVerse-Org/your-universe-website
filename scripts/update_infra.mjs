import { writeFileSync, readFileSync } from 'fs';
const B = 'C:/Users/ayand/Documents/VILATECH/your-universe/components/';
const A = 'C:/Users/ayand/Documents/VILATECH/your-universe/app/';

// PageTransition.tsx - faster enter animation
writeFileSync(B + 'PageTransition.tsx', `"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const variants: any = {
  initial: { opacity: 0, y: 18 },
  enter:   { opacity: 1, y: 0,   transition: { duration: 0.3,  ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } },
};

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        variants={variants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ willChange: "transform, opacity" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
`);

// ClientShell.tsx - add z-index: 1 to content wrapper
writeFileSync(B + 'ClientShell.tsx', `"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import PageTransition from "./PageTransition";
import { LanguageProvider } from "./LanguageContext";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <LanguageProvider>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        suppressHydrationWarning
        style={{
          position: "relative",
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          visibility: loaded ? "visible" : "hidden",
          transition: loaded ? "opacity 0.7s cubic-bezier(0.22,1,0.36,1)" : "none",
        }}
      >
        <PageTransition>{children}</PageTransition>
      </div>
    </LanguageProvider>
  );
}
`);

// Hero.tsx - replace the word-by-word headline with translated line-based approach
const heroContent = `"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import type { BezierDefinition } from "framer-motion";
import { useRef } from "react";
import HeroMockup from "./HeroMockup";
import { useLang } from "./LanguageContext";

const CUBIC: BezierDefinition = [0.22, 1, 0.36, 1];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { t } = useLang();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1, 0]);

  const TRUST = [t("trust_1"), t("trust_2"), t("trust_3"), t("trust_4")];

  return (
    <section ref={ref} className="hero-section" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div className="hero-grid" />
      <div className="hero-glow" />
      <div style={{ position: "absolute", top: "18%", right: "8%", width: 480, height: 480, background: "radial-gradient(circle, rgba(61,127,255,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "22%", left: "6%", width: 280, height: 280, background: "radial-gradient(circle, rgba(167,139,250,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "60%", left: "40%", width: 200, height: 200, background: "radial-gradient(circle, rgba(240,165,0,0.04) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

      <motion.div style={{ y, opacity: heroOpacity, willChange: "transform", width: "100%" }} className="container">
        <div className="hero-cols">
          <div style={{ flex: "1 1 auto", minWidth: 0, maxWidth: 580 }}>
            {/* Badge */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: 0.1, ease: CUBIC }} style={{ marginBottom: 36 }}>
              <span className="pill"><span className="pill-dot" />{t("hero_badge")}</span>
            </motion.div>

            {/* Headline — translated line by line */}
            <div className="display-1" style={{ marginBottom: 36 }}>
              <motion.span
                initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block", willChange: "transform, filter, opacity" }}
              >
                {t("hero_line1")}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block", fontStyle: "italic", willChange: "transform, filter, opacity" }}
              >
                {t("hero_line2")}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.66, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block", willChange: "transform, filter, opacity" }}
              >
                {t("hero_line3")}{" "}
                <span className="text-gradient">{t("hero_accent")}</span>
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.78, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: "block", willChange: "transform, filter, opacity" }}
              >
                {t("hero_line4")}
              </motion.span>
            </div>

            {/* Subline */}
            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.9, ease: CUBIC }}
              className="body-lg" style={{ maxWidth: 460, marginBottom: 32 }}>
              {t("hero_sub")}
            </motion.p>

            {/* Mobile mockup */}
            <motion.div className="hero-mockup-mobile-inline" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 1.05, ease: CUBIC }} style={{ marginBottom: 40 }}>
              <HeroMockup />
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.05, ease: CUBIC }} className="hero-cta">
              <Link href="/early-access" className="btn btn-primary hero-btn">
                {t("hero_cta1")}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </Link>
              <Link href="/platform" className="btn btn-ghost hero-btn">{t("hero_cta2")}</Link>
            </motion.div>

            {/* Trust bar */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.35 }}
              style={{ display: "flex", flexWrap: "wrap", gap: "10px 32px", borderTop: "1px solid var(--border)", paddingTop: 28 }}>
              {TRUST.map((tr) => (
                <div key={tr} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--blue)", flexShrink: 0 }} />
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 12, fontWeight: 500, color: "var(--text-3)", letterSpacing: "0.04em" }}>{tr}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Desktop mockup */}
          <motion.div className="hero-mockup-col hero-mockup-desktop" initial={{ opacity: 0, y: 32, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}>
            <HeroMockup />
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.8 }} className="hero-scroll-cue">
        <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="1.5"
          animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" as const }}>
          <path d="m6 9 6 6 6-6" />
        </motion.svg>
      </motion.div>
    </section>
  );
}
`;
writeFileSync(B + 'Hero.tsx', heroContent);

// Waitlist.tsx - add useLang() for translated form text (sub-components get t passed as prop)
const waitlistContent = `"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./LanguageContext";

type UserType = "School" | "Parent" | "Institution" | "Student" | "";
interface FormData { type: UserType; firstName: string; surname: string; email: string; org: string; }

const EASE = [0.22, 1, 0.36, 1] as const;

const TYPE_OPTIONS: { label: string; sub: string; value: UserType; icon: React.ReactNode }[] = [
  { value: "Student",     label: "Student",           sub: "Grade 9 – Postgrad", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5"/></svg> },
  { value: "Parent",      label: "Parent",            sub: "Supporting my child", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { value: "School",      label: "Educator / School", sub: "Primary or secondary", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { value: "Institution", label: "University / TVET", sub: "Higher education",    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 7l10-5 10 5-10 5z"/><path d="M6 12v5"/><path d="M18 12v5"/><path d="M2 17h20"/></svg> },
];

function buildSteps(type: UserType) {
  const base = [0, 1, 2, 3];
  if (type && type !== "Student") base.push(4);
  base.push(5);
  return base;
}

const SLIDE_IN = { initial: { opacity: 0, y: 40, filter: "blur(4px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, exit: { opacity: 0, y: -30, filter: "blur(4px)" }, transition: { duration: 0.45, ease: EASE } };

export default function Waitlist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const [data, setData] = useState<FormData>({ type: "", firstName: "", surname: "", email: "", org: "" });
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const steps = buildSteps(data.type);
  const currentStep = steps[stepIndex];
  const progress = Math.round((stepIndex / (steps.length - 1)) * 100);

  useEffect(() => {
    if (stepIndex === 0) return;
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [stepIndex]);

  const canAdvance = useCallback(() => {
    if (currentStep === 0) return !!data.type;
    if (currentStep === 1) return data.firstName.trim().length > 0;
    if (currentStep === 2) return data.surname.trim().length > 0;
    if (currentStep === 3) return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(data.email.trim());
    return true;
  }, [currentStep, data]);

  const advance = useCallback(() => {
    if (!canAdvance()) return;
    setDirection(1);
    setStepIndex((i) => Math.min(i + 1, steps.length - 1));
    setError("");
  }, [canAdvance, steps.length]);

  const back = () => { if (stepIndex === 0) return; setDirection(-1); setStepIndex((i) => i - 1); setError(""); };
  const onKeyDown = (e: React.KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); advance(); } };

  const handleSubmit = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: \`\${data.firstName} \${data.surname}\`.trim(), email: data.email.trim(), org: data.org.trim(), type: data.type }) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <section id="waitlist" style={{ background: "var(--bg)", position: "relative" }}>
        <div className="section">
          <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
              style={{ maxWidth: 520, width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "64px 48px", textAlign: "center" }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.2 }}
                style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--blue-dim)", border: "1px solid var(--border-blue)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", color: "var(--blue)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5, ease: EASE }} className="display-3" style={{ marginBottom: 16 }}>{t("wait_success_h")}</motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="body-lg" style={{ maxWidth: 380, margin: "0 auto" }}>
                {t("wait_success_p").replace("{name}", data.firstName).replace("{email}", data.email)}
                <br /><br />{t("wait_success_end")}
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  const variants = {
    enter: (dir: number) => ({ opacity: 0, y: dir * 50, filter: "blur(6px)" }),
    center: { opacity: 1, y: 0, filter: "blur(0px)" },
    exit: (dir: number) => ({ opacity: 0, y: dir * -40, filter: "blur(4px)" }),
  };

  return (
    <section id="waitlist" style={{ background: "var(--bg)", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 900, height: 600, background: "radial-gradient(ellipse at top, rgba(61,127,255,0.09) 0%, transparent 65%)", pointerEvents: "none" }} />
      <div className="section">
        <div className="container" style={{ display: "flex", justifyContent: "center" }}>
          <div ref={containerRef} style={{ width: "100%", maxWidth: 560 }}>
            {/* Progress bar */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)" }}>
                  {currentStep === 5 ? t("wait_review_lbl") : t("wait_step").replace("{n}", String(stepIndex + 1)).replace("{total}", String(steps.length))}
                </span>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, color: "var(--blue)", letterSpacing: "0.04em" }}>{progress}%</span>
              </div>
              <div style={{ height: 3, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                <motion.div animate={{ width: \`\${progress}%\` }} transition={{ duration: 0.5, ease: EASE }}
                  style={{ height: "100%", background: "linear-gradient(90deg, rgba(61,127,255,0.7), rgba(61,127,255,1))", borderRadius: 99 }} />
              </div>
            </div>

            {/* Step card */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", minHeight: 380, display: "flex", flexDirection: "column", position: "relative" }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={currentStep} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.42, ease: EASE }}
                  style={{ padding: "48px 40px", flex: 1, display: "flex", flexDirection: "column" }}>
                  {currentStep === 0 && <StepType value={data.type} onChange={(v) => setData((d) => ({ ...d, type: v }))} onAdvance={advance} t={t} />}
                  {currentStep === 1 && <StepText question={t("wait_firstname_q")} hint={t("wait_firstname_hint")} value={data.firstName} onChange={(v) => setData((d) => ({ ...d, firstName: v }))} placeholder={t("wait_firstname_ph")} onKeyDown={onKeyDown} enterLabel={t("wait_press_enter")} autoFocus />}
                  {currentStep === 2 && <StepText question={t("wait_surname_q").replace("{name}", data.firstName)} hint="" value={data.surname} onChange={(v) => setData((d) => ({ ...d, surname: v }))} placeholder={t("wait_surname_ph")} onKeyDown={onKeyDown} enterLabel={t("wait_press_enter")} autoFocus />}
                  {currentStep === 3 && <StepEmail name={data.firstName} value={data.email} onChange={(v) => setData((d) => ({ ...d, email: v }))} onKeyDown={onKeyDown} t={t} />}
                  {currentStep === 4 && (
                    <StepText
                      question={data.type === "School" ? t("wait_org_school_q") : data.type === "Parent" ? t("wait_org_parent_q") : t("wait_org_inst_q")}
                      hint={t("wait_org_hint")}
                      value={data.org}
                      onChange={(v) => setData((d) => ({ ...d, org: v }))}
                      placeholder={data.type === "School" ? t("wait_org_school_ph") : data.type === "Parent" ? t("wait_org_parent_ph") : t("wait_org_inst_ph")}
                      onKeyDown={onKeyDown}
                      enterLabel={t("wait_press_enter")}
                      autoFocus
                    />
                  )}
                  {currentStep === 5 && <StepReview data={data} loading={loading} error={error} onSubmit={handleSubmit} t={t} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav row */}
            {currentStep !== 5 && (
              <motion.div {...SLIDE_IN} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
                <button onClick={back} disabled={stepIndex === 0}
                  style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: stepIndex === 0 ? "var(--text-3)" : "var(--text-2)", opacity: stepIndex === 0 ? 0.35 : 1, background: "none", border: "none", cursor: stepIndex === 0 ? "default" : "pointer", transition: "color 0.15s" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
                  {t("wait_back_btn")}
                </button>
                {currentStep !== 0 && (
                  <button onClick={advance} disabled={!canAdvance()} className="btn btn-primary"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", opacity: canAdvance() ? 1 : 0.4, transition: "opacity 0.2s" }}>
                    {stepIndex === steps.length - 2 ? t("wait_review_btn") : t("wait_continue_btn")}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepType({ value, onChange, onAdvance, t }: { value: UserType; onChange: (v: UserType) => void; onAdvance: () => void; t: (k: string) => string }) {
  return (
    <div>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 16 }}>{t("wait_type_label")}</p>
      <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(24px,3vw,32px)", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.2, marginBottom: 32 }}>{t("wait_type_heading")}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {TYPE_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <motion.button key={opt.value} type="button" whileHover={{ scale: 1.02, borderColor: "var(--border-blue)" }} whileTap={{ scale: 0.98 }}
              onClick={() => { onChange(opt.value); setTimeout(onAdvance, 180); }}
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, padding: "18px 16px", background: selected ? "var(--blue-dim)" : "var(--surface-2)", border: \`1px solid \${selected ? "var(--border-blue)" : "var(--border)"}\`, borderRadius: 12, cursor: "pointer", transition: "background 0.15s, border-color 0.15s", color: selected ? "var(--blue)" : "var(--text-2)", textAlign: "left" }}>
              <span style={{ color: selected ? "var(--blue)" : "var(--text-3)", display: "flex" }}>{opt.icon}</span>
              <div>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "inherit", marginBottom: 3 }}>{opt.label}</p>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 400, color: selected ? "var(--blue)" : "var(--text-3)" }}>{opt.sub}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

function StepText({ question, hint, value, onChange, placeholder, onKeyDown, autoFocus, enterLabel }: { question: string; hint: string; value: string; onChange: (v: string) => void; placeholder: string; onKeyDown: (e: React.KeyboardEvent) => void; autoFocus?: boolean; enterLabel: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, flex: 1 }}>
      <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.3, marginBottom: 12 }}>{question}</h2>
      {hint && <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "var(--text-3)", marginBottom: 28 }}>{hint}</p>}
      {!hint && <div style={{ marginBottom: 28 }} />}
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown} placeholder={placeholder} autoFocus={autoFocus} className="input" style={{ fontSize: 18, padding: "16px 20px", letterSpacing: "0.01em" }} />
      <p style={{ marginTop: 12, fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, color: "var(--text-3)" }}>
        {enterLabel} <kbd style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 4, padding: "1px 6px", fontSize: 11, fontFamily: "inherit" }}>Enter ↵</kbd>
      </p>
    </div>
  );
}

function StepEmail({ name, value, onChange, onKeyDown, t }: { name: string; value: string; onChange: (v: string) => void; onKeyDown: (e: React.KeyboardEvent) => void; t: (k: string) => string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.3, marginBottom: 12 }}>
        {name ? \`\${t("wait_email_q").replace("{name}", name)}\` : t("wait_email_q").replace("{name} — ", "")}
      </h2>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "var(--text-3)", marginBottom: 28 }}>{t("wait_email_hint")}</p>
      <input type="email" value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown} placeholder={t("wait_email_ph")} autoFocus className="input" style={{ fontSize: 18, padding: "16px 20px" }} />
      <p style={{ marginTop: 12, fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, color: "var(--text-3)" }}>{t("wait_email_nospam")}</p>
    </div>
  );
}

function StepReview({ data, loading, error, onSubmit, t }: { data: FormData; loading: boolean; error: string; onSubmit: () => void; t: (k: string) => string }) {
  const rows: { label: string; value: string }[] = [
    { label: t("wait_rev_type"),  value: data.type },
    { label: t("wait_rev_name"),  value: \`\${data.firstName} \${data.surname}\`.trim() },
    { label: t("wait_rev_email"), value: data.email },
    ...(data.org ? [{ label: t("wait_rev_org"), value: data.org }] : []),
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.3, marginBottom: 8 }}>{t("wait_rev_heading").replace("{name}", data.firstName)}</h2>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "var(--text-3)", marginBottom: 28 }}>{t("wait_rev_sub")}</p>
      <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", marginBottom: 28 }}>
        {rows.map((r, i) => (
          <div key={r.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 20px", borderBottom: i < rows.length - 1 ? "1px solid var(--border)" : "none", gap: 12 }}>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--text-3)", flexShrink: 0 }}>{r.label}</span>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 500, color: "var(--text-1)", textAlign: "right", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.value}</span>
          </div>
        ))}
      </div>
      {error && <div style={{ background: "rgba(248,113,113,0.08)", border: "1px solid rgba(248,113,113,0.2)", borderRadius: 10, padding: "12px 16px", marginBottom: 16 }}><p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "#F87171" }}>{error}</p></div>}
      <motion.button type="button" onClick={onSubmit} disabled={loading} whileHover={{ scale: loading ? 1 : 1.02 }} whileTap={{ scale: 0.98 }}
        className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: 15, opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}>
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: "spin 0.8s linear infinite" }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
            {t("wait_joining")}
          </span>
        ) : (
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {t("wait_submit")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
        )}
      </motion.button>
      <p style={{ textAlign: "center", marginTop: 14, fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, color: "var(--text-3)" }}>{t("wait_footer")}</p>
    </div>
  );
}
`;
writeFileSync(B + 'Waitlist.tsx', waitlistContent);

console.log('PageTransition, ClientShell, Hero, Waitlist written');
