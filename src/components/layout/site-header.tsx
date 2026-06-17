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
import { cn } from "@/lib/utils";

import { SiteLogo } from "./site-logo";

function NavLink({
  href,
  label,
  isActive,
  onClick,
  className,
}: {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        isActive
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-foreground",
        className,
      )}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="safe-area-top sticky top-0 z-[var(--z-header)] w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <Container size="2xl" padding="default">
        <div className="flex h-14 items-center justify-between gap-4 sm:h-16">
          <SiteLogo priority />

          <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
            {mainNavigation.map((item) => (
              <NavLink
                key={item.href}
                href={item.href}
                label={item.label}
                isActive={isActive(item.href)}
              />
            ))}
          </nav>

          <Drawer open={mobileOpen} onOpenChange={setMobileOpen}>
            <DrawerTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir menú de navegación">
                <Menu className="h-5 w-5" />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="md:hidden">
              <DrawerHeader className="border-b border-border pb-4 text-left">
                <DrawerTitle className="sr-only">Menú de navegación</DrawerTitle>
                <SiteLogo asLink={false} className="h-9" />
              </DrawerHeader>
              <nav className="flex flex-col gap-1 p-4" aria-label="Navegación móvil">
                {mainNavigation.map((item) => (
                  <DrawerClose asChild key={item.href}>
                    <NavLink
                      href={item.href}
                      label={item.label}
                      isActive={isActive(item.href)}
                      onClick={() => setMobileOpen(false)}
                      className="w-full px-4 py-3 text-base"
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
