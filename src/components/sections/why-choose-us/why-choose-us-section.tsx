"use client";

import { m, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { WhyChooseUsVideo } from "@/components/sections/why-choose-us/why-choose-us-video";
import { BenefitCard } from "@/components/sections/why-choose-us/benefit-card";
import { WhyChooseUsBackground } from "@/components/sections/why-choose-us/why-choose-us-background";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { whyChooseUsConfig } from "@/constants/why-choose-us";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { hoverLift, staggerChildren, staggerContainer } from "@/lib/motion";
import { baseTransition } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const prefersReducedMotion = usePrefersReducedMotion();

  const { title, subtitle, benefits, cta } = whyChooseUsConfig;

  return (
    <section
      ref={sectionRef}
      id="por-que-elegirnos"
      aria-labelledby="why-choose-us-title"
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-28"
    >
      <WhyChooseUsBackground isInView={isInView} />

      <Container size="2xl" padding="default" className="relative z-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="order-1 flex justify-center lg:order-1 lg:justify-start">
            <WhyChooseUsVideo />
          </div>

          <m.div
            className="order-2 flex flex-col gap-3 sm:gap-4 lg:order-2"
            variants={staggerContainer}
            initial={false}
            animate={isInView && !prefersReducedMotion ? "visible" : false}
          >
            <m.header variants={staggerChildren} transition={baseTransition("slow")} className="mb-5 space-y-3 sm:mb-7">
              <h2
                id="why-choose-us-title"
                className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.5rem] lg:leading-tight"
              >
                {title}
              </h2>
              <p className="text-muted-foreground max-w-xl text-base leading-relaxed sm:text-lg">
                {subtitle}
              </p>
            </m.header>

            {benefits.map((benefit, index) => (
              <BenefitCard
                key={benefit.number}
                number={benefit.number}
                title={benefit.title}
                description={benefit.description}
                index={index}
              />
            ))}

            <m.div
              variants={staggerChildren}
              transition={{ ...baseTransition("slow"), delay: prefersReducedMotion ? 0 : 0.5 }}
              className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center"
            >
              <m.div className="w-full sm:w-auto" {...(prefersReducedMotion ? {} : hoverLift)}>
                <Link
                  href={cta.primary.href}
                  className={buttonVariants({
                    variant: "premium",
                    size: "lg",
                    className: "h-12 w-full px-8 text-base sm:w-auto",
                  })}
                >
                  {cta.primary.label}
                </Link>
              </m.div>

              <m.div className="w-full sm:w-auto" {...(prefersReducedMotion ? {} : hoverLift)}>
                <Link
                  href={cta.secondary.href}
                  className={buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className: cn(
                      "h-12 w-full px-8 text-base sm:w-auto",
                      "hover:border-primary/40 hover:shadow-glow",
                    ),
                  })}
                >
                  {cta.secondary.label}
                </Link>
              </m.div>
            </m.div>
          </m.div>
        </div>
      </Container>
    </section>
  );
}
