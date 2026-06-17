export const typography = {
  fontFamily: {
    sans: 'var(--font-inter), ui-sans-serif, system-ui, -apple-system, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
  },
  fontSize: {
    xs: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.01em" }],
    sm: ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.005em" }],
    base: ["1rem", { lineHeight: "1.5rem", letterSpacing: "0" }],
    lg: ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "-0.01em" }],
    xl: ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "-0.015em" }],
    "2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "-0.02em" }],
    "3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "-0.025em" }],
    "4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "-0.03em" }],
    "5xl": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.035em" }],
  },
  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
} as const;

export type Typography = typeof typography;
