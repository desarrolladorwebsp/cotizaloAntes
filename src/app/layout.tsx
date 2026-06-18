import "@/styles/globals.css";

import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";

import { SiteFooter, SiteHeader, SocialSidebar } from "@/components/layout";
import { Providers } from "@/components/providers";
import { GlobalJsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/constants/site";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-dm-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.tagline,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Finance",
  applicationName: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.language,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.tagline,
    description: siteConfig.description,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Comparador de Isapres en Chile`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.tagline,
    description: siteConfig.description,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
    languages: {
      "es-CL": siteConfig.url,
    },
  },
  other: {
    "geo.region": "CL",
    "geo.placename": "Chile",
    "content-language": "es-CL",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F8F8" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL" className={`${inter.variable} ${dmSerif.variable}`} suppressHydrationWarning>
      <body className="min-h-dvh-screen bg-background font-sans text-foreground antialiased">
        <GlobalJsonLd />
        <Providers>
          <div className="flex min-h-dvh-screen flex-col">
            <SiteHeader />
            <SocialSidebar />
            <main className="flex flex-1 flex-col pt-16 sm:pt-[4.5rem]">{children}</main>
            <SiteFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
