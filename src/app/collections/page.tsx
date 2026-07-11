import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { PRODUCTS } from "@/content/products";

export const metadata: Metadata = {
  title: "Collections",
  description: "Premium collectibles, DIY paint kits and shadow lamps from PaintVerse.",
};

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-8">
        <SectionHeading
          label="Collections"
          title="The full range."
          subtitle="Every PaintVerse piece is made to be displayed. Order any of them straight from WhatsApp."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i === 0} />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
