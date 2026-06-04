"use client";

import Link from "next/link";
import { useLang } from "./LanguageContext";
import { useTheme } from "./ThemeContext";
import Logo from "./shared/ui/Logo";

export default function Footer() {
  const { t } = useLang();
  const { theme } = useTheme();

  const COL: Record<string, { label: string; href: string }[]> = {
    [t("foot_col_platform")]: [
      { label: t("foot_how_it_works"),  href: "/platform#how-it-works" },
      { label: t("foot_ai_features"),   href: "/platform" },
      { label: t("foot_for_schools"),   href: "/for-schools" },
      { label: t("foot_for_inst"),      href: "/for-schools" },
      { label: t("foot_req_access"),    href: "/early-access" },
    ],
    [t("foot_col_company")]: [
      { label: t("foot_about"),   href: "/about" },
      { label: t("foot_lynxio"),  href: "https://lynxiotech.com" },
      { label: t("foot_careers"), href: "https://lynxiotech.com" },
    ],
    [t("foot_col_legal")]: [
      { label: t("foot_privacy"), href: "/privacy" },
      { label: t("foot_terms"),   href: "/terms" },
      { label: t("foot_data"),    href: "/privacy" },
    ],
  };

  return (
    <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>
      <div className="container" style={{ paddingTop: 72, paddingBottom: 48 }}>

        {/* Top grid */}
        <div className="footer-cols" style={{ marginBottom: 64 }}>

          {/* Brand column */}
          <div style={{ maxWidth: 300 }}>
            <Link href="/" style={{ display: "inline-block", marginBottom: 20 }}>
              <Logo height={28} white={theme === "dark"} />
            </Link>
            <p className="body" style={{ fontSize: 14, marginBottom: 24, lineHeight: 1.75 }}>
              {t("foot_tagline")}
            </p>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "var(--text-3)", textTransform: "uppercase", marginBottom: 8 }}>
              {t("foot_product_of")}
            </p>
            <a
              href="https://lynxiotech.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 600, color: "var(--purple)", transition: "opacity 0.2s" }}
              onMouseEnter={(e) => { (e.target as HTMLElement).style.opacity = "0.75"; }}
              onMouseLeave={(e) => { (e.target as HTMLElement).style.opacity = "1"; }}
            >
              Lynxio Tech
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(COL).map(([section, items]) => (
            <div key={section}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 20 }}>
                {section}
              </p>
              <ul style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {items.map((item) => (
                  <li key={item.href + item.label}>
                    {item.href.startsWith("http") ? (
                      <a href={item.href} className="footer-link" target="_blank" rel="noopener noreferrer">
                        {item.label}
                      </a>
                    ) : (
                      <Link href={item.href} className="footer-link">{item.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid var(--border)",
          paddingTop: 28,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 16,
        }}>
          <p className="small">
            &copy; {new Date().getFullYear()} YourUniverse. {t("foot_copyright")}
          </p>
          <a
            href="mailto:hello@youruniverse.co.za"
            style={{ fontSize: 13, color: "var(--text-3)", fontFamily: "'Space Grotesk', sans-serif", transition: "color 0.2s" }}
            onMouseEnter={(e) => { (e.target as HTMLElement).style.color = "var(--text-1)"; }}
            onMouseLeave={(e) => { (e.target as HTMLElement).style.color = "var(--text-3)"; }}
          >
            hello@youruniverse.co.za
          </a>
        </div>
      </div>
    </footer>
  );
}
