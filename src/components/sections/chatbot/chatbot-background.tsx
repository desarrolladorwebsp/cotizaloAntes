"use client";

import { m } from "motion/react";

import { useIsMobile, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const PARTICLE_COUNT = 10;

function createParticles(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${6 + ((index * 19) % 88)}%`,
    top: `${8 + ((index * 27) % 82)}%`,
    size: 2 + (index % 2),
    delay: index * 0.35,
    duration: 5 + (index % 2),
  }));
}

export function ChatbotBackground({ isInView }: { isInView: boolean }) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const particles = createParticles(isMobile ? 6 : PARTICLE_COUNT);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/[0.03]" />
      <div className="bg-primary/6 absolute top-0 left-1/2 h-96 w-[36rem] -translate-x-1/2 rounded-full blur-3xl" />
      <div className="absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#1A1A1A]/[0.03] blur-3xl" />

      {isInView && !prefersReducedMotion
        ? particles.map((particle) => (
            <m.span
              key={particle.id}
              className="bg-primary/25 absolute rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
              }}
              animate={{ opacity: [0.1, 0.45, 0.1], y: [0, -10, 0] }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
              }}
            />
          ))
        : null}
    </div>
  );
}

export function ProcessConnector({ className }: { className?: string }) {
  return (
    <div className={cn("hidden items-center justify-center lg:flex", className)} aria-hidden>
      <div className="via-primary/40 h-px w-full max-w-16 bg-gradient-to-r from-transparent to-transparent" />
    </div>
  );
}
