"use client";

import { Mail, MessageCircle } from "lucide-react";
import { m } from "motion/react";

import { getPrivacyPolicyWhatsAppUrl, privacyPolicyContactCta } from "@/constants/privacy-policy";
import { siteConfig } from "@/constants/site";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { fadeUp } from "@/lib/motion";
import { baseTransition, reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

export function PrivacyPolicyContactCta() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const whatsAppUrl = getPrivacyPolicyWhatsAppUrl(siteConfig.contact.phone);

  return (
    <m.section
      id={privacyPolicyContactCta.id}
      aria-labelledby={`${privacyPolicyContactCta.id}-title`}
      className="scroll-mt-28"
      variants={fadeUp}
      initial={false}
      whileInView={prefersReducedMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-10%" }}
      transition={prefersReducedMotion ? reducedMotionConfig.transition : baseTransition("normal")}
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-white p-6 shadow-sm sm:p-7",
        )}
      >
        <div className="bg-primary/8 absolute -top-10 -right-10 size-32 rounded-full blur-2xl" aria-hidden />

        <div className="relative space-y-4">
          <p className="text-primary text-xs font-bold tracking-[0.14em] uppercase">
            {privacyPolicyContactCta.eyebrow}
          </p>
          <h2
            id={`${privacyPolicyContactCta.id}-title`}
            className="text-foreground text-xl font-semibold tracking-tight sm:text-2xl"
          >
            {privacyPolicyContactCta.title}
          </h2>
          <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed sm:text-base">
            {privacyPolicyContactCta.description}
          </p>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:flex-wrap">
            <a
              href={`mailto:${siteConfig.contact.email}`}
              className={cn(
                "inline-flex items-center justify-center gap-2.5 rounded-xl border border-border bg-white px-4 py-3 text-sm font-medium text-foreground shadow-sm transition-all duration-200",
                "hover:border-primary/30 hover:text-primary hover:shadow-md",
              )}
            >
              <Mail className="text-primary size-4 shrink-0" aria-hidden />
              {siteConfig.contact.email}
            </a>
            <a
              href={whatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center justify-center gap-2.5 rounded-xl border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-3 text-sm font-medium text-foreground shadow-sm transition-all duration-200",
                "hover:border-[#25D366]/50 hover:bg-[#25D366]/15 hover:shadow-md",
              )}
              aria-label={`WhatsApp ${siteConfig.contact.phone} (abre en nueva pestaña)`}
            >
              <MessageCircle className="size-4 shrink-0 text-[#128C7E]" aria-hidden />
              WhatsApp {siteConfig.contact.phone}
            </a>
          </div>
        </div>
      </div>
    </m.section>
  );
}
