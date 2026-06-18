import type { MetadataRoute } from "next";

import { pageSeo } from "@/constants/seo";
import { siteConfig } from "@/constants/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = Object.values(pageSeo);

  return pages.map((page) => ({
    url: `${siteConfig.url}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.path === "/" ? "weekly" : "monthly",
    priority: page.path === "/" ? 1 : page.path === "/cotizador" ? 0.9 : 0.7,
  }));
}
