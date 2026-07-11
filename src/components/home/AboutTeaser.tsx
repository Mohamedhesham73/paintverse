import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-28 text-center">
      <Badge className="border-accent/40 bg-accent/10 text-accent-300">Our world</Badge>
      <h2 className="mt-6 text-4xl font-bold text-balance sm:text-5xl">
        A lifestyle brand for people who collect and create.
      </h2>
      <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-mute">
        PaintVerse blends fandom, craftsmanship and modern design into pieces worthy of display. Not mass-produced
        clutter — collectibles, kits and lighting made for the shelf you actually show people.
      </p>
      <div className="mt-9">
        <Button href="/about" variant="ghost">
          The PaintVerse story
        </Button>
      </div>
    </section>
  );
}
