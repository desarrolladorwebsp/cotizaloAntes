"use client";

import { m, useInView } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { whyChooseUsConfig } from "@/constants/why-choose-us";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import {
  breathingAnimation,
  floatingAnimation,
  glowPulse,
  slideLeft,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

const { robot } = whyChooseUsConfig;

export function AiRobotVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <m.div
      ref={ref}
      className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none"
      variants={slideLeft}
      initial={false}
      animate={isInView && !prefersReducedMotion ? "visible" : "visible"}
    >
      <m.div
        className="bg-primary/20 absolute h-56 w-56 rounded-full blur-3xl sm:h-72 sm:w-72"
        variants={glowPulse}
        initial="animate"
        animate={isInView && !prefersReducedMotion ? "animate" : false}
      />

      <m.div
        className="relative"
        variants={floatingAnimation}
        initial="initial"
        animate={isInView && !prefersReducedMotion ? "animate" : false}
      >
        <m.div
          variants={breathingAnimation}
          initial="animate"
          animate={isInView && !prefersReducedMotion ? "animate" : false}
        >
          <Image
            src={robot.src}
            alt={robot.alt}
            width={robot.width}
            height={robot.height}
            className={cn(
              "relative z-10 h-auto w-full max-w-[280px] sm:max-w-[340px] lg:max-w-[400px]",
              "drop-shadow-[0_24px_48px_rgba(245,130,32,0.15)]",
            )}
            priority={false}
          />
        </m.div>
      </m.div>
    </m.div>
  );
}
