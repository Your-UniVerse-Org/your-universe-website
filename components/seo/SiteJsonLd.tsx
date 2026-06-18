import {
  BASE_URL,
  DEFAULT_DESCRIPTION,
  SITE_ALTERNATE_NAMES,
  SITE_NAME,
  LYNXIO_URL,
} from "@/lib/seo";
import JsonLd from "./JsonLd";

/** Global structured data: Organization, WebSite, SoftwareApplication, Person (Abisola) */
export default function SiteJsonLd() {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES],
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/your%20universe%20logo.svg`,
      },
      description: DEFAULT_DESCRIPTION,
      foundingLocation: {
        "@type": "Place",
        name: "South Africa",
      },
      parentOrganization: {
        "@type": "Organization",
        name: "Lynxio Tech",
        url: LYNXIO_URL,
      },
      sameAs: [LYNXIO_URL],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "hello@youruniverse.co.za",
        availableLanguage: ["English", "Afrikaans"],
        areaServed: "ZA",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES, "your universe", "Abisola your universe"],
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
      name: SITE_NAME,
      alternateName: [...SITE_ALTERNATE_NAMES],
      applicationCategory: "EducationalApplication",
      operatingSystem: "Web",
      url: BASE_URL,
      description: DEFAULT_DESCRIPTION,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "ZAR",
        description: "Free for every South African student",
      },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
      provider: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#abisola`,
      name: "Abisola",
      jobTitle: "Creative Director",
      description:
        "Abisola provides the design vision and creative direction behind Your-UniVerse (Your Universe), South Africa's educational decision intelligence platform.",
      knowsAbout: [
        "Your Universe",
        "Your-UniVerse",
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
