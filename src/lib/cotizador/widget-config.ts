const PROD_COTIZADOR_BASE_URL = "https://cotizadorpremium.cl";

export const COTIZADOR_WIDGET_AGENT_KEY =
  process.env.NEXT_PUBLIC_COTIZADOR_AGENT_KEY?.trim() || "cotizaloantes";

export const COTIZADOR_WIDGET_SCRIPT_URL =
  process.env.NEXT_PUBLIC_COTIZADOR_WIDGET_SCRIPT_URL?.trim() ||
  "https://cotizador-widget.vercel.app/cotizador-widget.js";

export const COTIZADOR_WIDGET_MIN_HEIGHT = 720;

function readConfiguredBaseUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_COTIZADOR_URL?.trim() || PROD_COTIZADOR_BASE_URL;
  return configured.replace(/\/+$/, "");
}

export function resolveCotizadorWidgetRouting(
  baseUrl: string,
): "premium" | "legacy" {
  const mode = process.env.NEXT_PUBLIC_COTIZADOR_ROUTING?.trim().toLowerCase();
  if (mode === "legacy") return "legacy";
  if (mode === "premium") return "premium";
  return baseUrl.toLowerCase().includes("cotizador.cotizaloantes")
    ? "legacy"
    : "premium";
}

/** Base URL del cotizador embebido (iframe + redirecciones del widget). */
export function resolveCotizadorWidgetBaseUrl(): string {
  const configured = readConfiguredBaseUrl();
  return configured;
}
