"use client";

import { m } from "motion/react";
import Link from "next/link";
import { type ComponentProps } from "react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { baseTransition } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

type FooterLinkProps = ComponentProps<typeof Link>;

export function FooterLink({ className, children, ...props }: FooterLinkProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <m.div
      whileHover={
        prefersReducedMotion
          ? undefined
          : { x: 2, transition: baseTransition("fast") }
      }
      className="inline-flex"
    >
      <Link
        className={cn(
          "text-footer-muted text-sm transition-colors duration-200",
          "hover:text-primary focus-visible:text-primary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-footer",
          className,
        )}
        {...props}
      >
        {children}
      </Link>
    </m.div>
  );
}
