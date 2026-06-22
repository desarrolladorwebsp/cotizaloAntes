const ISAPRE_LOGOS: Record<string, string> = {
  Consalud: "/images/isapres/isapre-consalud.png",
  Banmédica: "/images/isapres/isapre-banmedica.png",
  Banmedica: "/images/isapres/isapre-banmedica.png",
  Colmena: "/images/isapres/isapre-colmena.png",
  "Cruz Blanca": "/images/isapres/isapre-cruz-blanca.jpeg",
  "Nueva Más Vida": "/images/isapres/isapre-nueva-masvida.png",
  "Vida Tres": "/images/isapres/isapre-vida-tres.png",
  Esencial: "/images/isapres/isapre-esencial.png",
};

export function getIsapreLogo(provider: string): string | undefined {
  return ISAPRE_LOGOS[provider.trim()];
}
