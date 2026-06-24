import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type MobileStackProps = HTMLAttributes<HTMLDivElement>;

/** Vertical rhythm stack optimized for thumb reach on mobile. */
export function MobileStack({ className, children, ...props }: MobileStackProps) {
  return (
    <div className={cn("mobile-stack sm:gap-6", className)} {...props}>
      {children}
    </div>
  );
}
