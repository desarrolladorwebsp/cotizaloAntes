"use client";

import { m, useInView } from "motion/react";
import { useRef } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type SectionTitleProps = {
  id?: string;
  as?: "h1" | "h2";
  prefix: string;
  highlight: string;
  suffix?: string;
  eyebrow?: string;
  className?: string;
  align?: "left" | "center";
  variant?: "default" | "hero";
};

export function SectionTitle({
  id,
  as: Tag = "h2",
  prefix,
  highlight,
  suffix,
  eyebrow,
  className,
  align = "left",
  variant = "default",
}: SectionTitleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHero = variant === "hero";

  return (
    <div
      className={cn(
        "space-y-2",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-semibold tracking-[0.18em] uppercase",
            isHero ? "text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}

      <m.div
        ref={ref}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
      >
        <Tag
          id={id}
          className={cn(
            "section-title text-balance",
            isHero
              ? "text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              : "text-foreground",
          )}
        >
          {prefix}
          {prefix.endsWith(" ") || highlight.startsWith(" ") ? "" : " "}
          <span className="title-highlight">{highlight}</span>
          {suffix ? (
            <>
              {suffix.startsWith(" ") || highlight.endsWith(" ") ? "" : " "}
              {suffix}
            </>
          ) : null}
        </Tag>
      </m.div>
    </div>
  );
}
