import { NextResponse } from "next/server";
import { z } from "zod";

import { sendCotizacionEmails } from "@/lib/email/cotizacion-emails";
import { cotizacionNotifySchema } from "@/lib/validation/cotizacion-notify";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const data = cotizacionNotifySchema.parse(body);
    const result = await sendCotizacionEmails(data);

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Datos de cotización inválidos." },
        { status: 400 },
      );
    }

    console.error("[cotizacion-notify]", error);

    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "No se pudieron enviar las notificaciones.",
      },
      { status: 500 },
    );
  }
}
