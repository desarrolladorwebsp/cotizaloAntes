import { HeroSection } from "@/components/hero";
import { CotizadorIsapresSection } from "@/components/sections/cotizador-isapres";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";
import { HomeJsonLd } from "@/components/seo/json-ld";
import { createPageMetadata } from "@/constants/seo";

export const metadata = createPageMetadata({ page: "home" });

export default function HomePage() {
  return (
    <>
      <HomeJsonLd />
      <HeroSection />
      <WhyChooseUsSection />
      <CotizadorIsapresSection />
    </>
  );
}
