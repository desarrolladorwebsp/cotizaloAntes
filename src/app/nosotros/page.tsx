import { PageJsonLd } from "@/components/seo/json-ld";
import { PageContainer } from "@/components/visual";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({ page: "nosotros" });

export default function NosotrosPage() {
  return (
    <>
      <PageJsonLd page="nosotros" />
      <PageContainer className="items-center justify-center">
        <p className="text-muted-foreground text-sm">Próximamente</p>
      </PageContainer>
    </>
  );
}
