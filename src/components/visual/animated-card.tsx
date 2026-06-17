"use client";

import { type HTMLMotionProps,m } from "motion/react";
import { type ComponentProps } from "react";

import { Card } from "@/components/ui/card";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { fadeUp, hoverLift } from "@/lib/motion";
import { reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

export interface AnimatedCardProps extends ComponentProps<typeof Card> {
  motionProps?: HTMLMotionProps<"div">;
  enableHover?: boolean;
}

export function AnimatedCard({
  className,
  children,
  motionProps,
  enableHover = true,
  ...props
}: AnimatedCardProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <m.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-32px" }}
      variants={fadeUp}
      transition={prefersReducedMotion ? reducedMotionConfig.transition : undefined}
      {...(enableHover && !prefersReducedMotion ? hoverLift : {})}
      {...motionProps}
    >
      <Card className={cn("h-full", className)} {...props}>
        {children}
      </Card>
    </m.div>
  );
}
