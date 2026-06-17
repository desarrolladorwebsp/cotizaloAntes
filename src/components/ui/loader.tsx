import { Loader2 } from "lucide-react";
import { type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type LoaderSize = "sm" | "md" | "lg";

const sizeStyles = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
} as const;

export interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
  size?: LoaderSize;
  label?: string;
}

function Loader({ size = "md", label = "Cargando", className, ...props }: LoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      className={cn("inline-flex items-center justify-center", className)}
      {...props}
    >
      <Loader2 className={cn("text-primary animate-spin", sizeStyles[size])} />
      <span className="sr-only">{label}</span>
    </div>
  );
}

function PageLoader({ label = "Cargando" }: { label?: string }) {
  return (
    <div className="flex min-h-40 flex-1 items-center justify-center">
      <Loader size="lg" label={label} />
    </div>
  );
}

export { Loader, PageLoader };
