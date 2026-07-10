import Link from "next/link";
import { SITE } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold">
          Paint<span className="text-purple">Verse</span>
        </Link>
        <div className="hidden gap-8 text-sm text-white/70 md:flex">
          {SITE.nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-white">{n.label}</Link>
          ))}
        </div>
        <Button href="/shop" className="px-4 py-2">Shop Kits</Button>
      </nav>
    </header>
  );
}
