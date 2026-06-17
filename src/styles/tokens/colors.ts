export const colors = {
  primary: {
    DEFAULT: "#F58220",
    foreground: "#FFFFFF",
    hover: "#E07418",
    muted: "#FEF3E8",
  },
  secondary: {
    DEFAULT: "#1A1A1A",
    foreground: "#FFFFFF",
  },
  background: "#F8F8F8",
  foreground: "#1A1A1A",
  surface: {
    DEFAULT: "#FFFFFF",
    foreground: "#1A1A1A",
  },
  border: {
    DEFAULT: "#E5E5E5",
    strong: "#D4D4D4",
  },
  muted: {
    DEFAULT: "#737373",
    foreground: "#A3A3A3",
  },
  success: {
    DEFAULT: "#16A34A",
    foreground: "#FFFFFF",
    muted: "#F0FDF4",
  },
  error: {
    DEFAULT: "#DC2626",
    foreground: "#FFFFFF",
    muted: "#FEF2F2",
  },
  warning: {
    DEFAULT: "#F59E0B",
    foreground: "#FFFFFF",
    muted: "#FFFBEB",
  },
  glass: {
    background: "rgba(255, 255, 255, 0.72)",
    border: "rgba(255, 255, 255, 0.24)",
  },
  gradient: {
    primary: "linear-gradient(135deg, #F58220 0%, #FF9A4D 100%)",
    subtle: "linear-gradient(180deg, #FFFFFF 0%, #F8F8F8 100%)",
    dark: "linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 100%)",
  },
} as const;

export type Colors = typeof colors;
