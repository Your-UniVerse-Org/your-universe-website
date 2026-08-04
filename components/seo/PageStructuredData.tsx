import JsonLd from "./JsonLd";
import {
  createBreadcrumbJsonLd,
  createFAQPageJsonLd,
  createWebPageJsonLd,
  getPageSeo,
  type FaqItem,
  type PageKey,
} from "@/lib/seo";

type PageStructuredDataProps = {
  pageKey: PageKey;
  faqs?: FaqItem[];
};

/** Per-page BreadcrumbList, WebPage, and optional FAQPage JSON-LD */
export default function PageStructuredData({ pageKey, faqs }: PageStructuredDataProps) {
  const page = getPageSeo(pageKey);
  const breadcrumbs = createBreadcrumbJsonLd([
    { name: "Home", path: "/" },
    ...(pageKey !== "home" ? [{ name: page.breadcrumb, path: page.path }] : []),
  ]);

  return (
    <>
      <JsonLd data={createWebPageJsonLd(pageKey)} />
      {pageKey !== "home" ? <JsonLd data={breadcrumbs} /> : null}
      {faqs?.length ? <JsonLd data={createFAQPageJsonLd(faqs)} /> : null}
    </>
  );
}
