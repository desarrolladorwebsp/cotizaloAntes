import { NextResponse } from "next/server";

import { getEconomicIndicators } from "@/services/indicators";

export const dynamic = "force-dynamic";

function hasAnyIndicator(data: { uf: number | null; utm: number | null; dolar: number | null }) {
  return data.uf !== null || data.utm !== null || data.dolar !== null;
}

export async function GET() {
  try {
    const data = await getEconomicIndicators();

    if (!hasAnyIndicator(data)) {
      return NextResponse.json(
        {
          uf: null,
          utm: null,
          dolar: null,
          updatedAt: new Date().toISOString(),
          error: "No se pudieron obtener los indicadores económicos.",
        },
        {
          status: 503,
          headers: {
            "Cache-Control": "no-store",
          },
        },
      );
    }

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=600, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json(
      {
        uf: null,
        utm: null,
        dolar: null,
        updatedAt: new Date().toISOString(),
        error: "Error al consultar mindicador.cl.",
      },
      {
        status: 503,
        headers: {
          "Cache-Control": "no-store",
        },
      },
    );
  }
}
