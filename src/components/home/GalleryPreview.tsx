import Image from "next/image";
import { GALLERY } from "@/content/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function GalleryPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading label="Community" title="Painted by creators" subtitle="A glimpse of what's possible." />
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {GALLERY.map((g) => (
          <div key={g.id} className="glass overflow-hidden rounded-2xl">
            <div className="relative aspect-square"><Image src={g.image} alt={g.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" /></div>
            <div className="p-4"><h3 className="text-base">{g.title}</h3><p className="text-sm text-white/50">{g.creator}</p></div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center"><Button href="/gallery" variant="ghost">View the gallery</Button></div>
    </section>
  );
}
