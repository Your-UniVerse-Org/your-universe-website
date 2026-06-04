/**
 * SectionGraphics.tsx
 * Contextual SVG illustrations for every section across all pages.
 * Each graphic is theme-matched to its section content.
 */
"use client";

/* ── Shared wrapper ─────────────────────────────────────── */
function Wrap({ w, h, children }: { w: number; h: number; children: React.ReactNode }) {
  return (
    <div className="sg-graphic" style={{ width: "min(" + w + "px, 100%)", aspectRatio: `${w}/${h}` }}>
      <svg viewBox={`0 0 ${w} ${h}`} fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "100%", overflow: "visible" }}>
        {children}
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   1. DecisionForkGraphic — Problem section
   Emotional before/after: chaos vs guided clarity.
═══════════════════════════════════════════════════════════*/
export function DecisionForkGraphic() {
  const qMarks = [
    {x:38,y:52,s:22,op:0.28,dur:"3.1s"},{x:72,y:88,s:14,op:0.18,dur:"2.7s"},
    {x:20,y:118,s:18,op:0.22,dur:"3.5s"},{x:90,y:135,s:11,op:0.14,dur:"2.4s"},
    {x:52,y:165,s:16,op:0.2,dur:"3.8s"},{x:14,y:78,s:12,op:0.13,dur:"4s"},
  ];
  const stars = [{x:260,y:72},{x:310,y:48},{x:350,y:95},{x:295,y:130},{x:336,y:160}];
  return (
    <Wrap w={380} h={310}>
      {/* Background halves */}
      <rect x="0" y="0" width="190" height="310" fill="rgba(240,165,0,0.025)" />
      <rect x="190" y="0" width="190" height="310" fill="rgba(61,127,255,0.025)" />
      <line x1="190" y1="0" x2="190" y2="310" stroke="rgba(255,255,255,0.07)" strokeWidth="1" strokeDasharray="6 5" />

      {/* Section labels */}
      <text x="95" y="22" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.10em" fill="rgba(240,165,0,0.45)">NO GUIDANCE</text>
      <text x="285" y="22" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="9" fontWeight="700" letterSpacing="0.10em" fill="rgba(61,127,255,0.65)">GUIDED PATH</text>

      {/* Left: chaotic scattered paths */}
      <path d="M95 270 C60 240 30 200 55 165 C80 130 20 110 45 78 C65 52 30 38 52 18" fill="none" stroke="rgba(240,165,0,0.3)" strokeWidth="1.5" strokeDasharray="5 4"/>
      <path d="M95 270 C140 250 120 215 100 185 C78 155 110 130 88 105 C68 82 95 58 72 32" fill="none" stroke="rgba(240,165,0,0.2)" strokeWidth="1" strokeDasharray="3 5"/>
      <path d="M95 270 C55 255 15 230 35 200 C58 170 12 145 35 118" fill="none" stroke="rgba(240,165,0,0.15)" strokeWidth="1" strokeDasharray="4 6"/>

      {/* Left: floating question marks */}
      {qMarks.map((q,i)=>(
        <text key={i} x={q.x} y={q.y} fontFamily="Georgia,serif" fontSize={q.s}
          fill={`rgba(240,165,0,${q.op})`}
          style={{animation:`fade-drift ${q.dur} ease-in-out infinite`,animationDelay:`${i*0.5}s`}}>?</text>
      ))}

      {/* Left: dead-end nodes */}
      {[[52,80],[28,128],[68,158],[40,196],[80,218]].map(([x,y],i)=>(
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="rgba(240,165,0,0.07)" stroke="rgba(240,165,0,0.22)" strokeWidth="1"/>
          <line x1={x-4} y1={y} x2={x+4} y2={y} stroke="rgba(240,165,0,0.3)" strokeWidth="1.2"/>
          <line x1={x} y1={y-4} x2={x} y2={y+4} stroke="rgba(240,165,0,0.3)" strokeWidth="1.2"/>
        </g>
      ))}

      {/* Right: single clear guided path */}
      <path d="M285 272 L285 50" fill="none" stroke="rgba(61,127,255,0.18)" strokeWidth="8" strokeLinecap="round"/>
      <path d="M285 272 L285 50" fill="none" stroke="rgba(61,127,255,0.6)" strokeWidth="2.5" strokeLinecap="round"/>

      {/* Right: animated travel dot */}
      <circle r="4.5" fill="rgba(61,127,255,0.95)" style={{filter:"drop-shadow(0 0 5px #3D7FFF)"}}>
        <animateMotion dur="2.8s" repeatCount="indefinite" path="M285,272 L285,50"/>
      </circle>

      {/* Right: milestone check nodes */}
      {[242,198,152,102,56].map((y,i)=>(
        <g key={i}>
          <circle cx={285} cy={y} r="7" fill="rgba(13,17,38,0.95)" stroke="rgba(61,127,255,0.6)" strokeWidth="1.5"/>
          <path d={`M${282} ${y} L${284.5} ${y+2.5} L${289} ${y-3}`} stroke="rgba(61,127,255,0.9)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
        </g>
      ))}

      {/* Right: floating stars */}
      {stars.map((s,i)=>(
        <polygon key={i}
          points={`${s.x},${s.y-6} ${s.x+1.5},${s.y-2} ${s.x+6},${s.y-2} ${s.x+2.4},${s.y+1} ${s.x+3.7},${s.y+6} ${s.x},${s.y+3} ${s.x-3.7},${s.y+6} ${s.x-2.4},${s.y+1} ${s.x-6},${s.y-2} ${s.x-1.5},${s.y-2}`}
          fill={`rgba(61,127,255,${0.12+i*0.04})`} stroke={`rgba(61,127,255,${0.35+i*0.06})`} strokeWidth="0.8"
          style={{animation:`float-bob ${2.5+i*0.35}s ease-in-out infinite`,animationDelay:`${i*0.3}s`}}/>
      ))}

      {/* Student figures (circles) */}
      <circle cx="95" cy="280" r="13" fill="rgba(240,165,0,0.08)" stroke="rgba(240,165,0,0.35)" strokeWidth="1.5"/>
      <circle cx="95" cy="273" r="4.5" fill="rgba(240,165,0,0.5)"/>
      <path d="M89 283 Q95 289 101 283" fill="none" stroke="rgba(240,165,0,0.45)" strokeWidth="1.2" strokeLinecap="round"/>
      <text x="95" y="302" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="8" fontWeight="600" fill="rgba(240,165,0,0.4)" letterSpacing="0.05em">LOST</text>

      <circle cx="285" cy="280" r="13" fill="rgba(61,127,255,0.12)" stroke="rgba(61,127,255,0.55)" strokeWidth="1.5"
        style={{animation:"glow-pulse 2.5s ease-in-out infinite"}}/>
      <circle cx="285" cy="273" r="4.5" fill="rgba(61,127,255,0.7)"/>
      <path d="M279 284 Q285 280 291 284" fill="none" stroke="rgba(61,127,255,0.7)" strokeWidth="1.2" strokeLinecap="round"/>
      <text x="285" y="302" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="8" fontWeight="600" fill="rgba(61,127,255,0.65)" letterSpacing="0.05em">GUIDED</text>

      {/* Destination: missed vs grad */}
      <rect x="55" y="28" width="80" height="20" rx="5" fill="rgba(240,165,0,0.07)" stroke="rgba(240,165,0,0.2)" strokeWidth="1"/>
      <text x="95" y="42" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="8.5" fill="rgba(240,165,0,0.45)" letterSpacing="0.04em">MISSED FUTURE</text>

      <polygon points="285,22 300,30 285,38 270,30" fill="rgba(61,127,255,0.3)" stroke="rgba(61,127,255,0.6)" strokeWidth="1"/>
      <rect x="255" y="38" width="60" height="18" rx="4" fill="rgba(61,127,255,0.12)" stroke="rgba(61,127,255,0.3)" strokeWidth="1"/>
      <text x="285" y="51" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="8" fontWeight="700" fill="rgba(61,127,255,0.8)" letterSpacing="0.04em">CLEAR PATH</text>
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. SAMapGraphic — Stats section
   Real geographic SA province layout with pulsing nodes.
═══════════════════════════════════════════════════════════*/
export function SAMapGraphic() {
  // Province centroids mapped to the real SVG path space (260×230 native)
  // then scaled 1.35× + translate(15,5) to fill 380×320
  // formula: x_new = x_orig * 1.35 + 15,  y_new = y_orig * 1.35 + 5
  const provinces = [
    { id:"LP",  label:"Limpopo",       x:234, y: 73, r: 8, pulse:true,  color:"rgba(61,127,255,0.9)" },
    { id:"MP",  label:"Mpumalanga",    x:282, y:102, r: 6, pulse:false, color:"rgba(61,127,255,0.7)" },
    { id:"NW",  label:"North West",    x:188, y:109, r: 7, pulse:false, color:"rgba(61,127,255,0.7)" },
    { id:"GP",  label:"Gauteng",       x:240, y:124, r: 6, pulse:true,  color:"rgba(240,165,0,0.9)"  },
    { id:"KZN", label:"KwaZulu-Natal", x:280, y:191, r: 8, pulse:false, color:"rgba(61,127,255,0.7)" },
    { id:"FS",  label:"Free State",    x:210, y:180, r: 8, pulse:false, color:"rgba(61,127,255,0.7)" },
    { id:"NC",  label:"N. Cape",       x:134, y:177, r:10, pulse:false, color:"rgba(61,127,255,0.6)" },
    { id:"EC",  label:"E. Cape",       x:238, y:248, r: 8, pulse:false, color:"rgba(61,127,255,0.7)" },
    { id:"WC",  label:"W. Cape",       x: 92, y:253, r: 8, pulse:true,  color:"rgba(61,127,255,0.8)" },
  ];
  return (
    <Wrap w={380} h={320}>
      <defs>
        <radialGradient id="saBg2" cx="55%" cy="50%" r="55%">
          <stop offset="0%" stopColor="rgba(61,127,255,0.1)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id="saGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ambient background */}
      <ellipse cx="195" cy="165" rx="175" ry="142" fill="url(#saBg2)" />

      {/* SA country fill — real path scaled to canvas */}
      <g transform="translate(15,5) scale(1.35)">
        <path fill="rgba(61,127,255,0.07)" stroke="none"
          d="M243.786,85.359l-11.994,7.012l-6.941-9.279l5.714-14.001l14.024-4.084l-1.086-29.725
          l-8.877-28.497l-24.342-4.533l-23.279,7.626l-21.697,18.51l-9.633,17.306l-8.57,2.078
          l-4.321,15.323l-12.49,3.848l-28.709-8.429l-5.714,14.237l-14.26,13.623l-17.164-2.172
          l3.211-9.94l-8.523-18.959l-6.398-4.415l3.542,63.888l-13.387,10.86l-26.454,1.156
          l-6.7-11.791L2,121.954l30.527,52.39l2.951,17.235l-6.162,3.494l16.527,26.112l17.282,6.563
          l13.458-8.806l11.522-0.118l12.253-7.508l15.724-0.897l17.896,3.14l11.899-7.083l12.253-0.803
          l55.365-46.299l15.96-26.16l19.124-16.952l9.42-29.63L243.786,85.359z
          M170.974,145.256l-5.525-12.041l11.309-12.537l17.188-2.196l8.712,10.152
          l-6.634,11.026l-14.425,11.758L170.974,145.256z"/>
      </g>

      {/* Country outline — glowing stroked path */}
      <g transform="translate(15,5) scale(1.35)" filter="url(#saGlow)">
        <path fill="none" stroke="rgba(61,127,255,0.5)" strokeWidth="0.85" strokeLinejoin="round"
          d="M243.786,85.359l-11.994,7.012l-6.941-9.279l5.714-14.001l14.024-4.084l-1.086-29.725
          l-8.877-28.497l-24.342-4.533l-23.279,7.626l-21.697,18.51l-9.633,17.306l-8.57,2.078
          l-4.321,15.323l-12.49,3.848l-28.709-8.429l-5.714,14.237l-14.26,13.623l-17.164-2.172
          l3.211-9.94l-8.523-18.959l-6.398-4.415l3.542,63.888l-13.387,10.86l-26.454,1.156
          l-6.7-11.791L2,121.954l30.527,52.39l2.951,17.235l-6.162,3.494l16.527,26.112l17.282,6.563
          l13.458-8.806l11.522-0.118l12.253-7.508l15.724-0.897l17.896,3.14l11.899-7.083l12.253-0.803
          l55.365-46.299l15.96-26.16l19.124-16.952l9.42-29.63L243.786,85.359z
          M170.974,145.256l-5.525-12.041l11.309-12.537l17.188-2.196l8.712,10.152
          l-6.634,11.026l-14.425,11.758L170.974,145.256z"/>
      </g>

      {/* Province nodes */}
      {provinces.map((p, i) => (
        <g key={p.id}>
          {p.pulse && (
            <circle cx={p.x} cy={p.y} r={p.r + 8} fill="none" stroke={p.color} strokeWidth="1"
              style={{ animation: `pulse-ring ${1.8 + i * 0.15}s ease-out infinite`, animationDelay: `${i * 0.25}s` }} />
          )}
          {p.pulse && (
            <circle cx={p.x} cy={p.y} r={p.r + 16} fill="none" stroke={p.color} strokeWidth="0.5"
              style={{ animation: `pulse-ring ${1.8 + i * 0.15}s ease-out infinite`, animationDelay: `${i * 0.25 + 0.4}s` }} />
          )}
          <circle cx={p.x} cy={p.y} r={p.r}
            fill={p.pulse ? p.color.replace("0.9", "0.18").replace("0.8", "0.15") : "rgba(61,127,255,0.1)"}
            stroke={p.color} strokeWidth={p.pulse ? 1.8 : 1.2} />
          <text x={p.x} y={p.y - p.r - 4}
            textAnchor="middle" fontFamily="Space Grotesk,sans-serif"
            fontSize="7.5" fontWeight={p.pulse ? "700" : "600"}
            fill={p.pulse ? p.color : "rgba(255,255,255,0.45)"}
            letterSpacing="0.03em">{p.id}</text>
        </g>
      ))}

      {/* Animated travel dots */}
      <circle r="2.5" fill="rgba(61,127,255,0.85)">
        <animateMotion dur="2.4s" repeatCount="indefinite"
          path={`M${provinces[3].x},${provinces[3].y} L${provinces[0].x},${provinces[0].y}`} />
      </circle>
      <circle r="2.5" fill="rgba(240,165,0,0.75)">
        <animateMotion dur="3s" repeatCount="indefinite"
          path={`M${provinces[3].x},${provinces[3].y} L${provinces[5].x},${provinces[5].y}`} />
      </circle>
      <circle r="2" fill="rgba(61,127,255,0.6)">
        <animateMotion dur="2.1s" repeatCount="indefinite"
          path={`M${provinces[3].x},${provinces[3].y} L${provinces[4].x},${provinces[4].y}`} />
      </circle>

      {/* Badge */}
      <rect x="110" y="8" width="160" height="22" rx="11"
        fill="rgba(61,127,255,0.1)" stroke="rgba(61,127,255,0.3)" strokeWidth="1" />
      <circle cx="126" cy="19" r="4" fill="rgba(61,127,255,0.5)"
        style={{ animation: "glow-pulse 1.8s ease-in-out infinite" }} />
      <text x="200" y="23" textAnchor="middle" fontFamily="Space Grotesk,sans-serif"
        fontSize="9" fontWeight="700" letterSpacing="0.07em" fill="rgba(61,127,255,0.9)">9 PROVINCES, FREE</text>
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. AINeuralGraphic — Platform pillars section
   AI neural hub with 6 connected intelligence nodes.
═══════════════════════════════════════════════════════════*/
export function AINeuralGraphic() {
  const cx = 140, cy = 110;
  const r = 78;
  // 6 pillar nodes arranged in hexagon
  const nodes = Array.from({length: 6}, (_, i) => {
    const angle = (i * 60 - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle), i };
  });
  const labels = ["AI","PSY","PRED","GAME","PORT","APP"];
  const icons = [
    // AI: sparkle
    "M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5Z",
    // PSY: brain-ish (just a circle with inner ring)
    null,
    // PRED: chart line
    null, null, null, null
  ];
  void icons; // suppress unused warning

  return (
    <Wrap w={280} h={220}>
      <defs>
        <radialGradient id="aiCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(61,127,255,0.35)" />
          <stop offset="60%" stopColor="rgba(61,127,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>

      {/* ambient */}
      <circle cx={cx} cy={cy} r={100} fill="rgba(61,127,255,0.04)" />

      {/* spoke lines */}
      {nodes.map(n => (
        <line key={n.i} x1={cx} y1={cy} x2={n.x} y2={n.y}
          stroke="rgba(61,127,255,0.2)" strokeWidth="1" />
      ))}

      {/* outer node connecting circle */}
      {nodes.map((n,i) => {
        const next = nodes[(i+1)%6];
        return <line key={i} x1={n.x} y1={n.y} x2={next.x} y2={next.y}
          stroke="rgba(61,127,255,0.1)" strokeWidth="1" strokeDasharray="3 3" />;
      })}

      {/* outer nodes */}
      {nodes.map((n,i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r="18"
            fill="rgba(13,17,38,0.9)" stroke="rgba(61,127,255,0.35)" strokeWidth="1.2" />
          <text x={n.x} y={n.y+4} textAnchor="middle"
            fontFamily="Space Grotesk,sans-serif" fontSize="8" fontWeight="700"
            letterSpacing="0.04em" fill="rgba(61,127,255,0.85)">{labels[i]}</text>
        </g>
      ))}

      {/* center core */}
      <circle cx={cx} cy={cy} r={34} fill="url(#aiCore)" />
      <circle cx={cx} cy={cy} r={28} fill="rgba(13,17,38,0.95)" stroke="rgba(61,127,255,0.6)" strokeWidth="1.5"
        style={{ animation: "glow-pulse 2.4s ease-in-out infinite" }} />
      {/* center AI text */}
      <text x={cx} y={cy-6} textAnchor="middle" fontFamily="Instrument Serif,Georgia,serif" fontSize="11" fill="rgba(255,255,255,0.6)">YUV</text>
      <text x={cx} y={cy+8} textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="8" fontWeight="700" letterSpacing="0.06em" fill="rgba(61,127,255,0.8)">AI ENGINE</text>

      {/* animated travel dot on first spoke */}
      <circle r="3" fill="rgba(61,127,255,0.85)">
        <animateMotion dur="2.5s" repeatCount="indefinite" path={`M${cx},${cy} L${nodes[0].x},${nodes[0].y}`} />
      </circle>
      <circle r="3" fill="rgba(167,139,250,0.85)">
        <animateMotion dur="3s" repeatCount="indefinite" path={`M${cx},${cy} L${nodes[2].x},${nodes[2].y}`} />
      </circle>
      <circle r="3" fill="rgba(240,165,0,0.7)">
        <animateMotion dur="2.2s" repeatCount="indefinite" path={`M${cx},${cy} L${nodes[4].x},${nodes[4].y}`} />
      </circle>
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. ComparisonGraphic — Competitive section
   Radar chart: YUV full vs Others partial.
═══════════════════════════════════════════════════════════*/
export function ComparisonGraphic() {
  const cx = 160, cy = 145, maxR = 92;
  const axes = ["Career AI","Grade 9","Psychometrics","Parent View","APS Live","Gamification"];
  const yuvScores  = [1, 1, 1, 1, 1, 1];
  const themScores = [0.28, 0.08, 0.05, 0.06, 0.05, 0.62];
  const n = axes.length;
  const angle = (i: number) => (i * 2 * Math.PI / n) - Math.PI / 2;
  const pt = (i: number, r: number) => ({
    x: cx + r * Math.cos(angle(i)),
    y: cy + r * Math.sin(angle(i)),
  });
  const poly = (scores: number[]) =>
    scores.map((s,i) => { const p = pt(i, s * maxR); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" ");

  return (
    <Wrap w={320} h={290}>
      {/* Radar grid circles */}
      {[0.25,0.5,0.75,1].map((f,i)=>(
        <polygon key={i}
          points={Array.from({length:n},(_,j)=>{ const p=pt(j,f*maxR); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" ")}
          fill="none" stroke={`rgba(255,255,255,${0.03+i*0.02})`} strokeWidth="1"/>
      ))}

      {/* Axis lines */}
      {axes.map((_,i)=>{
        const out = pt(i, maxR);
        return <line key={i} x1={cx} y1={cy} x2={out.x.toFixed(1)} y2={out.y.toFixed(1)}
          stroke="rgba(255,255,255,0.07)" strokeWidth="1"/>;
      })}

      {/* Others polygon */}
      <polygon points={poly(themScores)}
        fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>

      {/* YUV polygon — glowing */}
      <polygon points={poly(yuvScores)}
        fill="rgba(61,127,255,0.08)" stroke="rgba(61,127,255,0.75)" strokeWidth="2"
        style={{animation:"glow-pulse 3s ease-in-out infinite"}}/>

      {/* YUV vertex dots */}
      {yuvScores.map((_,i)=>{
        const p = pt(i, maxR);
        return <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="5"
          fill="rgba(61,127,255,0.9)" stroke="rgba(13,17,38,0.95)" strokeWidth="1.5"
          style={{filter:"drop-shadow(0 0 4px #3D7FFF)"}}/>;
      })}

      {/* Others vertex dots */}
      {themScores.map((s,i)=>{
        const p = pt(i, s * maxR);
        return <circle key={i} cx={p.x.toFixed(1)} cy={p.y.toFixed(1)} r="3"
          fill="rgba(255,255,255,0.25)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>;
      })}

      {/* Axis labels */}
      {axes.map((label,i)=>{
        const p = pt(i, maxR + 18);
        const words = label.split(" ");
        return (
          <text key={i} x={p.x.toFixed(1)} y={p.y.toFixed(1)} textAnchor="middle"
            fontFamily="Space Grotesk,sans-serif" fontSize="8.5" fontWeight="600"
            fill="rgba(255,255,255,0.5)" letterSpacing="0.04em">
            {words.map((w,wi)=>(
              <tspan key={wi} x={p.x.toFixed(1)} dy={wi===0 ? "0" : "10"}>{w}</tspan>
            ))}
          </text>
        );
      })}

      {/* Center labels */}
      <text x={cx} y={cy-6} textAnchor="middle" fontFamily="Space Grotesk,sans-serif"
        fontSize="10" fontWeight="800" letterSpacing="0.06em" fill="rgba(61,127,255,0.9)">YUV</text>
      <text x={cx} y={cy+7} textAnchor="middle" fontFamily="Space Grotesk,sans-serif"
        fontSize="7" fill="rgba(255,255,255,0.3)" letterSpacing="0.04em">6/6</text>

      {/* Legend */}
      <line x1="92" y1="278" x2="112" y2="278" stroke="rgba(61,127,255,0.75)" strokeWidth="2"/>
      <text x="117" y="282" fontFamily="Space Grotesk,sans-serif" fontSize="8" fontWeight="600" fill="rgba(61,127,255,0.8)">Your-UniVerse</text>
      <line x1="200" y1="278" x2="220" y2="278" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3"/>
      <text x="225" y="282" fontFamily="Space Grotesk,sans-serif" fontSize="8" fill="rgba(255,255,255,0.3)">Others</text>
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   5. StudyDashboardGraphic — Features section
   Mini study dashboard with progress bars, APS, streak.
═══════════════════════════════════════════════════════════*/
export function StudyDashboardGraphic() {
  const subjects = [
    { name: "Mathematics", pct: 78, color: "rgba(61,127,255,0.85)" },
    { name: "Life Sciences", pct: 84, color: "rgba(167,139,250,0.85)" },
    { name: "Physical Sc.", pct: 61, color: "rgba(240,165,0,0.85)" },
    { name: "English", pct: 90, color: "rgba(61,127,255,0.85)" },
  ];
  const barW = 188;

  // card: x=10 y=8 width=248 height=256 → bottom edge at y=264
  // footer divider: y=230
  // streak circle: cy=246  (well inside 264)
  // streak label: y=242  sub: y=254
  return (
    <Wrap w={268} h={278}>
      {/* card bg */}
      <rect x="10" y="8" width="248" height="256" rx="14"
        fill="rgba(13,17,38,0.92)" stroke="rgba(61,127,255,0.22)" strokeWidth="1" />

      {/* header row */}
      <text x="30" y="34" fontFamily="Space Grotesk,sans-serif" fontSize="11.5" fontWeight="700"
        fill="rgba(255,255,255,0.78)">Study Dashboard</text>

      {/* APS badge */}
      <rect x="180" y="18" width="62" height="24" rx="7"
        fill="rgba(61,127,255,0.15)" stroke="rgba(61,127,255,0.4)" strokeWidth="1" />
      <text x="211" y="35" textAnchor="middle" fontFamily="Space Grotesk,sans-serif"
        fontSize="9.5" fontWeight="700" fill="rgba(61,127,255,1)">APS 36</text>

      {/* top divider */}
      <line x1="26" y1="48" x2="242" y2="48" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Subject bars — 4 rows, 36px apart, starting at y=68 */}
      {subjects.map((s, i) => {
        const y = 68 + i * 38;
        const w = (s.pct / 100) * barW;
        return (
          <g key={s.name}>
            <text x="30" y={y} fontFamily="Space Grotesk,sans-serif" fontSize="9.5"
              fontWeight="600" fill="rgba(255,255,255,0.56)">{s.name}</text>
            <text x="244" y={y} textAnchor="end" fontFamily="Space Grotesk,sans-serif"
              fontSize="9" fontWeight="700" fill="rgba(255,255,255,0.45)">{s.pct}%</text>
            {/* track */}
            <rect x="30" y={y + 6} width={barW} height="6" rx="3"
              fill="rgba(255,255,255,0.06)" />
            {/* fill */}
            <rect x="30" y={y + 6} width={w} height="6" rx="3" fill={s.color}
              style={{ animation: `shimmer 3s ease infinite`, animationDelay: `${i * 0.2}s` }} />
          </g>
        );
      })}

      {/* Footer divider at y=230, card bottom at 264 — streak area has 34px of breathing room */}
      <line x1="26" y1="230" x2="242" y2="230" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

      {/* Streak badge icon circle */}
      <circle cx="44" cy="246" r="12"
        fill="rgba(240,165,0,0.12)" stroke="rgba(240,165,0,0.45)" strokeWidth="1.2" />
      {/* flame icon — centred in circle */}
      <path d="M44 253 C41 249 38.5 245 40.5 242 C41.5 244 44 242.5 44 240 C45.5 242.5 48 244.5 47 248 C49 246 49.5 242.8 48 241 C50.5 243 51.5 246.5 49.5 250 C48 253 44 255 44 253 Z"
        fill="rgba(240,165,0,0.88)" />

      {/* streak text — two lines, both fully inside card */}
      <text x="62" y="242" fontFamily="Space Grotesk,sans-serif" fontSize="9.5"
        fontWeight="700" fill="rgba(255,255,255,0.6)">14-day streak</text>
      <text x="62" y="254" fontFamily="Space Grotesk,sans-serif" fontSize="8.5"
        fontWeight="500" fill="rgba(240,165,0,0.7)">Keep going!</text>
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   6. EcosystemNetworkGraphic — Ecosystem section
   Hub-and-spoke: YUV at centre, 4 stakeholder nodes.
═══════════════════════════════════════════════════════════*/
export function EcosystemNetworkGraphic() {
  // Nodes spaced so r=44 circles don't clip — viewBox 320×280, center 160,140
  const cx = 160, cy = 140;
  const nodes = [
    { label: "Students",     x: 160, y: 52,  color: "rgba(61,127,255,0.85)"  },
    { label: "Schools",      x: 272, y: 140, color: "rgba(240,165,0,0.85)"   },
    { label: "Universities", x: 160, y: 228, color: "rgba(167,139,250,0.85)" },
    { label: "Parents",      x: 48,  y: 140, color: "rgba(61,127,255,0.6)"   },
  ];

  return (
    <Wrap w={320} h={282}>
      <defs>
        <radialGradient id="ecoBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(61,127,255,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx="148" ry="118" fill="url(#ecoBg)" />

      {/* spokes */}
      {nodes.map((n,i) => (
        <line key={i} x1={cx} y1={cy} x2={n.x} y2={n.y}
          stroke="rgba(61,127,255,0.18)" strokeWidth="1" />
      ))}

      {/* animated dots on spokes */}
      {nodes.map((n,i) => (
        <circle key={i} r="2.5" fill={n.color}>
          <animateMotion dur={`${1.8+i*0.4}s`} repeatCount="indefinite"
            path={`M${cx},${cy} L${n.x},${n.y}`} />
        </circle>
      ))}

      {/* stakeholder nodes — r=44 gives ample room for icon + full label */}
      {nodes.map((n,i) => {
        // Icon centred in upper half of node (n.y-20 to n.y+2)
        const ic = [
          // 0 Students: graduation cap
          <g key="s" transform={`translate(${n.x-11},${n.y-22})`}>
            <polygon points="11,0 22,6 11,12 0,6" fill={n.color} opacity="0.9"/>
            <rect x="8.5" y="6" width="5" height="9" rx="1" fill={n.color} opacity="0.6"/>
            <line x1="21" y1="6" x2="21" y2="12" stroke={n.color} strokeWidth="1.5" opacity="0.7"/>
          </g>,
          // 1 Schools: building with roof
          <g key="sch" transform={`translate(${n.x-11},${n.y-22})`}>
            <polygon points="0,8 11,0 22,8" fill="none" stroke={n.color} strokeWidth="1.5" opacity="0.85"/>
            <rect x="2" y="8" width="18" height="13" rx="1" fill="none" stroke={n.color} strokeWidth="1.5" opacity="0.85"/>
            <rect x="7" y="13" width="8" height="8" fill={n.color} opacity="0.4"/>
          </g>,
          // 2 Universities: columns & pediment
          <g key="u" transform={`translate(${n.x-11},${n.y-22})`}>
            <polygon points="0,6 11,0 22,6" fill="none" stroke={n.color} strokeWidth="1.5" opacity="0.85"/>
            <rect x="0" y="18" width="22" height="2.5" rx="1" fill={n.color} opacity="0.8"/>
            <rect x="1.5" y="6"  width="3" height="12" fill={n.color} opacity="0.65"/>
            <rect x="9.5" y="6"  width="3" height="12" fill={n.color} opacity="0.65"/>
            <rect x="17.5" y="6" width="3" height="12" fill={n.color} opacity="0.65"/>
          </g>,
          // 3 Parents: two figures side by side
          <g key="p" transform={`translate(${n.x-12},${n.y-20})`}>
            <circle cx="6"  cy="4"  r="3.5" fill={n.color} opacity="0.72"/>
            <path d="M0 20 C0 14 12 14 12 20" fill="none" stroke={n.color} strokeWidth="1.5" opacity="0.7"/>
            <circle cx="17" cy="5.5" r="3" fill={n.color} opacity="0.55"/>
            <path d="M11 20 C11 15 23 15 23 20" fill="none" stroke={n.color} strokeWidth="1.5" opacity="0.52"/>
          </g>,
        ][i];
        return (
          <g key={i}>
            {/* outer ambient ring */}
            <circle cx={n.x} cy={n.y} r="50" fill="none" stroke={n.color} strokeWidth="0.6" opacity="0.14" />
            {/* main node — r=44 */}
            <circle cx={n.x} cy={n.y} r="44" fill="rgba(13,17,38,0.97)" stroke={n.color} strokeWidth="1.8" />
            {ic}
            {/* full label — never truncated */}
            <text x={n.x} y={n.y + 16} textAnchor="middle" fontFamily="Space Grotesk,sans-serif"
              fontSize="9.5" fontWeight="700" letterSpacing="0.05em" fill={n.color}>{n.label.toUpperCase()}</text>
          </g>
        );
      })}

      {/* centre hub — r=32 */}
      <circle cx={cx} cy={cy} r="38" fill="rgba(13,17,38,0.98)" stroke="rgba(61,127,255,0.6)" strokeWidth="2"
        style={{ animation: "glow-pulse 2.5s ease-in-out infinite" }} />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="Space Grotesk,sans-serif"
        fontSize="12" fontWeight="800" letterSpacing="0.06em" fill="rgba(61,127,255,0.95)">YUV</text>
      <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="Space Grotesk,sans-serif"
        fontSize="8" fill="rgba(255,255,255,0.35)" letterSpacing="0.06em">PLATFORM</text>
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   7. PersonasGraphic — WhoItsFor section
   Three learner persona cards stacked/offset.
═══════════════════════════════════════════════════════════*/
export function PersonasGraphic() {
  const personas = [
    { label: "MATRIC",     sub: "NSC / IEB",           icon: "🎓", color: "rgba(61,127,255,0.7)",   pct: 78 },
    { label: "FIRST YEAR", sub: "Transition support",  icon: "📚", color: "rgba(167,139,250,0.7)",  pct: 62 },
    { label: "POSTGRAD",   sub: "Research & focus",    icon: "🔬", color: "rgba(240,165,0,0.7)",    pct: 91 },
  ];

  return (
    <Wrap w={240} h={220}>
      {personas.map((p, i) => {
        const y = i * 58 + 8;
        const xOff = i * 8;
        // SVG icons replacing emojis: grad cap, book, atom
        const icons = [
          // 0: graduation cap
          <g key="g" transform={`translate(${22+xOff},${y+16})`}>
            <polygon points="9,0 18,5 9,10 0,5" fill={p.color} opacity="0.9"/>
            <rect x="7" y="5" width="4" height="7" rx="0.5" fill={p.color} opacity="0.6"/>
          </g>,
          // 1: open book
          <g key="b" transform={`translate(${22+xOff},${y+16})`}>
            <path d="M9,3 C6,2 2,2 0,3 L0,17 C2,16 6,16 9,17 C12,16 16,16 18,17 L18,3 C16,2 12,2 9,3 Z"
              fill="none" stroke={p.color} strokeWidth="1.2" opacity="0.85"/>
            <line x1="9" y1="3" x2="9" y2="17" stroke={p.color} strokeWidth="1" opacity="0.6"/>
          </g>,
          // 2: atom/molecule
          <g key="a" transform={`translate(${22+xOff},${y+15})`}>
            <circle cx="9" cy="9" r="2.5" fill={p.color} opacity="0.75"/>
            <ellipse cx="9" cy="9" rx="9" ry="4" fill="none" stroke={p.color} strokeWidth="1" opacity="0.7"/>
            <ellipse cx="9" cy="9" rx="9" ry="4" fill="none" stroke={p.color} strokeWidth="1" opacity="0.7"
              transform={`rotate(60,9,9)`}/>
            <ellipse cx="9" cy="9" rx="9" ry="4" fill="none" stroke={p.color} strokeWidth="1" opacity="0.7"
              transform={`rotate(120,9,9)`}/>
          </g>,
        ][i];
        return (
          <g key={p.label}>
            <rect x={12+xOff} y={y} width={210-xOff*2} height={50} rx="8"
              fill="rgba(13,17,38,0.9)" stroke={p.color} strokeWidth="1" />
            {icons}
            <text x={52+xOff} y={y+23} fontFamily="Space Grotesk,sans-serif" fontSize="10" fontWeight="700"
              letterSpacing="0.06em" fill={p.color}>{p.label}</text>
            <text x={52+xOff} y={y+37} fontFamily="Space Grotesk,sans-serif" fontSize="9" fill="rgba(255,255,255,0.35)">{p.sub}</text>
            <rect x={148+xOff} y={y+18} width={58-xOff} height="4" rx="2" fill="rgba(255,255,255,0.06)" />
            <rect x={148+xOff} y={y+18} width={(58-xOff)*(p.pct/100)} height="4" rx="2" fill={p.color} />
            <text x={(148+xOff)+(58-xOff)/2} y={y+40} textAnchor="middle"
              fontFamily="Space Grotesk,sans-serif" fontSize="8" fontWeight="700" fill={p.color}>{p.pct}%</text>
          </g>
        );
      })}

      {/* bottom label */}
      <text x="120" y="212" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="8.5" letterSpacing="0.07em"
        fill="rgba(255,255,255,0.2)">EVERY STAGE, EVERY LEARNER</text>
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   8. WaitlistGraphic — Waitlist/Early Access section
   Launch graph: rising bars + cohort badges.
═══════════════════════════════════════════════════════════*/
export function WaitlistGraphic() {
  const bars = [
    { h: 28, label: "Cohort 1", color: "rgba(61,127,255,0.4)" },
    { h: 48, label: "Cohort 2", color: "rgba(61,127,255,0.55)" },
    { h: 72, label: "Cohort 3", color: "rgba(61,127,255,0.75)" },
    { h: 100, label: "You →",   color: "rgba(61,127,255,1)"  },
  ];
  const barW = 40, gap = 16, baseY = 175;

  return (
    <Wrap w={240} h={200}>
      <defs>
        <radialGradient id="wlBg" cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="rgba(61,127,255,0.10)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="160" rx="120" ry="60" fill="url(#wlBg)" />

      {/* bars */}
      {bars.map((b, i) => {
        const x = 26 + i * (barW + gap);
        return (
          <g key={i}>
            <rect x={x} y={baseY - b.h} width={barW} height={b.h} rx="5"
              fill={b.color} />
            {/* shimmer on last bar */}
            {i === bars.length - 1 && (
              <rect x={x} y={baseY - b.h} width={barW} height={b.h} rx="5"
                fill="rgba(255,255,255,0.06)"
                style={{ animation: "shimmer 2.5s ease infinite" }} />
            )}
            <text x={x + barW/2} y={baseY + 14} textAnchor="middle"
              fontFamily="Space Grotesk,sans-serif" fontSize={i === bars.length-1 ? "9" : "8"}
              fontWeight={i === bars.length-1 ? "700" : "600"}
              fill={i === bars.length-1 ? "rgba(61,127,255,0.9)" : "rgba(255,255,255,0.4)"}>{b.label}</text>
          </g>
        );
      })}

      {/* upward arrow */}
      <path d="M218 148 L218 28" stroke="rgba(61,127,255,0.3)" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M212 36 L218 24 L224 36" fill="none" stroke="rgba(61,127,255,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* "Limited Access" badge */}
      <rect x="56" y="8" width="130" height="20" rx="10"
        fill="rgba(61,127,255,0.12)" stroke="rgba(61,127,255,0.3)" strokeWidth="1" />
      <circle cx="72" cy="18" r="4" fill="rgba(61,127,255,0.4)"
        style={{ animation: "glow-pulse 1.6s ease-in-out infinite" }} />
      <text x="136" y="22" textAnchor="middle" fontFamily="Space Grotesk,sans-serif"
        fontSize="8.5" fontWeight="700" letterSpacing="0.06em" fill="rgba(61,127,255,0.9)">LIMITED EARLY ACCESS</text>
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   9. TechHeroGraphic — Platform page hero
   Neural circuit board aesthetic.
═══════════════════════════════════════════════════════════*/
export function TechHeroGraphic() {
  const gridNodes: {x:number,y:number}[] = [];
  for (let r=0; r<4; r++) for (let c=0; c<5; c++) {
    gridNodes.push({ x: c*60+30, y: r*50+25 });
  }
  const connections: [number,number][] = [
    [0,1],[1,2],[2,3],[3,4],[5,6],[6,7],[7,8],[8,9],[10,11],[11,12],[12,13],
    [0,5],[1,6],[2,7],[3,8],[4,9],[5,10],[6,11],[7,12],[8,13],
    [0,6],[1,7],[2,8],[3,9],[5,11],[6,12],[7,13],
  ];

  return (
    <Wrap w={300} h={200}>
      {connections.map(([a,b],i) => (
        <line key={i}
          x1={gridNodes[a].x} y1={gridNodes[a].y}
          x2={gridNodes[b].x} y2={gridNodes[b].y}
          stroke="rgba(61,127,255,0.12)" strokeWidth="0.8" />
      ))}
      {gridNodes.map((n,i) => {
        const isHot = [2,6,7,11,12].includes(i);
        return (
          <circle key={i} cx={n.x} cy={n.y} r={isHot ? 5 : 3}
            fill={isHot ? "rgba(61,127,255,0.3)" : "rgba(61,127,255,0.1)"}
            stroke={isHot ? "rgba(61,127,255,0.7)" : "rgba(61,127,255,0.25)"}
            strokeWidth="1"
            style={isHot ? { animation: "glow-pulse 2s ease-in-out infinite", animationDelay: `${i*0.15}s` } : {}} />
        );
      })}
      {/* central chip */}
      <rect x="100" y="63" width="100" height="72" rx="8" fill="rgba(13,17,38,0.95)" stroke="rgba(61,127,255,0.45)" strokeWidth="1.5" />
      <text x="150" y="93" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="10" fontWeight="700" letterSpacing="0.08em" fill="rgba(61,127,255,0.8)">INTELLIGENCE</text>
      <text x="150" y="109" textAnchor="middle" fontFamily="Instrument Serif,Georgia,serif" fontSize="14" fill="rgba(255,255,255,0.6)">Engine</text>
      <text x="150" y="124" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="8" fill="rgba(255,255,255,0.25)" letterSpacing="0.04em">AI, ML, NLP, PSYCH</text>

      {/* chip legs */}
      {[118,132,148,162,178].map((x,i) => (
        <g key={i}>
          <line x1={x} y1={63} x2={x} y2={50} stroke="rgba(61,127,255,0.25)" strokeWidth="1.5" />
          <line x1={x} y1={135} x2={x} y2={148} stroke="rgba(61,127,255,0.25)" strokeWidth="1.5" />
        </g>
      ))}
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   10. SchoolsHeroGraphic — For Schools page hero
   School building connected to stakeholder ecosystem.
═══════════════════════════════════════════════════════════*/
export function SchoolsHeroGraphic() {
  const cx = 150, cy = 108;
  const stakeholders = [
    { x: 150, y: 22,  emoji: "🏫", label: "School",     color: "rgba(240,165,0,0.75)" },
    { x: 262, y: 108, emoji: "🏛️", label: "University", color: "rgba(61,127,255,0.75)" },
    { x: 150, y: 192, emoji: "👩‍🎓", label: "Student",   color: "rgba(167,139,250,0.75)" },
    { x: 38,  y: 108, emoji: "👪", label: "Parents",    color: "rgba(61,127,255,0.6)" },
  ];

  return (
    <Wrap w={300} h={215}>
      <defs>
        <radialGradient id="schBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(240,165,0,0.08)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} r="140" ry="100" fill="url(#schBg)" />

      {/* spokes */}
      {stakeholders.map((s,i) => (
        <line key={i} x1={cx} y1={cy} x2={s.x} y2={s.y}
          stroke="rgba(240,165,0,0.15)" strokeWidth="1" />
      ))}

      {/* animated dots */}
      {stakeholders.map((s,i) => (
        <circle key={i} r="2.5" fill={s.color}>
          <animateMotion dur={`${2+i*0.3}s`} repeatCount="indefinite"
            path={`M${cx},${cy} L${s.x},${s.y}`} />
        </circle>
      ))}

      {/* outer nodes */}
      {stakeholders.map((s,i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r="22" fill="rgba(13,17,38,0.9)" stroke={s.color} strokeWidth="1.2" />
          <text x={s.x} y={s.y+6} textAnchor="middle" fontSize="16">{s.emoji}</text>
        </g>
      ))}

      {/* centre: YUV platform */}
      <circle cx={cx} cy={cy} r="30" fill="rgba(13,17,38,0.98)" stroke="rgba(240,165,0,0.55)" strokeWidth="1.5"
        style={{ animation: "glow-pulse 2.5s ease-in-out infinite" }} />
      <text x={cx} y={cy-2} textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="9" fontWeight="800" letterSpacing="0.06em" fill="rgba(240,165,0,0.9)">YUV</text>
      <text x={cx} y={cy+10} textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="7" fill="rgba(255,255,255,0.3)" letterSpacing="0.04em">PLATFORM</text>
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   11. LaunchHeroGraphic — Early Access page hero
   Rocket launch with cohort queue visualisation.
═══════════════════════════════════════════════════════════*/
export function LaunchHeroGraphic() {
  return (
    <Wrap w={240} h={200}>
      <defs>
        <radialGradient id="lhBg" cx="50%" cy="70%" r="55%">
          <stop offset="0%" stopColor="rgba(61,127,255,0.15)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      <ellipse cx="120" cy="140" rx="120" ry="70" fill="url(#lhBg)" />

      {/* launch pad */}
      <rect x="88" y="160" width="64" height="8" rx="4" fill="rgba(61,127,255,0.2)" stroke="rgba(61,127,255,0.4)" strokeWidth="1" />
      <rect x="100" y="168" width="40" height="4" rx="2" fill="rgba(61,127,255,0.12)" />

      {/* rocket body */}
      <rect x="107" y="88" width="26" height="72" rx="8" fill="rgba(13,17,38,0.95)" stroke="rgba(61,127,255,0.5)" strokeWidth="1.2" />
      {/* nose */}
      <path d="M107 96 Q120 60 133 96" fill="rgba(61,127,255,0.3)" stroke="rgba(61,127,255,0.5)" strokeWidth="1" />
      {/* fins */}
      <path d="M107 148 L94 168 L107 160Z" fill="rgba(61,127,255,0.2)" />
      <path d="M133 148 L146 168 L133 160Z" fill="rgba(61,127,255,0.2)" />
      {/* window */}
      <circle cx="120" cy="118" r="7" fill="rgba(61,127,255,0.15)" stroke="rgba(61,127,255,0.5)" strokeWidth="1" />
      <text x="120" y="122" textAnchor="middle" fontSize="8">🎓</text>

      {/* flame */}
      <path d="M110 168 Q120 188 130 168" fill="rgba(240,165,0,0.3)" stroke="rgba(240,165,0,0.5)" strokeWidth="1"
        style={{ animation: "glow-pulse 0.8s ease-in-out infinite" }} />

      {/* stars */}
      {[{x:42,y:30},{x:196,y:22},{x:210,y:60},{x:28,y:72},{x:64,y:18}].map((s,i) => (
        <circle key={i} cx={s.x} cy={s.y} r="2" fill="rgba(255,255,255,0.25)"
          style={{ animation: `glow-pulse ${1.5+i*0.4}s ease-in-out infinite`, animationDelay: `${i*0.3}s` }} />
      ))}

      {/* limited access label */}
      <rect x="60" y="8" width="120" height="18" rx="9" fill="rgba(61,127,255,0.12)" stroke="rgba(61,127,255,0.3)" strokeWidth="1" />
      <text x="120" y="21" textAnchor="middle" fontFamily="Space Grotesk,sans-serif" fontSize="8" fontWeight="700" letterSpacing="0.06em" fill="rgba(61,127,255,0.85)">LIMITED COHORT</text>
    </Wrap>
  );
}

/* ═══════════════════════════════════════════════════════════
   12. JourneyPhaseIcons — Journey section phase icons
   Individual icons for each of the 6 learner journey phases.
═══════════════════════════════════════════════════════════*/
export const PHASE_ICONS = [
  // 01 — Grade 9 Onboarding: person + profile
  <svg key="01" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
    <path d="M18 4l2 2-6 6-3-3 1.5-1.5 1.5 1.5L18 4z" fill="currentColor" opacity="0.3"/>
  </svg>,
  // 02 — Subject selection: grid of subjects
  <svg key="02" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>,
  // 03 — Monitoring: chart with alert
  <svg key="03" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
    <circle cx="19" cy="5" r="3" fill="rgba(240,165,0,0.4)" stroke="rgba(240,165,0,0.8)" strokeWidth="1"/>
  </svg>,
  // 04 — Career mapping: compass
  <svg key="04" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>,
  // 05 — Applications: portal/door
  <svg key="05" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <path d="M9 3v18"/><circle cx="6" cy="12" r="1" fill="currentColor"/>
  </svg>,
  // 06 — Institutional matching: handshake/link
  <svg key="06" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>,
];
