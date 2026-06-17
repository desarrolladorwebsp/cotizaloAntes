"use client";

import { m, useInView } from "motion/react";
import Link from "next/link";
import { useRef } from "react";

import { CardAgentVisual } from "@/components/sections/chatbot/card-agent-visual";
import { CardAnalyzeVisual } from "@/components/sections/chatbot/card-analyze-visual";
import { CardStartVisual } from "@/components/sections/chatbot/card-start-visual";
import { ChatbotBackground } from "@/components/sections/chatbot/chatbot-background";
import { ChatbotStepCard } from "@/components/sections/chatbot/chatbot-step-card";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { chatbotConfig } from "@/constants/chatbot";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { hoverLift, staggerChildren, staggerContainer } from "@/lib/motion";
import { baseTransition } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

function ChatbotTitle() {
  const { title, titleHighlights } = chatbotConfig;

  const renderTitle = () => {
    const words = title.split(" ");
    return words.map((word, index) => {
      const cleanWord = word.replace(/[.,]/g, "");
      const punctuation = word.match(/[.,]$/)?.[0] ?? "";
      const isHighlight = titleHighlights.includes(
        cleanWord as (typeof titleHighlights)[number],
      );

      return (
        <span key={`${word}-${index}`}>
          {index > 0 ? " " : ""}
          {isHighlight ? (
            <span className="text-primary relative inline-block">
              {cleanWord}
              <span className="bg-primary/25 absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full" />
            </span>
          ) : (
            cleanWord
          )}
          {punctuation}
        </span>
      );
    });
  };

  return (
    <h2
      id="chatbot-section-title"
      className="text-foreground text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.12]"
    >
      {renderTitle()}
    </h2>
  );
}

const visualMap = {
  1: CardStartVisual,
  2: CardAnalyzeVisual,
  3: CardAgentVisual,
} as const;

export function ChatbotSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10%" });
  const prefersReducedMotion = usePrefersReducedMotion();

  const { eyebrow, steps, cta } = chatbotConfig;

  return (
    <section
      ref={sectionRef}
      id="chatbot"
      aria-labelledby="chatbot-section-title"
      className="relative w-full overflow-hidden py-16 sm:py-20 md:py-28"
    >
      <ChatbotBackground isInView={isInView} />

      <Container size="2xl" padding="default" className="relative z-10">
        <m.div
          className="mx-auto mb-12 max-w-3xl text-center sm:mb-16 md:mb-20"
          variants={staggerContainer}
          initial={false}
          animate={isInView && !prefersReducedMotion ? "visible" : false}
        >
          <m.p
            variants={staggerChildren}
            transition={baseTransition("normal")}
            className="text-primary mb-4 text-xs font-semibold tracking-[0.14em] uppercase sm:text-sm"
          >
            {eyebrow}
          </m.p>
          <m.div variants={staggerChildren} transition={baseTransition("slow")}>
            <ChatbotTitle />
          </m.div>
        </m.div>

        <m.div
          className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-8"
          variants={staggerContainer}
          initial={false}
          animate={isInView && !prefersReducedMotion ? "visible" : false}
        >
          {steps.map((step) => {
            const Visual = visualMap[step.step as keyof typeof visualMap];

            return (
              <ChatbotStepCard
                key={step.step}
                step={step.step}
                title={step.title}
                description={step.description}
                isActive={isInView}
                visual={<Visual isActive={isInView} />}
              />
            );
          })}
        </m.div>

        <m.div
          className="mt-12 flex justify-center sm:mt-14 md:mt-16"
          initial={false}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ ...baseTransition("slow"), delay: prefersReducedMotion ? 0 : 0.45 }}
          {...(prefersReducedMotion ? {} : hoverLift)}
        >
          <Link
            href={cta.href}
            className={buttonVariants({
              variant: "premium",
              size: "lg",
              className: cn(
                "h-12 min-w-[240px] px-10 text-base font-semibold sm:h-14 sm:min-w-[280px] sm:text-lg",
              ),
            })}
          >
            {cta.label}
          </Link>
        </m.div>
      </Container>
    </section>
  );
}
