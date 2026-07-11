"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/content/site";
import { contactLink } from "@/lib/whatsapp";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-white/[0.06]" : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          Paint<span className="text-accent">Verse</span>
        </Link>

        <div className="hidden items-center gap-9 text-sm text-mute md:flex">
          {SITE.nav.map((n) => (
            <Link key={n.href} href={n.href} className="transition-colors hover:text-white">
              {n.label}
            </Link>
          ))}
        </div>

        <a
          href={contactLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-white/90"
        >
          Order
        </a>
      </nav>
    </header>
  );
}
