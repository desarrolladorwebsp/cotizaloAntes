"use client";

import { m } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { staggerChildren } from "@/lib/motion";
import { baseTransition, reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

export interface BenefitCardProps {
  number: string;
  title: string;
  description: string;
  index: number;
}

export function BenefitCard({ number, title, description, index }: BenefitCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <m.article
      variants={staggerChildren}
      transition={{
        ...(prefersReducedMotion ? reducedMotionConfig.transition : baseTransition("normal")),
        delay: prefersReducedMotion ? 0 : 0.1 * (index + 1),
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -4,
              scale: 1.02,
              transition: baseTransition("fast"),
            }
      }
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/30 p-5 sm:p-6",
        "bg-white/55 shadow-sm backdrop-blur-xl",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-primary/35 hover:shadow-glow",
      )}
    >
      <div className="from-primary/5 absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative flex gap-4 sm:gap-5">
        <m.span
          className={cn(
            "text-primary/80 shrink-0 text-2xl font-semibold tracking-tight sm:text-3xl",
            "transition-colors duration-300 group-hover:text-primary",
          )}
          whileHover={
            prefersReducedMotion
              ? undefined
              : { rotate: 4, scale: 1.08, transition: baseTransition("fast") }
          }
        >
          {number}
        </m.span>

        <div className="min-w-0 flex-1">
          <h3
            className={cn(
              "text-foreground text-base font-semibold tracking-tight sm:text-lg",
              "transition-colors duration-300 group-hover:text-primary",
            )}
          >
            {title}
          </h3>
          <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed sm:text-[0.9375rem]">
            {description}
          </p>
        </div>
      </div>
    </m.article>
  );
}
