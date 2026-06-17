import type { Transition, Variants } from "motion/react";

import { MOTION_CONFIG } from "../config";

const { duration, ease, distance } = MOTION_CONFIG;

const baseTransition = (speed: keyof typeof duration = "slow"): Transition => ({
  duration: duration[speed],
  ease: ease.out,
});

const exitTransition = (): Transition => ({
  duration: duration.normal,
  ease: ease.inOut,
});

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -distance.lg },
  visible: {
    opacity: 1,
    x: 0,
    transition: baseTransition("slow"),
  },
  exit: {
    opacity: 0,
    x: -distance.md,
    transition: exitTransition(),
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: distance.lg },
  visible: {
    opacity: 1,
    x: 0,
    transition: baseTransition("slow"),
  },
  exit: {
    opacity: 0,
    x: distance.lg,
    transition: exitTransition(),
  },
};

export const slideInBottom: Variants = {
  hidden: { opacity: 0, y: "100%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition("slow"),
  },
  exit: {
    opacity: 0,
    y: "100%",
    transition: exitTransition(),
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: MOTION_CONFIG.scale.in },
  visible: {
    opacity: 1,
    scale: 1,
    transition: baseTransition("normal"),
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    transition: exitTransition(),
  },
};

/** @deprecated Use slideRight */
export const slideInRight = slideRight;