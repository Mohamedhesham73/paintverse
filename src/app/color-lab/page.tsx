import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BASE_COLORS, RECIPES, RULES, colorHex } from "@/content/colors";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Color Lab",
  description:
    "Your PaintVerse kit comes with 3 colours of your choice — learn how to mix them into dozens more.",
};

const extraColorsLink = waLink(
  "Hi PaintVerse! I'd like to add extra paint colours to my kit. Which options do you have?",
);

export default function ColorLabPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-7xl px-6 pt-32 pb-8">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <Badge className="border-accent/40 bg-accent/10 text-accent-300">Color Lab</Badge>
          <h1 className="mt-5 text-5xl font-bold text-balance sm:text-6xl">Three colours in. Dozens out.</h1>
          <p className="mt-5 leading-relaxed text-mute text-balance">
            Every DIY kit comes with <span className="text-white">any 3 paint colours of your choice</span>. That is
            all you need — mix them and you can reach almost any shade you want. Prefer to skip the mixing? You can add
            extra pots to your kit for a little more.
          </p>
          <div className="mt-8">
            <Button href={extraColorsLink} external variant="whatsapp">
              Add extra colours
            </Button>
          </div>
        </div>

        {/* Base palette */}
        <section className="mt-24">
          <SectionHeading label="The palette" title="Your 12 base colours" align="left" />
          <div className="mt-10 grid grid-cols-3 gap-5 sm:grid-cols-4 lg:grid-cols-6">
            {BASE_COLORS.map((c) => (
              <div key={c.name}>
                <div
                  className="aspect-square w-full rounded-2xl border border-white/10"
                  style={{ background: c.hex }}
                />
                <p className="mt-3 text-sm">{c.name}</p>
                <p className="text-xs uppercase tracking-wider text-mute">{c.hex}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Rules */}
        <section className="mt-24">
          <SectionHeading label="First, three rules" title="How mixing actually works" align="left" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {RULES.map((r) => (
              <div key={r.title} className="rounded-3xl border border-white/[0.07] bg-surface p-7">
                <h3 className="text-xl">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{r.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-3xl border border-white/[0.07] bg-surface p-7">
            <p className="text-sm leading-relaxed text-mute">
              <span className="text-white">The primaries.</span> Red, yellow and blue build everything else:
              Red&nbsp;+&nbsp;Yellow&nbsp;=&nbsp;Orange, Yellow&nbsp;+&nbsp;Blue&nbsp;=&nbsp;Green,
              Red&nbsp;+&nbsp;Blue&nbsp;=&nbsp;Violet. From there, White lightens, Black deepens, and Raw&nbsp;Umber
              tones things down.
            </p>
          </div>
        </section>

        {/* Recipes */}
        <section className="mt-24">
          <SectionHeading
            label="Mixing chart"
            title="Want this colour? Mix these."
            subtitle="Real recipes using only the 12 base pigments. Add white to lighten, black to deepen."
            align="left"
          />
          <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {RECIPES.map((r) => (
              <div key={r.name} className="overflow-hidden rounded-2xl border border-white/[0.07] bg-surface">
                <div className="h-24 w-full" style={{ background: r.hex }} />
                <div className="p-4">
                  <h3 className="font-display text-lg">{r.name}</h3>
                  <div className="mt-3 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-mute">
                    {r.parts.map((p, i) => (
                      <span key={p} className="inline-flex items-center gap-1">
                        {i > 0 && <span className="text-white/40">+</span>}
                        <span
                          className="inline-block h-3 w-3 rounded-full border border-white/25"
                          style={{ background: colorHex(p) }}
                        />
                        {p}
                      </span>
                    ))}
                  </div>
                  {r.tip && <p className="mt-3 text-xs leading-relaxed text-mute/80">{r.tip}</p>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-24">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-surface px-8 py-14 text-center">
            <div className="bloom pointer-events-none absolute -top-24 left-1/2 h-[360px] w-[520px] -translate-x-1/2 opacity-40" />
            <h2 className="text-3xl font-bold sm:text-4xl">Want the full rack of colours?</h2>
            <p className="mx-auto mt-4 max-w-md text-mute">
              Tell us which extra pots you&apos;d like and we&apos;ll add them to your kit over WhatsApp.
            </p>
            <div className="mt-7">
              <Button href={extraColorsLink} external variant="whatsapp">
                Message us on WhatsApp
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
