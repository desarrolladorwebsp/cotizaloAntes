import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <main className="safe-area-padding flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-muted-foreground text-sm font-medium">404</p>
      <h1 className="text-foreground mt-2 text-2xl font-semibold tracking-tight">Página no encontrada</h1>
      <p className="text-muted-foreground mt-3 max-w-sm text-sm">
        La página que buscas no existe o fue movida.
      </p>
      <Link href="/" className={cn(buttonVariants({ variant: "default" }), "mt-8")}>
        Volver al inicio
      </Link>
    </main>
  );
}
