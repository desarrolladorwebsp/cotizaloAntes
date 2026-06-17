"use client";

import { m } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { ChatBubble, TypingIndicator } from "@/components/sections/chatbot/chatbot-ui";
import { chatbotConfig } from "@/constants/chatbot";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

const messages = [
  { id: 1, text: "Hola, quiero cotizar Isapre", align: "right" as const, delay: 0 },
  { id: 2, text: "Perfecto, analizo tus necesidades…", align: "left" as const, delay: 0.4 },
  { id: 3, text: "Comparando 12 alternativas", align: "left" as const, delay: 0.8 },
];

export function CardAnalyzeVisual({ isActive }: { isActive: boolean }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    if (!isActive || prefersReducedMotion) return;

    const timer = setTimeout(() => setShowTyping(true), 1200);
    return () => clearTimeout(timer);
  }, [isActive, prefersReducedMotion]);

  useEffect(() => {
    if (!scrollRef.current || !isActive) return;
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [isActive, showTyping]);

  return (
    <div className="relative mx-auto flex h-44 w-full max-w-[200px] justify-center sm:h-48 sm:max-w-[220px]">
      <div
        className={cn(
          "relative h-full w-full overflow-hidden rounded-[1.75rem] border-[3px] border-[#1A1A1A] bg-[#ECE5DD] shadow-lg",
          "ring-1 ring-black/5",
        )}
      >
        <div className="flex items-center gap-2 bg-[#075E54] px-3 py-2">
          <div className="h-6 w-6 overflow-hidden rounded-full bg-white/20">
            <Image
              src={chatbotConfig.robot.src}
              alt=""
              width={24}
              height={24}
              className="h-full w-full object-cover object-top"
              aria-hidden
            />
          </div>
          <div>
            <p className="text-[10px] font-medium text-white">Cotízalo IA</p>
            <p className="text-[8px] text-white/70">en línea</p>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="scrollbar-hidden flex h-[calc(100%-2.5rem)] flex-col gap-2 overflow-y-auto p-2.5"
        >
          {messages.map((message) => (
            <m.div
              key={message.id}
              initial={false}
              animate={
                isActive
                  ? { opacity: 1, y: 0 }
                  : { opacity: 1, y: 0 }
              }
              transition={{ duration: 0.35, delay: message.delay }}
            >
              <ChatBubble align={message.align}>{message.text}</ChatBubble>
            </m.div>
          ))}
          {showTyping && isActive ? (
            <m.div initial={false} animate={{ opacity: 1 }}>
              <TypingIndicator />
            </m.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
