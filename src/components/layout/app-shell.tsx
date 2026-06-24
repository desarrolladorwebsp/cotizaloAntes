import type { ReactNode } from "react";

import { SiteFooter } from "@/components/layout/footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SocialSidebar } from "@/components/layout/social-sidebar";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
}

/**
 * Root mobile-first shell: locks horizontal overflow, keeps vertical scroll
 * in the document flow and respects safe-area insets (notch / home indicator).
 */
export function AppShell({ children, className, mainClassName }: AppShellProps) {
  return (
    <div className={cn("app-shell safe-area-padding", className)}>
      <SiteHeader />
      <SocialSidebar />
      <main
        id="app-main"
        className={cn(
          "app-main pt-[calc(4rem+env(safe-area-inset-top,0px))] sm:pt-[calc(4.5rem+env(safe-area-inset-top,0px))]",
          mainClassName,
        )}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
