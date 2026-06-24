import { FileText, MessageCircle } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { CoverageColumnCompact } from "@/components/sections/cotizador-isapres/coverage-column-compact";
import { cotizadorUi } from "@/constants/cotizador-ui";
import { getIsapreLogo } from "@/constants/isapre-logos";
import { cn } from "@/lib/utils";
import type { CotizadorPlan } from "@/types/cotizador-plan";

function PlanActionButton({
  label,
  variant,
  icon,
  onClick,
  disabled = false,
}: {
  label: string;
  variant: "primary" | "secondary";
  icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  const isPrimary = variant === "primary";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        cotizadorUi.planActionBase,
        isPrimary ? cotizadorUi.planActionPrimary : cotizadorUi.planActionSecondary,
        disabled && "pointer-events-none cursor-not-allowed opacity-50",
      )}
    >
      <span
        className={isPrimary ? cotizadorUi.planActionIconPrimary : cotizadorUi.planActionIconSecondary}
        aria-hidden
      >
        {icon}
      </span>
      {label}
    </button>
  );
}

export function PlanResultCard({
  plan,
  onSolicitar,
  isSubmitting = false,
}: {
  plan: CotizadorPlan;
  onSolicitar?: (plan: CotizadorPlan) => void;
  isSubmitting?: boolean;
}) {
  const logoSrc = getIsapreLogo(plan.provider);
  const displayName = plan.planName || plan.code;
  const hasPdf = Boolean(plan.pdfUrl?.trim());

  return (
    <article className={cotizadorUi.planCard}>
      <div className={cotizadorUi.planCardHeader}>
        <div className="flex min-w-0 flex-1 items-start gap-2.5 sm:gap-3">
          {logoSrc ? (
            <div className="flex h-12 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--cot-border)] bg-white px-2 py-1.5 sm:w-32">
              <Image
                src={logoSrc}
                alt={`Logo ${plan.provider}`}
                width={128}
                height={48}
                className="h-full w-full object-contain object-center"
              />
            </div>
          ) : (
            <div className="flex h-12 w-28 shrink-0 items-center justify-center rounded-lg border border-[var(--cot-border)] bg-[var(--cot-surface-hover)] text-[10px] font-bold text-[var(--cot-primary-dark)] sm:w-32">
              {plan.provider.slice(0, 2).toUpperCase()}
            </div>
          )}

          <div className="min-w-0 flex-1">
            <h3 className={cotizadorUi.planProvider}>{displayName.toUpperCase()}</h3>
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className={cotizadorUi.planCodeBadge} title="Código del plan">
                {plan.code}
              </span>
              {plan.tags.map((tag) => (
                <span key={tag} className={cotizadorUi.planTagBadge}>
                  {tag}
                </span>
              ))}
              {plan.hasTop ? (
                <span className="inline-flex shrink-0 items-center rounded-lg border border-[var(--cot-primary)]/30 bg-[var(--cot-primary)] px-2.5 py-1 text-[10px] font-semibold text-[var(--cot-primary-foreground)] shadow-sm sm:text-[11px]">
                  Top
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-stretch gap-3 sm:items-end">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="text-left sm:text-right">
              <p className={cn("text-[10px] font-medium", cotizadorUi.mutedText)}>Desde</p>
              <p className="text-base font-bold tabular-nums text-[var(--cot-primary-dark)] sm:text-lg">
                UF {plan.priceUf}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className={cn("text-[10px] font-medium", cotizadorUi.mutedText)}>Desde</p>
              <p className="text-base font-bold tabular-nums text-[var(--cot-primary-dark)] sm:text-lg">
                {plan.priceClp}
                <span className="text-xs font-medium text-[var(--cot-muted)]"> /mes</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <PlanActionButton
              label="PDF"
              variant="secondary"
              icon={<FileText className="size-3.5" />}
              disabled={!hasPdf}
            />
            <PlanActionButton
              label={isSubmitting ? "Abriendo..." : "Solicitar"}
              variant="primary"
              icon={<MessageCircle className="size-3.5" />}
              disabled={isSubmitting}
              onClick={() => onSolicitar?.(plan)}
            />
          </div>
        </div>
      </div>

      <div className={cn("grid md:grid-cols-2", cotizadorUi.planCardCoverage)}>
        <CoverageColumnCompact
          label="Cobertura hospitalaria"
          entries={plan.hospitals}
          fallbackPercentages={plan.hospitalPercentages}
          tone="hospital"
        />
        <CoverageColumnCompact
          label="Cobertura ambulatoria"
          entries={plan.centers}
          fallbackPercentages={plan.ambulatoryPercentages}
          tone="ambulatory"
        />
      </div>
    </article>
  );
}
