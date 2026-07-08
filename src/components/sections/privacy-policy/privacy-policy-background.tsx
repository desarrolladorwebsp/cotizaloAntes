"use client";

import { m } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";

interface PrivacyPolicyBackgroundProps {
  isInView: boolean;
}

export function PrivacyPolicyBackground({ isInView }: PrivacyPolicyBackgroundProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-[#fafafa] via-background to-background" />
      <m.div
        className="bg-primary/6 absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl sm:h-96 sm:w-96"
        initial={false}
        animate={
          isInView && !prefersReducedMotion
            ? { opacity: 1, scale: 1 }
            : { opacity: 0.6, scale: 0.95 }
        }
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
      <m.div
        className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-[#0e7c9c]/5 blur-3xl"
        initial={false}
        animate={
          isInView && !prefersReducedMotion
            ? { opacity: 1, x: 0 }
            : { opacity: 0.5, x: -12 }
        }
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      />
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
