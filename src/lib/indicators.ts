import type { EconomicIndicators } from "@/types/indicators";

export function formatChileanCurrency(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatIndicatorDate(isoDate: string): string {
  try {
    return new Intl.DateTimeFormat("es-CL", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(isoDate));
  } catch {
    return "—";
  }
}

async function fetchEconomicIndicators(): Promise<EconomicIndicators> {
  const response = await fetch("/api/indicators", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("No se pudieron obtener los indicadores");
  }

  const data = (await response.json()) as EconomicIndicators;

  if (data.uf === null && data.utm === null && data.dolar === null) {
    throw new Error("Indicadores económicos no disponibles");
  }

  return data;
}

export { fetchEconomicIndicators };
