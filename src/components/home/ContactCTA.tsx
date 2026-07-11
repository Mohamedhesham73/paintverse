import { Button } from "@/components/ui/Button";
import { SITE } from "@/content/site";
import { contactLink } from "@/lib/whatsapp";

export function ContactCTA() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-28">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/[0.08] bg-surface px-8 py-16 text-center">
        <div className="bloom pointer-events-none absolute -top-24 left-1/2 h-[380px] w-[560px] -translate-x-1/2 opacity-40" />
        <h2 className="text-4xl font-bold text-balance sm:text-5xl">Start your collection.</h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-mute">
          No checkout, no waiting on hold. Message us on WhatsApp and we&apos;ll sort out your piece personally.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href={contactLink()} external variant="whatsapp">
            Chat on WhatsApp
          </Button>
          <Button href={`mailto:${SITE.contactEmail}`} variant="ghost">
            {SITE.contactEmail}
          </Button>
        </div>
        <p className="mt-6 text-sm text-mute">{SITE.whatsapp.display}</p>
      </div>
    </section>
  );
}
