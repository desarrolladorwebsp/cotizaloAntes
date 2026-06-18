"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type MobileVideoModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  src: string;
  poster?: string;
  ariaLabel: string;
};

type VideoWithWebkit = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

async function tryNativeFullscreen(video: HTMLVideoElement) {
  const extended = video as VideoWithWebkit;

  if (typeof extended.webkitEnterFullscreen === "function") {
    extended.webkitEnterFullscreen();
    return;
  }

  if (video.requestFullscreen) {
    await video.requestFullscreen().catch(() => undefined);
  }
}

export function MobileVideoModal({
  open,
  onOpenChange,
  src,
  poster,
  ariaLabel,
}: MobileVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleClose = useCallback(() => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    onOpenChange(false);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) return;

    const video = videoRef.current;
    if (!video) return;

    let cancelled = false;

    const startPlayback = async () => {
      try {
        await video.play();
        if (!cancelled) {
          await tryNativeFullscreen(video);
        }
      } catch {
        if (!cancelled) handleClose();
      }
    };

    void startPlayback();

    const onEnded = () => handleClose();
    const onWebkitEndFullscreen = () => {
      const extended = video as VideoWithWebkit;
      if (!extended.webkitDisplayingFullscreen) {
        handleClose();
      }
    };

    video.addEventListener("ended", onEnded);
    video.addEventListener("webkitendfullscreen", onWebkitEndFullscreen);

    return () => {
      cancelled = true;
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("webkitendfullscreen", onWebkitEndFullscreen);
      video.pause();
      video.currentTime = 0;
    };
  }, [open, handleClose]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => (next ? onOpenChange(true) : handleClose())}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-[var(--z-modal)] bg-black data-[state=open]:animate-fade-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center bg-black outline-none",
            "safe-area-top safe-area-bottom",
          )}
          aria-label={ariaLabel}
          onEscapeKeyDown={handleClose}
        >
          <DialogPrimitive.Title className="sr-only">{ariaLabel}</DialogPrimitive.Title>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            controls
            playsInline
            preload="metadata"
            aria-label={ariaLabel}
            className="max-h-dvh max-w-full object-contain"
          />
          <DialogPrimitive.Close
            type="button"
            onClick={handleClose}
            className={cn(
              "absolute top-[max(1rem,env(safe-area-inset-top))] right-4 z-10",
              "flex h-10 w-10 items-center justify-center rounded-full",
              "bg-black/60 text-white ring-1 ring-white/20 backdrop-blur-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white",
            )}
            aria-label="Cerrar video"
          >
            <X className="h-5 w-5" aria-hidden />
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
