"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./LanguageContext";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const NAV_LINKS = [
    { label: t("nav_home"),           href: "/" },
    { label: t("nav_platform"),       href: "/platform" },
    { label: t("nav_for_schools"),    href: "/for-schools" },
    { label: t("nav_how_it_works"),   href: "/platform#how-it-works" },
  ];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close drawer on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href.split("#")[0]);

  return (
    <motion.nav
      className={`nav${scrolled ? " nav-scrolled" : ""}`}
      role="navigation"
      aria-label="Main navigation"
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container">
        <div className="nav-inner">

          {/* Wordmark */}
          <Link href="/" className="nav-wordmark" aria-label="Your Uni-Verse – Home">
            <span className="nav-logo-text">Your Uni-Verse</span>
          </Link>

          {/* Desktop navigation — hidden on mobile via CSS */}
          <div className="nav-desktop-links" role="menubar">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                role="menuitem"
                className={`nav-link${isActive(l.href) ? " nav-link--active" : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA + Language toggle + Mobile hamburger wrapper */}
          <div className="nav-actions">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === "en" ? "af" : "en")}
              title={lang === "en" ? "Switch to Afrikaans" : "Skakel na Engels"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 4,
                padding: "5px 10px",
                borderRadius: 100,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid var(--border)",
                cursor: "pointer",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "var(--text-2)",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-blue)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-1)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)"; }}
            >
              <span style={{ color: lang === "en" ? "var(--blue)" : "var(--text-3)" }}>EN</span>
              <span style={{ color: "var(--text-3)", margin: "0 1px" }}>|</span>
              <span style={{ color: lang === "af" ? "var(--gold-text)" : "var(--text-3)" }}>AF</span>
            </button>

            <Link
              href="/early-access"
              className="btn btn-primary nav-cta"
              aria-label="Request early access to Your Uni-Verse"
            >
              {t("nav_cta")}
            </Link>

            {/* Hamburger — visible ONLY on mobile */}
            <button
              className="nav-hamburger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open
                  ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" /></>
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — slides down from nav */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden", borderTop: "1px solid var(--border)", background: "rgba(3,5,14,0.98)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
          >
            <div className="container" style={{ paddingTop: 28, paddingBottom: 36, display: "flex", flexDirection: "column", gap: 0 }}>
              {NAV_LINKS.map((l, i) => (
                <motion.div
                  key={l.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, duration: 0.25 }}
                >
                  <Link
                    href={l.href}
                    role="menuitem"
                    onClick={() => setOpen(false)}
                    className={`nav-mobile-link${isActive(l.href) ? " nav-mobile-link--active" : ""}`}
                  >
                    {l.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.26, duration: 0.25 }}
                style={{ marginTop: 20, paddingTop: 20, borderTop: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "center" }}
              >
                {/* Language toggle in mobile menu */}
                <button
                  onClick={() => setLang(lang === "en" ? "af" : "en")}
                  style={{
                    padding: "10px 16px", borderRadius: 100,
                    background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)",
                    cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", color: "var(--text-2)",
                  }}
                >
                  <span style={{ color: lang === "en" ? "var(--blue)" : "var(--text-3)" }}>EN</span>
                  <span style={{ color: "var(--text-3)", margin: "0 3px" }}>|</span>
                  <span style={{ color: lang === "af" ? "var(--gold-text)" : "var(--text-3)" }}>AF</span>
                </button>
                <Link
                  href="/early-access"
                  className="btn btn-primary"
                  onClick={() => setOpen(false)}
                  style={{ flex: 1, justifyContent: "center", padding: "16px 24px", fontSize: 15 }}
                >
                  {t("nav_cta")}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
