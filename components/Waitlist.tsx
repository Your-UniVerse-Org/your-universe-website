"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./LanguageContext";

type UserType = "School" | "Parent" | "Institution" | "Student" | "";

interface FormData {
  type: UserType;
  firstName: string;
  surname: string;
  email: string;
  org: string;
  gradeLevel: string;
  interests: string;
  academicGoal: string;
  currentAverage: string;
  lastTestResult: string;
  childGrade: string;
  parentFocus: string;
  parentGoal: string;
  schoolRole: string;
  learnerCount: string;
  instFocus: string;
  instGoal: string;
}

const EMPTY_FORM: FormData = {
  type: "",
  firstName: "",
  surname: "",
  email: "",
  org: "",
  gradeLevel: "",
  interests: "",
  academicGoal: "",
  currentAverage: "",
  lastTestResult: "",
  childGrade: "",
  parentFocus: "",
  parentGoal: "",
  schoolRole: "",
  learnerCount: "",
  instFocus: "",
  instGoal: "",
};

const EASE = [0.22, 1, 0.36, 1] as const;

const TYPE_OPTIONS: { label: string; sub: string; value: UserType; icon: React.ReactNode }[] = [
  { value: "Student",     label: "Student",           sub: "Grade 9 to Postgrad", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3.33 1.67 8.67 1.67 12 0v-5"/></svg> },
  { value: "Parent",      label: "Parent",            sub: "Supporting my child", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg> },
  { value: "School",      label: "Educator / School", sub: "Primary or secondary", icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg> },
  { value: "Institution", label: "University / TVET", sub: "Higher education",    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M2 7l10-5 10 5-10 5z"/><path d="M6 12v5"/><path d="M18 12v5"/><path d="M2 17h20"/></svg> },
];

function buildSteps(type: UserType) {
  const steps = [0, 1, 2, 3];
  if (!type) return steps;
  steps.push(4);
  if (type !== "Student") steps.push(5);
  steps.push(6);
  return steps;
}

function buildProfile(data: FormData): Record<string, string> {
  if (data.type === "Student") {
    return {
      gradeLevel: data.gradeLevel.trim(),
      interests: data.interests.trim(),
      academicGoal: data.academicGoal.trim(),
      currentAverage: data.currentAverage.trim(),
      lastTestResult: data.lastTestResult.trim(),
    };
  }
  if (data.type === "Parent") {
    return {
      childGrade: data.childGrade.trim(),
      parentFocus: data.parentFocus.trim(),
      parentGoal: data.parentGoal.trim(),
    };
  }
  if (data.type === "School") {
    return {
      schoolRole: data.schoolRole.trim(),
      learnerCount: data.learnerCount.trim(),
    };
  }
  if (data.type === "Institution") {
    return {
      instFocus: data.instFocus.trim(),
      instGoal: data.instGoal.trim(),
    };
  }
  return {};
}

function profileComplete(data: FormData): boolean {
  if (data.type === "Student") {
    return data.interests.trim().length > 0 && data.academicGoal.trim().length > 0;
  }
  if (data.type === "Parent") {
    return data.childGrade.trim().length > 0 && data.parentGoal.trim().length > 0;
  }
  if (data.type === "School") {
    return data.schoolRole.trim().length > 0;
  }
  if (data.type === "Institution") {
    return data.instFocus.trim().length > 0 && data.instGoal.trim().length > 0;
  }
  return false;
}

const SLIDE_IN = { initial: { opacity: 0, y: 40, filter: "blur(4px)" }, animate: { opacity: 1, y: 0, filter: "blur(0px)" }, exit: { opacity: 0, y: -30, filter: "blur(4px)" }, transition: { duration: 0.45, ease: EASE } };

export default function Waitlist() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  const tFn = t as (k: string) => string;
  const [data, setData] = useState<FormData>(EMPTY_FORM);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const steps = buildSteps(data.type);
  const currentStep = steps[stepIndex];
  const reviewStep = steps[steps.length - 1];
  const progress = Math.round((stepIndex / (steps.length - 1)) * 100);

  useEffect(() => {
    setStepIndex((i) => Math.min(i, buildSteps(data.type).length - 1));
  }, [data.type]);

  useEffect(() => {
    if (stepIndex === 0) return;
    containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [stepIndex]);

  const canAdvance = useCallback(() => {
    if (currentStep === 0) return !!data.type;
    if (currentStep === 1) return data.firstName.trim().length > 0;
    if (currentStep === 2) return data.surname.trim().length > 0;
    if (currentStep === 3) return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim());
    if (currentStep === 4) return profileComplete(data);
    if (currentStep === 5) {
      if (data.type === "Parent") return true;
      return data.org.trim().length > 0;
    }
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
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${data.firstName} ${data.surname}`.trim(),
          email: data.email.trim(),
          org: data.org.trim(),
          type: data.type,
          profile: buildProfile(data),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Submission failed.");
      setSubmitted(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <section id="waitlist" className="section" style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", position: "relative" }}>
          <div className="container" style={{ display: "flex", justifyContent: "center" }}>
            <motion.div initial={{ opacity: 0, scale: 0.92, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.6, ease: EASE }}
              style={{ maxWidth: 520, width: "100%", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "64px 48px", textAlign: "center" }}>
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.2 }}
                style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--purple-dim)", border: "1px solid var(--purple-border)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", color: "var(--purple)" }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
              </motion.div>
              <motion.h2 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5, ease: EASE }} className="display-3" style={{ marginBottom: 16 }}>{t("wait_success_h")}</motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="body-lg" style={{ maxWidth: 380, margin: "0 auto" }}>
                {`${t("wait_success_p")} ${data.email}.`}
                <br /><br />{t("wait_success_end")}
              </motion.p>
            </motion.div>
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
    <section
      id="waitlist"
      className="section"
      aria-labelledby="waitlist-heading"
      style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", position: "relative" }}
    >
      <div className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>

          {/* ─── Section heading ─────────────────────────────── */}
          <div style={{ textAlign: "center", marginBottom: 56, maxWidth: 600 }}>
            <p className="label" style={{ marginBottom: 20 }}>{t("waitlist_label")}</p>
            <h2 id="waitlist-heading" className="display-2" style={{ marginBottom: 20 }}>
              {t("waitlist_h2_1")}{" "}
              <span className="text-gradient">{t("waitlist_h2_2")}</span>
            </h2>
            <p className="body-lg" style={{ maxWidth: 480, margin: "0 auto" }}>
              {t("waitlist_sub")}
            </p>
          </div>
          {/* ─────────────────────────────────────────────────── */}

          <div ref={containerRef} style={{ width: "100%", maxWidth: 560 }}>
            {/* Progress bar */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)" }}>
                  {currentStep === reviewStep ? t("wait_review_lbl") : `${t("wait_step")} ${stepIndex + 1} ${t("wait_of")} ${steps.length}`}
                </span>
                <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, color: "var(--purple)", letterSpacing: "0.04em" }}>{progress}%</span>
              </div>
              <div style={{ height: 3, background: "var(--border)", borderRadius: 99, overflow: "hidden" }}>
                <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5, ease: EASE }}
                  style={{ height: "100%", background: "linear-gradient(90deg, rgba(119,77,255,0.7), rgba(119,77,255,1))", borderRadius: 99 }} />
              </div>
            </div>

            {/* Step card */}
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, overflow: "hidden", minHeight: 380, display: "flex", flexDirection: "column", position: "relative" }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div key={currentStep} custom={direction} variants={variants} initial="enter" animate="center" exit="exit"
                  transition={{ duration: 0.42, ease: EASE }}
                  className="waitlist-card-inner"
                  style={{ padding: "48px 40px", flex: 1, display: "flex", flexDirection: "column" }}>
                  {currentStep === 0 && <StepType value={data.type} onChange={(v) => setData((d) => ({ ...d, type: v }))} onAdvance={advance} t={tFn} />}
                  {currentStep === 1 && <StepText question={t("wait_firstname_q")} hint={t("wait_firstname_hint")} value={data.firstName} onChange={(v) => setData((d) => ({ ...d, firstName: v }))} placeholder={t("wait_firstname_ph")} onKeyDown={onKeyDown} enterLabel={t("wait_press_enter")} autoFocus />}
                  {currentStep === 2 && <StepText question={data.firstName ? `Nice to meet you, ${data.firstName}. ${t("wait_surname_q")}` : t("wait_surname_q")} hint="" value={data.surname} onChange={(v) => setData((d) => ({ ...d, surname: v }))} placeholder={t("wait_surname_ph")} onKeyDown={onKeyDown} enterLabel={t("wait_press_enter")} autoFocus />}
                  {currentStep === 3 && <StepEmail name={data.firstName} value={data.email} onChange={(v) => setData((d) => ({ ...d, email: v }))} onKeyDown={onKeyDown} t={tFn} />}
                  {currentStep === 4 && (
                    <StepProfile data={data} setData={setData} t={tFn} />
                  )}
                  {currentStep === 5 && (
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
                  {currentStep === 6 && <StepReview data={data} loading={loading} error={error} onSubmit={handleSubmit} t={tFn} />}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Nav row */}
            {currentStep !== reviewStep && (
              <motion.div {...SLIDE_IN} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 20 }}>
                <button onClick={back} disabled={stepIndex === 0}
                  style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 600, color: stepIndex === 0 ? "var(--text-3)" : "var(--text-2)", opacity: stepIndex === 0 ? 0.35 : 1, background: "none", border: "none", cursor: stepIndex === 0 ? "default" : "pointer", transition: "color 0.15s" }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M19 12H5"/><path d="m12 5-7 7 7 7"/></svg>
                  {t("wait_back")}
                </button>
                {currentStep !== 0 && (
                  <button onClick={advance} disabled={!canAdvance()} className="btn btn-primary"
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", opacity: canAdvance() ? 1 : 0.4, transition: "opacity 0.2s" }}>
                    {stepIndex === steps.length - 2 ? t("wait_review_btn") : t("wait_continue")}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                )}
              </motion.div>
            )}
          </div>
      </div>
    </section>
  );
}

function StepProfile({
  data,
  setData,
  t,
}: {
  data: FormData;
  setData: React.Dispatch<React.SetStateAction<FormData>>;
  t: (k: string) => string;
}) {
  const fieldStyle = { fontSize: 16, padding: "14px 18px" } as const;
  const labelStyle = {
    fontFamily: "'Space Grotesk',sans-serif",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.06em",
    textTransform: "uppercase" as const,
    color: "var(--text-3)",
    marginBottom: 8,
    display: "block",
  };

  const heading =
    data.type === "Student"
      ? t("wait_stu_heading")
      : data.type === "Parent"
        ? t("wait_par_heading")
        : data.type === "School"
          ? t("wait_sch_heading")
          : t("wait_inst_heading");

  const sub =
    data.type === "Student"
      ? t("wait_stu_sub")
      : data.type === "Parent"
        ? t("wait_par_sub")
        : data.type === "School"
          ? t("wait_sch_sub")
          : t("wait_inst_sub");

  if (data.type === "Student") {
    const avgOptions = [
      t("wait_stu_avg_opt1"),
      t("wait_stu_avg_opt2"),
      t("wait_stu_avg_opt3"),
      t("wait_stu_avg_opt4"),
      t("wait_stu_avg_opt5"),
    ];
    const testOptions = [
      t("wait_stu_test_opt1"),
      t("wait_stu_test_opt2"),
      t("wait_stu_test_opt3"),
      t("wait_stu_test_opt4"),
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 18, flex: 1 }}>
        <div>
          <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.3, marginBottom: 8 }}>{heading}</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "var(--text-3)" }}>{sub}</p>
        </div>
        <div>
          <label style={labelStyle}>{t("wait_stu_grade_q")}</label>
          <input type="text" className="input" style={fieldStyle} value={data.gradeLevel} placeholder={t("wait_stu_grade_ph")} onChange={(e) => setData((d) => ({ ...d, gradeLevel: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>{t("wait_stu_interests_q")}</label>
          <input type="text" className="input" style={fieldStyle} value={data.interests} placeholder={t("wait_stu_interests_ph")} onChange={(e) => setData((d) => ({ ...d, interests: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>{t("wait_stu_goal_q")}</label>
          <input type="text" className="input" style={fieldStyle} value={data.academicGoal} placeholder={t("wait_stu_goal_ph")} onChange={(e) => setData((d) => ({ ...d, academicGoal: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>{t("wait_stu_avg_q")}</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {avgOptions.map((opt) => (
              <Chip key={opt} selected={data.currentAverage === opt} onClick={() => setData((d) => ({ ...d, currentAverage: opt }))}>{opt}</Chip>
            ))}
          </div>
        </div>
        <div>
          <label style={labelStyle}>{t("wait_stu_test_q")}</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {testOptions.map((opt) => (
              <Chip key={opt} selected={data.lastTestResult === opt} onClick={() => setData((d) => ({ ...d, lastTestResult: opt }))}>{opt}</Chip>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (data.type === "Parent") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        <div>
          <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.3, marginBottom: 8 }}>{heading}</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "var(--text-3)" }}>{sub}</p>
        </div>
        <div>
          <label style={labelStyle}>{t("wait_par_grade_q")}</label>
          <input type="text" className="input" style={fieldStyle} value={data.childGrade} placeholder={t("wait_par_grade_ph")} onChange={(e) => setData((d) => ({ ...d, childGrade: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>{t("wait_par_focus_q")}</label>
          <input type="text" className="input" style={fieldStyle} value={data.parentFocus} placeholder={t("wait_par_focus_ph")} onChange={(e) => setData((d) => ({ ...d, parentFocus: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>{t("wait_par_goal_q")}</label>
          <input type="text" className="input" style={fieldStyle} value={data.parentGoal} placeholder={t("wait_par_goal_ph")} onChange={(e) => setData((d) => ({ ...d, parentGoal: e.target.value }))} />
        </div>
      </div>
    );
  }

  if (data.type === "School") {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
        <div>
          <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.3, marginBottom: 8 }}>{heading}</h2>
          <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "var(--text-3)" }}>{sub}</p>
        </div>
        <div>
          <label style={labelStyle}>{t("wait_sch_role_q")}</label>
          <input type="text" className="input" style={fieldStyle} value={data.schoolRole} placeholder={t("wait_sch_role_ph")} onChange={(e) => setData((d) => ({ ...d, schoolRole: e.target.value }))} />
        </div>
        <div>
          <label style={labelStyle}>{t("wait_sch_learners_q")}</label>
          <input type="text" className="input" style={fieldStyle} value={data.learnerCount} placeholder={t("wait_sch_learners_ph")} onChange={(e) => setData((d) => ({ ...d, learnerCount: e.target.value }))} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
      <div>
        <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.3, marginBottom: 8 }}>{heading}</h2>
        <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "var(--text-3)" }}>{sub}</p>
      </div>
      <div>
        <label style={labelStyle}>{t("wait_inst_focus_q")}</label>
        <input type="text" className="input" style={fieldStyle} value={data.instFocus} placeholder={t("wait_inst_focus_ph")} onChange={(e) => setData((d) => ({ ...d, instFocus: e.target.value }))} />
      </div>
      <div>
        <label style={labelStyle}>{t("wait_inst_goal_q")}</label>
        <input type="text" className="input" style={fieldStyle} value={data.instGoal} placeholder={t("wait_inst_goal_ph")} onChange={(e) => setData((d) => ({ ...d, instGoal: e.target.value }))} />
      </div>
    </div>
  );
}

function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: 100,
        fontFamily: "'Space Grotesk',sans-serif",
        fontSize: 12,
        fontWeight: 600,
        cursor: "pointer",
        border: `1px solid ${selected ? "var(--purple-border)" : "var(--border)"}`,
        background: selected ? "var(--purple-dim)" : "var(--surface-2)",
        color: selected ? "var(--purple)" : "var(--text-2)",
        transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

function StepType({ value, onChange, onAdvance, t }: { value: UserType; onChange: (v: UserType) => void; onAdvance: () => void; t: (k: string) => string }) {
  return (
    <div>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 16 }}>{t("wait_type_label")}</p>
      <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(24px,3vw,32px)", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.2, marginBottom: 32 }}>{t("wait_type_heading")}</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {TYPE_OPTIONS.map((opt) => {
          const selected = value === opt.value;
          return (
            <motion.button key={opt.value} type="button" whileHover={{ scale: 1.02, borderColor: "var(--border-blue)" }} whileTap={{ scale: 0.98 }}
              onClick={() => { onChange(opt.value); setTimeout(onAdvance, 180); }}
              style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10, padding: "18px 16px", background: selected ? "var(--purple-dim)" : "var(--surface-2)", border: `1px solid ${selected ? "var(--purple-border)" : "var(--border)"}`, borderRadius: 12, cursor: "pointer", transition: "background 0.15s, border-color 0.15s", color: selected ? "var(--purple)" : "var(--text-2)", textAlign: "left" }}>
              <span style={{ color: selected ? "var(--purple)" : "var(--text-3)", display: "flex" }}>{opt.icon}</span>
              <div>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "inherit", marginBottom: 3 }}>{opt.label}</p>
                <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, fontWeight: 400, color: selected ? "var(--purple)" : "var(--text-3)" }}>{opt.sub}</p>
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
        {name ? `${name}. ${t("wait_email_q")}` : t("wait_email_q")}
      </h2>
      <p style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, color: "var(--text-3)", marginBottom: 28 }}>{t("wait_email_hint")}</p>
      <input type="email" value={value} onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown} placeholder={t("wait_email_ph")} autoFocus className="input" style={{ fontSize: 18, padding: "16px 20px" }} />
      <p style={{ marginTop: 12, fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, color: "var(--text-3)" }}>{t("wait_email_nospam")}</p>
    </div>
  );
}

function StepReview({ data, loading, error, onSubmit, t }: { data: FormData; loading: boolean; error: string; onSubmit: () => void; t: (k: string) => string }) {
  const profile = buildProfile(data);
  const profileRows = Object.entries(profile)
    .filter(([, v]) => v)
    .map(([k, v]) => ({ label: k.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()), value: v }));

  const rows: { label: string; value: string }[] = [
    { label: t("wait_rev_type"),  value: data.type },
    { label: t("wait_rev_name"),  value: `${data.firstName} ${data.surname}`.trim() },
    { label: t("wait_rev_email"), value: data.email },
    ...(profileRows.length ? [{ label: t("wait_rev_profile"), value: profileRows.map((r) => r.value).join(" · ") }] : []),
    ...(data.org ? [{ label: t("wait_rev_org"), value: data.org }] : []),
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
      <h2 style={{ fontFamily: "'Instrument Serif',Georgia,serif", fontSize: "clamp(22px,3vw,30px)", fontWeight: 400, color: "var(--text-1)", lineHeight: 1.3, marginBottom: 8 }}>{`${t("wait_rev_heading")}, ${data.firstName}?`}</h2>
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
