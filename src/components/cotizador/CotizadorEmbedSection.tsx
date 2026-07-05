"use client";

import { Container } from "@/components/ui/container";
import { cotizadorIsapresConfig } from "@/constants/cotizador-isapres";
import { cotizadorUi } from "@/constants/cotizador-ui";
import { cn } from "@/lib/utils";

import { CotizadorWidget } from "./CotizadorWidget";
import { WidgetCard } from "./WidgetCard";

const { sectionId, eyebrow, title } = cotizadorIsapresConfig;

interface CotizadorEmbedSectionProps {
  /** En /cotizador usa h1; en home usa h2. */
  asPage?: boolean;
}

/**
 * Cotizador premium embebido vía widget (iframe + auto-resize).
 * Reemplaza la UI duplicada de planes/filtros del sitio.
 */
export function CotizadorEmbedSection({ asPage = false }: CotizadorEmbedSectionProps) {
  const Heading = asPage ? "h1" : "h2";

  return (
    <section
      id={sectionId}
      data-cotizador-brand
      className={cn(
        "relative w-full overflow-hidden py-16 sm:py-20 md:py-28",
        cotizadorUi.canvas,
      )}
      aria-labelledby="cotizador-embed-title"
    >
      <Container size="2xl" padding="default" className="relative z-10">
        <header className="mb-5 space-y-2 text-center lg:mb-6 lg:text-left">
          <p className={cotizadorUi.sectionEyebrow}>{eyebrow}</p>
          <Heading
            id="cotizador-embed-title"
            className={cotizadorUi.sectionTitle}
          >
            {title.prefix} {title.highlight}
          </Heading>
          <p className="mx-auto max-w-2xl text-sm text-[var(--cot-muted)] lg:mx-0">
            Compara planes según tu región, edad e ingreso. Al cotizar o ver todos
            los planes, continúas en el cotizador completo con tu asesor.
          </p>
        </header>

        {asPage ? (
          <CotizadorWidget />
        ) : (
          <WidgetCard>
            <CotizadorWidget compact />
          </WidgetCard>
        )}
      </Container>
    </section>
  );
}
