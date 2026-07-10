import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/shop", "/shop/mecha-chameleon", "/gallery", "/about", "/privacy", "/terms", "/shipping-returns", "/safety"];
  return routes.map((r) => ({ url: `${SITE.url}${r}`, lastModified: new Date() }));
}
