import { z } from "zod";

/**
 * Utilidad para integrar Zod con React Hook Form.
 * Uso: resolver: zodResolver(mySchema)
 */
export { type CotizacionNotifyPayload,cotizacionNotifySchema } from "./cotizacion-notify";
export { zodResolver } from "@hookform/resolvers/zod";

export { z };
