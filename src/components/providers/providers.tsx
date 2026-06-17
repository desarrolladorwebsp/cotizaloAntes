"use client";

import { MotionProvider } from "./motion-provider";
import { QueryProvider } from "./query-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <MotionProvider>{children}</MotionProvider>
    </QueryProvider>
  );
}
