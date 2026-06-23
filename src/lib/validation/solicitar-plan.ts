import { z } from "zod";

export const solicitarPlanSchema = z.object({
  plan: z.string().trim().min(1, "Código de plan requerido"),
  region: z.string().trim().min(1),
  edad: z.number().int().min(0).max(120),
  sexo: z.string().trim().min(1),
  ingreso: z.string().trim().optional(),
  cargas: z.array(z.number().int().min(0).max(120)).optional(),
  nombre: z.string().trim().optional(),
  rut: z.string().trim().optional(),
  email: z.string().trim().email().optional().or(z.literal("")),
  telefono: z.string().trim().optional(),
});

export type SolicitarPlanPayload = z.infer<typeof solicitarPlanSchema>;
