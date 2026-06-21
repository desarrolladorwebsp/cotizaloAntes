import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY no está configurada.");
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey);
  }

  return resendClient;
}

export function getFromEmail(): string {
  return process.env.RESEND_FROM_EMAIL ?? "Cotízalo Antes <onboarding@resend.dev>";
}

export function getCotizacionNotifyEmail(): string {
  return process.env.COTIZACION_NOTIFY_EMAIL ?? "cotizador@cotizaloantes.cl";
}
