"use client";

import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "primary" | "orange" | "ghost" | "outline-purple";
type Size = "sm" | "md" | "lg";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  style?: React.CSSProperties;
  "aria-label"?: string;
  fullWidth?: boolean;
}

const sizeMap: Record<Size, string> = {
  sm: "10px 20px",
  md: "13px 28px",
  lg: "15px 36px",
};

const fontSizeMap: Record<Size, string> = {
  sm: "13px",
  md: "14px",
  lg: "15px",
};

const variantMap: Record<Variant, string> = {
  "primary":       "btn btn-primary",
  "orange":        "btn btn-orange",
  "ghost":         "btn btn-ghost",
  "outline-purple":"btn btn-outline-purple",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  onClick,
  disabled,
  className = "",
  type = "button",
  style,
  "aria-label": ariaLabel,
  fullWidth,
}: ButtonProps) {
  const cls = `${variantMap[variant]} ${className}`;
  const combinedStyle: React.CSSProperties = {
    padding: sizeMap[size],
    fontSize: fontSizeMap[size],
    width: fullWidth ? "100%" : undefined,
    justifyContent: fullWidth ? "center" : undefined,
    opacity: disabled ? 0.5 : 1,
    pointerEvents: disabled ? "none" : undefined,
    ...style,
  };

  if (href) {
    return (
      <Link href={href} className={cls} style={combinedStyle} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      style={combinedStyle}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
