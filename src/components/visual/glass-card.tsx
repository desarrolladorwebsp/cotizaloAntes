import { type ComponentProps } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type GlassCardProps = ComponentProps<typeof Card>;

export function GlassCard({ className, ...props }: GlassCardProps) {
  return (
    <Card
      className={cn(
        "glass border-white/20 bg-white/70 shadow-glass backdrop-blur-xl",
        className,
      )}
      {...props}
    />
  );
}
