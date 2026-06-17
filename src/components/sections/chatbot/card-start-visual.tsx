"use client";

import { m } from "motion/react";
import Image from "next/image";

import { ChatBubble, TypingIndicator } from "@/components/sections/chatbot/chatbot-ui";
import { chatbotConfig } from "@/constants/chatbot";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { breathingAnimation, floatingAnimation, glowPulse } from "@/lib/motion/variants/effects";

export function CardStartVisual({ isActive }: { isActive: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative flex h-44 items-end justify-center sm:h-48">
      <m.div
        className="bg-primary/15 absolute bottom-8 h-28 w-28 rounded-full blur-2xl"
        variants={glowPulse}
        initial="animate"
        animate={isActive && !prefersReducedMotion ? "animate" : false}
      />

      <m.div
        className="absolute bottom-2 left-4 z-20 sm:left-6"
        initial={false}
        animate={
          isActive
            ? { opacity: 1, scale: 1, y: 0 }
            : { opacity: 1, scale: 1, y: 0 }
        }
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <ChatBubble>Hola, quiero cotizar mi plan 👋</ChatBubble>
        <div className="mt-2">
          <TypingIndicator />
        </div>
      </m.div>

      <m.div
        variants={floatingAnimation}
        initial="initial"
        animate={isActive && !prefersReducedMotion ? "animate" : false}
        className="relative z-10"
      >
        <m.div
          variants={breathingAnimation}
          initial="animate"
          animate={isActive && !prefersReducedMotion ? "animate" : false}
        >
          <Image
            src={chatbotConfig.robot.src}
            alt=""
            width={120}
            height={130}
            className="h-28 w-auto drop-shadow-lg sm:h-32"
            aria-hidden
          />
        </m.div>
      </m.div>
    </div>
  );
}
