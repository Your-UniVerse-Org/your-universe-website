"use client";

/**
 * ElectricBeams — full-page fixed background layer
 * Animated SVG electrical arcs + travelling particles behind all sections (not hero).
 * Updated to Your-UniVerse brand palette: #774DFF (purple) and #FE4A23 (orange).
 * Purely decorative, pointer-events: none.
 */
export default function ElectricBeams() {
  return (
    <div
      aria-hidden="true"
      className="electric-beams"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", opacity: 1 }}
      >
        <defs>
          <filter id="beamGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="strongGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Purple beam gradient */}
          <linearGradient id="beamBlue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(119,77,255,0)" />
            <stop offset="40%"  stopColor="rgba(119,77,255,0.6)" />
            <stop offset="60%"  stopColor="rgba(160,120,255,0.8)" />
            <stop offset="100%" stopColor="rgba(119,77,255,0)" />
          </linearGradient>
          {/* Orange beam gradient */}
          <linearGradient id="beamGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="rgba(254,74,35,0)" />
            <stop offset="50%"  stopColor="rgba(254,74,35,0.4)" />
            <stop offset="100%" stopColor="rgba(254,74,35,0)" />
          </linearGradient>
          {/* Light purple horizontal accent */}
          <linearGradient id="beamPurple" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="rgba(167,139,250,0)" />
            <stop offset="50%"  stopColor="rgba(167,139,250,0.35)" />
            <stop offset="100%" stopColor="rgba(167,139,250,0)" />
          </linearGradient>

          <clipPath id="clipFull">
            <rect width="1440" height="900" />
          </clipPath>
        </defs>

        {/* ── Grid overlay ── */}
        <rect
          width="1440" height="900"
          fill="none"
          stroke="rgba(119,77,255,0.025)"
          style={{
            backgroundImage: "repeating-linear-gradient(rgba(119,77,255,0.02) 0 1px, transparent 1px 80px), repeating-linear-gradient(90deg, rgba(119,77,255,0.02) 0 1px, transparent 1px 80px)",
          }}
        />

        {/* ══ MAIN DIAGONAL BEAM ══ */}
        <line x1="-100" y1="200" x2="1540" y2="700" stroke="url(#beamBlue)" strokeWidth="1.5" filter="url(#beamGlow)" style={{ animation: "beamPulse 4s ease-in-out infinite" }} />

        {/* ══ SECONDARY BEAM ══ */}
        <line x1="1540" y1="80" x2="-100" y2="600" stroke="url(#beamBlue)" strokeWidth="1" filter="url(#softGlow)" style={{ animation: "beamPulse 5.5s ease-in-out infinite", animationDelay: "1.2s" }} />

        {/* ══ ORANGE ACCENT BEAM ══ */}
        <line x1="200" y1="900" x2="1200" y2="0" stroke="url(#beamGold)" strokeWidth="0.8" filter="url(#softGlow)" style={{ animation: "beamPulse 6s ease-in-out infinite", animationDelay: "2.5s" }} />

        {/* ══ PURPLE HORIZONTAL ACCENT ══ */}
        <line x1="0" y1="450" x2="1440" y2="380" stroke="url(#beamPurple)" strokeWidth="0.6" style={{ animation: "beamPulse 7s ease-in-out infinite", animationDelay: "0.8s" }} />

        {/* ══ ELECTRIC ARC 1 ══ */}
        <polyline points="0,180 48,195 32,230 75,245 55,280 110,295 90,330 155,345" stroke="rgba(119,77,255,0.35)" strokeWidth="1.2" fill="none" strokeLinejoin="round" filter="url(#beamGlow)" style={{ animation: "arcFlicker 3.2s steps(1) infinite" }} />
        <polyline points="0,180 42,200 28,235 72,250 50,285 108,298 88,333 155,345" stroke="rgba(119,77,255,0.15)" strokeWidth="2.5" fill="none" strokeLinejoin="round" filter="url(#strongGlow)" style={{ animation: "arcFlicker 3.2s steps(1) infinite" }} />

        {/* ══ ELECTRIC ARC 2 ══ */}
        <polyline points="1440,320 1390,338 1410,370 1360,382 1380,418 1320,430 1345,465 1285,480" stroke="rgba(119,77,255,0.3)" strokeWidth="1" fill="none" strokeLinejoin="round" filter="url(#beamGlow)" style={{ animation: "arcFlicker 4.1s steps(1) infinite", animationDelay: "1.5s" }} />

        {/* ══ ELECTRIC ARC 3 ══ */}
        <polyline points="680,0 695,42 672,80 710,118 688,155 720,192" stroke="rgba(167,139,250,0.3)" strokeWidth="1" fill="none" strokeLinejoin="round" filter="url(#softGlow)" style={{ animation: "arcFlicker 5s steps(1) infinite", animationDelay: "0.4s" }} />

        {/* ══ TRAVELLING PARTICLE — main diagonal ══ */}
        <circle r="2.5" fill="rgba(119,77,255,0.9)" filter="url(#strongGlow)">
          <animateMotion dur="3.8s" repeatCount="indefinite" path="M -100 200 L 1540 700" />
          <animate attributeName="opacity" values="0;1;1;0" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle r="1.5" fill="rgba(180,150,255,0.8)" filter="url(#beamGlow)">
          <animateMotion dur="3.8s" repeatCount="indefinite" begin="1.9s" path="M -100 200 L 1540 700" />
          <animate attributeName="opacity" values="0;0.8;0.8;0" dur="3.8s" repeatCount="indefinite" begin="1.9s" />
        </circle>

        {/* ══ TRAVELLING PARTICLE — secondary beam ══ */}
        <circle r="2" fill="rgba(119,77,255,0.7)" filter="url(#beamGlow)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="0.5s" path="M 1540 80 L -100 600" />
          <animate attributeName="opacity" values="0;0.8;0.8;0" dur="5s" repeatCount="indefinite" begin="0.5s" />
        </circle>

        {/* ══ TRAVELLING PARTICLE — orange beam ══ */}
        <circle r="2" fill="rgba(254,74,35,0.8)" filter="url(#beamGlow)">
          <animateMotion dur="4.5s" repeatCount="indefinite" begin="2s" path="M 200 900 L 1200 0" />
          <animate attributeName="opacity" values="0;0.9;0.9;0" dur="4.5s" repeatCount="indefinite" begin="2s" />
        </circle>

        {/* ══ SPARK CLUSTERS ══ */}
        <g style={{ animation: "sparkBurst 4s ease-in-out infinite", animationDelay: "0.8s" }}>
          <circle cx="180" cy="420" r="1.5" fill="rgba(119,77,255,0.7)" filter="url(#softGlow)" />
          <line x1="180" y1="420" x2="172" y2="412" stroke="rgba(119,77,255,0.5)" strokeWidth="0.8" />
          <line x1="180" y1="420" x2="190" y2="410" stroke="rgba(119,77,255,0.4)" strokeWidth="0.6" />
          <line x1="180" y1="420" x2="168" y2="430" stroke="rgba(119,77,255,0.35)" strokeWidth="0.7" />
          <line x1="180" y1="420" x2="192" y2="432" stroke="rgba(119,77,255,0.3)" strokeWidth="0.5" />
        </g>
        <g style={{ animation: "sparkBurst 5.2s ease-in-out infinite", animationDelay: "2.1s" }}>
          <circle cx="1260" cy="240" r="1.5" fill="rgba(119,77,255,0.6)" filter="url(#softGlow)" />
          <line x1="1260" y1="240" x2="1252" y2="230" stroke="rgba(119,77,255,0.5)" strokeWidth="0.8" />
          <line x1="1260" y1="240" x2="1270" y2="232" stroke="rgba(119,77,255,0.4)" strokeWidth="0.7" />
          <line x1="1260" y1="240" x2="1268" y2="250" stroke="rgba(119,77,255,0.35)" strokeWidth="0.6" />
        </g>
        <g style={{ animation: "sparkBurst 3.8s ease-in-out infinite", animationDelay: "1.3s" }}>
          <circle cx="720" cy="560" r="1.8" fill="rgba(167,139,250,0.7)" filter="url(#softGlow)" />
          <line x1="720" y1="560" x2="710" y2="548" stroke="rgba(167,139,250,0.5)" strokeWidth="0.8" />
          <line x1="720" y1="560" x2="732" y2="550" stroke="rgba(167,139,250,0.4)" strokeWidth="0.7" />
          <line x1="720" y1="560" x2="712" y2="572" stroke="rgba(167,139,250,0.35)" strokeWidth="0.6" />
          <line x1="720" y1="560" x2="730" y2="572" stroke="rgba(167,139,250,0.3)" strokeWidth="0.5" />
        </g>
        <g style={{ animation: "sparkBurst 6s ease-in-out infinite", animationDelay: "3.2s" }}>
          <circle cx="1050" cy="680" r="1.5" fill="rgba(254,74,35,0.6)" filter="url(#softGlow)" />
          <line x1="1050" y1="680" x2="1042" y2="670" stroke="rgba(254,74,35,0.45)" strokeWidth="0.8" />
          <line x1="1050" y1="680" x2="1060" y2="672" stroke="rgba(254,74,35,0.4)" strokeWidth="0.7" />
          <line x1="1050" y1="680" x2="1058" y2="690" stroke="rgba(254,74,35,0.35)" strokeWidth="0.6" />
        </g>

        {/* ══ CORNER ENERGY NODES ══ */}
        <circle cx="0"    cy="200" r="40" fill="rgba(119,77,255,0.04)" filter="url(#strongGlow)" style={{ animation: "nodePulse 4s ease-in-out infinite" }} />
        <circle cx="0"    cy="200" r="18" fill="rgba(119,77,255,0.08)" filter="url(#beamGlow)"   style={{ animation: "nodePulse 4s ease-in-out infinite", animationDelay: "0.5s" }} />
        <circle cx="1440" cy="80"  r="50" fill="rgba(119,77,255,0.04)" filter="url(#strongGlow)" style={{ animation: "nodePulse 5s ease-in-out infinite", animationDelay: "1s" }} />
        <circle cx="1440" cy="80"  r="22" fill="rgba(119,77,255,0.07)" filter="url(#beamGlow)"   style={{ animation: "nodePulse 5s ease-in-out infinite", animationDelay: "1.5s" }} />
        <circle cx="200"  cy="900" r="45" fill="rgba(254,74,35,0.035)" filter="url(#strongGlow)" style={{ animation: "nodePulse 6s ease-in-out infinite", animationDelay: "2s" }} />
        <circle cx="1280" cy="820" r="35" fill="rgba(167,139,250,0.05)" filter="url(#beamGlow)"  style={{ animation: "nodePulse 4.5s ease-in-out infinite", animationDelay: "0.3s" }} />
      </svg>
    </div>
  );
}
