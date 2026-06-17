import type { EconomicIndicators, MindicadorResponse } from "@/types/indicators";

const MINDICADOR_BASE_URL = "https://mindicador.cl/api";

async function fetchIndicator(code: string): Promise<number | null> {
  try {
    const response = await fetch(`${MINDICADOR_BASE_URL}/${code}`, {
      next: { revalidate: 600 },
    });

    if (!response.ok) return null;

    const data = (await response.json()) as MindicadorResponse;
    const latest = data.serie?.[0]?.valor;

    return typeof latest === "number" ? latest : null;
  } catch {
    return null;
  }
}

export async function getEconomicIndicators(): Promise<EconomicIndicators> {
  const [uf, utm, dolar] = await Promise.all([
    fetchIndicator("uf"),
    fetchIndicator("utm"),
    fetchIndicator("dolar"),
  ]);

  return {
    uf,
    utm,
    dolar,
    updatedAt: new Date().toISOString(),
  };
}
