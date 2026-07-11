import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { formatPrice } from "@/lib/format";
import { orderLink } from "@/lib/whatsapp";
import { getSpotlight } from "@/content/products";

export function LatestDrop() {
  const p = getSpotlight();

  return (
    <section className="relative overflow-hidden py-28">
      <div className="bloom pointer-events-none absolute left-1/2 top-1/4 h-[560px] w-[820px] -translate-x-1/2 opacity-30" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="photo-fade relative order-2 aspect-square overflow-hidden rounded-[2rem] border border-white/10 lg:order-1">
              <Image
                src={p.heroImage}
                alt={p.name}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Badge className="border-accent/40 bg-accent/10 text-accent-300">Latest Drop</Badge>
            <h2 className="mt-5 text-4xl font-bold sm:text-5xl">{p.name}</h2>
            <p className="mt-5 max-w-md leading-relaxed text-mute">{p.story}</p>

            <dl className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-3">
              {p.specs.slice(0, 4).map((s) => (
                <div key={s.label} className="border-t border-white/[0.08] pt-3">
                  <dt className="text-xs uppercase tracking-widest text-mute">{s.label}</dt>
                  <dd className="mt-1 text-sm text-white">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <span className="text-2xl font-bold">{formatPrice(p.priceEgp)}</span>
              <Button href={orderLink(p.name)} external variant="whatsapp">
                Order on WhatsApp
              </Button>
              <Button href={`/collections/${p.slug}`} variant="ghost">
                View details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
