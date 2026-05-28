import type { Metadata } from "next";
import Script from "next/script";
import ClientShell from "../components/ClientShell";
import ElectricBeams from "../components/ElectricBeams";
import "./globals.css";

const BASE_URL = "https://your-universe-five.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Your Uni-Verse | Decision Intelligence for South African Education",
    template: "%s | Your Uni-Verse",
  },
  description:
    "South Africa's first educational decision intelligence platform. AI-powered career guidance, psychometric profiling, and institutional recruitment. From Grade 9 to graduation.",
  keywords: [
    "South Africa education platform",
    "Grade 9 subject selection",
    "career guidance South Africa",
    "decision intelligence education",
    "APS calculator",
    "university application South Africa",
    "TVET career guidance",
    "psychometric career testing",
    "school career counselling software",
    "Your Uni-Verse",
  ],
  authors: [{ name: "Lynxio Tech", url: "https://lynxio.tech" }],
  creator: "Lynxio Tech",
  publisher: "Your Uni-Verse",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: BASE_URL,
    siteName: "Your Uni-Verse",
    title: "Your Uni-Verse | Decision Intelligence for South African Education",
    description:
      "South Africa's first educational decision intelligence platform. AI-powered career guidance, psychometric profiling, and institutional recruitment. From Grade 9 to graduation.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Your Uni-Verse: Decision Intelligence Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Your Uni-Verse | Decision Intelligence for South African Education",
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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload Instrument Serif — used for every h1/display-1 (LCP element) */}
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          href="https://fonts.gstatic.com/s/instrumentserif/v1/F2FRWYpDh8AlQMGLM2ENjQWLGdnM_d9Wq9K3iY.woff2"
          crossOrigin="anonymous"
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
