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
    label: "WhatsApp",
    href: "https://wa.me/56930102427",
    phone: "+56930102427",
  },
} as const;

export const socialSidebarLinks = [
  socialLinks.facebook,
  socialLinks.instagram,
  socialLinks.linkedin,
] as const;
