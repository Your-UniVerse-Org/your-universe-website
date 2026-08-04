import {
  BASE_URL,
  DEFAULT_DESCRIPTION,
  SITE_ALTERNATE_NAMES,
  SITE_HUB_NAME,
  SITE_NAME,
  LYNXIO_URL,
  PRIMARY_KEYWORDS,
} from "@/lib/seo";
import JsonLd from "./JsonLd";

/** Global structured data: Organization, EducationalOrganization, WebSite, SoftwareApplication */
export default function SiteJsonLd() {
  const graph = [
    {
      "@type": ["Organization", "EducationalOrganization"],
      "@id": `${BASE_URL}/#organization`,
      name: SITE_HUB_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES, SITE_NAME],
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/your%20universe%20logo.svg`,
      },
      description: DEFAULT_DESCRIPTION,
      keywords: [...PRIMARY_KEYWORDS].join(", "),
      foundingLocation: { "@type": "Place", name: "South Africa" },
      areaServed: { "@type": "Country", name: "South Africa" },
      parentOrganization: {
        "@type": "Organization",
        name: "Lynxio Tech",
        url: LYNXIO_URL,
      },
      sameAs: [LYNXIO_URL, BASE_URL],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@youruniversehub.com",
        availableLanguage: ["English", "Afrikaans"],
        areaServed: "ZA",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: SITE_HUB_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES],
      url: BASE_URL,
      description: DEFAULT_DESCRIPTION,
      inLanguage: ["en-ZA", "af-ZA"],
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/platform?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#application`,
      name: SITE_HUB_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES, SITE_NAME],
      applicationCategory: "EducationalApplication",
      applicationSubCategory: "Career Guidance",
      operatingSystem: "Web",
      url: BASE_URL,
      description: DEFAULT_DESCRIPTION,
      featureList: [
        "Grade 9 subject selection guidance",
        "APS calculator and tracking",
        "Psychometric career testing",
        "University guidance South Africa",
        "TVET career pathways",
        "School career counselling",
      ],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "ZAR",
        description: "Free for every South African student",
      },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: ["student", "parent", "teacher", "administrator"],
      },
      provider: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#abisola`,
      name: "Abisola",
      jobTitle: "Creative Director",
      description:
        "Abisola provides the design vision behind Your Universe Hub — South Africa's educational decision intelligence platform.",
      knowsAbout: [
        "Your Universe",
        "Your Universe Hub",
        "education technology",
        "career guidance",
        "user experience design",
      ],
      worksFor: { "@id": `${BASE_URL}/#organization` },
      url: `${BASE_URL}/about`,
    },
  ];

  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": graph,
      }}
    />
  );
}
