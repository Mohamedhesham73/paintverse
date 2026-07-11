import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/content/products";
import { formatPrice } from "@/lib/format";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <Link href={`/collections/${product.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-surface transition-transform duration-500 group-hover:-translate-y-1">
        <div className="photo-fade relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.heroImage}
            alt={product.name}
            fill
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          <span className="absolute left-4 top-4 z-10 rounded-full bg-black/40 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white/85 backdrop-blur">
            {product.category}
          </span>
        </div>
        <div className="flex items-end justify-between gap-3 p-5">
          <div>
            <h3 className="font-display text-xl">{product.name}</h3>
            <p className="mt-1 text-sm text-mute">{product.tagline}</p>
          </div>
          <span className="shrink-0 text-sm font-semibold text-white">{formatPrice(product.priceEgp)}</span>
        </div>
      </div>
    </Link>
  );
}
