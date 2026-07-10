import { GlassCard } from "@/components/ui/GlassCard";
import { SignupForm } from "@/components/forms/SignupForm";

export function NewsletterCTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <GlassCard className="p-10 text-center">
        <h2 className="text-3xl font-bold">Join the universe</h2>
        <p className="mx-auto mt-3 max-w-md text-white/60">Be first to hear about drops, tutorials, and limited editions.</p>
        <div className="mx-auto mt-6 max-w-md"><SignupForm source="newsletter" /></div>
      </GlassCard>
    </section>
  );
}
