import { PRODUCTS } from "@/content/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PRODUCTS.map((p) => <ProductCard key={p.slug} product={p} />)}
    </div>
  );
}
