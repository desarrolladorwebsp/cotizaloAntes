export interface MindicadorSerie {
  fecha: string;
  valor: number;
}

export interface MindicadorResponse {
  codigo: string;
  nombre: string;
  serie: MindicadorSerie[];
}

export interface MindicadorBulkIndicator {
  codigo: string;
  nombre: string;
  unidad_medida: string;
  fecha: string;
  valor: number;
}

export interface MindicadorBulkResponse {
  fecha: string;
  uf: MindicadorBulkIndicator;
  utm: MindicadorBulkIndicator;
  dolar: MindicadorBulkIndicator;
}

export interface EconomicIndicators {
  uf: number | null;
  utm: number | null;
  dolar: number | null;
  updatedAt: string;
}

export type IndicatorKey = "uf" | "utm" | "dolar";
