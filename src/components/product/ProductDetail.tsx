"use client";

import { useState } from "react";
import Link from "next/link";
import { ProductGallery } from "./ProductGallery";
import { ProductCard } from "./ProductCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatPrice } from "@/lib/format";
import { orderLink } from "@/lib/whatsapp";
import { SITE } from "@/content/site";
import { relatedProducts, type Product } from "@/content/products";

export function ProductDetail({ product }: { product: Product }) {
  const related = relatedProducts(product.slug);
  const [selected, setSelected] = useState<string | null>(null);

  const activeVariant = product.variants?.find((v) => v.name === selected);
  const currentImages = activeVariant?.images?.length ? activeVariant.images : product.images;
  const galleryKey = selected ?? "base";

  return (
    <div className="mx-auto max-w-7xl px-6 pt-32 pb-8">
      <Link href="/collections" className="text-sm text-mute transition-colors hover:text-white">
        ← All collections
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* key forces the gallery to reset to the first image when the variant changes */}
        <ProductGallery key={galleryKey} images={currentImages} alt={product.name} />

        <div className="lg:pt-4">
          <Badge className="border-accent/40 bg-accent/10 text-accent-300">{product.category}</Badge>
          <h1 className="mt-5 text-4xl font-bold sm:text-5xl">{product.name}</h1>
          <p className="mt-4 text-lg text-mute">{product.blurb}</p>

          <div className="mt-8">
            <span className="text-3xl font-bold">{formatPrice(product.priceEgp)}</span>
            {product.priceNote && (
              <p className="mt-2 text-sm text-mute">
                {product.priceNote}{" "}
                <Link href="/color-lab" className="text-accent-300 underline underline-offset-4">
                  See the mixing guide
                </Link>
              </p>
            )}
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-mute">Options</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.variants.map((v) => {
                  const active = selected === v.name;
                  return (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setSelected(active ? null : v.name)}
                      aria-pressed={active}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        active
                          ? "border-accent bg-accent/15 text-white"
                          : "border-white/15 bg-white/[0.04] text-white/85 hover:border-white/40"
                      }`}
                    >
                      {v.name}
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-xs text-mute">
                Click an option to preview it, then tell us your pick in your WhatsApp message.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={orderLink(product.name)} external variant="whatsapp">
              Order on WhatsApp
            </Button>
            <Button
              href={`mailto:${SITE.contactEmail}?subject=${encodeURIComponent(`Order: ${product.name}`)}`}
              variant="ghost"
            >
              Email us
            </Button>
          </div>

          <p className="mt-8 leading-relaxed text-white/70">{product.story}</p>

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-mute">Specifications</h2>
            <dl className="mt-4 divide-y divide-white/[0.06] border-y border-white/[0.06]">
              {product.specs.map((s) => (
                <div key={s.label} className="flex justify-between gap-4 py-3 text-sm">
                  <dt className="text-mute">{s.label}</dt>
                  <dd className="text-right text-white">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {product.insideBox && product.insideBox.length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-mute">Inside the box</h2>
              <ul className="mt-4 space-y-2 text-sm text-white/75">
                {product.insideBox.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-28">
          <h2 className="font-display text-2xl font-bold">You may also like</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
