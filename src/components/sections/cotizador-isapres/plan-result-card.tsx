import { FileText } from "lucide-react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { CotizadorPlan } from "@/constants/cotizador-isapres";
import { getIsapreLogo } from "@/constants/isapre-logos";
import { cn } from "@/lib/utils";

function CoverageBlock({
  label,
  percentage,
  items,
  accentClass,
  barClass,
}: {
  label: string;
  percentage: number;
  items: readonly string[];
  accentClass: string;
  barClass: string;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className={cn("text-[10px] font-bold tracking-wide uppercase", accentClass)}>{label}</p>
        <span className="text-muted-foreground text-xs font-semibold">{percentage}%</span>
      </div>
      <div className="bg-muted h-1.5 overflow-hidden rounded-full">
        <div className={cn("h-full rounded-full", barClass)} style={{ width: `${percentage}%` }} />
      </div>
      <ul className="text-muted-foreground space-y-0.5 text-xs leading-relaxed">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export function PlanResultCard({
  plan,
  onSolicitar,
}: {
  plan: CotizadorPlan;
  onSolicitar?: (plan: CotizadorPlan) => void;
}) {
  const logoSrc = getIsapreLogo(plan.provider);

  return (
    <article className="rounded-2xl border border-border/70 bg-surface p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          {logoSrc ? (
            <div className="border-border/60 bg-background flex h-12 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border px-2 py-1.5 sm:w-28">
              <Image
                src={logoSrc}
                alt={`Logo ${plan.provider}`}
                width={112}
                height={48}
                className="h-full w-full object-contain object-center"
              />
            </div>
          ) : (
            <div className="bg-destructive/10 text-destructive flex h-12 w-24 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold sm:w-28">
              {plan.provider.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div className="min-w-0 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-foreground text-sm font-semibold sm:text-base">{plan.code}</h3>
              <span className="text-muted-foreground text-xs">{plan.provider}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {plan.tags.map((tag) => (
                <span
                  key={tag}
                  className="border-border text-muted-foreground rounded-md border bg-background px-2 py-0.5 text-[10px] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
          <div className="text-right">
            <p className="text-muted-foreground text-[10px] font-medium uppercase">Desde UF {plan.priceUf}</p>
            <p className="text-foreground text-lg font-bold sm:text-xl">Desde {plan.priceClp}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" className="h-9 gap-1.5 px-3 text-xs">
              <FileText className="h-3.5 w-3.5" aria-hidden />
              PDF
            </Button>
            <Button
              type="button"
              size="sm"
              className="h-9 px-4 text-xs font-semibold"
              onClick={() => onSolicitar?.(plan)}
            >
              Solicitar
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 border-t border-border/60 pt-4 sm:grid-cols-2">
        <CoverageBlock
          label="Cobertura hospitalaria"
          percentage={plan.hospitalCoverage}
          items={plan.hospitals}
          accentClass="text-primary"
          barClass="bg-primary"
        />
        <CoverageBlock
          label="Cobertura ambulatoria"
          percentage={plan.ambulatoryCoverage}
          items={plan.centers}
          accentClass="text-[#2f8f8c]"
          barClass="bg-[#5caaa8]"
        />
      </div>
    </article>
  );
}
