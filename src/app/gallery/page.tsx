import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY } from "@/content/gallery";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading label="Community" title="The PaintVerse Gallery" subtitle="Painted figures from the community." />
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {GALLERY.map((g) => (
            <div key={g.id} className="glass overflow-hidden rounded-2xl break-inside-avoid">
              <div className="relative aspect-square"><Image src={g.image} alt={g.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" /></div>
              <div className="p-4"><h3>{g.title}</h3><p className="text-sm text-white/50">{g.creator}</p></div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
