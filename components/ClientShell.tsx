"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import PageTransition from "./PageTransition";
import { LanguageProvider } from "./LanguageContext";
import { ThemeProvider } from "./ThemeContext";

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <ThemeProvider>
    <LanguageProvider>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <div
        suppressHydrationWarning
        style={{
          opacity: loaded ? 1 : 0,
          transition: loaded ? "opacity 0.45s ease" : "none",
        }}
      >
        <PageTransition>{children}</PageTransition>
      </div>
    </LanguageProvider>
    </ThemeProvider>
  );
}
