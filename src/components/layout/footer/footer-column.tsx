import { type ComponentProps } from "react";

import { cn } from "@/lib/utils";

export function FooterColumn({
  title,
  children,
  className,
  ...props
}: ComponentProps<"div"> & { title: string }) {
  return (
    <div className={cn("flex flex-col gap-4", className)} {...props}>
      <h3 className="text-footer-foreground text-xs font-semibold tracking-[0.12em] uppercase">
        {title}
      </h3>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}
