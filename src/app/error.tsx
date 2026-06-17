"use client";

import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="safe-area-padding flex flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-muted-foreground text-sm font-medium">Error</p>
      <h1 className="text-foreground mt-2 text-2xl font-semibold tracking-tight">Algo salió mal</h1>
      <p className="text-muted-foreground mt-3 max-w-sm text-sm">
        Ocurrió un error inesperado. Intenta nuevamente.
      </p>
      <Button onClick={reset} className="mt-8">
        Reintentar
      </Button>
    </main>
  );
}
