import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { VISIBLE_PRODUCTS } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/collections", "/color-lab", "/community", "/about", "/privacy", "/terms", "/shipping-returns", "/safety"];
  const productRoutes = VISIBLE_PRODUCTS.map((p) => `/collections/${p.slug}`);
  return [...staticRoutes, ...productRoutes].map((r) => ({
    url: `${SITE.url}${r}`,
    lastModified: new Date(),
  }));
}
