"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { mainNavigation } from "@/constants/navigation";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { cn } from "@/lib/utils";

import { SiteLogo } from "./site-logo";

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

function isNavItemActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href;
}

function NavLink({
  href,
  label,
  isActive,
  onClick,
  className,
  variant = "desktop",
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
  variant?: "desktop" | "mobile";
}) {
  const linkClassName = cn(
    "relative rounded-lg font-medium transition-colors duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    variant === "desktop" &&
      "px-2.5 py-2 text-xs xl:px-3 xl:text-sm",
    variant === "mobile" && "touch-target-inline w-full px-4 py-3 text-base",
    isActive
      ? variant === "desktop"
        ? "bg-primary/12 font-semibold text-primary"
        : "bg-primary/10 font-semibold text-primary"
      : "text-muted-foreground hover:bg-accent hover:text-foreground",
    className,
  );

  const content = (
    <>
      {label}
      {isActive && variant === "desktop" ? (
        <span
          className="absolute inset-x-2.5 -bottom-2 h-0.5 rounded-full bg-primary xl:inset-x-3"
          aria-hidden
        />
      ) : null}
    </>
  );

  if (isExternalHref(href)) {
    return (
      <a href={href} onClick={onClick} className={linkClassName}>
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={linkClassName}
    >
      {content}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isScrollVisible = useScrollDirection();
  const showHeader = isScrollVisible || mobileOpen;

  return (
    <header
      className={cn(
        "safe-area-top fixed inset-x-0 top-0 z-[var(--z-header)] w-full",
        "border-b border-border/60 bg-background/85 backdrop-blur-xl",
        "transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform",
        showHeader ? "translate-y-0" : "-translate-y-full",
      )}
    >
      <Container size="2xl" padding="default">
        <div className="flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
          <SiteLogo priority />

          <nav
            className="hidden items-center gap-0.5 pb-0.5 lg:flex"
            aria-label="Navegación principal"
          >
            {mainNavigation.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={isNavItemActive(pathname, item.href)}
                variant="desktop"
              />
            ))}
          </nav>

          <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
            <DrawerTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir menú de navegación">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="lg:hidden">
              <DrawerHeader className="border-b border-border pb-4 text-left">
                <DrawerTitle className="sr-only">Menú de navegación</DrawerTitle>
                <SiteLogo asLink={false} />
              </DrawerHeader>
              <nav className="flex flex-col gap-1 p-4" aria-label="Navegación móvil">
                {mainNavigation.map((item) => (
                  <DrawerClose asChild key={item.href}>
                    <NavLink
                      href={item.href}
                      label={item.label}
                      isActive={isNavItemActive(pathname, item.href)}
                      onClick={() => setMobileOpen(false)}
                      variant="mobile"
                    />
                  </DrawerClose>
                ))}
              </nav>
            </DrawerContent>
          </Drawer>
        </div>
      </Container>
    </header>
  );
}
