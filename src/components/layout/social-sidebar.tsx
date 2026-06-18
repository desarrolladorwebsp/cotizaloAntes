"use client";

import { ChevronUp } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import type { ComponentType } from "react";
import { useState } from "react";

import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/layout/social-icons";
import { socialLinks, socialSidebarLinks } from "@/constants/social";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type SocialLinkItem = (typeof socialSidebarLinks)[number];

const socialIconMap: Record<
  SocialLinkItem["id"],
  ComponentType<{ className?: string }>
> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
};

function SocialLink({
  href,
  label,
  icon: Icon,
  className,
}: {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full text-white",
        "transition-transform duration-200 hover:scale-110",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
        className,
      )}
    >
      <Icon className="h-[18px] w-[18px]" />
    </a>
  );
}

function WhatsAppButton({ className }: { className?: string }) {
  return (
    <SocialLink
      href={socialLinks.whatsapp.href}
      label={socialLinks.whatsapp.label}
      icon={WhatsAppIcon}
      className={cn("h-11 w-11 bg-[#25D366] shadow-lg shadow-[#25D366]/30", className)}
    />
  );
}

function DesktopSidebar() {
  return (
    <div
      className="pointer-events-none fixed right-0 top-1/2 z-[var(--z-floating)] hidden -translate-y-1/2 md:flex"
      aria-label="Redes sociales"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-2 pr-3 lg:pr-4">
        <div
          className={cn(
            "flex flex-col items-center gap-1 rounded-full px-1.5 py-3",
            "bg-[#1a1a1a]/75 backdrop-blur-md",
            "shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
            "ring-1 ring-white/10",
          )}
        >
          {socialSidebarLinks.map((item) => {
            const Icon = socialIconMap[item.id];
            return (
              <SocialLink
                key={item.id}
                href={item.href}
                label={item.label}
                icon={Icon}
              />
            );
          })}
        </div>
        <WhatsAppButton />
      </div>
    </div>
  );
}

function MobileSidebar() {
  const [expanded, setExpanded] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div
      className="pointer-events-none fixed bottom-24 right-3 z-[var(--z-floating)] flex md:hidden"
      aria-label="Redes sociales"
    >
      <div className="pointer-events-auto flex flex-col items-center gap-2">
        <AnimatePresence>
          {expanded ? (
            <m.div
              key="social-expanded"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12, scale: 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.92 }}
              transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
              className={cn(
                "flex flex-col items-center gap-1 rounded-full px-1.5 py-3",
                "bg-[#1a1a1a]/85 backdrop-blur-md",
                "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
                "ring-1 ring-white/10",
              )}
            >
              {[...socialSidebarLinks].reverse().map((item) => {
                const Icon = socialIconMap[item.id];
                return (
                  <SocialLink
                    key={item.id}
                    href={item.href}
                    label={item.label}
                    icon={Icon}
                  />
                );
              })}
            </m.div>
          ) : null}
        </AnimatePresence>

        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-label={expanded ? "Ocultar redes sociales" : "Mostrar redes sociales"}
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-full",
            "bg-[#1a1a1a]/85 text-white backdrop-blur-md",
            "shadow-md ring-1 ring-white/10",
            "transition-transform duration-200 hover:scale-105",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          )}
        >
          <ChevronUp
            className={cn(
              "h-4 w-4 transition-transform duration-300",
              expanded ? "rotate-180" : "rotate-0",
            )}
            aria-hidden
          />
        </button>

        <WhatsAppButton />
      </div>
    </div>
  );
}

export function SocialSidebar() {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
}
