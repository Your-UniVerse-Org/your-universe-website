import type { Metadata } from "next";
import { Suspense } from "react";
import ClientShell from "../components/ClientShell";
import ElectricBeams from "../components/ElectricBeams";
import Analytics from "../components/seo/Analytics";
import SiteJsonLd from "../components/seo/SiteJsonLd";
import { rootMetadata } from "../lib/seo";
import "./globals.css";

export const metadata: Metadata = rootMetadata;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID ?? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang="en-ZA" suppressHydrationWarning data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.setAttribute('data-theme','light');})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
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
        {gaId ? (
          <Suspense fallback={null}>
            <Analytics gaId={gaId} />
          </Suspense>
        ) : null}
      </body>
    </html>
  );
}
