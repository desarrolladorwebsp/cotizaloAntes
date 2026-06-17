import type { Transition, Variants } from "motion/react";

import { MOTION_CONFIG } from "../config";

const { duration, ease, distance } = MOTION_CONFIG;

const baseTransition = (speed: keyof typeof duration = "normal"): Transition => ({
  duration: duration[speed],
  ease: ease.out,
});

const exitTransition = (): Transition => ({
  duration: duration.fast,
  ease: ease.inOut,
});

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: baseTransition("normal"),
  },
  exit: {
    opacity: 0,
    transition: exitTransition(),
  },
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition("normal"),
  },
  exit: {
    opacity: 0,
    y: distance.sm,
    transition: exitTransition(),
  },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -distance.md },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition("normal"),
  },
  exit: {
    opacity: 0,
    y: -distance.sm,
    transition: exitTransition(),
  },
};

/** @deprecated Use fadeUp */
export const fadeInUp = fadeUp;

/** @deprecated Use fadeDown */
export const fadeInDown = fadeDown;
