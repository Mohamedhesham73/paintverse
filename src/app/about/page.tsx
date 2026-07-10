import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = { title: "About" };

const PILLARS = [
  { title: "Craftsmanship", body: "Premium figure design and beautiful, protective packaging." },
  { title: "Creativity", body: "You are the artist. Every figure becomes one-of-a-kind." },
  { title: "Community", body: "Share your work and get inspired by other creators." },
  { title: "Sustainability", body: "Thoughtful materials and packaging as we grow." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <SectionHeading label="About" title="Paint Your Universe" subtitle="A premium DIY collectible brand where collectors become creators." />
        <p className="mt-8 text-white/70">
          PaintVerse is built on a simple idea: the experience is the product. Each kit contains a premium
          unpainted collectible figure and everything needed to bring it to life — starter paints, a quality
          brush, and QR-linked tutorials — wrapped in premium packaging. Our mission is to become the most
          recognizable DIY collectible brand by combining premium design, beautiful packaging, community
          sharing, and a modern digital experience.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <GlassCard key={p.title} className="p-6"><h3 className="text-xl">{p.title}</h3><p className="mt-2 text-sm text-white/60">{p.body}</p></GlassCard>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
