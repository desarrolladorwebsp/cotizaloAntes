import { type ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

const Textarea = forwardRef<HTMLTextAreaElement, ComponentProps<"textarea">>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "border-input bg-surface text-foreground placeholder:text-muted-foreground",
          "flex min-h-28 w-full resize-y rounded-lg border px-4 py-3 text-sm shadow-xs",
          "transition-colors duration-200",
          "focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

Textarea.displayName = "Textarea";

export { Textarea };
