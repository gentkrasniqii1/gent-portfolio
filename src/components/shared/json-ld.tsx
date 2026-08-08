import { getPersonJsonLd, serializeJsonLd } from "@/lib/seo";

export function JsonLd() {
  const data = getPersonJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
