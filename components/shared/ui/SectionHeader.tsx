/**
 * SectionHeader — reusable section heading block used by Platform, Features,
 * Problem, Stats, Ecosystem, WhoItsFor, Competitive, Journey, etc.
 * Composes: eyebrow label + display headline + subheading paragraph.
 */

import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  label?: string;
  labelVariant?: "purple" | "orange";
  headline: ReactNode;
  sub?: string;
  align?: "left" | "center";
  inView?: boolean;
  maxWidth?: number;
  style?: React.CSSProperties;
}

const an = (d: number, inView: boolean) => ({
  initial: { opacity: 0, y: 24 },
  animate: inView ? { opacity: 1, y: 0 } : {},
  transition: { duration: 0.65, delay: d, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

export default function SectionHeader({
  label,
  labelVariant = "purple",
  headline,
  sub,
  align = "left",
  inView = true,
  maxWidth,
  style,
}: SectionHeaderProps) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth,
        margin: align === "center" ? "0 auto" : undefined,
        ...style,
      }}
    >
      {label && (
        <motion.p
          {...an(0.05, inView)}
          className={labelVariant === "orange" ? "label-orange" : "label"}
          style={{ marginBottom: 20 }}
        >
          {label}
        </motion.p>
      )}
      <motion.h2 {...an(0.15, inView)} className="display-2">
        {headline}
      </motion.h2>
      {sub && (
        <motion.p {...an(0.25, inView)} className="body-lg" style={{ marginTop: 20 }}>
          {sub}
        </motion.p>
      )}
    </div>
  );
}
