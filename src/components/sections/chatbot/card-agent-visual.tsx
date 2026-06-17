"use client";

import { CheckCircle2, User } from "lucide-react";
import { m } from "motion/react";

import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const agents = [
  { name: "Camila R.", role: "Ejecutiva Isapres" },
  { name: "Diego M.", role: "Asesor Seguros" },
];

export function CardAgentVisual({ isActive }: { isActive: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative flex h-44 flex-col items-center justify-center gap-3 sm:h-48">
      <div className="flex -space-x-3">
        {agents.map((agent, index) => (
          <m.div
            key={agent.name}
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: prefersReducedMotion ? 0 : 0.15 * index }}
            className={cn(
              "border-surface relative flex h-14 w-14 flex-col items-center justify-center rounded-2xl border-2 bg-gradient-to-br from-[#F8F8F8] to-[#E5E5E5] shadow-md",
              index === 1 && "z-10 scale-105",
            )}
          >
            <User className="text-muted-foreground h-6 w-6" aria-hidden />
          </m.div>
        ))}
      </div>

      <m.div
        initial={false}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
        className="rounded-xl border border-border/60 bg-surface/80 px-4 py-2.5 text-center shadow-sm backdrop-blur-sm"
      >
        <p className="text-foreground text-xs font-semibold">Atención personalizada</p>
        <p className="text-muted-foreground mt-0.5 text-[10px]">Expertos listos para ayudarte</p>
      </m.div>

      <m.div
        initial={false}
        animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.5 }}
        className="text-success flex items-center gap-1.5 text-[10px] font-medium"
      >
        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
        Cotización optimizada
      </m.div>
    </div>
  );
}
