"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LogoMark } from "./shared/ui/Logo";

/**
 * LoadingScreen — static brand mark (same as favicon), light fade-in only.
 */
export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 2800);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence onExitComplete={() => onComplete?.()}>
      {show && (
        <motion.div
          key="loading"
          role="status"
          aria-label="Loading Your-UniVerse"
          aria-live="polite"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.4, 0, 1, 1] } }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#FFFFFF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <LogoMark size={168} color="#774DFF" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.45 }}
            style={{
              marginTop: 22,
              fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
              fontSize: "clamp(12px, 1.6vw, 14px)",
              fontWeight: 600,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#475569",
            }}
          >
            Your-UniVerse
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{
              marginTop: 32,
              width: "clamp(80px, 12vw, 120px)",
              height: 1,
              background: "rgba(15,23,42,0.08)",
              borderRadius: 99,
              overflow: "hidden",
            }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: "100%",
                width: "100%",
                transformOrigin: "left",
                borderRadius: 99,
                background: "linear-gradient(90deg, #334155 0%, #774DFF 65%, #FE4A23 100%)",
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
