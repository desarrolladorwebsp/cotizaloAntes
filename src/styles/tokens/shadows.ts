export const shadows = {
  none: "none",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.04)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.06)",
  glow: "0 0 0 1px rgb(245 130 32 / 0.12), 0 4px 24px -4px rgb(245 130 32 / 0.16)",
  glass: "0 8px 32px 0 rgb(0 0 0 / 0.06)",
} as const;

export type Shadows = typeof shadows;
