import { heroConfig } from "@/constants/hero";
import { cn } from "@/lib/utils";

type HeroTitleProps = {
  className?: string;
};

export function HeroTitle({ className }: HeroTitleProps) {
  const { eyebrow, headline } = heroConfig.title;

  return (
    <h1
      id="hero-title"
      className={cn("relative z-10 flex flex-col items-center text-center", className)}
    >
      <span
        className={cn(
          "text-white/85 mb-2 text-[0.6875rem] font-semibold tracking-[0.28em] uppercase sm:mb-3 sm:text-xs",
          "drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]",
        )}
      >
        {eyebrow}
      </span>

      <span className="relative inline-block">
        <span
          className={cn(
            "font-display text-[2.75rem] leading-[0.95] font-normal tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[4.5rem]",
            "drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]",
          )}
        >
          {headline}
        </span>
        <span
          className="from-primary via-primary to-primary/40 absolute -bottom-1 left-1/2 h-1 w-[min(100%,12rem)] -translate-x-1/2 rounded-full bg-gradient-to-r sm:-bottom-1.5 sm:h-1.5"
          aria-hidden
        />
      </span>
    </h1>
  );
}
