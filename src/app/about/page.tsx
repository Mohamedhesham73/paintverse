import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/content/site";
import { contactLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "About" };

const PILLARS = [
  { title: "Craftsmanship", body: "Considered design and hand-finishing on every piece." },
  { title: "Fandom", body: "Made for the things you already love — anime, gaming, pop culture." },
  { title: "Creativity", body: "DIY kits that turn collectors into creators." },
  { title: "Display", body: "Objects worthy of the shelf you actually show people." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 pt-32 pb-8">
        <SectionHeading
          label="About"
          title="Where Collectors Create."
          subtitle="A premium collectible lifestyle brand built on creativity, fandom and modern design."
        />
        <p className="mt-10 text-lg leading-relaxed text-white/75">
          PaintVerse isn&apos;t a factory of mass-produced clutter. It&apos;s a lifestyle brand for people who love to
          collect, create and display. We make premium collectible figures, DIY paint kits, shadow lamps and desk
          pieces — objects designed to be shown off, not hidden in a drawer.
        </p>
        <p className="mt-5 leading-relaxed text-mute">
          Every drop is small, considered and made to feel special. Whether you paint a blank figure into something
          nobody else owns, or take home a piece already finished by hand, the goal is the same: a shelf that tells
          people exactly who you are.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.title} className="rounded-3xl border border-white/[0.07] bg-surface p-7">
              <h3 className="text-xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mute">{p.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-white/[0.08] bg-surface p-8 text-center">
          <h2 className="text-2xl font-bold">Questions? Talk to a human.</h2>
          <p className="mx-auto mt-3 max-w-md text-mute">
            We handle every order personally over WhatsApp — {SITE.whatsapp.display}.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button href={contactLink()} external variant="whatsapp">
              Chat on WhatsApp
            </Button>
            <Button href={`mailto:${SITE.contactEmail}`} variant="ghost">
              {SITE.contactEmail}
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
