import { siteConfig } from "@/constants/site";

const { official, sales } = siteConfig.contact.whatsapp;

export const footerConfig = {
  tagline: "Cotiza, compara y decide con información clara.",
  contact: {
    whatsappOfficial: {
      label: `${official.label} ${official.display}`,
      href: official.href,
    },
    whatsappSales: {
      label: `${sales.label} ${sales.display}`,
      href: sales.href,
    },
    email: {
      label: "contacto@cotizaloantes.cl",
      href: "mailto:contacto@cotizaloantes.cl",
    },
    hours: "Lun — Vie, 9:00 — 18:00 hrs",
  },
  social: [
    {
      label: "Facebook",
      href: "https://facebook.com/cotizaloantes",
      icon: "facebook" as const,
    },
    {
      label: "Instagram",
      href: "https://instagram.com/cotizaloantes",
      icon: "instagram" as const,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/cotizaloantes",
      icon: "linkedin" as const,
    },
    {
      label: "X (Twitter)",
      href: "https://x.com/cotizaloantes",
      icon: "twitter" as const,
    },
  ],
  sitemap: [
    { label: "Inicio", href: "/" },
    { label: "Cotizador Isapres", href: "/cotizador" },
    { label: "Cotizador AFP", href: "/cotizador/afp" },
    { label: "Cotizador seguros", href: "/cotizador/seguros" },
    { label: "Nosotros", href: "/nosotros" },
    { label: "Política de privacidad", href: "/politica-privacidad" },
  ],
  legal: {
    privacyPolicy: {
      label: "Política de privacidad",
      href: "/politica-privacidad",
    },
  },
} as const;

export const INDICATORS_QUERY_CONFIG = {
  staleTime: 10 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchInterval: 10 * 60 * 1000,
  retry: 2,
} as const;
