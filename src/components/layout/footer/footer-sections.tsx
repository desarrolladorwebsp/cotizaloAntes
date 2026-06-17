"use client";

import { Facebook, Instagram, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import Link from "next/link";

import { FooterColumn } from "@/components/layout/footer/footer-column";
import { FooterLink } from "@/components/layout/footer/footer-link";
import { footerConfig } from "@/constants/footer";
import { cn } from "@/lib/utils";

const iconMap = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
} as const;

export function FooterContact() {
  const { contact } = footerConfig;

  return (
    <FooterColumn title="Contacto">
      <FooterLink href={contact.phone.href} className="inline-flex items-center gap-2.5">
        <Phone className="text-primary h-4 w-4 shrink-0" aria-hidden />
        <span>{contact.phone.label}</span>
      </FooterLink>
      <FooterLink href={contact.email.href} className="inline-flex items-center gap-2.5">
        <Mail className="text-primary h-4 w-4 shrink-0" aria-hidden />
        <span>{contact.email.label}</span>
      </FooterLink>
      <p className="text-footer-muted text-sm leading-relaxed">{contact.hours}</p>
    </FooterColumn>
  );
}

export function FooterSocial() {
  const { social } = footerConfig;

  return (
    <FooterColumn title="Redes sociales">
      <ul className="flex flex-col gap-2.5" role="list">
        {social.map((item) => {
          const Icon = iconMap[item.icon];

          return (
            <li key={item.label}>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group inline-flex items-center gap-2.5 text-sm transition-colors duration-200",
                  "text-footer-muted hover:text-primary",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-footer",
                )}
                aria-label={`${item.label} (abre en nueva pestaña)`}
              >
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg",
            "border border-white/[0.08] bg-white/[0.04]",
            "transition-all duration-200 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(245,130,32,0.12)]",
          )}
        >
          <Icon
            className="text-footer-muted h-4 w-4 transition-colors duration-200 group-hover:text-primary"
            aria-hidden
          />
        </span>
                <span className="text-footer-muted transition-colors duration-200 group-hover:text-footer-foreground">
                  {item.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </FooterColumn>
  );
}

export function FooterSitemap() {
  const { sitemap } = footerConfig;

  return (
    <FooterColumn title="Mapa del sitio">
      <nav aria-label="Mapa del sitio">
        <ul className="flex flex-col gap-2.5" role="list">
          {sitemap.map((item) => (
            <li key={item.href}>
              <FooterLink href={item.href}>{item.label}</FooterLink>
            </li>
          ))}
        </ul>
      </nav>
    </FooterColumn>
  );
}
