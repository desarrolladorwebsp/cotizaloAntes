import { z } from "zod";

export const cotizacionNotifySchema = z.object({
  email: z.string().trim().email("Correo electrónico inválido"),
  region: z.string().trim().min(1),
  edad: z.number().int().min(0).max(120),
  sexo: z.string().trim().min(1),
  ingreso: z.string().trim().optional(),
  cargas: z.array(z.number().int().min(0).max(120)).optional(),
  cotizadorUrl: z.string().url(),
});

export type CotizacionNotifyPayload = z.infer<typeof cotizacionNotifySchema>;
