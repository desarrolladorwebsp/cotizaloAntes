import type { CotizacionNotifyPayload } from "@/lib/validation/cotizacion-notify";

import { getCotizacionNotifyEmail, getFromEmail, getResendClient } from "./resend-client";

function formatCargas(cargas?: number[]): string {
  if (!cargas || cargas.length === 0) return "Sin cargas";
  return cargas.join(", ");
}

function formatIngreso(ingreso?: string): string {
  if (!ingreso?.trim()) return "No indicado";
  const digits = ingreso.replace(/[^\d]/g, "");
  if (!digits) return ingreso;
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(digits));
}

function buildSummaryRows(data: CotizacionNotifyPayload): string {
  return `
    <tr><td style="padding:8px 0;color:#737373;">Región</td><td style="padding:8px 0;font-weight:600;">${data.region}</td></tr>
    <tr><td style="padding:8px 0;color:#737373;">Edad</td><td style="padding:8px 0;font-weight:600;">${data.edad} años</td></tr>
    <tr><td style="padding:8px 0;color:#737373;">Sexo</td><td style="padding:8px 0;font-weight:600;">${data.sexo}</td></tr>
    <tr><td style="padding:8px 0;color:#737373;">Ingreso</td><td style="padding:8px 0;font-weight:600;">${formatIngreso(data.ingreso)}</td></tr>
    <tr><td style="padding:8px 0;color:#737373;">Cargas</td><td style="padding:8px 0;font-weight:600;">${formatCargas(data.cargas)}</td></tr>
  `;
}

function emailLayout(title: string, body: string): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#1a1a1a;max-width:560px;margin:0 auto;">
      <div style="background:#f58220;color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;">
        <p style="margin:0;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9;">Cotízalo Antes</p>
        <h1 style="margin:8px 0 0;font-size:22px;line-height:1.3;">${title}</h1>
      </div>
      <div style="padding:24px;border:1px solid #e5e5e5;border-top:0;border-radius:0 0 12px 12px;background:#fff;">
        ${body}
      </div>
    </div>
  `;
}

export async function sendCotizacionEmails(data: CotizacionNotifyPayload) {
  const resend = getResendClient();
  const from = getFromEmail();
  const notifyEmail = getCotizacionNotifyEmail();

  const summaryRows = buildSummaryRows(data);

  const userHtml = emailLayout(
    "Recibimos tu solicitud de cotización",
    `
      <p>Hola,</p>
      <p>Gracias por cotizar con <strong>Cotízalo Antes</strong>. Recibimos tus datos y ya puedes continuar con la búsqueda de planes de salud.</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">${summaryRows}</table>
      <p style="margin:24px 0 0;">
        <a href="${data.cotizadorUrl}" style="display:inline-block;background:#f58220;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;">
          Ver mi cotización
        </a>
      </p>
      <p style="color:#737373;font-size:14px;margin-top:24px;">Si no iniciaste esta cotización, puedes ignorar este correo.</p>
    `,
  );

  const adminHtml = emailLayout(
    "Nueva cotización recibida",
    `
      <p>Se registró una nueva cotización desde <strong>cotizaloantes.cl</strong>.</p>
      <p><strong>Correo del usuario:</strong> ${data.email}</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">${summaryRows}</table>
      <p style="margin:24px 0 0;">
        <a href="${data.cotizadorUrl}" style="display:inline-block;background:#111214;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;">
          Abrir cotización
        </a>
      </p>
    `,
  );

  const [userResult, adminResult] = await Promise.all([
    resend.emails.send({
      from,
      to: data.email,
      subject: "Tu cotización de Isapre en Cotízalo Antes",
      html: userHtml,
    }),
    resend.emails.send({
      from,
      to: notifyEmail,
      subject: `Nueva cotización — ${data.email}`,
      html: adminHtml,
      replyTo: data.email,
    }),
  ]);

  if (userResult.error) {
    throw new Error(userResult.error.message);
  }

  if (adminResult.error) {
    throw new Error(adminResult.error.message);
  }

  return {
    userId: userResult.data?.id,
    adminId: adminResult.data?.id,
  };
}
