export const footerConfig = {
  tagline: "Cotiza, compara y decide con información clara.",
  contact: {
    phone: {
      label: "+56 2 2345 6789",
      href: "tel:+56223456789",
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
    { label: "Chatbot", href: "/chatbot" },
    { label: "Nosotros", href: "/nosotros" },
  ],
} as const;

export const INDICATORS_QUERY_CONFIG = {
  staleTime: 10 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  refetchInterval: 10 * 60 * 1000,
  retry: 2,
} as const;
