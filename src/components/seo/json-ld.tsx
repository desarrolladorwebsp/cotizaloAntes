import {
  getOrganizationJsonLd,
  getServiceJsonLd,
  getWebPageJsonLd,
  getWebSiteJsonLd,
  type PageSeoKey,
} from "@/constants/seo";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Esquemas globales presentes en todas las páginas */
export function GlobalJsonLd() {
  return <JsonLd data={[getOrganizationJsonLd(), getWebSiteJsonLd()]} />;
}

export function HomeJsonLd() {
  return (
    <JsonLd data={[getWebPageJsonLd("home"), getServiceJsonLd()]} />
  );
}

export function PageJsonLd({ page }: { page: PageSeoKey }) {
  return <JsonLd data={getWebPageJsonLd(page)} />;
}
