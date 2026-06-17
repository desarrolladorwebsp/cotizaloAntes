"use client";

import { type HTMLMotionProps,m } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { reducedMotionConfig } from "@/lib/motion/transitions";
import { fadeIn, fadeUp } from "@/lib/motion/variants/fade";
import { staggerChildren, staggerContainer } from "@/lib/motion/variants/stagger";
import { cn } from "@/lib/utils";

type MotionViewProps = HTMLMotionProps<"div"> & {
  variant?: "fade" | "fadeUp" | "stagger" | "staggerItem";
};

const variantMap = {
  fade: fadeIn,
  fadeUp,
  stagger: staggerContainer,
  staggerItem: staggerChildren,
} as const;

export function MotionView({
  variant = "fadeUp",
  className,
  children,
  ...props
}: MotionViewProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={variantMap[variant]}
      transition={prefersReducedMotion ? reducedMotionConfig.transition : undefined}
      className={cn(className)}
      {...props}
    >
      {children}
    </m.div>
  );
}
