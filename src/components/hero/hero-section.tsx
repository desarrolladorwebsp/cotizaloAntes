"use client";

import { m } from "motion/react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { heroConfig } from "@/constants/hero";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { hoverLift, staggerChildren, staggerContainer } from "@/lib/motion";
import { baseTransition, reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

import { HeroVideoPlayer } from "./hero-video-player";

export function HeroSection() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const childTransition = prefersReducedMotion
    ? reducedMotionConfig.transition
    : baseTransition("slow");

  return (
    <section
      aria-labelledby="hero-title"
      className={cn(
        "flex flex-1 w-full flex-col justify-center",
        "safe-area-top safe-area-bottom",
        "py-8 sm:py-10 md:py-12",
      )}
    >
      <Container size="2xl" padding="default">
        <m.div
          className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 sm:gap-8 md:gap-10"
          variants={staggerContainer}
          initial={false}
          animate={prefersReducedMotion ? false : "visible"}
        >
          <m.h1
            id="hero-title"
            variants={staggerChildren}
            transition={childTransition}
            className={cn(
              "text-foreground text-center text-balance",
              "text-[1.625rem] leading-tight font-semibold tracking-tight",
              "sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]",
            )}
          >
            {heroConfig.title}
          </m.h1>

          <m.div variants={staggerChildren} transition={childTransition} className="w-full">
            <HeroVideoPlayer />
          </m.div>

          <m.div
            variants={staggerChildren}
            transition={childTransition}
            className="w-full sm:w-auto"
            {...(prefersReducedMotion ? {} : hoverLift)}
          >
            <Link
              href={heroConfig.cta.href}
              className={buttonVariants({
                variant: "premium",
                size: "lg",
                className: "h-12 w-full min-w-[220px] px-8 text-base sm:w-auto",
              })}
            >
              {heroConfig.cta.label}
            </Link>
          </m.div>
        </m.div>
      </Container>
    </section>
  );
}
