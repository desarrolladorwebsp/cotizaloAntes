import type { Variants } from "motion/react";

import { MOTION_CONFIG } from "../config";

const { duration, ease, distance } = MOTION_CONFIG;

export const pageTransition: Variants = {
  hidden: {
    opacity: 0,
    y: distance.sm,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: ease.out,
      when: "beforeChildren",
      staggerChildren: MOTION_CONFIG.stagger.container,
    },
  },
  exit: {
    opacity: 0,
    y: -distance.sm,
    transition: {
      duration: duration.fast,
      ease: ease.inOut,
    },
  },
};
