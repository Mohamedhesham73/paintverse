import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { n: "01", title: "Choose", body: "Pick a finished collectible or a DIY kit to paint yourself." },
  { n: "02", title: "Create", body: "Bring the blank to life with the starter palette and QR tutorials." },
  { n: "03", title: "Display", body: "Give it pride of place on a shelf, desk, or wall." },
  { n: "04", title: "Share", body: "Show the community what you made and inspire the next collector." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <SectionHeading label="The ritual" title="Choose. Create. Display. Share." />
      <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.06}>
            <div className="h-full rounded-3xl border border-white/[0.07] bg-surface p-7">
              <div className="font-display text-3xl text-accent">{s.n}</div>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{s.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
