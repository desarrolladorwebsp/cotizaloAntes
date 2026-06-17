import type { Variants } from "motion/react";

import { MOTION_CONFIG } from "../config";
import { baseTransition } from "../transitions";

const { stagger, distance } = MOTION_CONFIG;

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger.children,
      delayChildren: stagger.delayChildren,
    },
  },
};

export const staggerChildren: Variants = {
  hidden: { opacity: 0, y: distance.sm },
  visible: {
    opacity: 1,
    y: 0,
    transition: baseTransition("normal"),
  },
};

/** @deprecated Use staggerChildren */
export const staggerItem = staggerChildren;
