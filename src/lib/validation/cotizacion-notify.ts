import { z } from "zod";

const cotizacionPlanSchema = z.object({
  codigo: z.string().trim().min(1),
  id: z.string().trim().optional(),
  isapre: z.string().trim().optional(),
  precioUf: z.string().trim().optional(),
  precioClp: z.string().trim().optional(),
  coberturaHospitalaria: z.number().int().min(0).max(100).optional(),
  coberturaAmbulatoria: z.number().int().min(0).max(100).optional(),
});

export const cotizacionNotifySchema = z.object({
  email: z.string().trim().email("Correo electrónico inválido"),
  region: z.string().trim().min(1),
  edad: z.number().int().min(0).max(120),
  sexo: z.string().trim().min(1),
  ingreso: z.string().trim().optional(),
  cargas: z.array(z.number().int().min(0).max(120)).optional(),
  busqueda: z.string().trim().optional(),
  orden: z.string().trim().optional(),
  moneda: z.enum(["clp", "uf"]).optional(),
  isapres: z.array(z.string().trim().min(1)).optional(),
  plan: cotizacionPlanSchema.optional(),
  cotizadorUrl: z.string().url(),
});

export type CotizacionNotifyPayload = z.infer<typeof cotizacionNotifySchema>;
export type CotizacionPlanPayload = z.infer<typeof cotizacionPlanSchema>;
