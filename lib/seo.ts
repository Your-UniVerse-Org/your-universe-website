import type { Metadata } from "next";

/** Canonical public site URL — set NEXT_PUBLIC_BASE_URL in Vercel to your live domain */
export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? "https://youruniverse.co.za";

/** Google Analytics 4 measurement ID (public — safe in client bundle) */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ??
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ??
  "G-TZETZE06WE";

/** Google Search Console domain verification (HTML meta tag content value) */
export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  "6RAYIm_YIVQG7vSlyvTqKVWHbBA7LJSIeO_OA5iFWoY";

export const SITE_NAME = "Your-UniVerse";

/** Alternate spellings people search for */
export const SITE_ALTERNATE_NAMES = [
  "Your Universe",
  "your universe",
  "YourUniverse",
  "Your Uni-Verse",
] as const;

export const SITE_TAGLINE =
  "South Africa's first educational decision intelligence platform";

export const DEFAULT_DESCRIPTION =
  "Your-UniVerse (Your Universe) is South Africa's AI-powered education platform for Grade 9 career guidance, psychometric profiling, APS tracking, and university placement. Free for every student.";

/** Core keywords — includes brand variants and Abisola association */
export const DEFAULT_KEYWORDS = [
  "your universe",
  "Your Universe",
  "Your-UniVerse",
  "YourUniverse",
  "your universe south africa",
  "your universe education",
  "your universe platform",
  "your universe career guidance",
  "Abisola",
  "Abisola your universe",
  "Abisola Your-UniVerse",
  "South Africa education platform",
  "Grade 9 subject selection",
  "career guidance South Africa",
  "decision intelligence education",
  "APS calculator South Africa",
  "university application South Africa",
  "TVET career guidance",
  "psychometric career testing",
  "school career counselling software",
  "educational decision intelligence",
  "Lynxio Tech",
] as const;

export const OG_IMAGE_PATH = "/ORANGE%20LOGO.png";
export const OG_IMAGE_ALT =
  "Your-UniVerse — Your Universe educational decision intelligence platform";

export const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE;

export const LYNXIO_URL = "https://lynxiotech.com";

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

/** Build consistent page-level metadata for App Router */
export function createPageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  keywords = [],
  noIndex = false,
}: PageMetadataInput): Metadata {
  const url = `${BASE_URL}${path}`;
  const fullTitle =
    path === "" || path === "/"
      ? `${SITE_NAME} | Your Universe — ${SITE_TAGLINE}`
      : `${title} | ${SITE_NAME}`;

  const allKeywords = [...DEFAULT_KEYWORDS, ...keywords];

  return {
    title: fullTitle,
    description,
    keywords: [...allKeywords],
    authors: [
      { name: "Lynxio Tech", url: LYNXIO_URL },
      { name: "Abisola", url: `${BASE_URL}/about` },
    ],
    creator: "Lynxio Tech",
    publisher: SITE_NAME,
    category: "Education",
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: "website",
      locale: "en_ZA",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: 1200,
          height: 630,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE_PATH],
      ...(TWITTER_HANDLE ? { site: TWITTER_HANDLE, creator: TWITTER_HANDLE } : {}),
    },
    alternates: {
      canonical: url,
      languages: {
        "en-ZA": url,
        "af-ZA": `${url}${url.includes("?") ? "&" : "?"}lang=af`,
      },
    },
  };
}

/** Root layout metadata */
export const rootMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  ...createPageMetadata({
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    path: "/",
  }),
  title: {
    default: `${SITE_NAME} | Your Universe — Educational Decision Intelligence`,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
};
