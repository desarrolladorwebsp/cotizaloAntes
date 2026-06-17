"use client";

import { type HTMLMotionProps,m } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

export interface AnimatedSectionProps extends HTMLMotionProps<"section"> {
  stagger?: boolean;
}

export function AnimatedSection({
  className,
  children,
  stagger = false,
  ...props
}: AnimatedSectionProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <m.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-48px" }}
      variants={stagger ? staggerContainer : fadeUp}
      transition={prefersReducedMotion ? reducedMotionConfig.transition : undefined}
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </m.section>
  );
}
