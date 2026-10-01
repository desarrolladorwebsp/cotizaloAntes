export const siteConfig = {
  name: "Cotízalo Antes",
  tagline: "Compara Isapres, AFP y Seguros en Chile",
  description:
    "Cotízalo Antes es el comparador y cotizador líder de Isapres, AFP y seguros en Chile. Compara planes de salud, cotiza online gratis y elige la mejor opción para ti y tu familia.",
  url: "https://cotizaloantes.cl",
  cotizadorBaseUrl:
    process.env.NEXT_PUBLIC_COTIZADOR_URL ?? "https://cotizador.cotizaloantes.cl",
  /** @deprecated Usar buildGenericCotizadorUrl() o buildCotizadorUrl() */
  cotizadorIsapresUrl:
    process.env.NEXT_PUBLIC_COTIZADOR_URL ?? "https://cotizador.cotizaloantes.cl",
  ogImage: "/opengraph-image",
  logo: {
    src: "/images/logo-cotizalo-antes.png",
    alt: "Cotízalo Antes — Comparador de Isapres, AFP y Seguros en Chile",
    width: 320,
    height: 80,
  },
  locale: "es_CL",
  language: "es-CL",
  country: "Chile",
  contact: {
    /** WhatsApp oficial de la empresa (contacto y privacidad). */
    phone: "+56929424190",
    phoneDisplay: "+56 9 2942 4190",
    email: "contacto@cotizaloantes.cl",
    whatsapp: {
      official: {
        label: "WhatsApp oficial",
        digits: "56929424190",
        phone: "+56929424190",
        display: "+56 9 2942 4190",
        href: "https://wa.me/56929424190",
      },
      sales: {
        label: "WhatsApp ventas",
        digits: "56930231316",
        phone: "+56930231316",
        display: "+56 9 3023 1316",
        href: "https://wa.me/56930231316",
      },
    },
  },
  keywords: [
    "cotizador isapre",
    "comparador isapre chile",
    "comparar isapres",
    "planes de salud chile",
    "cotizador afp",
    "comparador afp chile",
    "cotizador seguros chile",
    "isapre colmena",
    "isapre banmédica",
    "isapre consalud",
    "cotizar plan de salud",
    "mejor isapre chile",
    "comparabien isapre",
    "plan de salud chile",
    "cotizalo antes",
  ],
} as const;
