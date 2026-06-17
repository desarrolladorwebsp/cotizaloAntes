"use client";

import { AnimatePresence,m } from "motion/react";

import { FooterColumn } from "@/components/layout/footer/footer-column";
import { useEconomicIndicators } from "@/hooks/use-economic-indicators";
import { formatChileanCurrency, formatIndicatorDate } from "@/lib/indicators";
import { baseTransition } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

const indicators = [
  { key: "uf" as const, label: "UF" },
  { key: "utm" as const, label: "UTM" },
  { key: "dolar" as const, label: "Dólar" },
];

function IndicatorValue({ value, isLoading }: { value: number | null; isLoading: boolean }) {
  if (isLoading) {
    return <span className="text-footer-muted text-sm">Cargando…</span>;
  }

  if (value === null) {
    return <span className="text-footer-muted text-sm">No disponible</span>;
  }

  return (
    <AnimatePresence mode="wait">
      <m.span
        key={value}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -4 }}
        transition={baseTransition("fast")}
        className="text-footer-foreground text-lg font-semibold tracking-tight"
      >
        {formatChileanCurrency(value)}
      </m.span>
    </AnimatePresence>
  );
}

export function FooterIndicators() {
  const { data, isLoading, isFetching } = useEconomicIndicators();

  return (
    <FooterColumn title="Indicadores económicos">
      <ul className="flex flex-col gap-3" role="list" aria-live="polite" aria-busy={isFetching}>
        {indicators.map((indicator) => (
          <li
            key={indicator.key}
            className={cn(
              "rounded-xl border border-white/[0.08] bg-white/[0.03] px-3.5 py-3",
              "transition-colors duration-300 hover:border-primary/25 hover:bg-primary/[0.04]",
            )}
          >
            <p className="text-footer-muted text-xs font-medium tracking-wide uppercase">
              {indicator.label}
            </p>
            <IndicatorValue value={data?.[indicator.key] ?? null} isLoading={isLoading} />
          </li>
        ))}
      </ul>
      <p className="text-footer-muted/80 text-xs leading-relaxed">
        {data?.updatedAt
          ? `Actualizado: ${formatIndicatorDate(data.updatedAt)}`
          : "Actualización automática cada 10 min"}
      </p>
    </FooterColumn>
  );
}
