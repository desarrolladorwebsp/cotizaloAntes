"use client";

import { type HTMLAttributes, type ReactNode,useState } from "react";

interface WidgetCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  title?: string;
}

/** Card del widget con control para minimizar/expandir (útil en móvil). */
export function WidgetCard({
  children,
  title = "Cotizador en línea",
  className = "",
  ...props
}: WidgetCardProps) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div
      className={`overflow-visible rounded-xl border border-[var(--cot-border)] bg-white shadow-[var(--cot-shadow-card)] ${className}`}
      {...props}
    >
      <div className="flex items-center justify-between gap-2 border-b border-[var(--cot-border)] bg-[var(--cot-surface-hover)]/80 px-3 py-2 sm:px-4">
        <span className="truncate text-xs font-semibold text-[var(--cot-muted)]">
          {title}
        </span>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          aria-controls="cotizador-widget-panel"
          className="shrink-0 rounded-lg border border-[var(--cot-border)] bg-white px-2.5 py-1 text-[11px] font-semibold text-[var(--cot-primary)] transition hover:border-[var(--cot-primary)]/30 hover:bg-[var(--cot-primary)]/5 sm:text-xs"
        >
          {expanded ? "Minimizar" : "Expandir"}
        </button>
      </div>

      <div
        id="cotizador-widget-panel"
        aria-hidden={!expanded}
        className={
          expanded ? "block h-auto overflow-visible" : "max-h-0 overflow-hidden"
        }
      >
        {children}
      </div>
    </div>
  );
}
