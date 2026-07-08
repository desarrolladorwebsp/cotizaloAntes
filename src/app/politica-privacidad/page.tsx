import Link from "next/link";

import { PageJsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { PageContainer } from "@/components/visual";
import {
  privacyPolicyMeta,
  privacyPolicySections,
} from "@/constants/privacy-policy";
import { createPageMetadata } from "@/constants/seo";
import { siteConfig } from "@/constants/site";

export const metadata = createPageMetadata({ page: "politicaPrivacidad" });

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <PageJsonLd page="politicaPrivacidad" />
      <PageContainer className="bg-background py-12 sm:py-16 md:py-20">
        <Container size="lg" padding="default">
          <header className="mb-10 max-w-3xl space-y-4">
            <p className="text-primary text-xs font-bold tracking-[0.14em] uppercase">
              Transparencia y cumplimiento legal
            </p>
            <h1 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
              {privacyPolicyMeta.title}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed">
              En {siteConfig.name} tratamos sus datos personales conforme a la{" "}
              {privacyPolicyMeta.lawReference}, con plena vigencia a partir del{" "}
              {privacyPolicyMeta.lawFullVigencyDate}. Esta política explica cómo
              recopilamos, usamos y protegemos su información al cotizar y comparar
              planes en Chile.
            </p>
            <p className="text-muted-foreground text-sm">
              Última actualización:{" "}
              <time dateTime={privacyPolicyMeta.lastUpdated}>
                {privacyPolicyMeta.lastUpdated}
              </time>
            </p>
          </header>

          <div className="max-w-3xl space-y-10">
            {privacyPolicySections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-title`}
                className="scroll-mt-28"
              >
                <h2
                  id={`${section.id}-title`}
                  className="text-foreground mb-4 text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  {section.title}
                </h2>

                <div className="text-muted-foreground space-y-4 text-sm leading-relaxed sm:text-base">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}

                  {"list" in section && section.list ? (
                    <ul className="marker:text-primary list-disc space-y-2 pl-5">
                      {section.list.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}

                  {"paragraphsAfter" in section && section.paragraphsAfter
                    ? section.paragraphsAfter.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))
                    : null}
                </div>
              </section>
            ))}
          </div>

          <footer className="border-border mt-12 border-t pt-8">
            <p className="text-muted-foreground text-sm leading-relaxed">
              Si tiene dudas sobre el tratamiento de sus datos, contáctenos en{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-primary font-medium hover:underline"
              >
                {siteConfig.contact.email}
              </a>
              . También puede consultar el texto oficial de la norma en el{" "}
              <a
                href="https://www.bcn.cl/leychile/navegar?idNorma=1203407"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary font-medium hover:underline"
              >
                Biblioteca del Congreso Nacional de Chile
              </a>
              .
            </p>
            <p className="text-muted-foreground mt-4 text-sm">
              <Link href="/" className="text-primary font-medium hover:underline">
                Volver al inicio
              </Link>
            </p>
          </footer>
        </Container>
      </PageContainer>
    </>
  );
}
