"use client";

import { useEffect, useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * LoadingScreen — Ultra-premium, classy intro animation
 *
 * Design language: Dark navy dominates. The orbital logo mark fills
 * with a cool silver-to-purple gradient (bottom to top) — controlled,
 * sophisticated, like Apple / Linear. No text pulsing, no noise.
 * A single hairline progress trace. Clean exit.
 */

/* ── Official orbital icon mark path (from /public/DARK BLUE LOGO.svg) ── */
const ICON_PATH =
  "M1263.44 418.396C1201.16 426.635 1140.28 452.278 1091.7 490.728C1066.42 510.732 1039.68 536.026 1032.26 546.931C996.132 600.03 995.329 607.293 992.679 906.155C991.292 1062.54 993.069 1193.15 996.615 1196.41C1003.95 1203.14 1635.19 1203.97 1649.46 1197.28C1655.62 1194.38 1658.04 1114.94 1657.83 922.32C1657.55 674.17 1656.24 647.466 1642.29 604.052C1611.15 507.125 1521.67 440.816 1394.57 420.498C1336.13 411.157 1320.1 410.896 1263.44 418.396ZM1442.39 472.134C1520.65 499.389 1584.05 559.051 1593.57 614.401C1598.41 642.502 1604.8 637.995 1498.76 681.266L1451.44 700.577L1442.11 666.238C1430.31 622.807 1383.18 572.989 1327.16 544.734C1272.8 517.308 1251.27 511.313 1191.45 506.965L1140.79 503.286L1162.12 492.322C1173.85 486.292 1203.66 474.883 1228.37 466.963C1289.62 447.332 1377.26 449.453 1442.39 472.134ZM1271.68 564.045C1345.22 594.356 1401.64 654.237 1401.81 702.177C1401.88 720.35 1398.23 724.621 1375.59 732.825L1349.29 742.356L1344.38 715.149C1332.27 647.999 1239.92 579.316 1142.06 564.684L1094.12 557.517L1117.45 549.585C1152.47 537.685 1224 544.396 1271.68 564.045ZM1170.96 611.99C1189.72 618.293 1219.75 633.546 1237.73 645.885C1297.69 687.06 1296.13 680.082 1296.42 906.949L1296.67 1109.14L1253.81 1112.61C1230.23 1114.52 1174.11 1125.46 1129.1 1136.91C1084.09 1148.37 1046.25 1157.78 1045.02 1157.82C1039.13 1158.04 1048.16 608.928 1054.17 601.843C1063.27 591.103 1124.73 596.447 1170.96 611.99ZM1601.4 923.144L1601.43 1162.27L1577.65 1154.67L1553.87 1147.07L1551.83 928.019L1549.79 708.971L1575.21 696.597C1589.19 689.79 1600.8 684.175 1601 684.121C1601.2 684.068 1601.38 791.629 1601.4 923.144ZM1500.95 926.858L1501.73 1128.23L1481.04 1124.39C1469.66 1122.27 1457.8 1117.62 1454.69 1114.05C1451.59 1110.48 1449 1025.66 1448.96 925.555L1448.86 743.553L1470.19 734.756C1481.92 729.917 1493.47 725.853 1495.85 725.723C1498.22 725.592 1500.52 816.105 1500.95 926.858ZM1401.63 929.067C1401.94 1018.23 1400 1095.53 1397.31 1100.85C1394.35 1106.71 1383.54 1110.52 1369.88 1110.52H1347.33V948.692V786.872L1372.66 777.288C1386.59 772.022 1398.69 767.537 1399.54 767.33C1400.38 767.123 1401.33 839.9 1401.63 929.067Z";

/* Icon bounding box within 2651×1615 viewBox */
const B = { x: 992, y: 411, w: 666, h: 793 };

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [show, setShow] = useState(true);
  const uid = useId().replace(/:/g, "");
  const clipId  = `lc-${uid}`;
  const gradId  = `lg-${uid}`;
  const glowId  = `gw-${uid}`;

  useEffect(() => {
    /* Slightly longer than the fill animation so it completes visually */
    const t = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
      <AnimatePresence onExitComplete={() => onComplete?.()}>
      {show && (
        <motion.div
          key="loading"
          role="status"
          aria-label="Loading YourUniverse"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.65, ease: [0.4, 0, 1, 1] },
          }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0F172A",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* ── Noise texture overlay ── */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.025'/%3E%3C/svg%3E")`,
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />

          {/* ── Very subtle concentric rings ── */}
          {[260, 320, 390].map((r, i) => (
            <motion.div
              key={r}
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 0.06 - i * 0.015, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.1 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                width: r * 2,
                height: r * 2,
                borderRadius: "50%",
                border: "1px solid rgba(241,245,249,0.5)",
                pointerEvents: "none",
              }}
            />
          ))}

          {/* ── Mark container ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ position: "relative", zIndex: 1 }}
          >
            <svg
              viewBox="0 0 2651 1615"
              aria-hidden="true"
              style={{ width: "clamp(140px, 20vw, 200px)", height: "auto" }}
            >
              <defs>
                {/* Gradient for the fill: silver-white at bottom → brand purple at top */}
                <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%"   stopColor="#F1F5F9" stopOpacity="0.95" />
                  <stop offset="55%"  stopColor="#A78BFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#774DFF" stopOpacity="1" />
                </linearGradient>

                {/* Glow filter on the filled mark */}
                <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="18" result="blur"/>
                  <feMerge>
                    <feMergeNode in="blur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>

                {/* ClipPath: animates from bottom edge upward */}
                <clipPath id={clipId}>
                  <motion.rect
                    x={B.x - 4}
                    width={B.w + 8}
                    initial={{ y: B.y + B.h, height: 0 }}
                    animate={{ y: B.y, height: B.h + 4 }}
                    transition={{
                      duration: 1.8,
                      delay: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </clipPath>
              </defs>

              {/* Layer 1: ghost — almost invisible white outline */}
              <path
                d={ICON_PATH}
                fill="#FFFFFF"
                fillOpacity={0.055}
                fillRule="evenodd"
                clipRule="evenodd"
              />

              {/* Layer 2: gradient fill rising up */}
              <path
                d={ICON_PATH}
                fill={`url(#${gradId})`}
                fillRule="evenodd"
                clipRule="evenodd"
                clipPath={`url(#${clipId})`}
                filter={`url(#${glowId})`}
              />
            </svg>
          </motion.div>

          {/* ── Wordmark ── */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: 22,
              fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
              fontSize: "clamp(12px, 1.6vw, 14px)",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(148,163,184,0.55)",
            }}
          >
            YourUniverse
          </motion.p>

          {/* ── Hairline progress trace ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            style={{
              position: "relative",
              zIndex: 1,
              marginTop: 32,
              width: "clamp(80px, 12vw, 120px)",
              height: 1,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: "100%",
                width: "100%",
                transformOrigin: "left",
                borderRadius: 99,
                background: "linear-gradient(90deg, rgba(241,245,249,0.4) 0%, rgba(119,77,255,0.8) 60%, rgba(254,74,35,0.6) 100%)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
