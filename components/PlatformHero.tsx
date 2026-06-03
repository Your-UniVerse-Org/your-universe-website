"use client";
import { motion } from "framer-motion";
import { TechHeroGraphic } from "./SectionGraphics";
import { useLang } from "./LanguageContext";

export default function PlatformHero() {
  const { t } = useLang();
  return (
    <section
      style={{
        position: "relative",
        paddingTop: 160,
        paddingBottom: 96,
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 400,
          background: "radial-gradient(ellipse at 50% 0%, rgba(119,77,255,0.14) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div className="container" style={{ position: "relative" }}>
        <div className="sg-row">
          <div className="sg-col" style={{ maxWidth: 720 }}>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ marginBottom: 24 }}
            >
              <span className="pill">
                <span className="pill-dot" />
                {t("plat_page_badge")}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="display-2"
              style={{ marginBottom: 24 }}
            >
              {t("plat_page_h1_1")}{" "}
              <span className="text-gradient">{t("plat_page_h1_2")}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="body-lg"
              style={{ maxWidth: 540 }}
            >
              {t("plat_page_sub")}
            </motion.p>
          </div>
          <TechHeroGraphic />
        </div>
      </div>
    </section>
  );
}
