export interface MindicadorSerie {
  fecha: string;
  valor: number;
}

export interface MindicadorResponse {
  codigo: string;
  nombre: string;
  serie: MindicadorSerie[];
}

export interface EconomicIndicators {
  uf: number | null;
  utm: number | null;
  dolar: number | null;
  updatedAt: string;
}

export type IndicatorKey = "uf" | "utm" | "dolar";
