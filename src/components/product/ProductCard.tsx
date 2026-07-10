import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/content/products";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="glass overflow-hidden rounded-2xl transition group-hover:-translate-y-1 group-hover:shadow-2xl">
        <div className="relative aspect-[4/5] overflow-hidden bg-black/30">
          <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg">{product.name}</h3>
          <p className="mt-1 text-sm text-white/50">{product.tagline}</p>
          <div className="mt-3">
            {product.comingSoon || product.priceEgp === null ? (
              <Badge>Coming Soon</Badge>
            ) : (
              <span className="font-semibold text-white">{formatPrice(product.priceEgp)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
