export const whyChooseUsConfig = {
  title: "¿Por qué elegirnos?",
  subtitle: "En Cotízalo Antes simplificamos lo complejo.",
  robot: {
    src: "/images/robot-ia.svg",
    alt: "Asistente IA de Cotízalo Antes",
    width: 480,
    height: 520,
  },
  benefits: [
    {
      number: "01",
      title: "Comparar Fácilmente",
      description:
        "Obtén múltiples alternativas en un solo lugar y toma mejores decisiones.",
    },
    {
      number: "02",
      title: "Rápido y Transparente",
      description: "Información clara y actualizada sin procesos complicados.",
    },
    {
      number: "03",
      title: "Recomendaciones Inteligentes",
      description: "Tecnología que te ayuda a encontrar la mejor alternativa.",
    },
    {
      number: "04",
      title: "Soporte de Expertos",
      description: "Acompañamiento humano durante todo el proceso.",
    },
  ],
  cta: {
    primary: { label: "Quiero Cotizar Ahora", href: "/cotizador" },
    secondary: { label: "Conocer Más", href: "/nosotros" },
  },
} as const;
