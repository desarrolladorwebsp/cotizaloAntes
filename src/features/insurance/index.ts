/**
 * Feature: Insurance (Seguros)
 *
 * Este módulo contendrá toda la lógica de negocio relacionada con seguros.
 * Estructura recomendada por feature:
 *
 * features/insurance/
 *   components/   → UI específica del dominio
 *   hooks/        → Hooks del dominio
 *   services/     → Llamadas API del dominio
 *   stores/       → Estado local del dominio
 *   types/        → Tipos del dominio
 *   schemas/      → Validaciones Zod
 *   utils/        → Utilidades del dominio
 *   index.ts      → API pública del feature
 */

export const INSURANCE_FEATURE = {
  slug: "insurance",
  name: "Seguros",
  enabled: true,
} as const;
