import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type PageContainerProps = HTMLAttributes<HTMLDivElement>;

export function PageContainer({ className, children, ...props }: PageContainerProps) {
  return (
    <div
      className={cn(
        "safe-area-padding flex min-h-dvh-screen w-full flex-col overflow-x-hidden",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
