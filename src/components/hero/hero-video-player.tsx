"use client";

import { Play } from "lucide-react";
import { AnimatePresence, LayoutGroup, m } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { HeroCtaButton } from "@/components/hero/hero-cta-button";
import { HeroTitle } from "@/components/hero/hero-title";
import { MobileVideoModal } from "@/components/ui/mobile-video-modal";
import { heroConfig } from "@/constants/hero";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { baseTransition, reducedMotionConfig } from "@/lib/motion/transitions";
import { cn } from "@/lib/utils";

const CTA_LAYOUT_ID = "hero-cta";
const { posterMobile, posterDesktop } = heroConfig.video;

export function HeroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mobileModalOpen, setMobileModalOpen] = useState(false);
  const isMobile = useIsMobile();
  const prefersReducedMotion = usePrefersReducedMotion();
  const activePoster = isMobile ? posterMobile : posterDesktop;

  const handlePlay = useCallback(async () => {
    if (isMobile) {
      setMobileModalOpen(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    try {
      await video.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  }, [isMobile]);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const tryAutoplay = async () => {
      if (cancelled) return;

      try {
        await video.play();
        if (!cancelled) setIsPlaying(true);
      } catch {
        if (!cancelled) setIsPlaying(false);
      }
    };

    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      void tryAutoplay();
    } else {
      video.addEventListener("canplay", () => void tryAutoplay(), { once: true });
    }

    return () => {
      cancelled = true;
    };
  }, [prefersReducedMotion]);

  const motionTransition = prefersReducedMotion
    ? reducedMotionConfig.transition
    : baseTransition("normal");

  return (
    <LayoutGroup>
      <div className="w-full">
        <div
          className={cn(
            "relative w-full overflow-hidden bg-[#0a0a0a]",
            "aspect-[9/16] md:aspect-video",
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
            poster={activePoster}
            autoPlay
            muted
            loop
            playsInline
            controls={isPlaying && !isMobile}
            preload="auto"
            aria-label={heroConfig.video.ariaLabel}
            onPlay={() => setIsPlaying(true)}
            onPause={() => {
              if (videoRef.current?.currentTime === 0) {
                setIsPlaying(false);
              }
            }}
            onEnded={() => {
              if (!videoRef.current?.loop) {
                setIsPlaying(false);
              }
            }}
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
                  src={posterMobile}
                  alt=""
                  fill
                  className="object-cover md:hidden"
                  sizes="100vw"
                  priority
                  aria-hidden
                />
                <Image
                  src={posterDesktop}
                  alt=""
                  fill
                  className="hidden object-cover md:block"
                  sizes="100vw"
                  priority
                  aria-hidden
                />

                <div
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.35)_100%)]"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/45 md:via-black/10 md:to-black/35"
                  aria-hidden
                />
                <div
                  className="absolute inset-0 hidden bg-gradient-to-r from-black/55 via-black/15 to-transparent md:block"
                  aria-hidden
                />

                {/* Título: móvil centrado, entre play y CTA; desktop arriba a la izquierda */}
                <div className="absolute inset-x-0 top-[62%] z-10 -translate-y-1/2 px-5 sm:top-[63%] sm:px-8 md:translate-y-0 md:inset-x-auto md:left-32 md:right-auto md:top-[28%] md:w-[min(88%,56rem)] md:px-0 lg:left-36 xl:left-40">
                  <HeroTitle />
                </div>

                {/* Botón play — centrado */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <m.button
                    type="button"
                    onClick={() => void handlePlay()}
                    aria-label="Reproducir video promocional"
                    className={cn(
                      "relative z-10 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16",
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
                "hidden justify-center border-b border-border/50 bg-background/95 px-4 py-5 backdrop-blur-md sm:py-6 md:flex",
                "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]",
              )}
            >
              <HeroCtaButton layoutId={CTA_LAYOUT_ID} />
            </m.div>
          ) : null}
        </AnimatePresence>

        <MobileVideoModal
          open={mobileModalOpen}
          onOpenChange={setMobileModalOpen}
          src={heroConfig.video.src}
          poster={posterMobile}
          ariaLabel={heroConfig.video.ariaLabel}
        />
      </div>
    </LayoutGroup>
  );
}
