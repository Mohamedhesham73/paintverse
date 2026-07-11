import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { PRODUCTS } from "@/content/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/collections", "/community", "/about", "/privacy", "/terms", "/shipping-returns", "/safety"];
  const productRoutes = PRODUCTS.map((p) => `/collections/${p.slug}`);
  return [...staticRoutes, ...productRoutes].map((r) => ({
    url: `${SITE.url}${r}`,
    lastModified: new Date(),
  }));
}
