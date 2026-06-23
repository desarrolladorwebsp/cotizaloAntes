import { formatCoveragePercentages } from "@/lib/cotizador/plan-mapper";
import { cn } from "@/lib/utils";
import type { CoverageProvider } from "@/types/cotizador-plan";

function resolveMaxPercentage(
  entries: CoverageProvider[],
  fallbackPercentages: number[],
): number {
  if (entries.length > 0) {
    return Math.max(...entries.map((entry) => entry.percentage));
  }
  if (fallbackPercentages.length > 0) {
    return Math.max(...fallbackPercentages);
  }
  return 0;
}

export function CoverageColumnCompact({
  label,
  entries,
  fallbackPercentages,
  tone,
}: {
  label: string;
  entries: CoverageProvider[];
  fallbackPercentages: number[];
  tone: "hospital" | "ambulatory";
}) {
  const isHospital = tone === "hospital";
  const maxPercentage = resolveMaxPercentage(entries, fallbackPercentages);
  const visibleEntries = entries.slice(0, 4);
  const hiddenCount = Math.max(entries.length - visibleEntries.length, 0);

  return (
    <section
      className={cn(
        "flex min-w-0 flex-1 flex-col px-3.5 py-3 sm:px-4 sm:py-3.5",
        isHospital && "border-[var(--cot-border)] md:border-r",
      )}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-lg",
              isHospital
                ? "bg-[var(--cot-primary)]/10 text-[var(--cot-primary-dark)]"
                : "bg-[var(--cot-secondary-muted)] text-[var(--cot-secondary)]",
            )}
            aria-hidden
          >
            <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth="1.8">
              {isHospital ? (
                <path
                  d="M4 10h16v10H4V10Zm8-7v7M8 14h2v4H8v-4Zm6 0h2v4h-2v-4Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              ) : (
                <path
                  d="M8 7h8M8 11h8M8 15h5M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              )}
            </svg>
          </span>
          <h4
            className={cn(
              "truncate text-[10px] font-bold uppercase tracking-[0.1em] sm:text-[11px]",
              isHospital ? "text-[var(--cot-primary-dark)]/80" : "text-[var(--cot-secondary)]",
            )}
          >
            {label}
          </h4>
        </div>
        <span
          className={cn(
            "shrink-0 rounded-md px-2 py-0.5 text-[11px] font-bold tabular-nums sm:text-xs",
            isHospital
              ? "border border-[var(--cot-primary)]/25 bg-[var(--cot-primary)]/10 text-[var(--cot-primary-dark)]"
              : "border border-[var(--cot-secondary)]/35 bg-[var(--cot-secondary-muted)] text-[var(--cot-secondary)]",
          )}
        >
          {maxPercentage > 0 ? `${maxPercentage}%` : "—"}
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200/90">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500",
            isHospital ? "bg-[var(--cot-primary)]" : "bg-[var(--cot-secondary)]",
          )}
          style={{ width: `${Math.min(Math.max(maxPercentage, 0), 100)}%` }}
        />
      </div>

      <ul className="mt-2 space-y-0.5">
        {visibleEntries.length > 0 ? (
          visibleEntries.map((entry) => (
            <li
              key={`${label}-${entry.name}-${entry.percentage}`}
              className="truncate text-[11px] leading-relaxed text-[var(--cot-foreground)]/85 sm:text-xs"
            >
              <span
                className={cn(
                  "font-bold tabular-nums",
                  isHospital ? "text-[var(--cot-primary-dark)]" : "text-[var(--cot-secondary)]",
                )}
              >
                {entry.percentage}%
              </span>{" "}
              <span>{entry.name}</span>
            </li>
          ))
        ) : fallbackPercentages.length > 0 ? (
          <li className="text-[11px] text-[var(--cot-muted)] sm:text-xs">
            Coberturas {formatCoveragePercentages(fallbackPercentages)}
          </li>
        ) : (
          <li className="text-[11px] text-[var(--cot-muted)] sm:text-xs">
            Sin prestadores cargados
          </li>
        )}
      </ul>

      {hiddenCount > 0 ? (
        <p className="mt-2 text-[11px] font-semibold text-[var(--cot-secondary)] sm:text-xs">
          +{hiddenCount} prestadores más
        </p>
      ) : null}
    </section>
  );
}
