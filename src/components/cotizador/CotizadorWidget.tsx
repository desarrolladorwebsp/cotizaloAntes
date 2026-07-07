"use client";

import Script from "next/script";
import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties } from "react";

import { useIsMobile } from "@/hooks/use-media-query";
import {
  COTIZADOR_WIDGET_AGENT_KEY,
  COTIZADOR_WIDGET_MIN_HEIGHT_DESKTOP,
  COTIZADOR_WIDGET_SCRIPT_URL,
  resolveCotizadorWidgetBaseUrl,
  resolveCotizadorWidgetMinHeight,
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
          mobileScroll?: boolean | "auto";
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
  /** Página dedicada (/cotizador): reserva más alto útil. */
  asPage?: boolean;
}

export function CotizadorWidget({ compact = false, asPage = false }: CotizadorWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const isMobile = useIsMobile();
  const baseUrl = resolveCotizadorWidgetBaseUrl();
  const routing = resolveCotizadorWidgetRouting(baseUrl);
  const [minHeight, setMinHeight] = useState(COTIZADOR_WIDGET_MIN_HEIGHT_DESKTOP);

  useLayoutEffect(() => {
    const syncMinHeight = () => {
      setMinHeight(
        resolveCotizadorWidgetMinHeight({
          isMobile: window.matchMedia("(max-width: 767px)").matches,
          asPage,
        }),
      );
    };

    syncMinHeight();
    window.addEventListener("resize", syncMinHeight);
    return () => window.removeEventListener("resize", syncMinHeight);
  }, [asPage, isMobile]);

  const mountWidget = useCallback(() => {
    const container = containerRef.current;
    if (!container || mountedRef.current) return;
    if (!window.CotizadorWidget?.mount) return;

    if (container.dataset.cvMounted === "true") {
      mountedRef.current = true;
      return;
    }

    const resolvedMinHeight = resolveCotizadorWidgetMinHeight({
      isMobile: window.matchMedia("(max-width: 767px)").matches,
      asPage,
    });

    window.CotizadorWidget.mount(container, {
      agentKey: COTIZADOR_WIDGET_AGENT_KEY,
      partner: COTIZADOR_WIDGET_AGENT_KEY,
      baseUrl,
      routing,
      fullWidth: !compact,
      mobileScroll: "auto",
      minHeight: resolvedMinHeight,
      title: "Cotizador de planes de salud — Cotízalo Antes",
      query: { auto: "1" },
    });

    mountedRef.current = true;
  }, [asPage, baseUrl, compact, routing]);

  const handleScriptReady = useCallback(() => {
    mountWidget();
  }, [mountWidget]);

  return (
    <>
      <div
        ref={containerRef}
        data-cotizador-widget
        data-agent-key={COTIZADOR_WIDGET_AGENT_KEY}
        data-partner={COTIZADOR_WIDGET_AGENT_KEY}
        data-base-url={baseUrl}
        data-routing={routing}
        data-auto-search="true"
        data-min-height={String(minHeight)}
        style={
          { "--cv-widget-min-height": `${minHeight}px` } as CSSProperties
        }
        data-title="Cotizador de planes de salud — Cotízalo Antes"
        data-full-width={compact ? "false" : "true"}
        data-mobile-scroll="auto"
        className="cotizador-widget-mount block h-auto w-full max-w-none overflow-visible"
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
