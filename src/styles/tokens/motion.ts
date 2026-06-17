export const motionTokens = {
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.4,
    slower: 0.5,
  },
  ease: {
    out: [0.16, 1, 0.3, 1] as const,
    inOut: [0.87, 0, 0.13, 1] as const,
    smooth: [0.4, 0, 0.2, 1] as const,
  },
  stagger: {
    container: 0.05,
    children: 0.06,
    delayChildren: 0.04,
  },
  distance: {
    sm: 8,
    md: 12,
    lg: 24,
  },
  scale: {
    hover: 1.02,
    tap: 0.98,
    in: 0.96,
  },
  float: {
    distance: 4,
    duration: 4,
  },
} as const;

export type MotionTokens = typeof motionTokens;
