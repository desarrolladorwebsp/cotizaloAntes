"use client";

import { m } from "motion/react";
import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { heroConfig } from "@/constants/hero";
import { cn } from "@/lib/utils";

type HeroCtaButtonProps = {
  layoutId?: string;
  className?: string;
};

export function HeroCtaButton({ layoutId, className }: HeroCtaButtonProps) {
  const link = (
    <Link
      href={heroConfig.cta.href}
      className={buttonVariants({
        variant: "premium",
        size: "lg",
        className: cn(
          "h-12 min-w-[220px] px-8 text-base font-semibold shadow-lg sm:min-w-[240px]",
          className,
        ),
      })}
    >
      {heroConfig.cta.label}
    </Link>
  );

  if (layoutId) {
    return <m.div layoutId={layoutId}>{link}</m.div>;
  }

  return link;
}
