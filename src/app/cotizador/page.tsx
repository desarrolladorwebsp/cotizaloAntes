import { CotizadorIsapresSection } from "@/components/sections/cotizador-isapres";
import { PageJsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({ page: "cotizador" });

export default function CotizadorPage() {
  return (
    <>
      <PageJsonLd page="cotizador" />
      <CotizadorIsapresSection asPage />
    </>
  );
}
