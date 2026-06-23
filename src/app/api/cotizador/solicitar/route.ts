import { NextResponse } from "next/server";
import { z } from "zod";

import { resolveSolicitarUrl } from "@/lib/cotizador/solicitar-url-server";
import { solicitarPlanSchema } from "@/lib/validation/solicitar-plan";

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const data = solicitarPlanSchema.parse(body);
    const { url, source } = await resolveSolicitarUrl(data);

    return NextResponse.json({
      ok: true,
      url,
      source,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { ok: false, error: "Datos de solicitud inválidos." },
        { status: 400 },
      );
    }

    console.error("[api/cotizador/solicitar]", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "No se pudo generar la URL de solicitud.",
      },
      { status: 500 },
    );
  }
}
