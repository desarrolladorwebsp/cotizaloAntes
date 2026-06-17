"use client";

import { m } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

export function TypingIndicator({ className }: { className?: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-2xl rounded-bl-md bg-white px-3 py-2.5 shadow-sm",
        className,
      )}
      aria-label="Escribiendo mensaje"
    >
      {[0, 1, 2].map((dot) => (
        <m.span
          key={dot}
          className="bg-primary/70 h-1.5 w-1.5 rounded-full"
          animate={prefersReducedMotion ? undefined : { opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
          transition={{
            duration: 0.9,
            repeat: Infinity,
            delay: dot * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function ChatBubble({
  children,
  align = "left",
  className,
}: {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-[85%] rounded-2xl px-3 py-2 text-[11px] leading-snug shadow-sm sm:text-xs",
        align === "left"
          ? "rounded-bl-md bg-white text-foreground"
          : "bg-[#DCF8C6] ml-auto rounded-br-md text-foreground",
        className,
      )}
    >
      {children}
    </div>
  );
}
