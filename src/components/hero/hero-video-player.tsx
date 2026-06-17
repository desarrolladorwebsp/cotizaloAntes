"use client";

import { Play } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useCallback, useRef, useState } from "react";

import { heroConfig } from "@/constants/hero";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { baseTransition, reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

export function HeroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const handlePlay = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, []);

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        if (!isPlaying) void handlePlay();
      }
    },
    [handlePlay, isPlaying],
  );

  const motionTransition = prefersReducedMotion
    ? reducedMotionConfig.transition
    : baseTransition("normal");

  return (
    <div className="relative w-full">
      <div
        className={cn(
          "relative aspect-video w-full overflow-hidden",
          "rounded-2xl sm:rounded-3xl",
          "bg-surface shadow-lg ring-1 ring-border/60",
          "transition-shadow duration-300 hover:shadow-xl",
        )}
      >
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover",
            "transition-opacity duration-500",
            isPlaying ? "opacity-100" : "opacity-0",
          )}
          src={heroConfig.video.src}
          poster={heroConfig.video.poster}
          playsInline
          controls={isPlaying}
          preload="metadata"
          aria-label={heroConfig.video.ariaLabel}
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
              key="poster-overlay"
              className="absolute inset-0"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={motionTransition}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroConfig.video.poster}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                aria-hidden
              />

              <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 hover:bg-foreground/[0.04]" />

              <button
                type="button"
                onClick={() => void handlePlay()}
                onKeyDown={handleKeyDown}
                aria-label="Reproducir video promocional"
                className={cn(
                  "absolute inset-0 flex items-center justify-center",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                )}
              >
                <m.span
                  className={cn(
                    "glass flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20",
                    "shadow-lg ring-1 ring-white/40",
                  )}
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.06 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
                  transition={baseTransition("fast")}
                >
                  <Play
                    className="text-primary h-7 w-7 fill-primary pl-1 sm:h-8 sm:w-8"
                    aria-hidden
                  />
                </m.span>
              </button>
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
