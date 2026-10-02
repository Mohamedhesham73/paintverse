import Link from "next/link";
import { VISIBLE_PRODUCTS, VISIBLE_CATEGORIES } from "@/content/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Collections() {
  const featured = VISIBLE_PRODUCTS.slice(0, 6);
  return (
    <section id="collections" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        label="Collections"
        title="Made to be displayed."
        subtitle="Paint-your-own kits, collectibles, wall decor, lighting and more — every piece built for the shelf you show people."
      />

      {/* Browse by category */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Link
          href="/collections"
          className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-mute transition hover:border-white/40 hover:text-white"
        >
          All
        </Link>
        {VISIBLE_CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/collections?c=${encodeURIComponent(c)}`}
            className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 text-sm text-mute transition hover:border-accent hover:text-white"
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProductCard product={p} priority={i === 0} />
          </Reveal>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button href="/collections" variant="ghost">
          View all collections
        </Button>
      </div>
    </section>
  );
}
