import { PRODUCTS } from "@/content/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Collections() {
  return (
    <section id="collections" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        label="Collections"
        title="Made to be displayed."
        subtitle="Three ways into the PaintVerse world — paint it yourself, or take home something already finished."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
            <ProductCard product={p} priority={i === 0} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
