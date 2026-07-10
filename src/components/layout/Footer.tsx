import Link from "next/link";
import { SITE } from "@/content/site";
import { SignupForm } from "@/components/forms/SignupForm";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="font-display text-lg font-bold">Paint<span className="text-purple">Verse</span></div>
          <p className="mt-2 max-w-xs text-sm text-white/50">{SITE.tagline}. {SITE.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/80">Newsletter</h4>
          <p className="mt-2 text-sm text-white/50">Get launch news and painting inspiration.</p>
          <div className="mt-3"><SignupForm source="newsletter" compact /></div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-white/80">Explore</h4>
            <ul className="mt-2 space-y-1 text-white/50">
              {SITE.nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white/80">Legal</h4>
            <ul className="mt-2 space-y-1 text-white/50">
              {SITE.legal.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
