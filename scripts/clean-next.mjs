import { rmSync } from "node:fs";
import { join } from "node:path";

const nextDir = join(process.cwd(), ".next");

try {
  rmSync(nextDir, { recursive: true, force: true });
  console.log("✓ Caché .next eliminada");
} catch (error) {
  console.error("No se pudo limpiar .next:", error);
  process.exit(1);
}
