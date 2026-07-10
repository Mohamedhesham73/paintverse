import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SITE } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <Badge>{SITE.tagline}</Badge>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl">
            Collectors become creators.
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/60">{SITE.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/shop">Shop Kits</Button>
            <Button href="/gallery" variant="ghost">Explore Gallery</Button>
          </div>
        </div>
        <div className="relative aspect-square">
          <div className="absolute inset-0 rounded-full bg-purple/25 blur-3xl" />
          <Image src="/brand/cover.png" alt="PaintVerse figure" fill priority className="object-contain drop-shadow-2xl" sizes="(max-width:768px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
