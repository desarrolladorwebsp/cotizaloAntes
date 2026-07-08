"use client";

import {
  Cookie,
  Database,
  ExternalLink,
  Lock,
  RefreshCw,
  Scale,
  Share2,
  Shield,
  ShieldCheck,
  Target,
  UserCheck,
} from "lucide-react";
import { m, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { PrivacyPolicyBackground } from "@/components/sections/privacy-policy/privacy-policy-background";
import { PrivacyPolicyContactCta } from "@/components/sections/privacy-policy/privacy-policy-contact-cta";
import { PrivacyPolicySectionCard } from "@/components/sections/privacy-policy/privacy-policy-section-card";
import { Container } from "@/components/ui/container";
import { PageContainer } from "@/components/visual";
import {
  privacyPolicyContactCta,
  privacyPolicyMeta,
  privacyPolicySections,
} from "@/constants/privacy-policy";
import { siteConfig } from "@/constants/site";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { fadeUp, staggerChildren, staggerContainer } from "@/lib/motion";
import { baseTransition, reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

const sectionIcons = {
  "ley-21719": Scale,
  responsable: Shield,
  "datos-recopilados": Database,
  finalidades: Target,
  principios: ShieldCheck,
  derechos: UserCheck,
  cesion: Share2,
  conservacion: Lock,
  cookies: Cookie,
  actualizaciones: RefreshCw,
} as const;

export function PrivacyPolicyView() {
  const pageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(pageRef, { once: true, margin: "-8%" });
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <PageContainer className="relative overflow-hidden bg-background py-12 sm:py-16 md:py-20">
      <div ref={pageRef} className="relative">
        <PrivacyPolicyBackground isInView={isInView} />

        <Container size="2xl" padding="default" className="relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(220px,260px)_minmax(0,1fr)] lg:gap-14 xl:gap-16">
          <m.aside
            className="lg:sticky lg:top-28 lg:self-start"
            variants={fadeUp}
            initial={false}
            animate={isInView && !prefersReducedMotion ? "visible" : false}
            transition={prefersReducedMotion ? reducedMotionConfig.transition : baseTransition("slow")}
          >
            <nav
              aria-label="Contenido de la política de privacidad"
              className="rounded-2xl border border-border/80 bg-white/75 p-4 shadow-sm backdrop-blur-sm sm:p-5"
            >
              <p className="text-primary mb-3 text-xs font-bold tracking-[0.14em] uppercase">
                En esta página
              </p>
              <ul className="space-y-1.5" role="list">
                {privacyPolicySections.map((section, index) => (
                  <m.li
                    key={section.id}
                    initial={false}
                    animate={
                      isInView && !prefersReducedMotion
                        ? { opacity: 1, x: 0 }
                        : { opacity: 1, x: 0 }
                    }
                    transition={{
                      ...(prefersReducedMotion
                        ? reducedMotionConfig.transition
                        : baseTransition("normal")),
                      delay: prefersReducedMotion ? 0 : 0.04 * index,
                    }}
                  >
                    <a
                      href={`#${section.id}`}
                      className={cn(
                        "text-muted-foreground hover:text-primary block rounded-lg px-3 py-2 text-sm leading-snug transition-colors duration-200",
                        "hover:bg-primary/5",
                      )}
                    >
                      {section.title}
                    </a>
                  </m.li>
                ))}
                <m.li
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={
                    prefersReducedMotion
                      ? reducedMotionConfig.transition
                      : { ...baseTransition("normal"), delay: 0.04 * privacyPolicySections.length }
                  }
                >
                  <a
                    href={`#${privacyPolicyContactCta.id}`}
                    className={cn(
                      "text-muted-foreground hover:text-primary block rounded-lg px-3 py-2 text-sm leading-snug transition-colors duration-200",
                      "hover:bg-primary/5",
                    )}
                  >
                    {privacyPolicyContactCta.eyebrow}
                  </a>
                </m.li>
              </ul>
            </nav>
          </m.aside>

          <div className="min-w-0">
            <m.header
              className="mb-8 max-w-3xl space-y-5 sm:mb-10"
              variants={staggerContainer}
              initial={false}
              animate={isInView && !prefersReducedMotion ? "visible" : false}
            >
              <m.p
                variants={staggerChildren}
                className="text-primary text-xs font-bold tracking-[0.14em] uppercase"
              >
                Transparencia y cumplimiento legal
              </m.p>

              <m.h1
                variants={staggerChildren}
                className="text-foreground text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-[2.5rem]"
              >
                {privacyPolicyMeta.title}
              </m.h1>

              <m.div variants={staggerChildren} className="flex flex-wrap gap-2.5">
                <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                  {privacyPolicyMeta.lawReference}
                </span>
                <span className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                  Vigencia plena: {privacyPolicyMeta.lawFullVigencyDate}
                </span>
              </m.div>

              <m.p
                variants={staggerChildren}
                className="text-muted-foreground text-base leading-relaxed sm:text-lg"
              >
                En {siteConfig.name} tratamos sus datos personales conforme a la normativa
                chilena. Esta política explica cómo recopilamos, usamos y protegemos su
                información al cotizar y comparar planes en Chile.
              </m.p>

              <m.p variants={staggerChildren} className="text-muted-foreground text-sm">
                Última actualización:{" "}
                <time dateTime={privacyPolicyMeta.lastUpdated}>
                  {privacyPolicyMeta.lastUpdated}
                </time>
              </m.p>
            </m.header>

            <m.div
              className="space-y-5 sm:space-y-6"
              variants={staggerContainer}
              initial={false}
              animate={isInView && !prefersReducedMotion ? "visible" : false}
            >
              {privacyPolicySections.map((section, index) => {
                const Icon = sectionIcons[section.id as keyof typeof sectionIcons] ?? Shield;

                return (
                  <PrivacyPolicySectionCard
                    key={section.id}
                    section={section}
                    icon={Icon}
                    index={index}
                  />
                );
              })}
            </m.div>

            <div className="mt-5 sm:mt-6">
              <PrivacyPolicyContactCta />
            </div>

            <m.footer
              className="mt-10 rounded-2xl border border-border/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-7"
              variants={fadeUp}
              initial={false}
              whileInView={prefersReducedMotion ? undefined : "visible"}
              viewport={{ once: true, margin: "-10%" }}
            >
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                Si tiene dudas sobre el tratamiento de sus datos, contáctenos en{" "}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="text-primary font-medium transition-colors hover:underline"
                >
                  {siteConfig.contact.email}
                </a>
                . También puede consultar el texto oficial de la norma en el{" "}
                <a
                  href="https://www.bcn.cl/leychile/navegar?idNorma=1203407"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary inline-flex items-center gap-1 font-medium transition-colors hover:underline"
                >
                  Biblioteca del Congreso Nacional de Chile
                  <ExternalLink className="size-3.5" aria-hidden />
                </a>
                .
              </p>
              <p className="text-muted-foreground mt-5 text-sm">
                <Link
                  href="/"
                  className="text-primary inline-flex items-center font-medium transition-opacity hover:opacity-80"
                >
                  ← Volver al inicio
                </Link>
              </p>
            </m.footer>
          </div>
        </div>
        </Container>
      </div>
    </PageContainer>
  );
}
