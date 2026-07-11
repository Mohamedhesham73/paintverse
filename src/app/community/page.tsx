import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY } from "@/content/gallery";

export const metadata: Metadata = {
  title: "Community",
  description: "Painted figures, shadow lamps and display setups from the PaintVerse community.",
};

export default function CommunityPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-8">
        <SectionHeading
          label="Community"
          title="The PaintVerse gallery."
          subtitle="Finished pieces, works in progress and display ideas to inspire your own shelf."
        />
        <div className="mt-14 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          {GALLERY.map((g) => (
            <div key={g.id} className="break-inside-avoid overflow-hidden rounded-2xl border border-white/[0.07] bg-surface">
              <div className="relative aspect-square">
                <Image src={g.image} alt={g.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <h3 className="text-base">{g.title}</h3>
                <p className="text-sm text-mute">{g.creator}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
