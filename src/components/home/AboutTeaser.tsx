import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <Badge>Our story</Badge>
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">The experience is the product.</h2>
      <p className="mx-auto mt-4 max-w-2xl text-white/60">
        PaintVerse combines premium figure design, beautiful packaging, and a modern digital experience —
        so collectors don&apos;t just buy figures, they create them.
      </p>
      <div className="mt-8"><Button href="/about" variant="ghost">More about PaintVerse</Button></div>
    </section>
  );
}
