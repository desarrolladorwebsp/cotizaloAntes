"use client";

import type { LucideIcon } from "lucide-react";
import { m } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { staggerChildren } from "@/lib/motion";
import { baseTransition, reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

type PrivacyPolicySectionData = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  list?: readonly string[];
  paragraphsAfter?: readonly string[];
};

interface PrivacyPolicySectionCardProps {
  section: PrivacyPolicySectionData;
  icon: LucideIcon;
  index: number;
}

export function PrivacyPolicySectionCard({
  section,
  icon: Icon,
  index,
}: PrivacyPolicySectionCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <m.section
      id={section.id}
      aria-labelledby={`${section.id}-title`}
      variants={staggerChildren}
      transition={{
        ...(prefersReducedMotion ? reducedMotionConfig.transition : baseTransition("normal")),
        delay: prefersReducedMotion ? 0 : 0.06 * index,
      }}
      whileHover={
        prefersReducedMotion
          ? undefined
          : {
              y: -2,
              transition: baseTransition("fast"),
            }
      }
      className={cn(
        "group scroll-mt-28 overflow-hidden rounded-2xl border border-border/80 bg-white/80 p-6 shadow-sm backdrop-blur-sm sm:p-7",
        "transition-[border-color,box-shadow] duration-300",
        "hover:border-primary/25 hover:shadow-[0_12px_40px_-20px_rgba(237,125,17,0.35)]",
      )}
    >
      <div className="from-primary/4 absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative">
        <div className="mb-4 flex items-start gap-3 sm:gap-4">
          <m.span
            className={cn(
              "bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-xl",
              "transition-colors duration-300 group-hover:bg-primary/15",
            )}
            whileHover={
              prefersReducedMotion
                ? undefined
                : { scale: 1.05, transition: baseTransition("fast") }
            }
          >
            <Icon className="size-5" aria-hidden />
          </m.span>
          <h2
            id={`${section.id}-title`}
            className="text-foreground pt-1 text-lg font-semibold tracking-tight sm:text-xl"
          >
            {section.title}
          </h2>
        </div>

        <div className="text-muted-foreground space-y-4 text-sm leading-relaxed sm:text-base">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          {section.list ? (
            <ul className="space-y-2.5">
              {section.list.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-lg border border-border/60 bg-background/60 px-3 py-2.5"
                >
                  <span
                    className="bg-primary mt-2 size-1.5 shrink-0 rounded-full"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {section.paragraphsAfter?.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </m.section>
  );
}
