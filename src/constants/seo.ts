import type { Metadata } from "next";

import { siteConfig } from "@/constants/site";

/** Palabras clave base del sitio — Isapre, AFP y seguros en Chile */
export const seoKeywords = {
  core: [
    "cotizador isapre",
    "comparador isapre",
    "comparar isapres chile",
    "cotizar plan de salud",
    "planes de salud chile",
    "isapre chile",
    "cotizador online isapre",
    "mejor isapre chile",
    "comparar planes isapre",
    "cotización isapre gratis",
  ],
  isapre: [
    "isapre colmena",
    "isapre banmédica",
    "isapre consalud",
    "isapre cruz blanca",
    "isapre vida tres",
    "isapre esencial",
    "plan de salud familiar",
    "plan de salud individual",
    "precio isapre",
    "cambiar de isapre",
    "fonasa vs isapre",
  ],
  afp: [
    "cotizador afp",
    "comparador afp chile",
    "comparar afp",
    "afp habitat",
    "afp capital",
    "afp cuprum",
    "afp modelo",
    "afp planvital",
    "afp provida",
    "afp uno",
    "comision afp",
    "rentabilidad afp",
  ],
  seguros: [
    "cotizador seguros chile",
    "comparador seguros",
    "seguro complementario",
    "seguro de salud",
    "seguro de vida chile",
    "seguro automotriz chile",
  ],
  /** Nombres de comparadores y buscadores del mercado — posicionamiento alternativo */
  comparadores: [
    "comparabien isapre",
    "plan de salud chile",
    "isapre ya",
    "mis isapres",
    "comparador isapre superintendencia",
    "comparador afp superintendencia de pensiones",
    "sistema de salud chile",
    "cotizador isapre online",
    "buscador planes de salud",
    "comparar cotizaciones isapre",
  ],
} as const;

export const allSeoKeywords = [
  ...seoKeywords.core,
  ...seoKeywords.isapre,
  ...seoKeywords.afp,
  ...seoKeywords.seguros,
  ...seoKeywords.comparadores,
];

export type PageSeoKey = keyof typeof pageSeo;

export const pageSeo = {
  home: {
    path: "/",
    title: "Comparador de Isapres en Chile — Cotiza Planes de Salud Gratis",
    description:
      "Compara y cotiza Isapres en Chile gratis. Encuentra el mejor plan de salud entre Colmena, Banmédica, Consalud, Cruz Blanca y más. Alternativa a Comparabien y Plan de Salud — rápido, gratis y sin compromiso.",
    keywords: [
      ...seoKeywords.core,
      ...seoKeywords.isapre.slice(0, 6),
      "comparabien isapre",
      "plan de salud chile",
      "cotizalo antes",
    ],
  },
  cotizador: {
    path: "/cotizador",
    title: "Cotizador Isapres Online — Compara Planes de Salud",
    description:
      "Cotiza Isapres online en segundos. Compara precios, coberturas y bonificaciones de las principales Isapres de Chile. Encuentra el plan ideal según tu edad, ingreso y región.",
    keywords: [
      ...seoKeywords.core,
      ...seoKeywords.isapre,
      "cotizador isapre online",
      "buscar mejor plan isapre",
    ],
  },
  cotizadorAfp: {
    path: "/cotizador/afp",
    title: "Cotizador AFP — Compara y Cotiza tu AFP",
    description:
      "Compara AFP en Chile: Habitat, Capital, Cuprum, Modelo, PlanVital, ProVida y Uno. Cotiza comisiones y rentabilidad. Alternativa al comparador AFP de la Superintendencia de Pensiones.",
    keywords: [...seoKeywords.afp, "comparador afp superintendencia de pensiones"],
  },
  cotizadorSeguros: {
    path: "/cotizador/seguros",
    title: "Cotizador de Seguros — Compara Seguros en Chile",
    description:
      "Cotiza y compara seguros en Chile: salud, vida, automotriz y complementarios. Encuentra la mejor cobertura al mejor precio con Cotízalo Antes.",
    keywords: seoKeywords.seguros,
  },
  nosotros: {
    path: "/nosotros",
    title: "Nosotros — Expertos en Isapres y Seguros",
    description:
      "Conoce Cotízalo Antes: plataforma chilena especializada en comparar Isapres, AFP y seguros. Te ayudamos a tomar la mejor decisión de salud y previsión.",
    keywords: [
      "cotizalo antes",
      "comparador isapre chile",
      "asesoría isapre",
      "isapres premium chile",
    ],
  },
  politicaPrivacidad: {
    path: "/politica-privacidad",
    title: "Política de Privacidad — Protección de Datos Personales",
    description:
      "Política de privacidad de Cotízalo Antes conforme a la Ley 21.719 de Chile. Conoce cómo tratamos, protegemos y resguardamos tus datos personales al cotizar Isapres, AFP y seguros.",
    keywords: [
      "política de privacidad",
      "ley 21719 chile",
      "protección de datos personales",
      "cotizalo antes privacidad",
      "datos personales cotizador",
    ],
  },
} as const;

type CreatePageMetadataOptions = {
  page: PageSeoKey;
  noIndex?: boolean;
};

export function createPageMetadata({ page, noIndex = false }: CreatePageMetadataOptions): Metadata {
  const config = pageSeo[page];
  const url = `${siteConfig.url}${config.path}`;

  return {
    title: config.title,
    description: config.description,
    keywords: [...config.keywords],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale.replace("_", "-"),
      url,
      siteName: siteConfig.name,
      title: config.title,
      description: config.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} — ${config.title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: config.title,
      description: config.description,
      images: ["/twitter-image"],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logo.src}`,
    description: siteConfig.description,
    sameAs: [
      "https://www.facebook.com/people/Isapres-Premium-Chile/100065353785678/",
      "https://www.instagram.com/cotizalo_antes/",
      "https://www.linkedin.com/in/cotizalo-antes-444946171/",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.phone,
      contactType: "customer service",
      areaServed: "CL",
      availableLanguage: "Spanish",
    },
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "es-CL",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/cotizador?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function getWebPageJsonLd(page: PageSeoKey) {
  const config = pageSeo[page];
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.title,
    description: config.description,
    url: `${siteConfig.url}${config.path}`,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: "es-CL",
  };
}

export function getServiceJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Comparador y Cotizador de Isapres",
    provider: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    description:
      "Servicio gratuito de comparación y cotización de planes de Isapre en Chile. Compara Colmena, Banmédica, Consalud, Cruz Blanca, Vida Tres y Esencial.",
    areaServed: {
      "@type": "Country",
      name: "Chile",
    },
    serviceType: "Comparador de Isapres",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "CLP",
      description: "Cotización gratuita de planes de salud",
    },
  };
}
