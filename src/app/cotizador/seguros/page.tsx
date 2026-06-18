import { PageJsonLd } from "@/components/seo/json-ld";
import { PageContainer } from "@/components/visual";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({ page: "cotizadorSeguros" });

export default function CotizadorSegurosPage() {
  return (
    <>
      <PageJsonLd page="cotizadorSeguros" />
      <PageContainer className="items-center justify-center">
        <p className="text-muted-foreground text-sm">Cotizador seguros — Próximamente</p>
      </PageContainer>
    </>
  );
}
