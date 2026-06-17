import { cn } from "@/lib/utils";

import { HeroVideoPlayer } from "./hero-video-player";

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className={cn("safe-area-top w-full")}
    >
      <HeroVideoPlayer />
    </section>
  );
}
