export const chatbotConfig = {
  eyebrow: "Conecta con nuestro Chatbot",
  title: "IA que comprende, aprende y conecta.",
  titleHighlights: ["comprende", "aprende", "conecta"] as const,
  steps: [
    {
      step: 1,
      title: "Empieza a hablar",
      description: "Conéctate por WhatsApp y comienza la conversación de inmediato.",
    },
    {
      step: 2,
      title: "Analizamos tu solicitud",
      description: "Evaluamos tus necesidades para encontrar las mejores alternativas.",
    },
    {
      step: 3,
      title: "Habla con un agente",
      description: "Recibe atención personalizada y obtén las mejores cotizaciones.",
    },
  ],
  cta: {
    label: "¡Vamos a cotizar!",
    href: "/chatbot",
  },
  robot: {
    src: "/images/robot-ia.svg",
    alt: "Asistente IA de Cotízalo Antes",
  },
} as const;
