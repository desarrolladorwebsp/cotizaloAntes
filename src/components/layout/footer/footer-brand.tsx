import { FooterColumn } from "@/components/layout/footer/footer-column";
import { SiteLogo } from "@/components/layout/site-logo";
import { footerConfig } from "@/constants/footer";

export function FooterBrand() {
  return (
    <FooterColumn title="Marca" className="lg:items-start">
      <SiteLogo className="h-9 sm:h-10" priority={false} />
      <p className="text-footer-muted max-w-xs text-sm leading-relaxed">{footerConfig.tagline}</p>
    </FooterColumn>
  );
}
