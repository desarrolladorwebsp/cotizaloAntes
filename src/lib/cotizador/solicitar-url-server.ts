import "server-only";

import {
  buildSolicitarApiBody,
  buildSolicitarFallbackUrl,
  getSolicitarUrlEndpoint,
  parseSolicitarUrlResponse,
  type SolicitarUrlRequest,
} from "./solicitar-url";

export type SolicitarUrlSource = "cotizador_api" | "fallback_url";

export function getCotizadorPublicApiSecret(): string | undefined {
  return process.env.COTIZADOR_PUBLIC_API_SECRET?.trim() || undefined;
}

export async function resolveSolicitarUrl(
  data: SolicitarUrlRequest,
): Promise<{ url: string; source: SolicitarUrlSource }> {
  const secret = getCotizadorPublicApiSecret();

  if (secret) {
    const apiBody = buildSolicitarApiBody(data);
    const endpoint = getSolicitarUrlEndpoint();

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiBody),
        cache: "no-store",
      });

      if (response.ok) {
        const payload: unknown = await response.json();
        const url = parseSolicitarUrlResponse(payload);

        if (url) {
          return { url, source: "cotizador_api" };
        }

        console.error(
          "[cotizador/solicitar] Respuesta sin URL válida desde",
          endpoint,
          payload,
        );
      } else {
        const errorPayload: unknown = await response.json().catch(() => null);
        console.error(
          "[cotizador/solicitar] API error",
          response.status,
          endpoint,
          errorPayload,
        );
      }
    } catch (error) {
      console.error("[cotizador/solicitar] No se pudo contactar al cotizador:", endpoint, error);
    }
  } else {
    console.warn(
      "[cotizador/solicitar] COTIZADOR_PUBLIC_API_SECRET no configurada; usando URL de fallback.",
    );
  }

  return {
    url: buildSolicitarFallbackUrl(data),
    source: "fallback_url",
  };
}
