import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/constants/site";
import { cn } from "@/lib/utils";

const { logo } = siteConfig;

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
  asLink?: boolean;
};

export function SiteLogo({ className, priority = false, asLink = true }: SiteLogoProps) {
  const image = (
    <Image
      src={logo.src}
      alt={logo.alt}
      width={logo.width}
      height={logo.height}
      priority={priority}
      className={cn("h-10 w-auto object-contain sm:h-11 md:h-12", className)}
    />
  );

  if (!asLink) {
    return image;
  }

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex shrink-0 items-center",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
      aria-label={`${logo.alt} — Ir al inicio`}
    >
      {image}
    </Link>
  );
}
