import type { Metadata } from "next";
import { Suspense } from "react";
import ClientShell from "../components/ClientShell";
import ElectricBeams from "../components/ElectricBeams";
import Analytics from "../components/seo/Analytics";
import SiteJsonLd from "../components/seo/SiteJsonLd";
import { GA_MEASUREMENT_ID, rootMetadata } from "../lib/seo";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-ZA" suppressHydrationWarning data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.setAttribute('data-theme','light');})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
        <SiteJsonLd />
      </head>
      <body>
        <div style={{ maxWidth: "100vw", overflowX: "hidden", position: "relative" }}>
          <ElectricBeams />
          <ClientShell>{children}</ClientShell>
        </div>
        {GA_MEASUREMENT_ID ? (
          <Suspense fallback={null}>
            <Analytics gaId={GA_MEASUREMENT_ID} />
          </Suspense>
        ) : null}
      </body>
    </html>
  );
}
