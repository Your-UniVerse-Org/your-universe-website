"use client";
import { motion } from "framer-motion";
import { useLang } from "./LanguageContext";
import Image from "next/image";

export default function SchoolsHero() {
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
          background: "radial-gradient(ellipse at 50% 0%, rgba(254,74,35,0.10) 0%, transparent 65%)",
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
              <span className="pill pill-orange">
                <span className="pill-dot" />
                {t("schools_badge")}
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="display-2"
              style={{ marginBottom: 24 }}
            >
              {t("schools_h1_1")}{" "}
              <span className="text-gradient-orange">{t("schools_h1_2")}</span>{" "}
              {t("schools_h1_3")}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="body-lg"
              style={{ maxWidth: 560 }}
            >
              {t("schools_sub")}
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              flex: "0 0 auto",
              width: "clamp(260px, 30vw, 380px)",
              borderRadius: 20,
              overflow: "hidden",
              aspectRatio: "3 / 4",
              position: "relative",
              boxShadow: "0 24px 60px rgba(0,0,0,0.40)",
              border: "1px solid rgba(254,74,35,0.18)",
            }}
          >
            <div style={{
              position: "absolute", inset: 0, zIndex: 1,
              background: "linear-gradient(180deg, transparent 55%, rgba(15,23,42,0.80) 100%)",
              pointerEvents: "none",
            }}/>
            {/*
              Photo: Pexels — "Students taking notes in classroom"
              Source: https://www.pexels.com/photo/5905472/
              Photographer: Katerina Holmes
              License: Pexels License (free commercial use)
            */}
            <Image
              src="https://images.pexels.com/photos/5905472/pexels-photo-5905472.jpeg?auto=compress&cs=tinysrgb&w=760&h=1013&fit=crop"
              alt="Students engaged in learning in a classroom"
              fill
              priority
              sizes="380px"
              style={{ objectFit: "cover", objectPosition: "center 30%" }}
            />
            <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, zIndex: 2 }}>
              <span className="pill pill-orange" style={{ fontSize: 10 }}>
                Built for South African Schools
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
