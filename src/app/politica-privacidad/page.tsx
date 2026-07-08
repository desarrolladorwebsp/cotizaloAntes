import { PrivacyPolicyView } from "@/components/sections/privacy-policy";
import { PageJsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({ page: "politicaPrivacidad" });

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <PageJsonLd page="politicaPrivacidad" />
      <PrivacyPolicyView />
    </>
  );
}
