import type { Variants } from "motion/react";

import { MOTION_CONFIG } from "../config";

const { float } = MOTION_CONFIG;

export const floatingAnimation: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-float.distance * 2, float.distance * 2, -float.distance * 2],
    rotate: [-1.5, 1.5, -1.5],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const breathingAnimation: Variants = {
  animate: {
    scale: [1, 1.04, 1],
    transition: {
      duration: 3.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const glowPulse: Variants = {
  animate: {
    opacity: [0.35, 0.65, 0.35],
    scale: [0.95, 1.08, 0.95],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const shimmerEffect =
  "animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%]" as const;

export const shimmerVariants: Variants = {
  initial: { backgroundPosition: "200% 0" },
  animate: {
    backgroundPosition: "-200% 0",
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
};
