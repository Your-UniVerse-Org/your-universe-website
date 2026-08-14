/**
 * Logo — Your-UniVerse official brand mark
 *
 * Assets used (all white, transparent background):
 *   /your universe logo.svg  — full horizontal wordmark (mark + text)
 *   /your universe icon.svg  — vertical layout (mark + smaller text)
 *
 * For compact nav/footer: renders the orbital icon mark as an inline SVG
 * (same path used in LoadingScreen) + "Your-UniVerse" wordmark in Space Grotesk.
 * This ensures crisp rendering at any small size.
 *
 * Per brief: logo is exclusively black or white. Default is white for dark bg.
 */

import type { CSSProperties } from "react";
import Image from "next/image";
import {
  BRAND_MARK_ASPECT,
  BRAND_MARK_PATH,
  BRAND_MARK_VIEWBOX,
} from "@/lib/brand-mark";

interface LogoProps {
  /** Height in pixels — width scales automatically */
  height?: number;
  /** White (for dark bg) or dark (for light bg). Default: true (white) */
  white?: boolean;
  /**
   * wordmark  — inline orbital mark + "Your-UniVerse" text (default, perfect for nav)
   * full      — the full official /your universe logo.svg as an img
   * iconOnly  — the official /your universe icon.svg as an img
   */
  variant?: "wordmark" | "full" | "iconOnly";
  className?: string;
  style?: CSSProperties;
}

export default function Logo({
  height = 32,
  white = true,
  variant = "wordmark",
  className,
  style,
}: LogoProps) {
  const fill = white ? "#FFFFFF" : "#0F172A";

  /* ── wordmark: inline mark SVG + Space Grotesk text ─────────── */
  if (variant === "wordmark") {
    const markH = height;
    const markW = Math.round(markH * BRAND_MARK_ASPECT);
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: Math.round(markH * 0.32),
          flexShrink: 0,
          lineHeight: 0,
          ...style,
        }}
      >
        {/* Orbital icon mark — crisp at any size */}
        <svg
          viewBox={BRAND_MARK_VIEWBOX}
          width={markW}
          height={markH}
          fill="none"
          aria-hidden="true"
          style={{ display: "block", flexShrink: 0 }}
        >
          <path d={BRAND_MARK_PATH} fill={fill} fillRule="evenodd" clipRule="evenodd" />
        </svg>
        {/* Wordmark text */}
        <span
          style={{
            fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
            fontSize: Math.round(height * 0.56),
            fontWeight: 700,
            color: fill,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          Your-UniVerse
        </span>
      </span>
    );
  }

  /* ── full / iconOnly: official SVG files ─────────────────────── */
  const src =
    variant === "iconOnly"
      ? "/your universe icon.svg"
      : "/your universe logo.svg";

  const aspectRatio =
    variant === "iconOnly" ? 3158 / 4418 : 4366 / 2140;
  const computedWidth = Math.round(height * aspectRatio);

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        flexShrink: 0,
        lineHeight: 0,
        ...style,
      }}
    >
      <Image
        src={src}
        alt="Your-UniVerse"
        width={computedWidth}
        height={height}
        priority
        style={{
          height,
          width: "auto",
          maxWidth: "none",
          filter: white ? "none" : "invert(1)",
          userSelect: "none",
        }}
      />
    </span>
  );
}

/**
 * LogoMark — just the orbital icon for very tight contexts (favicons, tiles)
 */
export function LogoMark({
  size = 36,
  white = true,
  color,
}: {
  size?: number;
  white?: boolean;
  /** Override fill — use for favicon-matched purple on loading screen */
  color?: string;
}) {
  const fill = color ?? (white ? "#FFFFFF" : "#0F172A");
  const w = Math.round(size * BRAND_MARK_ASPECT);
  return (
    <svg
      viewBox={BRAND_MARK_VIEWBOX}
      width={w}
      height={size}
      fill="none"
      aria-label="Your-UniVerse mark"
      style={{ display: "block", flexShrink: 0 }}
    >
      <path d={BRAND_MARK_PATH} fill={fill} fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}
