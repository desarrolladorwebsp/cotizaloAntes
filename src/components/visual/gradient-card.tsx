import { type ComponentProps } from "react";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type GradientCardProps = ComponentProps<typeof Card>;

export function GradientCard({ className, children, ...props }: GradientCardProps) {
  return (
    <Card
      className={cn(
        "gradient-border relative overflow-hidden border-transparent bg-surface shadow-sm",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent",
        className,
      )}
      {...props}
    >
      <div className="relative">{children}</div>
    </Card>
  );
}
