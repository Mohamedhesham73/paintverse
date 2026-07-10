import { PRODUCTS } from "@/content/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading label="Collections" title="Start with Mecha Chameleon" subtitle="More collections landing soon." />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}><ProductCard product={p} /></Reveal>
        ))}
      </div>
    </section>
  );
}
