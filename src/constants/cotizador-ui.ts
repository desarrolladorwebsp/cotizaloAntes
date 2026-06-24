/** Clases UI alineadas al cotizador virtual (cotizador.cotizaloantes.cl). */
export const cotizadorUi = {
  canvas: "bg-[var(--cot-bg-layout)] text-[var(--cot-foreground)]",
  card: "rounded-xl border border-[var(--cot-border)] bg-white shadow-[var(--cot-shadow-card)]",
  border: "border-[var(--cot-border)]",
  mutedText: "text-[var(--cot-muted)]",
  sectionEyebrow:
    "text-xs font-bold uppercase tracking-[0.14em] text-[var(--cot-primary)]",
  sectionTitle:
    "text-2xl font-bold tracking-tight text-[var(--cot-primary-dark)] sm:text-3xl",
  criteriaPanel:
    "rounded-2xl bg-[var(--cot-criteria-surface)] p-4 shadow-sm ring-1 ring-[var(--cot-criteria-ring)] sm:p-5",
  input:
    "border border-[var(--cot-border)] bg-white text-[var(--cot-foreground)] placeholder:text-[var(--cot-muted)]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--cot-primary)]/30",
  cta: "bg-[var(--cot-primary)] text-[var(--cot-primary-foreground)] transition hover:bg-[var(--cot-primary-hover)] active:scale-[0.99]",
  ctaOutline:
    "border border-[var(--cot-border)] bg-white text-[var(--cot-foreground)] transition hover:bg-[var(--cot-surface-hover)]",
  planCard:
    "overflow-hidden rounded-xl border border-[var(--cot-plan-card-border)] bg-[var(--cot-plan-card-surface)] shadow-[var(--cot-shadow-plan-card)] ring-1 ring-inset ring-[var(--cot-plan-card-ring)] transition-[box-shadow,border-color,transform] duration-200 hover:-translate-y-1 hover:border-[var(--cot-primary)] hover:shadow-[var(--cot-shadow-plan-card-hover)]",
  planCardHeader:
    "flex flex-col gap-3 border-b border-[var(--cot-plan-card-border)] bg-[var(--cot-plan-card-header-bg)] px-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-4",
  planCardCoverage: "bg-[var(--cot-plan-card-coverage-bg)]",
  planCardList: "flex flex-col gap-5 sm:gap-6",
  planProvider:
    "truncate text-xs font-bold uppercase leading-snug tracking-wide text-[var(--cot-primary-dark)] sm:text-sm",
  planBadge:
    "inline-flex shrink-0 items-center gap-1 rounded-lg border px-2.5 py-1 text-[10px] font-semibold leading-tight sm:text-[11px]",
  planCodeBadge:
    "inline-flex shrink-0 items-center gap-1 rounded-lg border border-[var(--cot-border)] bg-[var(--cot-surface-hover)] px-2.5 py-1 font-mono text-[10px] font-medium normal-case tracking-wide text-[var(--cot-foreground)]/70 sm:text-[11px]",
  planTagBadge:
    "inline-flex shrink-0 items-center gap-1 rounded-lg border border-[var(--cot-primary)]/20 bg-[var(--cot-primary)]/5 px-2.5 py-1 text-[10px] font-semibold text-[var(--cot-primary-dark)] sm:text-[11px]",
  planActionBase:
    "inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 text-xs font-bold transition sm:px-4",
  planActionPrimary:
    "bg-[var(--cot-primary)] text-[var(--cot-primary-foreground)] shadow-[var(--cot-shadow-cta)] hover:brightness-105",
  planActionSecondary:
    "border border-[var(--cot-border)] bg-white text-[var(--cot-foreground)] shadow-sm hover:border-[var(--cot-primary)]/35 hover:bg-[var(--cot-primary)]/5 hover:text-[var(--cot-primary-dark)]",
  planActionIconPrimary:
    "flex size-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-[var(--cot-primary-foreground)] [&_svg]:size-3.5",
  planActionIconSecondary:
    "flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--cot-primary)]/10 text-[var(--cot-primary-dark)] [&_svg]:size-3.5",
  filterPanel:
    "space-y-5 rounded-xl border border-[var(--cot-border)] bg-white p-4 shadow-[var(--cot-shadow-card)] lg:sticky lg:top-24 lg:self-start",
} as const;
