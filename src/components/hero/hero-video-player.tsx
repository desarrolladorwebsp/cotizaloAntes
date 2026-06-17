"use client";

import { Play } from "lucide-react";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

import { HeroCtaButton } from "@/components/hero/hero-cta-button";
import { HeroTitle } from "@/components/hero/hero-title";
import { heroConfig } from "@/constants/hero";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { baseTransition, reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

const CTA_LAYOUT_ID = "hero-cta";

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

  const motionTransition = prefersReducedMotion
    ? reducedMotionConfig.transition
    : baseTransition("normal");

  return (
    <LayoutGroup>
      <div className="w-full">
        <div className={cn("relative aspect-video w-full overflow-hidden bg-[#0a0a0a]")}>
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
                key="preview-overlay"
                className="absolute inset-0"
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={motionTransition}
              >
                <Image
                  src={heroConfig.video.poster}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                  aria-hidden
                />

                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/50"
                  aria-hidden
                />

                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 pb-24 pt-10 sm:px-8 sm:pb-28 md:pb-32">
                  <HeroTitle className="max-w-3xl" />

                  <m.button
                    type="button"
                    onClick={() => void handlePlay()}
                    aria-label="Reproducir video promocional"
                    className={cn(
                      "mt-8 flex h-14 w-14 items-center justify-center rounded-full sm:mt-10 sm:h-16 sm:w-16",
                      "bg-white/15 text-white backdrop-blur-md",
                      "ring-1 ring-white/30",
                      "shadow-[0_8px_32px_rgba(0,0,0,0.4)]",
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

                <div className="absolute inset-x-0 bottom-0 flex justify-center bg-gradient-to-t from-black/70 to-transparent px-4 pb-6 pt-16 sm:pb-8 sm:pt-20">
                  <HeroCtaButton
                    layoutId={CTA_LAYOUT_ID}
                    className="ring-1 ring-white/20"
                  />
                </div>
              </m.div>
            ) : null}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {isPlaying ? (
            <m.div
              key="hero-cta-bar"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={motionTransition}
              className={cn(
                "flex justify-center border-b border-border/50 bg-background/95 px-4 py-5 backdrop-blur-md sm:py-6",
                "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]",
              )}
            >
              <HeroCtaButton layoutId={CTA_LAYOUT_ID} />
            </m.div>
          ) : null}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
