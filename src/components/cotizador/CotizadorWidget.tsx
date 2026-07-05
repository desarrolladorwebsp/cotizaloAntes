"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  COTIZADOR_WIDGET_AGENT_KEY,
  COTIZADOR_WIDGET_MIN_HEIGHT,
  COTIZADOR_WIDGET_SCRIPT_URL,
  resolveCotizadorWidgetBaseUrl,
  resolveCotizadorWidgetRouting,
} from "@/lib/cotizador/widget-config";

declare global {
  interface Window {
    CotizadorWidget?: {
      mount: (
        element: HTMLElement,
        overrides?: {
          agentKey?: string;
          partner?: string;
          baseUrl?: string;
          routing?: "premium" | "legacy";
          minHeight?: number;
          fullWidth?: boolean;
          title?: string;
          query?: Record<string, string>;
        },
      ) => { destroy: () => void };
    };
  }
}

interface CotizadorWidgetProps {
  /** Modo compacto: sin full-bleed y menos espacio alrededor del iframe. */
  compact?: boolean;
}

export function CotizadorWidget({ compact = false }: CotizadorWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const scriptReadyRef = useRef(false);
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  useEffect(() => {
    setBaseUrl(resolveCotizadorWidgetBaseUrl());
  }, []);

  const mountWidget = useCallback(() => {
    const container = containerRef.current;
    const resolvedBaseUrl = baseUrl ?? resolveCotizadorWidgetBaseUrl();
    if (!container || mountedRef.current || !resolvedBaseUrl) return;
    if (!window.CotizadorWidget?.mount) return;

    if (container.dataset.cvMounted === "true") {
      mountedRef.current = true;
      return;
    }

    const routing = resolveCotizadorWidgetRouting(resolvedBaseUrl);

    window.CotizadorWidget.mount(container, {
      agentKey: COTIZADOR_WIDGET_AGENT_KEY,
      partner: COTIZADOR_WIDGET_AGENT_KEY,
      baseUrl: resolvedBaseUrl,
      routing,
      fullWidth: !compact,
      minHeight: COTIZADOR_WIDGET_MIN_HEIGHT,
      title: "Cotizador de planes de salud — Cotízalo Antes",
      query: { auto: "1" },
    });

    mountedRef.current = true;
  }, [baseUrl, compact]);

  useEffect(() => {
    if (!baseUrl || !scriptReadyRef.current) return;
    mountWidget();
  }, [baseUrl, mountWidget]);

  const handleScriptReady = useCallback(() => {
    scriptReadyRef.current = true;
    mountWidget();
  }, [mountWidget]);

  const routing =
    baseUrl != null
      ? resolveCotizadorWidgetRouting(baseUrl)
      : resolveCotizadorWidgetRouting(resolveCotizadorWidgetBaseUrl());

  return (
    <>
      <div
        ref={containerRef}
        data-cotizador-widget
        data-agent-key={COTIZADOR_WIDGET_AGENT_KEY}
        data-partner={COTIZADOR_WIDGET_AGENT_KEY}
        data-base-url={baseUrl ?? undefined}
        data-routing={routing}
        data-auto-search="true"
        data-min-height={String(COTIZADOR_WIDGET_MIN_HEIGHT)}
        data-title="Cotizador de planes de salud — Cotízalo Antes"
        data-full-width={compact ? "false" : "true"}
        className="cotizador-widget-mount block h-auto min-h-[720px] w-full max-w-none touch-pan-y overflow-visible"
      />
      <Script
        src={COTIZADOR_WIDGET_SCRIPT_URL}
        strategy="afterInteractive"
        onLoad={handleScriptReady}
        onReady={handleScriptReady}
      />
    </>
  );
}
