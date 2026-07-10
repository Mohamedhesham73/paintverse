import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { n: "01", title: "Choose", body: "Pick a premium unpainted figure kit." },
  { n: "02", title: "Paint", body: "Use the starter palette and brush, guided by QR tutorials." },
  { n: "03", title: "Display", body: "Show off your one-of-a-kind collectible." },
  { n: "04", title: "Share", body: "Join the community and inspire other creators." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading label="How it works" title="Choose. Paint. Display. Share." />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05}>
            <GlassCard className="h-full p-6">
              <div className="font-display text-3xl text-purple">{s.n}</div>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
