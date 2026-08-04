import type { Metadata } from "next";

/** Canonical production URL — prefers NEXT_PUBLIC_SITE_URL, then NEXT_PUBLIC_BASE_URL */
export const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  process.env.NEXT_PUBLIC_BASE_URL ??
  "https://www.youruniversehub.com"
).replace(/\/$/, "");

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID ??
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ??
  "G-TZETZE06WE";

export const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  "6RAYIm_YIVQG7vSlyvTqKVWHbBA7LJSIeO_OA5iFWoY";

export const SITE_NAME = "Your-UniVerse";
export const SITE_NAME_ALT = "Your Universe";
export const SITE_HUB_NAME = "Your Universe Hub";

export const SITE_ALTERNATE_NAMES = [
  "Your Universe",
  "Your Universe Hub",
  "your universe",
  "YourUniverse",
  "Your Uni-Verse",
  "youruniversehub.com",
  "youruniverse.com",
] as const;

export const SITE_TAGLINE =
  "South Africa's educational decision intelligence platform";

export const DEFAULT_DESCRIPTION =
  "Your Universe Hub is South Africa's school learning and university guidance platform. AI-powered career guidance, Grade 9 subject selection, APS tracking, psychometric testing, and TVET pathways — free for every student.";

/** Primary discovery keywords — general education searches, not just brand */
export const PRIMARY_KEYWORDS = [
  "Your Universe",
  "Your Universe Hub",
  "school learning platform South Africa",
  "university guidance South Africa",
  "which university to go to",
  "career guidance for students",
  "Grade 9 subject selection South Africa",
  "educational decision intelligence",
  "APS calculator South Africa",
  "TVET career guidance",
  "psychometric career testing students",
  "school to university pathway",
  "student career counselling platform",
  "best subjects to choose for university",
  "education platform South Africa",
] as const;

export const DEFAULT_KEYWORDS = [
  ...PRIMARY_KEYWORDS,
  "Your-UniVerse",
  "YourUniverse",
  "your universe south africa",
  "your universe education",
  "your universe platform",
  "your universe career guidance",
  "Abisola",
  "Abisola your universe",
  "South Africa education platform",
  "Grade 9 subject selection",
  "career guidance South Africa",
  "decision intelligence education",
  "university application South Africa",
  "school career counselling software",
  "Lynxio Tech",
] as const;

export const OG_IMAGE_PATH = "/ORANGE%20LOGO.png";
export const OG_IMAGE_ALT =
  "Your-UniVerse — Your Universe Hub — educational decision intelligence for South African schools and students";

export const TWITTER_HANDLE = process.env.NEXT_PUBLIC_TWITTER_HANDLE;
export const LYNXIO_URL = "https://lynxiotech.com";

export type PageKey =
  | "home"
  | "platform"
  | "forSchools"
  | "earlyAccess"
  | "about"
  | "careers"
  | "privacy"
  | "terms";

type PageSeoConfig = {
  path: string;
  title: string;
  description: string;
  keywords: string[];
  breadcrumb: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: number;
};

/** Central per-page SEO config — single source of truth */
export const PAGE_SEO: Record<PageKey, PageSeoConfig> = {
  home: {
    path: "/",
    title: "Your Universe Hub — School Learning & University Guidance",
    description:
      "Your Universe Hub helps South African students discover the right school subjects, universities, and careers. AI career guidance, Grade 9 subject selection, APS intelligence, psychometric testing, and TVET pathways — free for every learner.",
    keywords: [
      "your universe official",
      "your universe hub",
      "education platform South Africa",
      "school learning platform South Africa",
    ],
    breadcrumb: "Home",
    changefreq: "weekly",
    priority: 1.0,
  },
  platform: {
    path: "/platform",
    title: "Platform — AI Career Guidance & APS Intelligence",
    description:
      "Explore the Your Universe platform: psychometric career testing, APS calculator intelligence, predictive analytics, and gamified guidance for Grade 9 subject selection through to university placement in South Africa.",
    keywords: [
      "APS calculator South Africa",
      "psychometric career testing students",
      "educational decision intelligence",
      "career guidance for students",
      "school to university pathway",
    ],
    breadcrumb: "Platform",
    changefreq: "weekly",
    priority: 0.9,
  },
  forSchools: {
    path: "/for-schools",
    title: "For Schools, Universities & TVET Colleges",
    description:
      "Your Universe partners with South African schools, universities, and TVET colleges. Whole-school student career counselling, university guidance infrastructure, and decision intelligence for institutions.",
    keywords: [
      "student career counselling platform",
      "university guidance South Africa",
      "TVET career guidance",
      "school learning platform South Africa",
    ],
    breadcrumb: "For Schools",
    changefreq: "weekly",
    priority: 0.85,
  },
  earlyAccess: {
    path: "/early-access",
    title: "Join Early Access — Students, Parents & Schools",
    description:
      "Request early access to Your Universe Hub. South Africa's education platform for Grade 9 subject selection, university guidance, career counselling, and psychometric career testing. Free for every student.",
    keywords: [
      "your universe early access",
      "your universe waitlist",
      "Grade 9 subject selection South Africa",
      "which university to go to",
    ],
    breadcrumb: "Early Access",
    changefreq: "weekly",
    priority: 0.8,
  },
  about: {
    path: "/about",
    title: "About Your Universe — Built in South Africa",
    description:
      "About Your Universe Hub — South Africa's educational decision intelligence platform built by Lynxio Tech. Creative direction from Abisola. Helping learners choose subjects, universities, and careers with confidence.",
    keywords: [
      "about your universe",
      "your universe hub",
      "Abisola your universe",
      "education platform South Africa",
    ],
    breadcrumb: "About",
    changefreq: "monthly",
    priority: 0.7,
  },
  careers: {
    path: "/careers",
    title: "Careers — Build the Future of Education",
    description:
      "Careers at Your Universe and Lynxio Tech. Join the team building South Africa's school-to-university guidance platform and educational decision intelligence infrastructure.",
    keywords: ["your universe careers", "education technology jobs South Africa"],
    breadcrumb: "Careers",
    changefreq: "monthly",
    priority: 0.5,
  },
  privacy: {
    path: "/privacy",
    title: "Privacy Policy",
    description:
      "Your Universe Hub privacy policy. How we collect, use, and protect student and school data in compliance with POPIA. Contact privacy@youruniversehub.com.",
    keywords: ["your universe privacy", "student data protection South Africa"],
    breadcrumb: "Privacy Policy",
    changefreq: "yearly",
    priority: 0.3,
  },
  terms: {
    path: "/terms",
    title: "Terms of Service",
    description:
      "Terms of Service for Your Universe Hub — South Africa's educational decision intelligence platform operated by Lynxio Tech.",
    keywords: ["your universe terms", "education platform terms South Africa"],
    breadcrumb: "Terms of Service",
    changefreq: "yearly",
    priority: 0.3,
  },
};

export const SITEMAP_PAGES = Object.values(PAGE_SEO).map(
  ({ path, changefreq, priority }) => ({ path, changefreq, priority: String(priority) })
);

export type FaqItem = { question: string; answer: string };

export const HOME_FAQS: FaqItem[] = [
  {
    question: "What is Your Universe Hub?",
    answer:
      "Your Universe Hub (Your-UniVerse) is South Africa's educational decision intelligence platform. It helps students from Grade 9 through to university with subject selection, career guidance, psychometric profiling, APS tracking, and school-to-university pathway planning.",
  },
  {
    question: "How does Your Universe help with Grade 9 subject selection?",
    answer:
      "Your Universe analyses a learner's interests, academic performance, and career goals to recommend the best subjects for university and TVET pathways — before Grade 10 subject choices lock in critical doors.",
  },
  {
    question: "Which university should I go to in South Africa?",
    answer:
      "Your Universe Hub matches learners to universities, TVET colleges, and programmes based on APS requirements, psychometric fit, and career goals — helping answer 'which university to go to' with data, not guesswork.",
  },
  {
    question: "Does Your Universe include an APS calculator?",
    answer:
      "Yes. Your Universe includes APS intelligence and tracking so South African students can monitor eligibility for university programmes and understand how subject choices affect their admission points score.",
  },
  {
    question: "Is Your Universe free for students?",
    answer:
      "Yes. Your Universe Hub is free for every South African student. Schools and institutions can partner for whole-school career counselling and university guidance infrastructure.",
  },
];

export const PLATFORM_FAQS: FaqItem[] = [
  {
    question: "What is educational decision intelligence?",
    answer:
      "Educational decision intelligence combines psychometric testing, academic data, and AI recommendations to guide students through subject selection, career choices, and university placement — the core of the Your Universe platform.",
  },
  {
    question: "Does Your Universe offer psychometric career testing?",
    answer:
      "Yes. Your Universe includes psychometric career testing for students, helping match personality, aptitude, and interests to careers, university programmes, and TVET pathways in South Africa.",
  },
];

export function getPageSeo(key: PageKey): PageSeoConfig {
  return PAGE_SEO[key];
}

type PageMetadataInput = {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
};

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
      ? `${SITE_NAME} | ${SITE_HUB_NAME} — ${SITE_TAGLINE}`
      : `${title} | ${SITE_NAME}`;

  const allKeywords = [...new Set([...DEFAULT_KEYWORDS, ...keywords])];

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
      siteName: SITE_HUB_NAME,
      title: fullTitle,
      description,
      images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: OG_IMAGE_ALT }],
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

export function createPageMetadataFromKey(key: PageKey, noIndex = false): Metadata {
  const page = getPageSeo(key);
  return createPageMetadata({
    title: page.title,
    description: page.description,
    path: page.path,
    keywords: page.keywords,
    noIndex,
  });
}

export function createBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.path}`,
    })),
  };
}

export function createFAQPageJsonLd(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createWebPageJsonLd(key: PageKey) {
  const page = getPageSeo(key);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE_URL}${page.path}#webpage`,
    url: `${BASE_URL}${page.path}`,
    name: page.title,
    description: page.description,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    inLanguage: "en-ZA",
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  ...createPageMetadataFromKey("home"),
  title: {
    default: `${SITE_NAME} | ${SITE_HUB_NAME} — Educational Decision Intelligence`,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: SITE_HUB_NAME,
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
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
