export const whyChooseUsConfig = {
  title: {
    prefix: "¿Por qué",
    highlight: "elegirnos?",
  },
  subtitle: "En Cotízalo Antes simplificamos lo complejo.",
  video: {
    src: "https://media.cotizaloantes.cl/videos/felipe-vidal-02.mp4",
    posterMobile: "/images/why-choose-us-horizontal.png",
    posterDesktop: "/images/why-choose-us-vertical.png",
    ariaLabel: "Video de presentación de Cotízalo Antes",
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
