import Image from "next/image";
import { GALLERY } from "@/content/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function Community() {
  const items = GALLERY.slice(0, 6);
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading
        label="Community"
        title="Painted, lit, displayed."
        subtitle="Real pieces from the PaintVerse world — and inspiration for your own shelf."
      />
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((g) => (
          <div
            key={g.id}
            className="group relative aspect-square overflow-hidden rounded-2xl border border-white/[0.07]"
          >
            <Image
              src={g.image}
              alt={g.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width:768px) 50vw, 33vw"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <p className="text-sm font-medium text-white">{g.title}</p>
              <p className="text-xs text-white/60">{g.creator}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Button href="/community" variant="ghost">
          Enter the gallery
        </Button>
      </div>
    </section>
  );
}
