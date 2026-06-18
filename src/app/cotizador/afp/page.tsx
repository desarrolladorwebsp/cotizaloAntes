import { PageJsonLd } from "@/components/seo/json-ld";
import { PageContainer } from "@/components/visual";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({ page: "cotizadorAfp" });

export default function CotizadorAfpPage() {
  return (
    <>
      <PageJsonLd page="cotizadorAfp" />
      <PageContainer className="items-center justify-center">
        <p className="text-muted-foreground text-sm">Cotizador AFP — Próximamente</p>
      </PageContainer>
    </>
  );
}
