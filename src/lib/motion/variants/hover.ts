import type { HTMLMotionProps } from "motion/react";

import { MOTION_CONFIG } from "../config";
import { baseTransition } from "../transitions";

const { scale } = MOTION_CONFIG;

export const hoverScale: Pick<HTMLMotionProps<"div">, "whileHover" | "whileTap" | "transition"> = {
  whileHover: { scale: scale.hover },
  whileTap: { scale: scale.tap },
  transition: baseTransition("fast"),
};

export const hoverLift: Pick<HTMLMotionProps<"div">, "whileHover" | "whileTap" | "transition"> = {
  whileHover: {
    y: -2,
    scale: scale.hover,
    transition: baseTransition("fast"),
  },
  whileTap: {
    y: 0,
    scale: scale.tap,
    transition: baseTransition("fast"),
  },
};
