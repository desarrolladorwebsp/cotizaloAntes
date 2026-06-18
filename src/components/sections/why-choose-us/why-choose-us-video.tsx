"use client";

import { Play } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { whyChooseUsConfig } from "@/constants/why-choose-us";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { baseTransition, reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

const { video } = whyChooseUsConfig;

export function WhyChooseUsVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handlePlay = useCallback(async () => {
    const element = videoRef.current;
    if (!element) return;

    try {
      await element.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const motionTransition = prefersReducedMotion
    ? reducedMotionConfig.transition
    : baseTransition("normal");

  return (
    <div className="relative mx-auto flex w-full max-w-[280px] justify-center sm:max-w-[320px] lg:max-w-[360px]">
      <m.div
        className="bg-primary/20 absolute h-48 w-48 rounded-full blur-3xl sm:h-56 sm:w-56"
        initial={false}
        animate={
          prefersReducedMotion
            ? false
            : {
                opacity: [0.25, 0.45, 0.25],
                scale: [0.95, 1.05, 0.95],
              }
        }
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      />

      <div
        className={cn(
          "relative aspect-[9/16] w-full overflow-hidden",
          "rounded-3xl bg-[#0a0a0a] shadow-xl ring-1 ring-border/60",
        )}
      >
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "transition-opacity duration-500",
            isPlaying ? "opacity-100" : "opacity-0",
          )}
          src={video.src}
          poster={video.poster}
          playsInline
          controls={isPlaying}
          preload="metadata"
          aria-label={video.ariaLabel}
          onPlay={() => setIsPlaying(true)}
          onPause={() => {
            if (videoRef.current?.currentTime === 0) {
              setIsPlaying(false);
            }
          }}
          onEnded={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
        />

        <AnimatePresence>
          {!isPlaying ? (
            <m.div
              key="why-choose-us-preview"
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={motionTransition}
            >
              <Image
                src={video.poster}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 280px, 360px"
                aria-hidden
              />

              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
                aria-hidden
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <m.button
                  type="button"
                  onClick={() => void handlePlay()}
                  aria-label="Reproducir video"
                  className={cn(
                    "flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16",
                    "bg-white/15 text-white backdrop-blur-md",
                    "ring-1 ring-white/30 shadow-lg",
                    "transition-colors hover:bg-white/25",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-black/60",
                  )}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  transition={baseTransition("fast")}
                >
                  <Play className="h-6 w-6 fill-white pl-0.5 sm:h-7 sm:w-7" aria-hidden />
                </m.button>
              </div>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
