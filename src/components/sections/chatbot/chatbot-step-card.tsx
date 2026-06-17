"use client";

import { m } from "motion/react";
import { type ReactNode } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { baseTransition } from "@/lib/motion/transitions";
import { hoverLift } from "@/lib/motion/variants/hover";
import { staggerChildren } from "@/lib/motion/variants/stagger";
import { cn } from "@/lib/utils";

export interface ChatbotStepCardProps {
  step: number;
  title: string;
  description: string;
  visual: ReactNode;
  isActive: boolean;
  className?: string;
}

export function ChatbotStepCard({
  step,
  title,
  description,
  visual,
  isActive,
  className,
}: ChatbotStepCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <m.article
      variants={staggerChildren}
      whileHover={prefersReducedMotion ? undefined : hoverLift.whileHover}
      whileTap={prefersReducedMotion ? undefined : hoverLift.whileTap}
      transition={baseTransition("fast")}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-surface/80 p-5 shadow-sm backdrop-blur-sm sm:rounded-3xl sm:p-6",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-primary/25 hover:shadow-glow",
        className,
      )}
    >
      <div className="from-primary/5 pointer-events-none absolute inset-0 bg-gradient-to-br to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="relative mb-4 flex items-center justify-between">
        <span
          className={cn(
            "bg-primary/10 text-primary inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold",
            "transition-transform duration-300 group-hover:scale-105",
          )}
          aria-hidden
        >
          {step}
        </span>
        <span className="text-muted-foreground text-[10px] font-medium tracking-widest uppercase">
          Paso {step}
        </span>
      </div>

      <div className="relative mb-5 min-h-[11rem] sm:min-h-[12rem]">{visual}</div>

      <div className="relative mt-auto space-y-2">
        <h3 className="text-foreground text-lg font-semibold tracking-tight transition-colors duration-300 group-hover:text-primary sm:text-xl">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>

      <span className="sr-only">{isActive ? "Paso activo en animación" : ""}</span>
    </m.article>
  );
}
