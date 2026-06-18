import { HeroSection } from "@/components/hero";
import { CotizadorIsapresSection } from "@/components/sections/cotizador-isapres";
import { WhyChooseUsSection } from "@/components/sections/why-choose-us";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUsSection />
      <CotizadorIsapresSection />
    </>
  );
}
