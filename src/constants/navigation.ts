export const mainNavigation = [
  { label: "Inicio", href: "/" },
  { label: "Cotizador Isapres", href: "/cotizador" },
  { label: "Cotizador AFP", href: "/cotizador/afp" },
  { label: "Cotizador seguros", href: "/cotizador/seguros" },
  { label: "Nosotros", href: "/nosotros" },
] as const;

export type NavItem = (typeof mainNavigation)[number];
