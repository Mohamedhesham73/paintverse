import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

export const metadata: Metadata = { title: "Shop Kits" };

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading label="Shop" title="PaintVerse Kits" subtitle="Browse the collection. More coming soon." />
        <div className="mt-10"><ProductGrid /></div>
      </main>
      <Footer />
    </>
  );
}
