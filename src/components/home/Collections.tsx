import { PRODUCTS } from "@/content/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";

export function Collections() {
  const featured = PRODUCTS.slice(0, 6);
  return (
    <section id="collections" className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        label="Collections"
        title="Made to be displayed."
        subtitle="Collectibles, DIY kits, wall decor, lighting and more — every piece built for the shelf you show people."
      />
      <div className="mt-14 grid gap-6 md:grid-cols-3">
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
