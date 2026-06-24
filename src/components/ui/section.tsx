import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const sectionVariants = cva("contain-layout-x w-full", {
  variants: {
    spacing: {
      none: "",
      sm: "mobile-section-y md:py-16",
      md: "py-10 sm:py-16 md:py-24",
      lg: "py-12 sm:py-20 md:py-32",
      xl: "py-14 sm:py-24 md:py-40",
    },
    background: {
      default: "bg-background",
      surface: "bg-surface",
      muted: "bg-muted/50",
      transparent: "bg-transparent",
    },
  },
  defaultVariants: {
    spacing: "md",
    background: "default",
  },
});

export interface SectionProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof sectionVariants> {
  as?: "section" | "div";
}

function Section({
  className,
  spacing,
  background,
  as: Component = "section",
  ...props
}: SectionProps) {
  return <Component className={cn(sectionVariants({ spacing, background }), className)} {...props} />;
}

export { Section, sectionVariants };
