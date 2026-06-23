import { siteConfig } from "@/constants/site";
import type { SolicitarPlanPayload } from "@/lib/validation/solicitar-plan";

import {
  COTIZADOR_ENTIDAD,
  mapRegionToCode,
  mapSexoToCode,
  sanitizeIngreso,
} from "./build-cotizador-url";

export type SolicitarUrlRequest = SolicitarPlanPayload;

export type SolicitarUrlApiBody = {
  entidad: typeof COTIZADOR_ENTIDAD;
  plan: string;
  region: string;
  edad: number;
  sexo: string;
  ingreso?: string;
  cargas?: number[];
  nombre?: string;
  rut?: string;
  email?: string;
  telefono?: string;
  vista: "solicitar";
  auto: boolean;
};

export function getCotizadorWebBaseUrl(): string {
  const configured =
    process.env.NEXT_PUBLIC_COTIZADOR_URL?.trim() ?? siteConfig.cotizadorBaseUrl;

  return configured.replace(/\/$/, "");
}

/** Base URL del cotizador virtual para llamadas API (servidor). */
export function getCotizadorApiBaseUrl(): string {
  const configured =
    process.env.COTIZADOR_API_URL?.trim() ??
    process.env.NEXT_PUBLIC_COTIZADOR_URL?.trim() ??
    siteConfig.cotizadorBaseUrl;

  return configured.replace(/\/$/, "");
}

export function getSolicitarUrlEndpoint(): string {
  return `${getCotizadorApiBaseUrl()}/api/public/v1/solicitar/url`;
}

export function buildSolicitarApiBody(data: SolicitarUrlRequest): SolicitarUrlApiBody {
  const ingreso = data.ingreso ? sanitizeIngreso(data.ingreso) : "";
  const email = data.email?.trim();

  return {
    entidad: COTIZADOR_ENTIDAD,
    plan: data.plan.trim(),
    region: mapRegionToCode(data.region),
    edad: data.edad,
    sexo: mapSexoToCode(data.sexo),
    ...(ingreso ? { ingreso } : {}),
    ...(data.cargas && data.cargas.length > 0 ? { cargas: data.cargas } : {}),
    ...(data.nombre?.trim() ? { nombre: data.nombre.trim() } : {}),
    ...(data.rut?.trim() ? { rut: data.rut.trim() } : {}),
    ...(email ? { email } : {}),
    ...(data.telefono?.trim() ? { telefono: data.telefono.trim() } : {}),
    vista: "solicitar",
    auto: true,
  };
}

/** Fallback cuando la API pública no está disponible (sin COTIZADOR_PUBLIC_API_SECRET). */
export function buildSolicitarFallbackUrl(data: SolicitarUrlRequest): string {
  const body = buildSolicitarApiBody(data);
  const params = new URLSearchParams();

  params.set("plan", body.plan);
  params.set("region", body.region);
  params.set("edad", String(body.edad));
  params.set("sexo", body.sexo);
  params.set("q", body.plan);

  if (body.ingreso) {
    params.set("ingreso", body.ingreso);
  }

  if (body.cargas && body.cargas.length > 0) {
    params.set("cargas", body.cargas.join(","));
  }

  if (body.nombre) params.set("nombre", body.nombre);
  if (body.rut) params.set("rut", body.rut);
  if (body.email) params.set("email", body.email);
  if (body.telefono) params.set("telefono", body.telefono);

  params.set("vista", "solicitar");
  params.set("auto", "1");

  return `${getCotizadorWebBaseUrl()}/cotizaloantes?${params.toString()}`;
}

type SolicitarUrlApiResponse = {
  data?: { url?: string };
  url?: string;
};

export function parseSolicitarUrlResponse(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") return null;

  const response = payload as SolicitarUrlApiResponse;

  if (typeof response.data?.url === "string" && response.data.url.length > 0) {
    return response.data.url;
  }

  if (typeof response.url === "string" && response.url.length > 0) {
    return response.url;
  }

  return null;
}
