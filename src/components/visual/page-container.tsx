import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type PageContainerProps = HTMLAttributes<HTMLDivElement>;

export function PageContainer({ className, children, ...props }: PageContainerProps) {
  return (
    <div
      className={cn(
        "contain-layout-x safe-area-padding flex min-h-0 w-full max-w-full flex-col overflow-x-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
