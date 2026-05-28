"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { DecisionForkGraphic } from "./SectionGraphics";
import { useLang } from "./LanguageContext";

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 28 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

export default function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { t } = useLang();

  const PROBLEMS = [
    { stat: "80%",      headline: t("problem_stat1_h"), body: t("problem_stat1_b") },
    { stat: "Grade 12", headline: t("problem_stat2_h"), body: t("problem_stat2_b") },
    { stat: "Severe",   headline: t("problem_stat3_h"), body: t("problem_stat3_b") },
    { stat: "R0",       headline: t("problem_stat4_h"), body: t("problem_stat4_b") },
  ];

  return (
    <section className="problem-section-bottom" style={{ background: "var(--bg)", position: "relative", overflow: "visible" }}>
      <div className="section">
        <div className="container" ref={ref}>
          <div className="sg-row" style={{ marginBottom: 72 }}>
            <div className="sg-col">
              <motion.p {...an(0.05, inView)} className="label" style={{ marginBottom: 20 }}>{t("problem_label")}</motion.p>
              <motion.h2 {...an(0.15, inView)} className="display-2">
                {t("problem_h2_1")}{" "}
                <span className="text-italic text-gradient-gold">{t("problem_h2_2")}</span>
              </motion.h2>
              <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 24 }}>
                {t("problem_sub")}
              </motion.p>
            </div>
            <motion.div {...an(0.1, inView)}><DecisionForkGraphic /></motion.div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {PROBLEMS.map((p, i) => (
              <motion.div key={i} {...an(0.1 + i * 0.1, inView)} className="card"
                style={{ padding: "36px", display: "flex", flexDirection: "column", gap: 16 }}
                whileHover={{ borderColor: "rgba(61,127,255,0.3)", translateY: -2 }}
                transition={{ duration: 0.2 }}>
                <div style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "clamp(36px, 4vw, 52px)", fontWeight: 400, lineHeight: 1, background: "linear-gradient(135deg, #FBC94A 0%, #F0A500 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {p.stat}
                </div>
                <h3 className="h3" style={{ fontSize: 16 }}>{p.headline}</h3>
                <p className="body" style={{ fontSize: 14 }}>{p.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <motion.div className="problem-char" initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1.1, delay: 0.8, ease: [0.22, 1, 0.36, 1] }} style={{ position: "absolute", bottom: -80, right: "clamp(24px, 5vw, 100px)", zIndex: 10, pointerEvents: "none", userSelect: "none" }}>
        <svg width="180" height="280" viewBox="0 0 180 280" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ overflow: "visible" }}>
          <defs><radialGradient id="charAura" cx="50%" cy="80%" r="55%"><stop offset="0%" stopColor="rgba(61,127,255,0.18)"/><stop offset="100%" stopColor="rgba(61,127,255,0)"/></radialGradient><radialGradient id="charSkin" cx="50%" cy="40%" r="60%"><stop offset="0%" stopColor="rgba(240,195,140,0.95)"/><stop offset="100%" stopColor="rgba(200,155,100,0.9)"/></radialGradient><filter id="charGlow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
          <ellipse cx="90" cy="240" rx="70" ry="40" fill="url(#charAura)" style={{ animation: "glow-pulse 3s ease-in-out infinite" }}/>
          <ellipse cx="90" cy="266" rx="42" ry="8" fill="rgba(0,0,0,0.18)"/>
          <path d="M72 200 L68 255 L78 256 L82 210 Z" fill="rgba(30,45,90,0.9)"/><path d="M98 200 L102 255 L112 254 L108 210 Z" fill="rgba(30,45,90,0.85)"/>
          <path d="M65 254 Q60 260 75 262 L80 258 Z" fill="rgba(15,20,45,0.95)"/><path d="M100 253 Q98 260 114 260 L115 255 Z" fill="rgba(15,20,45,0.95)"/>
          <path d="M60 140 L58 205 L122 205 L120 140 Q105 130 90 130 Q75 130 60 140 Z" fill="rgba(25,40,88,0.92)"/>
          <path d="M90 130 L78 145 L83 165 L90 155 L97 165 L102 145 Z" fill="rgba(35,55,120,0.9)"/>
          <path d="M90 140 L87 155 L90 152 L93 155 Z" fill="rgba(240,165,0,0.9)"/>
          <path d="M83 132 L90 140 L97 132 Q90 128 83 132 Z" fill="rgba(255,255,255,0.85)"/>
          <path d="M60 145 L44 168 L50 174 L66 152 Z" fill="rgba(25,40,88,0.9)"/><path d="M120 145 L136 168 L130 174 L114 152 Z" fill="rgba(25,40,88,0.9)"/>
          <path d="M44 168 Q90 185 136 168 L134 178 Q90 196 46 178 Z" fill="rgba(30,45,95,0.88)"/>
          <ellipse cx="122" cy="172" rx="8" ry="6" fill="url(#charSkin)"/><ellipse cx="58" cy="172" rx="8" ry="6" fill="url(#charSkin)"/>
          <rect x="84" y="112" width="12" height="22" rx="6" fill="url(#charSkin)"/>
          <ellipse cx="90" cy="85" rx="28" ry="32" fill="rgba(40,25,15,0.95)"/>
          <path d="M72 72 Q90 60 108 72 Q100 58 90 56 Q80 58 72 72 Z" fill="rgba(80,55,30,0.6)"/>
          <ellipse cx="90" cy="95" rx="22" ry="25" fill="url(#charSkin)"/>
          <ellipse cx="82" cy="89" rx="3.5" ry="4" fill="rgba(35,25,15,0.95)"/><ellipse cx="98" cy="89" rx="3.5" ry="4" fill="rgba(35,25,15,0.95)"/>
          <circle cx="83.5" cy="87.5" r="1.2" fill="rgba(255,255,255,0.9)"/><circle cx="99.5" cy="87.5" r="1.2" fill="rgba(255,255,255,0.9)"/>
          <path d="M79 84 Q82 81 86 83" stroke="rgba(40,25,15,0.9)" strokeWidth="1.8" strokeLinecap="round" fill="none"/><path d="M95 83 Q98 81 101 84" stroke="rgba(40,25,15,0.9)" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
          <path d="M89 95 Q87 102 90 104 Q93 102 91 95" stroke="rgba(180,130,85,0.5)" strokeWidth="1" fill="none"/>
          <path d="M85 108 Q90 111 95 108" stroke="rgba(160,100,60,0.8)" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
          <circle cx="106" cy="68" r="3" fill="rgba(61,127,255,0.25)" stroke="rgba(61,127,255,0.4)" strokeWidth="0.8" style={{ animation: "float-bob 2.8s ease-in-out infinite" }}/>
          <circle cx="114" cy="56" r="5" fill="rgba(61,127,255,0.2)" stroke="rgba(61,127,255,0.35)" strokeWidth="0.8" style={{ animation: "float-bob 2.8s ease-in-out infinite", animationDelay: "0.15s" }}/>
          <rect x="118" y="20" width="52" height="34" rx="10" fill="rgba(13,17,38,0.88)" stroke="rgba(61,127,255,0.4)" strokeWidth="1" style={{ animation: "float-bob 2.8s ease-in-out infinite", animationDelay: "0.3s" }}/>
          <text x="144" y="43" textAnchor="middle" fontFamily="Instrument Serif,Georgia,serif" fontSize="22" fontWeight="400" fill="rgba(240,165,0,0.9)" style={{ animation: "float-bob 2.8s ease-in-out infinite", animationDelay: "0.3s" }}>?</text>
          <circle cx="55" cy="100" r="2" fill="rgba(61,127,255,0.4)" style={{ animation: "float-bob 3.5s ease-in-out infinite", animationDelay: "0.5s" }}/>
          <circle cx="40" cy="120" r="1.5" fill="rgba(240,165,0,0.35)" style={{ animation: "float-bob 3.5s ease-in-out infinite", animationDelay: "1s" }}/>
          <circle cx="62" cy="82" r="1.5" fill="rgba(167,139,250,0.4)" style={{ animation: "float-bob 4s ease-in-out infinite", animationDelay: "0.8s" }}/>
        </svg>
      </motion.div>
      <div className="section-divider" />
    </section>
  );
}
