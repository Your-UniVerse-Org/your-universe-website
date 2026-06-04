import type { Metadata } from "next";
import Script from "next/script";
import ClientShell from "../components/ClientShell";
import ElectricBeams from "../components/ElectricBeams";
import "./globals.css";

/* ── Canonical domain
   TODO: Update BASE_URL to https://youruniverse.co.za once DNS is configured.
   ─────────────────────────────────────────────────────────────────────────── */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "https://youruniverse.co.za";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Your-UniVerse | Educational Decision Intelligence Platform",
    template: "%s | Your-UniVerse",
  },
  description:
    "South Africa's first educational decision intelligence platform. AI-powered career guidance, psychometric profiling, subject selection, and institutional recruitment. From Grade 9 to graduation.",
  keywords: [
    "South Africa education platform",
    "Grade 9 subject selection",
    "career guidance South Africa",
    "decision intelligence education",
    "APS calculator South Africa",
    "university application South Africa",
    "TVET career guidance",
    "psychometric career testing",
    "school career counselling software",
    "Your-UniVerse",
    "educational decision intelligence",
  ],
  authors: [{ name: "Lynxio Tech", url: "https://lynxio.tech" }],
  creator: "Lynxio Tech",
  publisher: "Your-UniVerse",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: BASE_URL,
    siteName: "Your-UniVerse",
    title: "Your-UniVerse | Educational Decision Intelligence Platform",
    description:
      "South Africa's first educational decision intelligence platform. AI-powered career guidance, psychometric profiling, and institutional recruitment. From Grade 9 to graduation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your-UniVerse: Educational Decision Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your-UniVerse | Educational Decision Intelligence Platform",
    description:
      "South Africa's first educational decision intelligence platform. From Grade 9 to graduation.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: { canonical: BASE_URL },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  return (
    /*
     * lang="en" is the SSR default.
     * The LanguageProvider (in ClientShell) dynamically sets document.documentElement.lang
     * to "en" or "af" based on the user's saved preference in localStorage.
     */
    <html lang="en" suppressHydrationWarning data-theme="light">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.setAttribute('data-theme','light');})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google Fonts loaded here (not in globals.css) to avoid PostCSS @import ordering issues */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
      </head>
      <body>
        <div style={{ maxWidth: "100vw", overflowX: "hidden", position: "relative" }}>
          <ElectricBeams />
          <ClientShell>{children}</ClientShell>
        </div>
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">{
              `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}',{page_path:window.location.pathname});`
            }</Script>
          </>
        )}
      </body>
    </html>
  );
}
