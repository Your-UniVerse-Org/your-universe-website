"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useLang } from "./LanguageContext";

const ROWS = [
  "r1","r2","r3","r4","r5","r6","r7","r8",
] as const;

function CheckYes() {
  return (
    <span className="check-yes" aria-label="Yes">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </span>
  );
}
function CheckNo() {
  return (
    <span className="check-no" aria-label="No">
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </span>
  );
}

export default function Competitive() {
  const { t } = useLang();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });

  return (
    <section
      ref={ref}
      id="comparison"
      className="section"
      aria-labelledby="comp-heading"
      style={{ background: "var(--bg)", borderTop: "1px solid var(--border)" }}
    >
      <div className="container">

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 72px" }}>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="label" style={{ marginBottom: 20 }}
          >
            {t("comp_label")}
          </motion.p>
          <motion.h2
            id="comp-heading"
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="display-2"
          >
            {t("comp_h2_1")}{" "}
            <span className="text-gradient">{t("comp_h2_2")}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="body-lg" style={{ marginTop: 20 }}
          >
            {t("comp_sub")}
          </motion.p>
        </div>

        {/* ── Student testimonial photo strip ── */}
        {/* Photos: Pexels (free commercial use, Pexels License) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr",
            gap: 12,
            marginBottom: 56,
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          {/* Wide left: student with laptop (Unsplash — free commercial) */}
          <div style={{ position: "relative", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
            <div style={{ position: "absolute", inset: 0, background: "rgba(119,77,255,0.08)", zIndex: 1, pointerEvents: "none" }} />
            {/* Photo: Unsplash — student at university / campus life */}
            <Image
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=450&fit=crop&q=80"
              alt="Students collaborating on career planning"
              fill sizes="(max-width:768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          {/* Right: two stacked photos */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ position: "relative", flex: 1, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
              {/* Photo: Unsplash — student writing notes */}
              <Image
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=260&fit=crop&q=80"
                alt="Student working independently on academic goals"
                fill sizes="200px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ position: "relative", flex: 1, borderRadius: 12, overflow: "hidden", border: "1px solid var(--border)" }}>
              {/* Photo: Unsplash — student studying */}
              <Image
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=260&fit=crop&q=80"
                alt="Students accessing educational support"
                fill sizes="200px"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </motion.div>

        {/* Desktop table */}
        <motion.div
          className="comp-table-desktop table-scroll"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <table
            role="table"
            aria-label="Feature comparison between YourUniverse and traditional platforms"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th
                  scope="col"
                  style={{
                    padding: "20px 28px",
                    textAlign: "left",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-3)",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--surface-2)",
                  }}
                >
                  {t("comp_hdr_feature")}
                </th>
                <th
                  scope="col"
                  style={{
                    padding: "20px 28px",
                    textAlign: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--text-3)",
                    borderBottom: "1px solid var(--border)",
                    background: "var(--surface-2)",
                  }}
                >
                  {t("comp_hdr_trad")}
                </th>
                <th
                  scope="col"
                  style={{
                    padding: "20px 28px",
                    textAlign: "center",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--purple)",
                    borderBottom: "1px solid var(--border)",
                    background: "rgba(119,77,255,0.06)",
                  }}
                >
                  YourUniverse
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r, i) => (
                <tr key={r}>
                  <td
                    style={{
                      padding: "16px 28px",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      color: "var(--text-2)",
                      borderBottom: i < ROWS.length - 1 ? "1px solid var(--border)" : undefined,
                    }}
                  >
                    {t(`comp_${r}_feat` as Parameters<typeof t>[0])}
                  </td>
                  <td
                    style={{
                      padding: "16px 28px",
                      textAlign: "center",
                      fontSize: 13,
                      color: "var(--text-3)",
                      borderBottom: i < ROWS.length - 1 ? "1px solid var(--border)" : undefined,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <CheckNo />
                      <span>{t(`comp_${r}_them` as Parameters<typeof t>[0])}</span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "16px 28px",
                      textAlign: "center",
                      fontSize: 13,
                      color: "var(--text-1)",
                      borderBottom: i < ROWS.length - 1 ? "1px solid var(--border)" : undefined,
                      background: "rgba(119,77,255,0.04)",
                      fontWeight: 500,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <CheckYes />
                      <span>{t(`comp_${r}_us` as Parameters<typeof t>[0])}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Mobile cards */}
        <div className="comp-cards-mobile" role="list" aria-label="Feature comparison (mobile)">
          {ROWS.map((r, i) => (
            <motion.div
              key={r}
              role="listitem"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.06 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                padding: "20px",
                marginBottom: 12,
              }}
            >
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 600, color: "var(--text-1)", marginBottom: 12 }}>
                {t(`comp_${r}_feat` as Parameters<typeof t>[0])}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "var(--comp-muted-bg)", borderRadius: 10, padding: "12px 14px" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "var(--text-3)", letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>
                    {t("comp_mobile_other")}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckNo />
                    <span style={{ fontSize: 12, color: "var(--text-3)" }}>{t(`comp_${r}_them` as Parameters<typeof t>[0])}</span>
                  </div>
                </div>
                <div style={{ background: "rgba(119,77,255,0.07)", border: "1px solid rgba(119,77,255,0.18)", borderRadius: 10, padding: "12px 14px" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "var(--purple)", letterSpacing: "0.08em", marginBottom: 6, textTransform: "uppercase" }}>
                    {t("comp_mobile_us")}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <CheckYes />
                    <span style={{ fontSize: 12, color: "var(--text-1)", fontWeight: 500 }}>{t(`comp_${r}_us` as Parameters<typeof t>[0])}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
