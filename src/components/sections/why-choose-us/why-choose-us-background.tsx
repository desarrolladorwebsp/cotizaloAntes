"use client";

import { m } from "motion/react";

import { useIsMobile, usePrefersReducedMotion } from "@/hooks/use-media-query";

const PARTICLE_COUNT_DESKTOP = 14;
const PARTICLE_COUNT_MOBILE = 8;

function createParticles(count: number) {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    left: `${8 + ((index * 17) % 84)}%`,
    top: `${6 + ((index * 23) % 88)}%`,
    size: 2 + (index % 3),
    delay: index * 0.4,
    duration: 4 + (index % 3),
  }));
}

export function WhyChooseUsBackground({ isInView }: { isInView: boolean }) {
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const particles = createParticles(isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/[0.04]" />

      <m.div
        className="bg-primary/10 absolute -top-32 left-1/4 h-72 w-72 rounded-full blur-3xl"
        animate={
          isInView && !prefersReducedMotion
            ? { opacity: [0.3, 0.5, 0.3], x: [0, 20, 0] }
            : { opacity: 0.3 }
        }
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <m.div
        className="absolute -right-20 -bottom-32 h-80 w-80 rounded-full bg-[#1A1A1A]/[0.04] blur-3xl"
        animate={
          isInView && !prefersReducedMotion
            ? { opacity: [0.2, 0.4, 0.2], y: [0, -16, 0] }
            : { opacity: 0.2 }
        }
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.18]" preserveAspectRatio="none" aria-hidden>
        <line x1="0%" y1="30%" x2="100%" y2="45%" stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1="0%" y1="70%" x2="100%" y2="55%" stroke="url(#lineGrad)" strokeWidth="1" />
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F58220" stopOpacity="0" />
            <stop offset="50%" stopColor="#F58220" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F58220" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {isInView && !prefersReducedMotion
        ? particles.map((particle) => (
            <m.span
              key={particle.id}
              className="bg-primary/30 absolute rounded-full"
              style={{
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
              }}
              animate={{
                opacity: [0.15, 0.55, 0.15],
                y: [0, -12, 0],
              }}
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
