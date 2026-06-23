import type {
  EconomicIndicators,
  MindicadorBulkResponse,
  MindicadorResponse,
} from "@/types/indicators";

const MINDICADOR_BASE_URL = "https://mindicador.cl/api";
const FETCH_TIMEOUT_MS = 8_000;

const mindicadorFetchInit: RequestInit = {
  headers: {
    Accept: "application/json",
    "User-Agent": "cotizaloantes.cl/1.0 (+https://cotizaloantes.cl)",
  },
  next: { revalidate: 600 },
};

function parseIndicatorValue(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

async function fetchWithTimeout(url: string, init: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    return await fetch(url, {
      ...mindicadorFetchInit,
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

async function fetchBulkIndicators(): Promise<EconomicIndicators | null> {
  try {
    const response = await fetchWithTimeout(MINDICADOR_BASE_URL);

    if (!response.ok) return null;

    const data = (await response.json()) as MindicadorBulkResponse;

    return {
      uf: parseIndicatorValue(data.uf?.valor),
      utm: parseIndicatorValue(data.utm?.valor),
      dolar: parseIndicatorValue(data.dolar?.valor),
      updatedAt: data.fecha ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

async function fetchIndicator(code: string): Promise<number | null> {
  try {
    const response = await fetchWithTimeout(`${MINDICADOR_BASE_URL}/${code}`);

    if (!response.ok) return null;

    const data = (await response.json()) as MindicadorResponse;
    const latest = data.serie?.[0]?.valor;

    return parseIndicatorValue(latest);
  } catch {
    return null;
  }
}

async function fetchIndicatorsFallback(): Promise<EconomicIndicators> {
  const uf = await fetchIndicator("uf");
  const utm = await fetchIndicator("utm");
  const dolar = await fetchIndicator("dolar");

  return {
    uf,
    utm,
    dolar,
    updatedAt: new Date().toISOString(),
  };
}

function hasAnyIndicator(indicators: EconomicIndicators): boolean {
  return indicators.uf !== null || indicators.utm !== null || indicators.dolar !== null;
}

export async function getEconomicIndicators(): Promise<EconomicIndicators> {
  const bulk = await fetchBulkIndicators();

  if (bulk && hasAnyIndicator(bulk)) {
    if (bulk.uf !== null && bulk.utm !== null && bulk.dolar !== null) {
      return bulk;
    }

    const fallback = await fetchIndicatorsFallback();

    return {
      uf: bulk.uf ?? fallback.uf,
      utm: bulk.utm ?? fallback.utm,
      dolar: bulk.dolar ?? fallback.dolar,
      updatedAt: bulk.updatedAt,
    };
  }

  return fetchIndicatorsFallback();
}
