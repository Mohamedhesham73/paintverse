import Link from "next/link";
import { SITE } from "@/content/site";
import { contactLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-xl font-bold">
            Paint<span className="text-accent">Verse</span>
          </div>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-mute">{SITE.description}</p>
          <a
            href={contactLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-black transition hover:brightness-105"
          >
            Chat on WhatsApp
          </a>
        </div>

        <div className="text-sm">
          <h4 className="font-semibold text-white/80">Explore</h4>
          <ul className="mt-3 space-y-2 text-mute">
            {SITE.nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="transition-colors hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            {SITE.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm">
          <h4 className="font-semibold text-white/80">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-mute">
            <li>
              <a href={contactLink()} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                WhatsApp {SITE.whatsapp.display}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.contactEmail}`} className="hover:text-white">
                {SITE.contactEmail}
              </a>
            </li>
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.06] px-6 py-6 text-center text-xs text-mute">
        © {new Date().getFullYear()} {SITE.name}. {SITE.tagline}.
      </div>
    </footer>
  );
}
