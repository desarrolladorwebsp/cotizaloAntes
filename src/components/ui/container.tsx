import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const containerVariants = cva("mx-auto w-full", {
  variants: {
    size: {
      sm: "max-w-screen-sm",
      md: "max-w-screen-md",
      lg: "max-w-screen-lg",
      xl: "max-w-screen-xl",
      "2xl": "max-w-screen-2xl",
      full: "max-w-full",
    },
    padding: {
      none: "",
      default: "px-4 sm:px-6 lg:px-8",
      tight: "px-4",
      wide: "px-4 sm:px-8 lg:px-12",
    },
  },
  defaultVariants: {
    size: "xl",
    padding: "default",
  },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

function Container({ className, size, padding, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size, padding }), className)} {...props} />;
}

export { Container, containerVariants };
