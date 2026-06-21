import type { CotizacionNotifyPayload } from "@/lib/validation/cotizacion-notify";

import { getCotizacionNotifyEmail, getFromEmail, getResendClient } from "./resend-client";

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatValue(value?: string | number | null): string {
  if (value === undefined || value === null || value === "") return "No indicado";
  return escapeHtml(String(value));
}

function formatCargas(cargas?: number[]): string {
  if (!cargas || cargas.length === 0) return "Sin asegurados adicionales";

  const ages = cargas.map((age) => `${age} años`).join(", ");
  const label = cargas.length === 1 ? "1 asegurado adicional" : `${cargas.length} asegurados adicionales`;

  return `${label} (${ages})`;
}

function formatIngreso(ingreso?: string): string {
  if (!ingreso?.trim()) return "No indicado";
  const digits = ingreso.replace(/[^\d]/g, "");
  if (!digits) return escapeHtml(ingreso);
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(Number(digits));
}

function formatIsapres(isapres?: string[]): string {
  if (!isapres || isapres.length === 0) return "Todas las Isapres";
  return isapres.map((item) => escapeHtml(item)).join(", ");
}

function formatMoneda(moneda?: "clp" | "uf"): string {
  if (moneda === "uf") return "UF";
  if (moneda === "clp") return "Pesos chilenos";
  return "No indicado";
}

function summaryRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:8px 0;color:#737373;vertical-align:top;width:42%;">${label}</td>
      <td style="padding:8px 0;font-weight:600;vertical-align:top;">${value}</td>
    </tr>
  `;
}

function buildUserSummaryRows(data: CotizacionNotifyPayload): string {
  return [
    summaryRow("Región", formatValue(data.region)),
    summaryRow("Edad", `${data.edad} años`),
    summaryRow("Sexo", formatValue(data.sexo)),
    summaryRow("Ingreso", formatIngreso(data.ingreso)),
    summaryRow("Asegurados adicionales", formatCargas(data.cargas)),
  ].join("");
}

function buildAdminSummaryRows(data: CotizacionNotifyPayload): string {
  const rows = [
    summaryRow("Correo del usuario", formatValue(data.email)),
    summaryRow("Región", formatValue(data.region)),
    summaryRow("Edad titular", `${data.edad} años`),
    summaryRow("Sexo", formatValue(data.sexo)),
    summaryRow("Ingreso mensual líquido", formatIngreso(data.ingreso)),
    summaryRow("Asegurados adicionales", formatCargas(data.cargas)),
    summaryRow("Búsqueda", formatValue(data.busqueda)),
    summaryRow("Ordenar por", formatValue(data.orden)),
    summaryRow("Moneda", formatMoneda(data.moneda)),
    summaryRow("Isapres filtradas", formatIsapres(data.isapres)),
  ];

  if (data.plan) {
    rows.push(
      summaryRow("Código de plan", formatValue(data.plan.codigo)),
      summaryRow("ID de plan", formatValue(data.plan.id)),
      summaryRow("Isapre del plan", formatValue(data.plan.isapre)),
      summaryRow("Precio desde (UF)", formatValue(data.plan.precioUf)),
      summaryRow("Precio desde (CLP)", formatValue(data.plan.precioClp)),
      summaryRow(
        "Cobertura hospitalaria",
        data.plan.coberturaHospitalaria !== undefined
          ? `${data.plan.coberturaHospitalaria}%`
          : "No indicado",
      ),
      summaryRow(
        "Cobertura ambulatoria",
        data.plan.coberturaAmbulatoria !== undefined
          ? `${data.plan.coberturaAmbulatoria}%`
          : "No indicado",
      ),
    );
  }

  return rows.join("");
}

function emailLayout(title: string, body: string): string {
  return `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#1a1a1a;max-width:640px;margin:0 auto;">
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

function buildAdminSubject(data: CotizacionNotifyPayload): string {
  if (data.plan?.codigo) {
    return `Nueva cotización — ${data.plan.codigo} — ${data.email}`;
  }

  if (data.busqueda) {
    return `Nueva cotización — ${data.busqueda} — ${data.email}`;
  }

  return `Nueva cotización — ${data.email}`;
}

export async function sendCotizacionEmails(data: CotizacionNotifyPayload) {
  const resend = getResendClient();
  const from = getFromEmail();
  const notifyEmail = getCotizacionNotifyEmail();
  const submittedAt = new Intl.DateTimeFormat("es-CL", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Santiago",
  }).format(new Date());

  const userSummaryRows = buildUserSummaryRows(data);
  const adminSummaryRows = buildAdminSummaryRows(data);

  const userHtml = emailLayout(
    "Recibimos tu solicitud de cotización",
    `
      <p>Hola,</p>
      <p>Gracias por cotizar con <strong>Cotízalo Antes</strong>. Recibimos tus datos y ya puedes continuar con la búsqueda de planes de salud.</p>
      <table style="width:100%;border-collapse:collapse;margin:20px 0;">${userSummaryRows}</table>
      <p style="margin:24px 0 0;">
        <a href="${data.cotizadorUrl}" style="display:inline-block;background:#f58220;color:#fff;text-decoration:none;padding:12px 20px;border-radius:999px;font-weight:600;">
          Ver mi cotización
        </a>
      </p>
      <p style="color:#737373;font-size:14px;margin-top:24px;">Si no iniciaste esta cotización, puedes ignorar este correo.</p>
    `,
  );

  const planHighlight = data.plan
    ? `
      <div style="margin:0 0 20px;padding:16px;border-radius:12px;background:#fff7ed;border:1px solid #fed7aa;">
        <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:#c2410c;">
          Plan solicitado
        </p>
        <p style="margin:0;font-size:18px;font-weight:700;color:#1a1a1a;">${formatValue(data.plan.codigo)}</p>
        <p style="margin:6px 0 0;color:#525252;">
          ${formatValue(data.plan.isapre)} · Desde UF ${formatValue(data.plan.precioUf)} · ${formatValue(data.plan.precioClp)}
        </p>
      </div>
    `
    : "";

  const adminHtml = emailLayout(
    "Nueva cotización recibida",
    `
      <p>Se registró una nueva cotización desde <strong>cotizaloantes.cl</strong>.</p>
      <p style="margin:0 0 20px;color:#525252;font-size:14px;"><strong>Fecha:</strong> ${escapeHtml(submittedAt)}</p>
      ${planHighlight}
      <table style="width:100%;border-collapse:collapse;margin:0 0 20px;">${adminSummaryRows}</table>
      <p style="margin:0 0 12px;color:#525252;font-size:14px;word-break:break-all;">
        <strong>Enlace al cotizador:</strong><br />
        <a href="${data.cotizadorUrl}" style="color:#f58220;">${escapeHtml(data.cotizadorUrl)}</a>
      </p>
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
      subject: buildAdminSubject(data),
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
