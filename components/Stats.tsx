"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useLang } from "./LanguageContext";

function useCountUp(target: number, duration = 1600, inView = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const raf = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [inView, target, duration]);
  return value;
}

function StatCard({
  num,
  unit,
  label,
  note,
  delay,
  inView,
}: {
  num: number;
  unit: string;
  label: string;
  note: string;
  delay: number;
  inView: boolean;
}) {
  const count = useCountUp(num, 1800, inView);
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textAlign: "center",
        padding: "40px 28px",
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top accent */}
      <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 2, background: "linear-gradient(90deg, transparent, var(--purple), transparent)", opacity: 0.5 }} />

      <p className="stat-number-display" aria-live="polite">
        {unit.startsWith(" ") ? <>{count}{unit}</> : unit === "" ? <>{count}</> : <>{num === 0 ? "R0" : count}{unit}</>}
      </p>

      <p className="h3" style={{ marginTop: 16, marginBottom: 10 }}>
        {label}
      </p>

      <p className="body" style={{ maxWidth: 260, margin: "0 auto", color: "var(--text-3)", fontSize: 13 }}>
        {note}
      </p>
    </motion.div>
  );
}

/*
 * SAMap — Province paths derived from real GeoJSON data (MeganBeckett/sa-provinces.json).
 * Coordinate system: lon 16.47→32.89 mapped to x 0→590, lat -22.13→-34.83 mapped to y 0→470.
 * All 9 provinces use actual geographic boundaries.
 */
function SAMap() {
  const F  = "var(--map-fill)";
  const S  = "var(--map-stroke)";
  const sw = 1.2;
  const labelFill = "var(--map-label)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
      style={{ position: "relative", margin: "56px auto 0", maxWidth: 540 }}
    >
      <svg
        viewBox="0 0 590 470"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Map of South Africa showing all 9 provinces"
        style={{ width: "100%", display: "block" }}
      >
        {/* ── NORTHERN CAPE (largest province — western interior) ── */}
        <path d="M1,238 L8,235 L12,231 L12,227 L13,225 L14,223 L17,220 L22,218 L26,223 L32,227 L33,232 L32,237 L38,243 L43,246 L57,249 L70,250 L73,250 L93,252 L100,250 L101,244 L109,239 L112,237 L123,233 L126,224 L126,205 L126,187 L126,168 L126,149 L126,131 L126,114 L126,97 L132,102 L142,114 L145,117 L147,121 L149,123 L151,128 L151,132 L154,137 L157,149 L149,161 L149,171 L152,176 L168,175 L184,175 L190,169 L204,162 L213,153 L221,148 L223,162 L228,165 L233,167 L235,174 L235,181 L238,188 L250,196 L258,199 L265,198 L267,195 L270,192 L273,206 L284,213 L286,218 L293,216 L294,212 L296,208 L295,205 L295,202 L299,205 L304,221 L307,221 L303,229 L301,240 L283,278 L288,284 L294,288 L299,291 L305,300 L308,303 L319,311 L324,323 L322,333 L302,341 L289,349 L270,355 L260,353 L242,360 L228,359 L204,360 L202,366 L191,374 L178,378 L164,389 L149,399 L137,395 L130,381 L130,374 L115,382 L112,387 L106,379 L108,370 L107,368 L105,367 L103,367 L100,361 L97,362 L94,362 L93,350 L91,339 L85,317 L72,311 L59,321 L51,326 L45,332 L36,317 L29,303 L23,286 L21,280 L17,267 L13,262 L10,255 L4,245 L0,240 Z"
          fill={F} stroke={S} strokeWidth={sw} />
        <text x="118" y="292" textAnchor="middle" fill={labelFill} fontSize="9" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">NORTHERN</text>
        <text x="118" y="304" textAnchor="middle" fill={labelFill} fontSize="9" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">CAPE</text>

        {/* ── WESTERN CAPE (southwest, Cape Town) ── */}
        <path d="M257,439 L248,442 L237,442 L235,441 L236,442 L233,442 L227,440 L227,439 L226,441 L218,439 L206,442 L203,446 L196,448 L193,453 L182,452 L178,454 L165,453 L156,454 L151,456 L140,461 L137,462 L134,464 L128,469 L123,468 L114,468 L109,464 L104,462 L102,462 L102,455 L95,454 L96,451 L91,452 L85,453 L84,450 L85,448 L84,443 L74,442 L71,445 L72,448 L72,452 L69,448 L68,447 L66,444 L67,442 L66,441 L68,437 L72,433 L69,426 L66,421 L60,414 L56,408 L56,407 L59,410 L58,407 L56,406 L53,403 L51,404 L51,402 L50,398 L49,396 L50,395 L51,394 L54,391 L59,394 L67,382 L68,375 L65,361 L63,358 L59,350 L55,345 L50,338 L49,335 L55,321 L59,321 L68,313 L75,309 L85,317 L89,336 L91,344 L93,350 L93,359 L95,362 L98,362 L100,364 L103,367 L106,367 L107,368 L108,371 L106,379 L110,389 L111,386 L115,382 L130,374 L130,381 L134,394 L140,398 L149,399 L158,390 L170,382 L178,378 L187,374 L198,373 L202,366 L204,360 L216,352 L228,359 L236,363 L247,355 L260,353 L267,357 L276,357 L276,362 L275,366 L274,370 L261,373 L246,378 L245,387 L246,395 L238,396 L237,394 L235,398 L232,406 L244,417 L257,426 L252,431 L258,437 Z"
          fill={F} stroke={S} strokeWidth={sw} />
        <text x="150" y="415" textAnchor="middle" fill={labelFill} fontSize="8.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">WESTERN CAPE</text>

        {/* ── EASTERN CAPE (south, long coast) ── */}
        <path d="M437,296 L451,291 L455,295 L453,297 L451,298 L450,299 L447,301 L445,303 L441,305 L442,309 L443,310 L445,312 L449,312 L453,311 L453,313 L462,316 L466,314 L470,316 L474,317 L477,318 L479,317 L482,320 L484,320 L486,322 L487,323 L489,323 L490,325 L491,327 L491,329 L492,330 L493,331 L481,344 L474,349 L466,353 L465,354 L463,356 L459,361 L458,363 L454,367 L438,382 L434,386 L427,391 L419,395 L412,402 L411,404 L405,406 L397,411 L395,413 L384,420 L382,422 L375,424 L366,428 L360,431 L352,430 L332,431 L329,437 L332,440 L329,441 L321,441 L310,438 L303,442 L301,445 L300,447 L292,446 L280,443 L268,440 L259,435 L248,431 L256,423 L232,406 L235,398 L237,394 L238,396 L246,392 L243,384 L251,378 L265,373 L274,368 L276,365 L275,360 L277,356 L290,346 L301,342 L314,336 L323,331 L324,324 L324,319 L329,314 L333,316 L338,312 L342,311 L347,310 L350,311 L354,313 L360,314 L365,316 L369,316 L374,316 L376,314 L379,312 L383,311 L385,310 L387,309 L389,309 L391,307 L392,306 L391,304 L393,303 L395,304 L399,307 L402,311 L409,314 L417,314 L419,312 L419,308 L422,303 L426,299 L432,296 Z"
          fill={F} stroke={S} strokeWidth={sw} />
        <text x="355" y="395" textAnchor="middle" fill={labelFill} fontSize="8.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">EASTERN CAPE</text>

        {/* ── FREE STATE (central, contains Lesotho enclave) ── */}
        <path d="M445,246 L441,243 L437,238 L425,243 L419,244 L414,250 L411,250 L404,253 L402,257 L400,259 L397,264 L394,267 L390,272 L386,275 L381,277 L379,277 L381,281 L388,293 L392,297 L392,303 L391,307 L389,308 L387,309 L382,311 L379,313 L375,315 L370,315 L365,316 L360,314 L352,311 L347,310 L341,311 L334,316 L329,315 L325,314 L317,311 L308,303 L305,300 L299,291 L295,289 L288,284 L283,281 L302,241 L302,234 L303,227 L307,220 L310,217 L313,214 L315,211 L318,209 L325,205 L327,205 L330,205 L337,203 L342,204 L344,207 L345,203 L351,198 L354,196 L357,195 L359,193 L358,188 L363,184 L366,180 L371,178 L375,176 L384,177 L395,176 L398,172 L401,171 L406,172 L411,170 L414,169 L419,175 L421,176 L425,177 L429,179 L431,179 L434,181 L438,179 L444,182 L447,181 L450,180 L452,183 L454,185 L459,187 L462,188 L467,190 L468,193 L470,195 L473,199 L475,197 L477,200 L476,204 L475,205 L475,209 L476,211 L474,216 L473,219 L472,226 L468,227 L461,233 L457,236 L449,239 L448,242 Z"
          fill={F} stroke={S} strokeWidth={sw} />
        <text x="388" y="255" textAnchor="middle" fill={labelFill} fontSize="8.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">FREE STATE</text>

        {/* ── KWAZULU-NATAL (east coast strip) ── */}
        <path d="M450,251 L445,245 L448,242 L448,240 L454,237 L456,238 L457,236 L457,235 L459,234 L463,231 L468,227 L471,226 L472,225 L474,222 L473,220 L473,219 L474,216 L474,214 L476,211 L476,207 L475,206 L475,204 L478,203 L478,200 L476,199 L476,198 L480,196 L484,194 L487,194 L492,194 L494,193 L497,191 L499,191 L501,190 L508,192 L511,190 L513,191 L517,192 L520,193 L528,192 L539,191 L557,192 L556,190 L557,178 L562,174 L569,175 L590,175 L588,185 L580,212 L574,230 L572,236 L567,241 L561,247 L558,249 L550,252 L540,262 L534,268 L524,283 L508,310 L499,324 L493,331 L492,330 L489,324 L488,323 L487,323 L486,322 L481,319 L475,317 L472,317 L467,314 L463,315 L462,316 L454,313 L450,310 L449,312 L445,312 L443,310 L442,307 L441,305 L445,303 L447,301 L450,299 L451,298 L453,297 L454,296 L454,294 L454,289 L455,287 L454,285 L455,281 L460,277 L462,271 L466,267 L463,261 L459,257 L452,253 L450,251 Z"
          fill={F} stroke={S} strokeWidth={sw} />
        <text x="525" y="280" textAnchor="middle" fill={labelFill} fontSize="8.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">KZN</text>

        {/* ── NORTH WEST ── */}
        <path d="M348,94 L357,93 L365,100 L370,101 L379,96 L384,104 L394,109 L397,110 L399,107 L404,106 L412,106 L415,106 L422,110 L419,110 L419,113 L423,115 L420,123 L417,125 L415,129 L413,134 L412,135 L405,139 L397,137 L390,149 L386,161 L388,162 L396,159 L400,161 L399,164 L397,172 L393,176 L385,178 L375,176 L366,180 L363,183 L360,185 L360,192 L359,194 L354,196 L351,199 L346,203 L344,205 L342,204 L338,203 L330,205 L325,206 L317,209 L313,214 L309,218 L307,220 L305,221 L307,206 L299,205 L295,203 L294,212 L293,216 L286,209 L273,204 L272,194 L270,194 L267,196 L263,199 L256,198 L245,193 L236,188 L234,183 L235,174 L232,166 L228,164 L223,145 L224,139 L226,133 L228,127 L233,120 L236,117 L238,118 L248,117 L252,118 L259,123 L263,125 L268,129 L281,133 L299,137 L308,134 L328,129 L335,109 L338,98 L342,96 Z"
          fill={F} stroke={S} strokeWidth={sw} />
        <text x="305" y="155" textAnchor="middle" fill={labelFill} fontSize="8" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">NORTH WEST</text>

        {/* ── LIMPOPO (northernmost) ── */}
        <path d="M377,60 L379,56 L381,56 L381,55 L382,53 L385,52 L386,50 L390,47 L394,47 L397,46 L399,44 L400,40 L403,39 L406,39 L407,38 L406,37 L408,36 L412,32 L415,30 L416,27 L418,25 L420,24 L420,22 L422,20 L426,17 L434,16 L441,14 L444,12 L449,10 L450,5 L456,3 L461,2 L464,2 L469,2 L473,0 L478,0 L484,3 L487,4 L490,6 L495,6 L500,8 L504,7 L509,7 L516,6 L525,8 L528,7 L530,9 L532,10 L539,31 L542,50 L549,64 L553,68 L548,71 L546,70 L544,71 L543,70 L541,71 L536,71 L534,72 L536,73 L536,84 L538,88 L543,92 L543,94 L540,96 L535,101 L536,105 L531,106 L530,107 L530,104 L528,98 L528,93 L524,90 L513,85 L509,89 L495,91 L491,98 L480,106 L479,109 L475,113 L469,110 L467,108 L463,107 L464,105 L464,101 L466,101 L466,97 L457,101 L452,103 L448,104 L441,104 L436,108 L431,110 L427,113 L430,114 L436,112 L438,115 L436,116 L430,118 L422,114 L419,113 L418,110 L421,108 L412,106 L404,106 L401,105 L397,110 L392,108 L384,104 L380,96 L376,98 L368,101 L358,99 L357,93 L362,85 L371,80 L374,73 L377,60 Z"
          fill={F} stroke={S} strokeWidth={sw} />
        <text x="450" y="62" textAnchor="middle" fill={labelFill} fontSize="9.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">LIMPOPO</text>

        {/* ── MPUMALANGA ── */}
        <path d="M555,79 L558,102 L557,124 L558,130 L555,136 L549,141 L535,133 L525,143 L514,165 L517,173 L520,176 L521,182 L529,191 L520,193 L516,193 L513,191 L508,191 L502,191 L501,190 L499,191 L496,191 L492,194 L487,194 L481,195 L479,197 L476,197 L475,198 L473,199 L470,196 L468,192 L467,191 L464,189 L462,189 L460,187 L458,186 L455,186 L454,185 L452,183 L452,181 L448,180 L446,182 L445,181 L437,179 L434,181 L432,179 L430,180 L429,179 L426,178 L426,173 L427,171 L431,166 L435,164 L442,161 L435,154 L432,149 L434,146 L440,143 L446,139 L449,135 L453,126 L455,124 L459,120 L453,119 L445,120 L445,117 L446,115 L447,113 L447,111 L444,110 L432,113 L427,114 L431,111 L436,108 L441,104 L450,102 L456,104 L463,98 L466,101 L464,101 L463,102 L464,105 L463,106 L467,109 L470,112 L479,111 L479,107 L491,98 L493,91 L498,91 L508,90 L513,86 L524,90 L528,93 L525,96 L529,102 L526,107 L531,106 L533,106 L538,106 L536,101 L538,96 L543,94 L539,89 L538,87 L539,75 L534,72 L536,71 L542,70 L543,71 L545,70 L546,70 L548,71 L551,68 L553,68 Z"
          fill={F} stroke={S} strokeWidth={sw} />
        <text x="506" y="142" textAnchor="middle" fill={labelFill} fontSize="7.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">MPUM.</text>

        {/* ── GAUTENG (highlighted launch province) ── */}
        <path d="M398,172 L398,166 L399,164 L400,162 L400,161 L397,160 L396,159 L391,160 L389,161 L388,162 L386,161 L384,158 L389,154 L390,149 L392,148 L394,143 L397,137 L401,137 L403,138 L405,139 L410,138 L412,137 L412,134 L413,134 L413,133 L412,130 L415,129 L417,127 L417,125 L417,122 L418,121 L419,121 L418,122 L419,123 L420,123 L422,122 L424,121 L427,118 L430,118 L432,117 L435,116 L437,116 L438,116 L438,115 L437,114 L436,113 L437,112 L441,110 L445,111 L447,111 L447,112 L447,113 L447,114 L446,115 L445,114 L445,116 L445,117 L445,118 L443,120 L447,120 L449,119 L452,119 L455,118 L457,119 L459,120 L459,120 L456,122 L453,125 L452,127 L449,131 L448,136 L448,137 L447,139 L445,143 L442,144 L440,143 L436,143 L434,146 L432,146 L431,149 L432,150 L433,152 L435,154 L436,155 L439,156 L445,159 L441,162 L436,164 L432,166 L431,167 L427,171 L426,173 L425,175 L425,177 L423,176 L421,176 L419,176 L419,175 L418,174 L416,173 L414,170 L411,170 L407,171 L406,171 L406,172 L402,172 L401,171 L399,171 L398,172 Z"
          fill="rgba(119,77,255,0.20)" stroke="rgba(119,77,255,0.65)" strokeWidth="1.6" />

        {/* Pulsing dot over Johannesburg/Pretoria */}
        <motion.circle cx="430" cy="143" r="5" fill="#774DFF"
          animate={{ opacity: [1, 0.3, 1], r: [5, 8, 5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
        <motion.circle cx="430" cy="143" r="12"
          fill="rgba(119,77,255,0)" stroke="rgba(119,77,255,0.35)" strokeWidth="1"
          animate={{ r: [8, 20, 8], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }} />
        <text x="430" y="133" textAnchor="middle" fill="rgba(167,139,255,0.95)" fontSize="7" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">GAUTENG</text>

        {/* ── Expansion dots (other provinces) ── */}
        {([
          { cx: 450, cy: 55,  label: "LP",  delay: 0.8  },
          { cx: 506, cy: 135, label: "MP",  delay: 1.1  },
          { cx: 525, cy: 275, label: "KZN", delay: 1.4  },
          { cx: 355, cy: 388, label: "EC",  delay: 1.7  },
          { cx: 150, cy: 415, label: "WC",  delay: 2.0  },
          { cx: 118, cy: 285, label: "NC",  delay: 2.3  },
          { cx: 305, cy: 148, label: "NW",  delay: 2.6  },
          { cx: 388, cy: 248, label: "FS",  delay: 2.9  },
        ] as { cx:number; cy:number; label:string; delay:number }[]).map((dot) => (
          <g key={dot.label}>
            <motion.circle
              cx={dot.cx} cy={dot.cy} r="3"
              fill="#FE4A23"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.85, 0.85, 0] }}
              transition={{ duration: 2.8, repeat: Infinity, delay: dot.delay, repeatDelay: 3 }}
            />
          </g>
        ))}
      </svg>

      {/* Legend */}
      <div style={{ display: "flex", justifyContent: "center", gap: 24, marginTop: 12, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#774DFF" }}/>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, color: "var(--text-3)", fontWeight: 600, letterSpacing: "0.05em" }}>
            LAUNCHING, GAUTENG
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#FE4A23" }}/>
          <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 11, color: "var(--text-3)", fontWeight: 600, letterSpacing: "0.05em" }}>
            EXPANDING NATIONALLY
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      ref={ref}
      id="reach"
      className="section"
      aria-labelledby="stats-heading"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 64px" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label" style={{ marginBottom: 20 }}
          >
            {t("stats_label")}
          </motion.p>
          <motion.h2
            id="stats-heading"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="display-2" style={{ marginBottom: 20 }}
          >
            {t("stats_h2_a")}{" "}
            <span className="text-gradient">{t("stats_h2_b")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg"
          >
            {t("stats_sub")}
          </motion.p>
        </div>

        {/* Stat cards */}
        <div className="stats-grid">
          <StatCard num={500}  unit={t("stats_n1_unit")} label={t("stats_n1_label")} note={t("stats_n1_note")} delay={0.3} inView={inView} />
          <StatCard num={9}    unit={t("stats_n2_unit")} label={t("stats_n2_label")} note={t("stats_n2_note")} delay={0.4} inView={inView} />
          <StatCard num={3}    unit={t("stats_n3_unit")} label={t("stats_n3_label")} note={t("stats_n3_note")} delay={0.5} inView={inView} />
        </div>

        {/* Map */}
        <SAMap />
      </div>
    </section>
  );
}
