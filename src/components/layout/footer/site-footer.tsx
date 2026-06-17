"use client";

import { m, useInView } from "motion/react";
import { useRef } from "react";

import { FooterBrand } from "@/components/layout/footer/footer-brand";
import { FooterIndicators } from "@/components/layout/footer/footer-indicators";
import {
  FooterContact,
  FooterSitemap,
  FooterSocial,
} from "@/components/layout/footer/footer-sections";

function FooterBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#111214] via-[#111214] to-[#0d0e10]" />
      <div className="bg-primary/8 absolute -top-24 left-1/2 h-64 w-[32rem] -translate-x-1/2 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-0 h-48 w-48 rounded-full bg-white/[0.03] blur-3xl" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" preserveAspectRatio="none">
        <line x1="0" y1="1" x2="100%" y2="1" stroke="white" strokeWidth="1" />
        <line x1="10%" y1="0" x2="90%" y2="100%" stroke="#F58220" strokeWidth="0.5" opacity="0.4" />
      </svg>
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
      />
    </div>
  );
}

export function SiteFooter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const year = new Date().getFullYear();

  return (
    <footer
      ref={ref}
      className="bg-footer text-footer-foreground safe-area-bottom relative mt-auto w-full overflow-hidden border-t border-white/[0.08]"
      role="contentinfo"
    >
      <FooterBackground />

      <m.div
        className="relative z-10 mx-auto w-full max-w-screen-2xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
        initial={false}
        animate={isInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-5 lg:gap-8 xl:gap-10">
          <FooterContact />
          <FooterSocial />
          <FooterSitemap />
          <FooterIndicators />
          <FooterBrand />
        </div>

        <div className="mt-12 border-t border-white/[0.08] pt-8 sm:mt-14">
          <p className="text-footer-muted text-center text-xs sm:text-sm">
            © {year} Cotízalo Antes. Todos los derechos reservados.
          </p>
        </div>
      </m.div>
    </footer>
  );
}
