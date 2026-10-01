import { siteConfig } from "@/constants/site";

const whatsappSales = siteConfig.contact.whatsapp.sales;

export const socialLinks = {
  facebook: {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/people/Isapres-Premium-Chile/100065353785678/",
  },
  instagram: {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/cotizalo_antes/",
  },
  linkedin: {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/cotizalo-antes-444946171/",
  },
  whatsapp: {
    id: "whatsapp",
    label: whatsappSales.label,
    href: whatsappSales.href,
    phone: whatsappSales.phone,
  },
} as const;

export const socialSidebarLinks = [
  socialLinks.facebook,
  socialLinks.instagram,
  socialLinks.linkedin,
] as const;
