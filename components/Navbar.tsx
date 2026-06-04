"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "./LanguageContext";
import Logo from "./shared/ui/Logo";

function Chevron({ open, className }: { open: boolean; className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      style={{
        marginLeft: 5,
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 0.2s ease",
        flexShrink: 0,
      }}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [instOpen, setInstOpen] = useState(false);
  const [mobileInstOpen, setMobileInstOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const instRef = useRef<HTMLDivElement>(null);
  const instLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearInstLeaveTimer = () => {
    if (instLeaveTimer.current) {
      clearTimeout(instLeaveTimer.current);
      instLeaveTimer.current = null;
    }
  };

  const openInstitutions = () => {
    clearInstLeaveTimer();
    setInstOpen(true);
  };

  const scheduleCloseInstitutions = () => {
    clearInstLeaveTimer();
    instLeaveTimer.current = setTimeout(() => setInstOpen(false), 220);
  };

  const NAV_LINKS = [
    { label: t("nav_home"), href: "/" },
    { label: t("nav_platform"), href: "/platform" },
    { label: t("nav_how_it_works"), href: "/platform#how-it-works" },
  ];

  const INSTITUTIONS_LINKS = [
    {
      label: t("nav_inst_schools"),
      sub: t("nav_inst_schools_sub"),
      href: "/for-schools",
    },
    {
      label: t("nav_inst_parents"),
      sub: t("nav_inst_parents_sub"),
      href: "/for-schools#parents",
    },
    {
      label: t("nav_inst_universities"),
      sub: t("nav_inst_universities_sub"),
      href: "/for-schools#universities",
    },
  ];

  const closeAll = useCallback(() => {
    clearInstLeaveTimer();
    setOpen(false);
    setInstOpen(false);
    setMobileInstOpen(false);
  }, []);

  useEffect(() => () => clearInstLeaveTimer(), []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    closeAll();
  }, [pathname, closeAll]);

  /* Lock page scroll while mobile menu is open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  /* Close desktop dropdown on outside click */
  useEffect(() => {
    if (!instOpen) return;
    const onPointer = (e: MouseEvent) => {
      if (instRef.current && !instRef.current.contains(e.target as Node)) {
        setInstOpen(false);
      }
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, [instOpen]);

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(href.split("#")[0]);

  const institutionsActive = pathname.startsWith("/for-schools");

  return (
    <>
      {/* Backdrop — blocks scroll & taps behind mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-mobile-backdrop"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeAll}
          />
        )}
      </AnimatePresence>

      <motion.nav
        className={`nav${scrolled ? " nav-scrolled" : ""}${open ? " nav-menu-open" : ""}`}
        role="navigation"
        aria-label="Main navigation"
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="container">
          <div className="nav-inner">

            <Link href="/" aria-label="YourUniverse Home" onClick={closeAll}>
              <Logo height={28} white />
            </Link>

            {/* Desktop nav */}
            <div className="nav-desktop-links" role="menubar">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  role="menuitem"
                  className={`nav-link${isActive(l.href) ? " nav-link--active" : ""}`}
                >
                  {l.label}
                </Link>
              ))}

              {/* For Institutions — click + hover dropdown */}
              <div
                ref={instRef}
                className="nav-dropdown-wrap"
                role="none"
                onMouseEnter={openInstitutions}
                onMouseLeave={scheduleCloseInstitutions}
                onFocus={openInstitutions}
                onBlur={(e) => {
                  if (!instRef.current?.contains(e.relatedTarget as Node)) {
                    scheduleCloseInstitutions();
                  }
                }}
              >
                <button
                  type="button"
                  className={`nav-link nav-dropdown-trigger${institutionsActive ? " nav-link--active" : ""}`}
                  aria-haspopup="true"
                  aria-expanded={instOpen}
                  aria-controls="nav-institutions-menu"
                  onClick={() => (instOpen ? setInstOpen(false) : openInstitutions())}
                >
                  {t("nav_for_schools")}
                  <Chevron open={instOpen} className="nav-dropdown-chevron" />
                </button>
                <div
                  id="nav-institutions-menu"
                  className={`nav-dropdown${instOpen ? " nav-dropdown--open" : ""}`}
                  role="menu"
                >
                  <div className="nav-dropdown-menu">
                    {INSTITUTIONS_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className="nav-dropdown-item"
                        onClick={() => setInstOpen(false)}
                      >
                        <span className="nav-dropdown-label">{item.label}</span>
                        <span className="nav-dropdown-sub">{item.sub}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="nav-actions">
              <button
                onClick={() => setLang(lang === "en" ? "af" : "en")}
                title={lang === "en" ? "Switch to Afrikaans" : "Skakel na Engels"}
                aria-label={lang === "en" ? "Switch to Afrikaans" : "Switch to English"}
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
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-purple)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-2)";
                }}
              >
                <span style={{ color: lang === "en" ? "var(--purple)" : "var(--text-3)" }}>EN</span>
                <span style={{ color: "var(--text-3)", margin: "0 1px" }}>|</span>
                <span style={{ color: lang === "af" ? "var(--orange-text)" : "var(--text-3)" }}>AF</span>
              </button>

              <Link
                href="/early-access"
                className="btn btn-primary nav-cta"
                aria-label="Request early access to YourUniverse"
              >
                {t("nav_cta")}
              </Link>

              <button
                className="nav-hamburger"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => {
                  setOpen((v) => !v);
                  if (open) setMobileInstOpen(false);
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  {open
                    ? <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                    : <><line x1="3" y1="7" x2="21" y2="7" /><line x1="3" y1="17" x2="21" y2="17" /></>
                  }
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              role="menu"
              aria-label="Mobile navigation"
              className="nav-mobile-panel"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="container nav-mobile-panel-inner">
                {NAV_LINKS.map((l, i) => (
                  <motion.div
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.25 }}
                  >
                    <Link
                      href={l.href}
                      role="menuitem"
                      onClick={closeAll}
                      className={`nav-mobile-link${isActive(l.href) ? " nav-mobile-link--active" : ""}`}
                    >
                      {l.label}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile: For Institutions accordion */}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.23, duration: 0.25 }}
                >
                  <button
                    type="button"
                    className={`nav-mobile-link nav-mobile-inst-trigger${institutionsActive ? " nav-mobile-link--active" : ""}`}
                    aria-expanded={mobileInstOpen}
                    aria-controls="mobile-institutions-menu"
                    onClick={() => setMobileInstOpen((v) => !v)}
                  >
                    {t("nav_for_schools")}
                    <Chevron open={mobileInstOpen} />
                  </button>

                  <AnimatePresence initial={false}>
                    {mobileInstOpen && (
                      <motion.div
                        id="mobile-institutions-menu"
                        className="nav-mobile-inst-panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {INSTITUTIONS_LINKS.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            onClick={closeAll}
                            className="nav-mobile-inst-link"
                          >
                            <span className="nav-mobile-inst-label">{item.label}</span>
                            <span className="nav-mobile-inst-sub">{item.sub}</span>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26, duration: 0.25 }}
                  style={{
                    marginTop: 20,
                    paddingTop: 20,
                    borderTop: "1px solid var(--border)",
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <button
                    onClick={() => setLang(lang === "en" ? "af" : "en")}
                    aria-label={lang === "en" ? "Switch to Afrikaans" : "Switch to English"}
                    style={{
                      padding: "10px 16px",
                      borderRadius: 100,
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      cursor: "pointer",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: "var(--text-2)",
                    }}
                  >
                    <span style={{ color: lang === "en" ? "var(--purple)" : "var(--text-3)" }}>EN</span>
                    <span style={{ color: "var(--text-3)", margin: "0 3px" }}>|</span>
                    <span style={{ color: lang === "af" ? "var(--orange-text)" : "var(--text-3)" }}>AF</span>
                  </button>

                  <Link
                    href="/early-access"
                    className="btn btn-primary"
                    onClick={closeAll}
                    style={{ flex: 1, justifyContent: "center", padding: "16px 24px", fontSize: 15 }}
                  >
                    {t("nav_cta")}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
