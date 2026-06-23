import { sanitizeIngreso } from "@/lib/cotizador/build-cotizador-url";

export const SOLICITAR_CRITERIA_ALERT_TITLE =
  "Completa los datos del cotizador";

export const SOLICITAR_CRITERIA_ALERT_DEFAULT =
  "Para solicitar el plan y recibir un precio adecuado, completa los datos de la barra superior: región, ingreso mensual líquido, edad y sexo.";

export interface SolicitarCriteriaInput {
  region: string;
  income: string;
  age: string;
  gender: string;
  dependantAges: string[];
}

export function getSolicitarCriteriaValidationMessage(
  input: SolicitarCriteriaInput,
): string | null {
  const missing: string[] = [];

  if (!input.region.trim()) {
    missing.push("región");
  }

  const parsedAge = Number.parseInt(input.age, 10);
  if (!Number.isFinite(parsedAge) || parsedAge < 0 || parsedAge > 120) {
    missing.push("edad");
  }

  if (!input.gender.trim()) {
    missing.push("sexo");
  }

  const incomeDigits = sanitizeIngreso(input.income);
  if (!incomeDigits || Number(incomeDigits) <= 0) {
    missing.push("ingreso mensual líquido");
  }

  const cargas = input.dependantAges
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => Number.isFinite(value) && value >= 0 && value <= 120);

  if (
    input.dependantAges.some((value) => value.trim() !== "") &&
    cargas.length !== input.dependantAges.length
  ) {
    return "Revisa las edades de los asegurados adicionales antes de solicitar.";
  }

  if (missing.length === 0) {
    return null;
  }

  if (missing.length === 1) {
    return `Para solicitar el plan y recibir un precio adecuado, completa tu ${missing[0]} en la barra superior del cotizador.`;
  }

  const last = missing.pop();
  return `Para solicitar el plan y recibir un precio adecuado, completa ${missing.join(", ")} y ${last} en la barra superior del cotizador.`;
}

export function validateSearchCriteria(input: SolicitarCriteriaInput): string | null {
  const parsedAge = Number.parseInt(input.age, 10);
  if (!Number.isFinite(parsedAge) || parsedAge < 0 || parsedAge > 120) {
    return "Ingresa una edad válida entre 0 y 120 años.";
  }

  const cargas = input.dependantAges
    .map((value) => Number.parseInt(value, 10))
    .filter((value) => Number.isFinite(value) && value >= 0 && value <= 120);

  if (
    input.dependantAges.some((value) => value.trim() !== "") &&
    cargas.length !== input.dependantAges.length
  ) {
    return "Revisa las edades de los asegurados adicionales.";
  }

  return null;
}
