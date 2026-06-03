/**
 * Illustrations — Human-first illustration library for YourUniverse
 *
 * Design philosophy:
 *  - Warm, human characters in real learning moments
 *  - Inclusive skin tones (warm medium brown — representative of SA's diverse learners)
 *  - School uniform context (navy blazer / white shirt — universal SA school identity)
 *  - Joy, curiosity, achievement — emotions students actually feel
 *  - Tech elements complement the characters, never replace them
 *  - Style: flat/semi-flat with subtle shadows — unDraw × Dribbble e-learning
 */

/* ─────────────────────────────────────────────────────────────────────────────
   PALETTE CONSTANTS
   ───────────────────────────────────────────────────────────────────────────── */
const SKIN   = "#C8916B";  /* Warm medium-brown — inclusive SA skin reference  */
const SKIN_D = "#A97550";  /* Deeper shadow tone for depth                     */
const HAIR   = "#1C1A2E";  /* Very dark blue-black natural hair                */
const BLAZER = "#1A2744";  /* Navy blazer matching brand deep-blue             */
const SHIRT  = "#F1F5F9";  /* White shirt / collar                             */
const PURPLE = "#774DFF";
const P_LITE = "#A78BFF";
const ORANGE = "#FE4A23";
const O_LITE = "#FF8C6B";
const NAVY   = "#0F172A";
const CARD   = "rgba(16,24,40,0.92)";

/* ─────────────────────────────────────────────────────────────────────────────
   StudentHero — Main hero illustration
   "Zola" — Grade 10 student, South African, full of curiosity and ambition.
   She's sitting forward, holding a phone showing her YourUniverse dashboard,
   surrounded by the things that represent her future: a cap, subject orbits,
   career sparkles, and her platform doing the thinking alongside her.
   ───────────────────────────────────────────────────────────────────────────── */
export function StudentHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 540"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="South African student Zola using YourUniverse"
      role="img"
      style={{ width: "100%", maxWidth: 460, height: "auto" }}
    >
      <defs>
        <radialGradient id="sh-bg" cx="50%" cy="60%" r="55%">
          <stop offset="0%"  stopColor={PURPLE} stopOpacity="0.12"/>
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="sh-floor" cx="50%" cy="100%" r="40%">
          <stop offset="0%"  stopColor={PURPLE} stopOpacity="0.08"/>
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0"/>
        </radialGradient>
        {/* Subtle drop shadow for character */}
        <filter id="sh-shadow" x="-10%" y="-5%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="16" floodColor={NAVY} floodOpacity="0.35"/>
        </filter>
      </defs>

      {/* ── Ambient background ── */}
      <ellipse cx="230" cy="310" rx="220" ry="200" fill="url(#sh-bg)"/>
      <ellipse cx="230" cy="510" rx="180" ry="60"  fill="url(#sh-floor)"/>

      {/* ── Orbital decorative rings (brand motif) ── */}
      <ellipse cx="230" cy="360" rx="185" ry="55"
        stroke={`rgba(119,77,255,0.09)`} strokeWidth="1.2" strokeDasharray="7 10"/>
      <ellipse cx="230" cy="346" rx="138" ry="40"
        stroke={`rgba(241,245,249,0.05)`} strokeWidth="1"  strokeDasharray="5 8"/>

      {/* ══════════════════════════════════════════════════
          FLOATING DATA CARDS
          ══════════════════════════════════════════════════ */}

      {/* Card: Career Match — top right */}
      <rect x="306" y="34" width="140" height="68" rx="14"
        fill={CARD} stroke={`rgba(119,77,255,0.40)`} strokeWidth="1"/>
      <circle cx="326" cy="54" r="11" fill={`rgba(119,77,255,0.18)`} stroke={`rgba(119,77,255,0.45)`} strokeWidth="1"/>
      <path d="M320 54 L325 59 L332 48" stroke={PURPLE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <rect x="344" y="46" width="56" height="6" rx="3" fill={`rgba(255,255,255,0.10)`}/>
      <rect x="344" y="56" width="76" height="5" rx="2.5" fill={`rgba(119,77,255,0.45)`}/>
      <rect x="316" y="70" width="56" height="5" rx="2.5" fill={`rgba(119,77,255,0.25)`}/>
      <rect x="316" y="79" width="40" height="5" rx="2.5" fill={`rgba(254,74,35,0.35)`}/>
      <rect x="362" y="70" width="66" height="14" rx="7"
        fill={`rgba(254,74,35,0.15)`} stroke={`rgba(254,74,35,0.40)`} strokeWidth="0.8"/>
      <text x="395" y="80" textAnchor="middle"
        fill={O_LITE} fontSize="7" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">APS: 87</text>

      {/* Card: Study streak — top left */}
      <rect x="10" y="100" width="112" height="76" rx="14"
        fill={CARD} stroke={`rgba(167,139,255,0.30)`} strokeWidth="1"/>
      {/* Ring progress */}
      <circle cx="40" cy="134" r="22" fill="none" stroke={`rgba(255,255,255,0.07)`} strokeWidth="4"/>
      <path d="M40 112 a22 22 0 0 1 21.6 25.7" fill="none"
        stroke={PURPLE} strokeWidth="4" strokeLinecap="round"/>
      <text x="40" y="138" textAnchor="middle"
        fill={SHIRT} fontSize="10" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">82%</text>
      <rect x="70" y="122" width="42" height="5" rx="2.5" fill={`rgba(255,255,255,0.09)`}/>
      <rect x="70" y="122" width="34" height="5" rx="2.5" fill={`rgba(119,77,255,0.50)`}/>
      <rect x="70" y="132" width="42" height="5" rx="2.5" fill={`rgba(255,255,255,0.09)`}/>
      <rect x="70" y="132" width="26" height="5" rx="2.5" fill={`rgba(254,74,35,0.45)`}/>
      <rect x="70" y="142" width="42" height="5" rx="2.5" fill={`rgba(255,255,255,0.09)`}/>
      <rect x="70" y="142" width="36" height="5" rx="2.5" fill={`rgba(167,139,255,0.45)`}/>
      <text x="70" y="162" fill={`rgba(148,163,184,0.50)`}
        fontSize="7" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">READINESS</text>

      {/* ══════════════════════════════════════════════════
          FLOATING EDUCATIONAL ELEMENTS
          ══════════════════════════════════════════════════ */}

      {/* Graduation cap — upper area, tilted */}
      <g transform="translate(172, 92) rotate(-18)">
        <rect x="-4" y="7" width="70" height="9" rx="3" fill={PURPLE} opacity="0.88"/>
        <path d="M31 -5 L62 9 L31 23 L0 9 Z" fill="#5E38D4"/>
        {/* Cord */}
        <path d="M58 10 L58 28" stroke={P_LITE} strokeWidth="3" strokeLinecap="round"/>
        <circle cx="58" cy="33" r="5.5" fill={ORANGE}/>
        {/* Tassel top */}
        <path d="M58 28 L52 38 M58 28 L58 38 M58 28 L64 38"
          stroke={O_LITE} strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
      </g>

      {/* Maths bubble — right orbit */}
      <circle cx="376" cy="200" r="30"
        fill={`rgba(16,24,40,0.90)`} stroke={`rgba(119,77,255,0.35)`} strokeWidth="1.2"/>
      <text x="376" y="196" textAnchor="middle"
        fill={P_LITE} fontSize="11" fontFamily="'Space Grotesk',sans-serif" fontWeight="800">MATH</text>
      <text x="376" y="211" textAnchor="middle"
        fill={PURPLE} fontSize="19" fontFamily="Georgia,serif">Σ</text>

      {/* Science bubble — left orbit */}
      <circle cx="52" cy="268" r="26"
        fill={`rgba(16,24,40,0.90)`} stroke={`rgba(254,74,35,0.30)`} strokeWidth="1.2"/>
      {/* Atom */}
      <circle cx="52" cy="266" r="5.5" fill={`rgba(254,74,35,0.55)`}/>
      <ellipse cx="52" cy="266" rx="18" ry="7"
        stroke={`rgba(254,74,35,0.55)`} strokeWidth="1.4" fill="none"/>
      <ellipse cx="52" cy="266" rx="18" ry="7"
        stroke={`rgba(254,74,35,0.35)`} strokeWidth="1.2" fill="none"
        transform="rotate(60 52 266)"/>
      <ellipse cx="52" cy="266" rx="18" ry="7"
        stroke={`rgba(254,74,35,0.25)`} strokeWidth="1" fill="none"
        transform="rotate(120 52 266)"/>

      {/* Sparkle stars */}
      <path d="M390 106 L392.5 113.5 L400 116 L392.5 118.5 L390 126 L387.5 118.5 L380 116 L387.5 113.5 Z"
        fill={PURPLE} opacity="0.55"/>
      <path d="M22 170 L24 176 L30 178 L24 180 L22 186 L20 180 L14 178 L20 176 Z"
        fill={ORANGE} opacity="0.50"/>
      <path d="M418 282 L419.5 287 L425 288.5 L419.5 290 L418 295 L416.5 290 L411 288.5 L416.5 287 Z"
        fill={P_LITE} opacity="0.60"/>
      <path d="M18 340 L20 347 L27 349 L20 351 L18 358 L16 351 L9 349 L16 347 Z"
        fill={PURPLE} opacity="0.38"/>

      {/* Career path dots */}
      <circle cx="398" cy="370" r="7.5" fill={PURPLE} opacity="0.50"/>
      <circle cx="422" cy="344" r="5.5" fill={P_LITE} opacity="0.42"/>
      <circle cx="440" cy="314" r="4"   fill={P_LITE} opacity="0.32"/>
      <path d="M398 370 L422 344 L440 314"
        stroke={`rgba(119,77,255,0.30)`} strokeWidth="1.8" strokeLinecap="round"/>

      {/* ══════════════════════════════════════════════════
          PHONE / DASHBOARD (held in hands)
          ══════════════════════════════════════════════════ */}
      <rect x="170" y="374" width="120" height="160" rx="16"
        fill="#0C1526" stroke={`rgba(119,77,255,0.45)`} strokeWidth="1.5"/>
      {/* Screen */}
      <rect x="178" y="382" width="104" height="144" rx="10"
        fill={`rgba(119,77,255,0.08)`} stroke={`rgba(119,77,255,0.15)`} strokeWidth="1"/>
      {/* Status bar */}
      <rect x="188" y="390" width="50" height="6" rx="3" fill={`rgba(255,255,255,0.09)`}/>
      <rect x="188" y="390" width="30" height="6" rx="3" fill={`rgba(119,77,255,0.48)`}/>
      {/* AI badge */}
      <rect x="248" y="389" width="28" height="8" rx="4"
        fill={`rgba(254,74,35,0.18)`} stroke={`rgba(254,74,35,0.42)`} strokeWidth="0.8"/>
      <text x="262" y="395.5" textAnchor="middle"
        fill={O_LITE} fontSize="5.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">AI</text>
      {/* Progress bars */}
      <rect x="188" y="402" width="94" height="4" rx="2" fill={`rgba(255,255,255,0.06)`}/>
      <rect x="188" y="402" width="72" height="4" rx="2" fill={`rgba(119,77,255,0.55)`}/>
      <rect x="188" y="410" width="94" height="4" rx="2" fill={`rgba(255,255,255,0.06)`}/>
      <rect x="188" y="410" width="50" height="4" rx="2" fill={`rgba(254,74,35,0.50)`}/>
      <rect x="188" y="418" width="94" height="4" rx="2" fill={`rgba(255,255,255,0.06)`}/>
      <rect x="188" y="418" width="82" height="4" rx="2" fill={`rgba(167,139,255,0.48)`}/>
      {/* Mini chart */}
      <rect x="188" y="428" width="12" height="20" rx="3" fill={`rgba(119,77,255,0.38)`}/>
      <rect x="204" y="420" width="12" height="28" rx="3" fill={`rgba(119,77,255,0.60)`}/>
      <rect x="220" y="424" width="12" height="24" rx="3" fill={`rgba(167,139,255,0.45)`}/>
      {/* Bottom branding */}
      <rect x="188" y="456" width="66" height="12" rx="6"
        fill={`rgba(119,77,255,0.15)`} stroke={`rgba(119,77,255,0.32)`} strokeWidth="0.8"/>
      <text x="221" y="465" textAnchor="middle"
        fill={P_LITE} fontSize="7" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">YourUniverse</text>
      {/* Home indicator */}
      <rect x="213" y="476" width="34" height="3" rx="1.5" fill={`rgba(255,255,255,0.15)`}/>

      {/* ══════════════════════════════════════════════════
          CHARACTER BODY
          ══════════════════════════════════════════════════ */}

      {/* Shadow on ground */}
      <ellipse cx="232" cy="516" rx="85" ry="14" fill={`rgba(0,0,0,0.22)`}/>

      {/* Left leg */}
      <rect x="168" y="434" width="32" height="72" rx="12" fill={BLAZER}/>
      {/* Right leg */}
      <rect x="256" y="434" width="32" height="72" rx="12" fill={BLAZER}/>
      {/* Shoes */}
      <path d="M162 498 Q160 514 175 516 L203 516 Q213 514 210 498Z" fill="#131F35"/>
      <path d="M246 498 Q243 514 254 516 L286 516 Q298 514 296 498Z" fill="#131F35"/>

      {/* Body / blazer */}
      <path d="M152 298 Q136 332 136 430 L324 430 Q324 332 308 298 Q294 278 230 275 Q166 278 152 298Z"
        fill={BLAZER} filter="url(#sh-shadow)"/>

      {/* White shirt collar / front */}
      <path d="M210 284 L230 304 L250 284" stroke={SHIRT} strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      {/* Shirt visible below collar */}
      <path d="M218 290 L230 310 L242 290 L242 280 Q230 278 218 280 Z" fill={SHIRT} opacity="0.9"/>

      {/* School badge on left lapel */}
      <circle cx="205" cy="320" r="10" fill={`rgba(119,77,255,0.20)`} stroke={`rgba(119,77,255,0.50)`} strokeWidth="1.2"/>
      <circle cx="205" cy="320" r="5"  fill={PURPLE} opacity="0.6"/>

      {/* Blazer lapel lines */}
      <path d="M210 296 L196 340 L210 336" stroke={`rgba(255,255,255,0.07)`} strokeWidth="1.5" fill="none"/>
      <path d="M250 296 L264 340 L250 336" stroke={`rgba(255,255,255,0.07)`} strokeWidth="1.5" fill="none"/>

      {/* Left arm (slightly raised, holding phone at angle) */}
      <path d="M154 308 Q122 326 116 380"
        stroke={SKIN} strokeWidth="26" strokeLinecap="round"/>
      {/* Left hand */}
      <ellipse cx="115" cy="388" rx="20" ry="17" fill={SKIN}/>
      {/* Thumb detail */}
      <path d="M103 380 Q96 375 100 368 Q106 365 112 370" fill={SKIN} stroke={SKIN_D} strokeWidth="1"/>

      {/* Right arm (relaxed, near phone) */}
      <path d="M308 308 Q342 326 346 380"
        stroke={SKIN} strokeWidth="26" strokeLinecap="round"/>
      {/* Right hand */}
      <ellipse cx="347" cy="388" rx="20" ry="17" fill={SKIN}/>
      {/* Thumb detail */}
      <path d="M359 380 Q366 375 362 368 Q356 365 350 370" fill={SKIN} stroke={SKIN_D} strokeWidth="1"/>

      {/* Neck */}
      <rect x="210" y="250" width="40" height="34" rx="14" fill={SKIN}/>
      {/* Neck shadow */}
      <path d="M212 270 Q230 278 248 270 Q246 282 230 284 Q214 282 212 270Z" fill={SKIN_D} opacity="0.3"/>

      {/* ══════════════════════════════════════════════════
          HEAD
          ══════════════════════════════════════════════════ */}

      {/* Head base */}
      <ellipse cx="230" cy="196" rx="72" ry="78" fill={SKIN}/>

      {/* Chin definition */}
      <path d="M185 234 Q200 258 230 262 Q260 258 275 234"
        fill={SKIN} stroke={SKIN_D} strokeWidth="1" opacity="0.3"/>

      {/* ── NATURAL HAIR ── */}
      {/* Hair crown — natural/textured afro style */}
      <path d="M160 184 Q158 140 184 118 Q208 100 230 98 Q252 100 274 118 Q298 140 300 184
               Q302 162 296 146 Q278 110 250 100 Q230 94 210 100 Q182 110 164 146 Q158 162 160 184Z"
        fill={HAIR}/>
      {/* Hairline detail — textured top */}
      <path d="M160 184 Q162 170 168 160 Q170 175 175 180Z"  fill={HAIR}/>
      <path d="M300 184 Q298 170 292 160 Q290 175 285 180Z" fill={HAIR}/>
      {/* Side hair */}
      <path d="M160 184 Q152 200 156 222 Q160 205 166 196Z" fill={HAIR}/>
      <path d="M300 184 Q308 200 304 222 Q300 205 294 196Z" fill={HAIR}/>
      {/* Hair texture dots */}
      <circle cx="200" cy="112" r="3.5" fill={`rgba(255,255,255,0.06)`}/>
      <circle cx="230" cy="106" r="3"   fill={`rgba(255,255,255,0.05)`}/>
      <circle cx="260" cy="112" r="3.5" fill={`rgba(255,255,255,0.06)`}/>

      {/* ── FACE ── */}
      {/* Ear left */}
      <ellipse cx="160" cy="200" rx="12" ry="16" fill={SKIN}/>
      <path d="M163 192 Q168 200 163 208" fill="none" stroke={SKIN_D} strokeWidth="1.5" opacity="0.5"/>
      {/* Ear right */}
      <ellipse cx="300" cy="200" rx="12" ry="16" fill={SKIN}/>
      <path d="M297 192 Q292 200 297 208" fill="none" stroke={SKIN_D} strokeWidth="1.5" opacity="0.5"/>

      {/* Earrings (small, subtle — adds personality) */}
      <circle cx="155" cy="206" r="4" fill={ORANGE} opacity="0.9"/>
      <circle cx="305" cy="206" r="4" fill={ORANGE} opacity="0.9"/>

      {/* ── EYEBROWS (expressive, arched) ── */}
      <path d="M193 167 Q206 160 220 165"
        stroke={HAIR} strokeWidth="3.5" strokeLinecap="round" fill="none"/>
      <path d="M240 165 Q254 160 267 167"
        stroke={HAIR} strokeWidth="3.5" strokeLinecap="round" fill="none"/>

      {/* ── EYES (almond-shaped, warm and expressive) ── */}
      {/* Left eye whites */}
      <ellipse cx="207" cy="184" rx="14" ry="11" fill="white" opacity="0.95"/>
      {/* Left iris */}
      <circle cx="207" cy="185" r="8"  fill="#3D2B1F"/>
      {/* Left pupil */}
      <circle cx="208" cy="185" r="4.5" fill="#1C1411"/>
      {/* Left shine */}
      <circle cx="211" cy="181" r="3"   fill="white"/>
      <circle cx="205" cy="183" r="1.2" fill="white" opacity="0.6"/>
      {/* Left eyelid line */}
      <path d="M193 179 Q207 172 221 179" stroke={HAIR} strokeWidth="1.5" fill="none" opacity="0.5"/>

      {/* Right eye whites */}
      <ellipse cx="253" cy="184" rx="14" ry="11" fill="white" opacity="0.95"/>
      {/* Right iris */}
      <circle cx="253" cy="185" r="8"  fill="#3D2B1F"/>
      {/* Right pupil */}
      <circle cx="254" cy="185" r="4.5" fill="#1C1411"/>
      {/* Right shine */}
      <circle cx="257" cy="181" r="3"   fill="white"/>
      <circle cx="251" cy="183" r="1.2" fill="white" opacity="0.6"/>
      {/* Right eyelid line */}
      <path d="M239 179 Q253 172 267 179" stroke={HAIR} strokeWidth="1.5" fill="none" opacity="0.5"/>

      {/* ── NOSE (subtle but human) ── */}
      <path d="M225 208 Q230 216 235 208" stroke={SKIN_D} strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.5"/>
      {/* Nostrils */}
      <circle cx="222" cy="214" r="3" fill={SKIN_D} opacity="0.22"/>
      <circle cx="238" cy="214" r="3" fill={SKIN_D} opacity="0.22"/>

      {/* ── SMILE (genuine, joyful) ── */}
      {/* Upper lip */}
      <path d="M210 225 Q218 221 230 224 Q242 221 250 225"
        fill="#B07052" stroke={`rgba(120,60,30,0.4)`} strokeWidth="0.8"/>
      {/* Lower lip — fuller */}
      <path d="M210 225 Q230 240 250 225"
        fill="#C47E5A" stroke={`rgba(120,60,30,0.3)`} strokeWidth="0.8"/>
      {/* Teeth visible */}
      <path d="M214 226 Q230 234 246 226 Q244 230 230 232 Q216 230 214 226Z"
        fill="white" opacity="0.9"/>
      {/* Smile crinkle dimples */}
      <circle cx="207" cy="228" r="2.5" fill={SKIN_D} opacity="0.25"/>
      <circle cx="253" cy="228" r="2.5" fill={SKIN_D} opacity="0.25"/>

      {/* ── EARBUDS (studying detail) ── */}
      <circle cx="162" cy="205" r="7.5" fill="#141E2E" stroke={PURPLE} strokeWidth="1.8"/>
      <circle cx="298" cy="205" r="7.5" fill="#141E2E" stroke={PURPLE} strokeWidth="1.8"/>
      {/* Cord looping under chin */}
      <path d="M162 213 Q196 228 230 230 Q264 228 298 213"
        stroke={`rgba(119,77,255,0.50)`} strokeWidth="2" fill="none" strokeLinecap="round"/>

      {/* ── CHEEK BLUSH (warmth, life) ── */}
      <ellipse cx="190" cy="215" rx="16" ry="9" fill={ORANGE} opacity="0.10"/>
      <ellipse cx="270" cy="215" rx="16" ry="9" fill={ORANGE} opacity="0.10"/>

      {/* Decorative dots */}
      <circle cx="412" cy="134" r="3"   fill={`rgba(119,77,255,0.30)`}/>
      <circle cx="26"  cy="72"  r="2.5" fill={`rgba(254,74,35,0.25)`}/>
      <circle cx="440" cy="240" r="2.2" fill={`rgba(255,255,255,0.15)`}/>
      <circle cx="20"  cy="430" r="3"   fill={`rgba(119,77,255,0.18)`}/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   DecisionPath — Two students facing the Grade 9 crossroads
   Human story: two learners side by side — one has YourUniverse guidance,
   one is guessing. Warmth + clarity about WHY the platform matters.
   ───────────────────────────────────────────────────────────────────────────── */
export function DecisionPath({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 360"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Two Grade 9 students at the career decision crossroads"
      role="img"
      style={{ width: "100%", maxWidth: 420, height: "auto" }}
    >
      <defs>
        <radialGradient id="dp-glow" cx="50%" cy="45%" r="50%">
          <stop offset="0%"  stopColor={PURPLE} stopOpacity="0.10"/>
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="210" cy="180" rx="200" ry="160" fill="url(#dp-glow)"/>

      {/* ── "WITHOUT" student (left) — confused, unsupported ── */}
      {/* Shadow */}
      <ellipse cx="92" cy="318" rx="40" ry="8" fill={`rgba(0,0,0,0.18)`}/>
      {/* Body */}
      <path d="M62 190 Q54 220 56 310 L128 310 Q130 220 122 190 Q114 176 92 174 Q70 176 62 190Z"
        fill="#2D3A52"/>
      {/* Collar */}
      <path d="M84 178 L92 188 L100 178" stroke={`rgba(241,245,249,0.5)`} strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Arms slumped */}
      <path d="M62 200 Q44 216 38 252" stroke={SKIN} strokeWidth="18" strokeLinecap="round"/>
      <path d="M122 200 Q140 216 146 252" stroke={SKIN} strokeWidth="18" strokeLinecap="round"/>
      {/* Hands */}
      <circle cx="36"  cy="258" r="13" fill={SKIN}/>
      <circle cx="148" cy="258" r="13" fill={SKIN}/>
      {/* Neck */}
      <rect x="81" y="158" width="22" height="20" rx="8" fill={SKIN}/>
      {/* Head */}
      <ellipse cx="92" cy="132" rx="40" ry="44" fill={SKIN}/>
      {/* Hair */}
      <path d="M54 128 Q56 98 76 84 Q92 76 108 84 Q128 98 130 128
               Q131 112 127 100 Q113 72 92 70 Q71 72 57 100 Q53 112 54 128Z" fill={HAIR}/>
      {/* Eyebrows — furrowed (worried) */}
      <path d="M76 114 Q84 108 92 113" stroke={HAIR} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M92 113 Q100 108 108 114" stroke={HAIR} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      {/* Eyes — worried, slightly downcast */}
      <ellipse cx="81"  cy="126" rx="9" ry="7.5" fill="white" opacity="0.9"/>
      <circle  cx="81"  cy="127" r="5"  fill="#3D2B1F"/>
      <circle  cx="83"  cy="124" r="1.8" fill="white"/>
      <ellipse cx="103" cy="126" rx="9" ry="7.5" fill="white" opacity="0.9"/>
      <circle  cx="103" cy="127" r="5"  fill="#3D2B1F"/>
      <circle  cx="105" cy="124" r="1.8" fill="white"/>
      {/* Mouth — uncertain, slight frown */}
      <path d="M80 148 Q92 153 104 148"
        stroke={`rgba(120,60,30,0.55)`} strokeWidth="2.2" fill="none" strokeLinecap="round"/>

      {/* Confusion bubbles */}
      <text x="126" y="88" fill={`rgba(254,74,35,0.70)`} fontSize="22" fontFamily="Georgia,serif">?</text>
      <text x="108" y="68" fill={`rgba(254,74,35,0.50)`} fontSize="16" fontFamily="Georgia,serif">?</text>
      <text x="140" y="72" fill={`rgba(254,74,35,0.40)`} fontSize="12" fontFamily="Georgia,serif">?</text>

      {/* ── Dividing line — the "decision moment" ── */}
      <line x1="210" y1="60" x2="210" y2="320"
        stroke={`rgba(241,245,249,0.08)`} strokeWidth="1.5" strokeDasharray="8 6"/>
      {/* Grade 9 badge at top */}
      <rect x="166" y="34" width="88" height="28" rx="14"
        fill={`rgba(254,74,35,0.14)`} stroke={`rgba(254,74,35,0.40)`} strokeWidth="1"/>
      <text x="210" y="52" textAnchor="middle"
        fill={O_LITE} fontSize="10" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">GRADE 9 DECISION</text>

      {/* ── "WITH YourUniverse" student (right) — confident, supported ── */}
      {/* Shadow */}
      <ellipse cx="328" cy="318" rx="44" ry="8" fill={`rgba(0,0,0,0.18)`}/>
      {/* Body */}
      <path d="M296 190 Q286 220 288 310 L368 310 Q370 220 360 190 Q350 176 328 174 Q306 176 296 190Z"
        fill={BLAZER}/>
      {/* Collar V */}
      <path d="M316 178 L328 192 L340 178" stroke={SHIRT} strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* School badge */}
      <circle cx="312" cy="210" r="8" fill={`rgba(119,77,255,0.22)`} stroke={`rgba(119,77,255,0.50)`} strokeWidth="1"/>
      <circle cx="312" cy="210" r="4" fill={PURPLE} opacity="0.6"/>
      {/* Left arm raised — celebrating! */}
      <path d="M296 202 Q268 178 256 148"
        stroke={SKIN} strokeWidth="20" strokeLinecap="round"/>
      <circle cx="254" cy="142" r="16" fill={SKIN}/>
      {/* Right arm */}
      <path d="M360 202 Q380 222 386 262"
        stroke={SKIN} strokeWidth="20" strokeLinecap="round"/>
      <circle cx="388" cy="268" r="15" fill={SKIN}/>
      {/* Neck */}
      <rect x="316" y="158" width="24" height="20" rx="8" fill={SKIN}/>
      {/* Head */}
      <ellipse cx="328" cy="132" rx="42" ry="46" fill={SKIN}/>
      {/* Hair */}
      <path d="M288 128 Q290 96 312 82 Q328 74 344 82 Q366 96 368 128
               Q370 110 365 97 Q350 68 328 66 Q306 68 291 97 Q286 110 288 128Z" fill={HAIR}/>
      {/* Eyebrows raised — excited/confident */}
      <path d="M312 110 Q320 103 330 108" stroke={HAIR} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      <path d="M326 108 Q336 103 344 110" stroke={HAIR} strokeWidth="2.8" strokeLinecap="round" fill="none"/>
      {/* Eyes — bright, wide, excited */}
      <ellipse cx="317" cy="124" rx="10" ry="9"  fill="white" opacity="0.95"/>
      <circle  cx="317" cy="125" r="6"   fill="#3D2B1F"/>
      <circle  cx="319" cy="121" r="2.5" fill="white"/>
      <ellipse cx="339" cy="124" rx="10" ry="9"  fill="white" opacity="0.95"/>
      <circle  cx="339" cy="125" r="6"   fill="#3D2B1F"/>
      <circle  cx="341" cy="121" r="2.5" fill="white"/>
      {/* Smile — big, genuine */}
      <path d="M312 148 Q328 162 344 148"
        fill="#C47E5A" stroke={`rgba(120,60,30,0.35)`} strokeWidth="0.8"/>
      <path d="M315 148 Q328 156 341 148 Q339 152 328 154 Q317 152 315 148Z"
        fill="white" opacity="0.88"/>
      {/* Cheek blush */}
      <ellipse cx="306" cy="136" rx="12" ry="7" fill={ORANGE} opacity="0.12"/>
      <ellipse cx="350" cy="136" rx="12" ry="7" fill={ORANGE} opacity="0.12"/>

      {/* Achievement elements around right student */}
      {/* Star burst */}
      <path d="M254 100 L256.5 108 L264 110.5 L256.5 113 L254 121 L251.5 113 L244 110.5 L251.5 108 Z"
        fill={PURPLE} opacity="0.65"/>
      {/* Checkmark badge */}
      <circle cx="396" cy="130" r="18"
        fill={`rgba(119,77,255,0.18)`} stroke={`rgba(119,77,255,0.50)`} strokeWidth="1.5"/>
      <path d="M386 130 L393 137 L407 121"
        stroke={PURPLE} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
      {/* Career path up-arrow */}
      <path d="M388 270 Q406 248 416 220"
        stroke={`rgba(119,77,255,0.38)`} strokeWidth="2" strokeLinecap="round"/>
      <path d="M410 224 L416 220 L416 228"
        stroke={`rgba(119,77,255,0.38)`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>

      {/* Bottom labels */}
      <text x="92" y="344" textAnchor="middle"
        fill={`rgba(254,74,35,0.55)`} fontSize="9" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">WITHOUT GUIDANCE</text>
      <text x="328" y="344" textAnchor="middle"
        fill={`rgba(119,77,255,0.70)`} fontSize="9" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">WITH YOURUNIVERSE</text>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SchoolTeacher — For the Schools/Institutions page
   A warm, professional female teacher presenting learner analytics.
   Human-first: she's engaged, pointing with pride at her students' progress.
   ───────────────────────────────────────────────────────────────────────────── */
export function SchoolTeacher({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 380 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Teacher presenting learner analytics dashboard"
      role="img"
      style={{ width: "100%", maxWidth: 380, height: "auto" }}
    >
      <defs>
        <radialGradient id="tc-bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%"  stopColor={PURPLE} stopOpacity="0.09"/>
          <stop offset="100%" stopColor={PURPLE} stopOpacity="0"/>
        </radialGradient>
      </defs>
      <ellipse cx="190" cy="240" rx="190" ry="180" fill="url(#tc-bg)"/>

      {/* ── Analytics board behind teacher ── */}
      <rect x="44" y="30" width="270" height="190" rx="16"
        fill="#0C1526" stroke={`rgba(119,77,255,0.36)`} strokeWidth="1.5"/>
      {/* Board header */}
      <rect x="56" y="43"  width="80"  height="8" rx="4" fill={`rgba(255,255,255,0.09)`}/>
      <rect x="56" y="43"  width="50"  height="8" rx="4" fill={`rgba(119,77,255,0.48)`}/>
      <rect x="270" y="43" width="34"  height="8" rx="4"
        fill={`rgba(254,74,35,0.18)`} stroke={`rgba(254,74,35,0.40)`} strokeWidth="0.8"/>
      <text x="287" y="50" textAnchor="middle"
        fill={O_LITE} fontSize="6.5" fontFamily="'Space Grotesk',sans-serif" fontWeight="700">LIVE</text>

      {/* Bar chart */}
      <rect x="56"  y="82" width="20" height="58" rx="4" fill={`rgba(119,77,255,0.32)`}/>
      <rect x="82"  y="66" width="20" height="74" rx="4" fill={`rgba(119,77,255,0.58)`}/>
      <rect x="108" y="72" width="20" height="68" rx="4" fill={`rgba(119,77,255,0.42)`}/>
      <rect x="134" y="58" width="20" height="82" rx="4" fill={`rgba(119,77,255,0.68)`}/>
      <rect x="160" y="74" width="20" height="66" rx="4" fill={`rgba(119,77,255,0.40)`}/>
      {/* Trend line over bars */}
      <path d="M66 110 L92 90 L118 95 L144 78 L170 86"
        stroke={ORANGE} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="66"  cy="110" r="4" fill={ORANGE}/>
      <circle cx="92"  cy="90"  r="4" fill={ORANGE}/>
      <circle cx="144" cy="78"  r="4" fill={ORANGE}/>

      {/* Stat cards on right of board */}
      <rect x="196" y="60" width="106" height="36" rx="9"
        fill={`rgba(119,77,255,0.12)`} stroke={`rgba(119,77,255,0.28)`} strokeWidth="1"/>
      <text x="249" y="76" textAnchor="middle"
        fill={P_LITE} fontSize="18" fontFamily="'Instrument Serif',serif">94%</text>
      <text x="249" y="88" textAnchor="middle"
        fill={`rgba(148,163,184,0.55)`} fontSize="7" fontFamily="'Space Grotesk',sans-serif">PLACEMENT RATE</text>

      <rect x="196" y="102" width="106" height="36" rx="9"
        fill={`rgba(254,74,35,0.09)`} stroke={`rgba(254,74,35,0.24)`} strokeWidth="1"/>
      <text x="249" y="118" textAnchor="middle"
        fill={O_LITE} fontSize="18" fontFamily="'Instrument Serif',serif">+38%</text>
      <text x="249" y="130" textAnchor="middle"
        fill={`rgba(148,163,184,0.55)`} fontSize="7" fontFamily="'Space Grotesk',sans-serif">READINESS LIFT</text>

      <rect x="196" y="144" width="106" height="36" rx="9"
        fill={`rgba(167,139,255,0.09)`} stroke={`rgba(167,139,255,0.24)`} strokeWidth="1"/>
      <text x="249" y="160" textAnchor="middle"
        fill={P_LITE} fontSize="18" fontFamily="'Instrument Serif',serif">500+</text>
      <text x="249" y="172" textAnchor="middle"
        fill={`rgba(148,163,184,0.55)`} fontSize="7" fontFamily="'Space Grotesk',sans-serif">LEARNERS REACHED</text>

      {/* ── TEACHER CHARACTER ── */}

      {/* Shadow */}
      <ellipse cx="190" cy="428" rx="72" ry="10" fill={`rgba(0,0,0,0.20)`}/>

      {/* Legs */}
      <rect x="160" y="370" width="28" height="54" rx="10" fill={BLAZER}/>
      <rect x="192" y="370" width="28" height="54" rx="10" fill={BLAZER}/>
      {/* Shoes */}
      <path d="M155 414 Q152 428 164 430 L190 430 Q198 428 196 414Z" fill="#131F35"/>
      <path d="M190 414 Q188 428 198 430 L224 430 Q232 428 230 414Z" fill="#131F35"/>

      {/* Body */}
      <path d="M142 252 Q132 286 134 368 L248 368 Q250 286 240 252 Q230 236 190 233 Q150 236 142 252Z"
        fill={BLAZER}/>
      {/* White shirt collar */}
      <path d="M178 238 L190 252 L202 238" stroke={SHIRT} strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Shirt front */}
      <path d="M184 244 L190 258 L196 244 L196 236 Q190 234 184 236Z" fill={SHIRT} opacity="0.85"/>
      {/* Blazer lapels */}
      <path d="M178 246 L166 296 L178 292" stroke={`rgba(255,255,255,0.07)`} strokeWidth="1.2" fill="none"/>
      <path d="M202 246 L214 296 L202 292" stroke={`rgba(255,255,255,0.07)`} strokeWidth="1.2" fill="none"/>

      {/* Left arm — pointing at board */}
      <path d="M142 264 Q100 238 66 214"
        stroke={SKIN} strokeWidth="24" strokeLinecap="round"/>
      {/* Left hand (pointing finger) */}
      <ellipse cx="61" cy="209" rx="17" ry="14" fill={SKIN}/>
      {/* Pointer finger detail */}
      <path d="M54 200 Q48 192 55 186 Q62 183 67 190 L65 204Z" fill={SKIN}/>

      {/* Right arm — neutral, slight bend */}
      <path d="M240 264 Q260 282 264 316"
        stroke={SKIN} strokeWidth="22" strokeLinecap="round"/>
      <ellipse cx="265" cy="322" rx="17" ry="14" fill={SKIN}/>

      {/* Neck */}
      <rect x="177" y="215" width="26" height="22" rx="9" fill={SKIN}/>

      {/* Head */}
      <ellipse cx="190" cy="180" rx="56" ry="62" fill={SKIN}/>

      {/* Hair — natural, pulled back professional style */}
      <path d="M136 176 Q138 144 160 128 Q180 116 200 118 Q222 120 238 136 Q252 152 244 176
               Q246 158 241 144 Q226 116 200 112 Q174 112 159 136 Q146 152 136 176Z" fill={HAIR}/>
      {/* Bun at back */}
      <circle cx="248" cy="162" r="18" fill={HAIR}/>
      <circle cx="248" cy="162" r="10" fill={`rgba(255,255,255,0.05)`}/>

      {/* Glasses */}
      <rect x="163" y="171" width="24" height="18" rx="9"
        fill="none" stroke="#2D3A52" strokeWidth="2.5"/>
      <rect x="194" y="171" width="24" height="18" rx="9"
        fill="none" stroke="#2D3A52" strokeWidth="2.5"/>
      <path d="M187 180 L194 180" stroke="#2D3A52" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M163 180 L155 177" stroke="#2D3A52" strokeWidth="2" strokeLinecap="round"/>
      <path d="M218 180 L226 177" stroke="#2D3A52" strokeWidth="2" strokeLinecap="round"/>
      {/* Glass lens tint */}
      <rect x="164" y="172" width="22" height="16" rx="8" fill={`rgba(119,77,255,0.06)`}/>
      <rect x="195" y="172" width="22" height="16" rx="8" fill={`rgba(119,77,255,0.06)`}/>

      {/* Eyes through glasses */}
      <circle cx="175" cy="180" r="5.5" fill="#3D2B1F"/>
      <circle cx="206" cy="180" r="5.5" fill="#3D2B1F"/>
      <circle cx="177" cy="177" r="2"   fill="white"/>
      <circle cx="208" cy="177" r="2"   fill="white"/>

      {/* Eyebrows */}
      <path d="M163 167 Q175 161 186 166" stroke={HAIR} strokeWidth="2.5" strokeLinecap="round" fill="none"/>
      <path d="M194 166 Q205 161 216 167" stroke={HAIR} strokeWidth="2.5" strokeLinecap="round" fill="none"/>

      {/* Warm confident smile */}
      <path d="M174 198 Q190 212 206 198"
        fill="#C47E5A" stroke={`rgba(120,60,30,0.35)`} strokeWidth="0.8"/>
      <path d="M177 198 Q190 206 203 198 Q200 203 190 205 Q180 203 177 198Z"
        fill="white" opacity="0.85"/>
      {/* Ear details */}
      <ellipse cx="136" cy="184" rx="10" ry="14" fill={SKIN}/>
      <ellipse cx="244" cy="184" rx="10" ry="14" fill={SKIN}/>

      {/* Sparkles */}
      <path d="M352 86 L354 93 L361 95.5 L354 98 L352 105 L350 98 L343 95.5 L350 93 Z"
        fill={PURPLE} opacity="0.48"/>
      <path d="M26 280 L27.5 285 L33 286.5 L27.5 288 L26 293 L24.5 288 L19 286.5 L24.5 285 Z"
        fill={ORANGE} opacity="0.42"/>
    </svg>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   EducationalOrbit — Abstract orbital decoration (non-character)
   Used as atmospheric background element — no humans, pure brand motif.
   ───────────────────────────────────────────────────────────────────────────── */
export function EducationalOrbit({ className, size = 400 }: { className?: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      style={{ width: size, height: size }}
    >
      <circle cx="200" cy="200" r="165" stroke={`rgba(119,77,255,0.07)`}  strokeWidth="1"   strokeDasharray="9 12"/>
      <circle cx="200" cy="200" r="125" stroke={`rgba(119,77,255,0.11)`}  strokeWidth="1.2" strokeDasharray="7 9"/>
      <circle cx="200" cy="200" r="86"  stroke={`rgba(119,77,255,0.15)`}  strokeWidth="1.2"/>
      <circle cx="200" cy="200" r="46"  stroke={`rgba(119,77,255,0.20)`}  strokeWidth="1.5"/>
      <circle cx="200" cy="200" r="18"  fill={`rgba(119,77,255,0.18)`}    stroke={`rgba(119,77,255,0.45)`} strokeWidth="1.5"/>
      <circle cx="200" cy="200" r="9"   fill={PURPLE} fillOpacity="0.65"/>
      {/* Orbital elements */}
      <g transform="translate(254,146)">
        <rect x="-13" y="2" width="26" height="6" rx="2" fill={PURPLE} fillOpacity="0.65"/>
        <path d="M0 -5 L13 4 L0 13 L-13 4 Z" fill={PURPLE} fillOpacity="0.55"/>
      </g>
      <g transform="translate(114,200)">
        <rect x="-13" y="-10" width="26" height="20" rx="3" fill={`rgba(119,77,255,0.24)`} stroke={`rgba(119,77,255,0.45)`} strokeWidth="1"/>
        <path d="M0 -10 L0 10" stroke={`rgba(119,77,255,0.50)`} strokeWidth="1.5"/>
      </g>
      <path d="M200 78 L202 87 L211 89.5 L202 92 L200 101 L198 92 L189 89.5 L198 87 Z"
        fill={PURPLE} fillOpacity="0.50"/>
      <g transform="translate(254,254)">
        <rect x="-5"  y="1"  width="7"  height="12" rx="2" fill={`rgba(254,74,35,0.42)`}/>
        <rect x="5"   y="-3" width="7"  height="16" rx="2" fill={`rgba(254,74,35,0.62)`}/>
        <rect x="15"  y="0"  width="7"  height="13" rx="2" fill={`rgba(254,74,35,0.42)`}/>
      </g>
      <circle cx="146" cy="146" r="9" fill={`rgba(119,77,255,0.20)`} stroke={`rgba(119,77,255,0.45)`} strokeWidth="1"/>
      <circle cx="146" cy="146" r="4" fill={PURPLE} fillOpacity="0.60"/>
    </svg>
  );
}
