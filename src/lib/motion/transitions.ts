import type { Transition } from "motion/react";

import { MOTION_CONFIG } from "./config";

const { duration, ease } = MOTION_CONFIG;

export const baseTransition = (speed: keyof typeof duration = "normal"): Transition => ({
  duration: duration[speed],
  ease: ease.out,
});

export const motionTransition = {
  fast: baseTransition("fast"),
  normal: baseTransition("normal"),
  slow: baseTransition("slow"),
  slower: baseTransition("slower"),
} as const;

export const motionSpring = {
  type: "spring" as const,
  stiffness: 400,
  damping: 32,
  mass: 0.8,
};

export const reducedMotionConfig = {
  transition: { duration: 0 },
} as const;
