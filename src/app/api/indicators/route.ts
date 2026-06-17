import { NextResponse } from "next/server";

import { getEconomicIndicators } from "@/services/indicators";

export const revalidate = 600;

export async function GET() {
  try {
    const data = await getEconomicIndicators();

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
      },
      { status: 200 },
    );
  }
}
