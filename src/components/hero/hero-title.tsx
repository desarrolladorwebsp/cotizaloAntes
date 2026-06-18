"use client";

import { m } from "motion/react";

import { heroConfig } from "@/constants/hero";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type HeroTitleProps = {
  className?: string;
};

export function HeroTitle({ className }: HeroTitleProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { prefix, highlight } = heroConfig.title;

  return (
    <m.div
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
      className={cn("relative z-10 w-full", className)}
    >
      <h1
        id="hero-title"
        className={cn(
          "hero-title font-extrabold tracking-tight text-balance antialiased",
          "text-center md:text-left",
          "text-[clamp(1.75rem,6.8vw,2.5rem)] leading-[1.1]",
          "md:max-w-[min(95%,58rem)] md:text-[clamp(3.25rem,7.2vw,6.25rem)] md:leading-[1.02]",
          "hero-title-shadow",
        )}
      >
        <span className="text-white">{prefix}</span>
        <br className="md:hidden" aria-hidden />
        <span className="hero-title-highlight md:mt-1.5 md:text-[1.04em]">{highlight}</span>
      </h1>
    </m.div>
  );
}
