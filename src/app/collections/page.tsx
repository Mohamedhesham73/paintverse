import type { Metadata } from "next";
import { Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CollectionsBrowser } from "@/components/product/CollectionsBrowser";

export const metadata: Metadata = {
  title: "Collections",
  description: "Premium collectibles, DIY paint kits, wall decor, shadow lamps and incense holders from PaintVerse.",
};

export default function CollectionsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-8">
        <SectionHeading
          label="Collections"
          title="The full range."
          subtitle="Filter by category, and order any piece straight from WhatsApp."
        />
        <div className="mt-14">
          <Suspense fallback={null}>
            <CollectionsBrowser />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
