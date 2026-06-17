export const mainNavigation = [
  { label: "Inicio", href: "/" },
  { label: "Cotizador Tradicional", href: "/cotizador" },
  { label: "Chatbot", href: "/chatbot" },
  { label: "Nosotros", href: "/nosotros" },
] as const;

export type NavItem = (typeof mainNavigation)[number];
