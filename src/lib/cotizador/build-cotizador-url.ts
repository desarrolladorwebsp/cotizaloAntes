import { siteConfig } from "@/constants/site";

export const COTIZADOR_ENTIDAD = "cotizaloantes";

export type CotizadorRegionCode =
  | "rm"
  | "arica"
  | "tarapaca"
  | "antofagasta"
  | "atacama"
  | "coquimbo"
  | "valparaiso"
  | "ohiggins"
  | "maule"
  | "nuble"
  | "biobio"
  | "araucania"
  | "los_rios"
  | "los_lagos"
  | "aysen"
  | "magallanes";

export type CotizadorSexo = "m" | "f";

export type CotizadorOrden = "price_asc" | "price_desc" | "coverage";

export type CotizadorFormData = {
  region: string;
  edad: number;
  sexo: CotizadorSexo | string;
  ingreso?: string;
  cargas?: number[];
  auto?: boolean;
  q?: string;
  precioMin?: string;
  precioMax?: string;
  isapres?: string[];
  zonas?: string[];
  tipoPlan?: string[];
  coberturaH?: number;
  coberturaA?: number;
  orden?: CotizadorOrden;
  moneda?: "clp" | "uf";
};

export const REGION_LABEL_TO_CODE: Record<string, CotizadorRegionCode> = {
  "Región Metropolitana": "rm",
  RM: "rm",
  Metropolitana: "rm",
  rm: "rm",
  "Región de Arica y Parinacota": "arica",
  Arica: "arica",
  arica: "arica",
  "Región de Tarapacá": "tarapaca",
  Tarapacá: "tarapaca",
  tarapaca: "tarapaca",
  "Región de Antofagasta": "antofagasta",
  Antofagasta: "antofagasta",
  antofagasta: "antofagasta",
  "Región de Atacama": "atacama",
  Atacama: "atacama",
  atacama: "atacama",
  "Región de Coquimbo": "coquimbo",
  Coquimbo: "coquimbo",
  coquimbo: "coquimbo",
  "Región de Valparaíso": "valparaiso",
  Valparaíso: "valparaiso",
  valparaiso: "valparaiso",
  "Región de O'Higgins": "ohiggins",
  "O'Higgins": "ohiggins",
  ohiggins: "ohiggins",
  "Región del Maule": "maule",
  Maule: "maule",
  maule: "maule",
  "Región de Ñuble": "nuble",
  Ñuble: "nuble",
  nuble: "nuble",
  "Región del Biobío": "biobio",
  Biobío: "biobio",
  biobio: "biobio",
  "Región de La Araucanía": "araucania",
  Araucanía: "araucania",
  araucania: "araucania",
  "Región de Los Ríos": "los_rios",
  "Los Ríos": "los_rios",
  los_rios: "los_rios",
  "Región de Los Lagos": "los_lagos",
  "Los Lagos": "los_lagos",
  los_lagos: "los_lagos",
  "Región de Aysén": "aysen",
  Aysén: "aysen",
  aysen: "aysen",
  "Región de Magallanes": "magallanes",
  Magallanes: "magallanes",
  magallanes: "magallanes",
};

export const COTIZADOR_REGIONS = [
  { label: "Región Metropolitana", code: "rm" as const },
  { label: "Región de Arica y Parinacota", code: "arica" as const },
  { label: "Región de Tarapacá", code: "tarapaca" as const },
  { label: "Región de Antofagasta", code: "antofagasta" as const },
  { label: "Región de Atacama", code: "atacama" as const },
  { label: "Región de Coquimbo", code: "coquimbo" as const },
  { label: "Región de Valparaíso", code: "valparaiso" as const },
  { label: "Región de O'Higgins", code: "ohiggins" as const },
  { label: "Región del Maule", code: "maule" as const },
  { label: "Región de Ñuble", code: "nuble" as const },
  { label: "Región del Biobío", code: "biobio" as const },
  { label: "Región de La Araucanía", code: "araucania" as const },
  { label: "Región de Los Ríos", code: "los_rios" as const },
  { label: "Región de Los Lagos", code: "los_lagos" as const },
  { label: "Región de Aysén", code: "aysen" as const },
  { label: "Región de Magallanes", code: "magallanes" as const },
];

const SEXO_LABEL_TO_CODE: Record<string, CotizadorSexo> = {
  Masculino: "m",
  Femenino: "f",
  m: "m",
  f: "f",
  M: "m",
  F: "f",
};

const SORT_LABEL_TO_ORDEN: Record<string, CotizadorOrden> = {
  "Menor precio": "price_asc",
  "Mayor precio": "price_desc",
  "Mayor cobertura": "coverage",
};

function getCotizadorBaseUrl() {
  return process.env.NEXT_PUBLIC_COTIZADOR_URL ?? siteConfig.cotizadorBaseUrl;
}

export function mapRegionToCode(region: string): CotizadorRegionCode {
  const mapped = REGION_LABEL_TO_CODE[region.trim()];
  if (!mapped) {
    throw new Error(`Región no válida: ${region}`);
  }
  return mapped;
}

export function mapSexoToCode(sexo: string): CotizadorSexo {
  const mapped = SEXO_LABEL_TO_CODE[sexo.trim()];
  if (!mapped) {
    throw new Error(`Sexo no válido: ${sexo}`);
  }
  return mapped;
}

export function mapSortToOrden(sortLabel: string): CotizadorOrden | undefined {
  return SORT_LABEL_TO_ORDEN[sortLabel];
}

export function sanitizeIngreso(ingreso: string): string {
  return ingreso.replace(/[^\d]/g, "");
}

export function buildCotizadorUrl(data: CotizadorFormData): string {
  const params = new URLSearchParams();

  params.set("entidad", COTIZADOR_ENTIDAD);
  params.set("region", mapRegionToCode(data.region));
  params.set("edad", String(data.edad));
  params.set("sexo", mapSexoToCode(data.sexo));
  params.set("auto", data.auto === false ? "0" : "1");

  const ingreso = data.ingreso ? sanitizeIngreso(data.ingreso) : "";
  if (ingreso) {
    params.set("ingreso", ingreso);
  }

  if (data.cargas && data.cargas.length > 0) {
    params.set("cargas", data.cargas.join(","));
  }

  if (data.q?.trim()) {
    params.set("q", data.q.trim());
  }

  if (data.precioMin?.trim()) {
    params.set("precioMin", data.precioMin.trim());
  }

  if (data.precioMax?.trim()) {
    params.set("precioMax", data.precioMax.trim());
  }

  if (data.isapres && data.isapres.length > 0) {
    params.set("isapres", data.isapres.join(","));
  }

  if (data.zonas && data.zonas.length > 0) {
    params.set("zonas", data.zonas.join(","));
  }

  if (data.tipoPlan && data.tipoPlan.length > 0) {
    params.set("tipoPlan", data.tipoPlan.join(","));
  }

  if (data.coberturaH) {
    params.set("coberturaH", String(data.coberturaH));
  }

  if (data.coberturaA) {
    params.set("coberturaA", String(data.coberturaA));
  }

  if (data.orden) {
    params.set("orden", data.orden);
  }

  if (data.moneda) {
    params.set("moneda", data.moneda);
  }

  return `${getCotizadorBaseUrl()}/?${params.toString()}`;
}

/** CTAs genéricos sin datos del formulario (solo branding + búsqueda automática). */
export function buildGenericCotizadorUrl(): string {
  const params = new URLSearchParams();
  params.set("entidad", COTIZADOR_ENTIDAD);
  params.set("auto", "1");
  return `${getCotizadorBaseUrl()}/?${params.toString()}`;
}

export function redirectToCotizador(data: CotizadorFormData): void {
  window.location.href = buildCotizadorUrl(data);
}
