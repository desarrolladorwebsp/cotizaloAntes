import { NextResponse } from "next/server";

import { cotizadorIsapresConfig } from "@/constants/cotizador-isapres";
import { getCotizadorApiBaseUrl } from "@/lib/cotizador/solicitar-url";
import { getCotizadorPublicApiSecret } from "@/lib/cotizador/solicitar-url-server";

export async function GET() {
  const secret = getCotizadorPublicApiSecret();
  const apiBase = getCotizadorApiBaseUrl();

  if (secret) {
    try {
      const response = await fetch(`${apiBase}/api/public/v1/plans/preview`, {
        headers: {
          Authorization: `Bearer ${secret}`,
        },
        cache: "no-store",
      });

      if (response.ok) {
        const payload: unknown = await response.json();
        return NextResponse.json(payload);
      }

      console.error(
        "[api/cotizador/plans/preview] upstream error",
        response.status,
      );
    } catch (error) {
      console.error("[api/cotizador/plans/preview] fetch failed", error);
    }
  }

  return NextResponse.json({
    data: cotizadorIsapresConfig.plans,
    meta: {
      total: cotizadorIsapresConfig.plans.length,
      source: "static_fallback",
    },
  });
}
