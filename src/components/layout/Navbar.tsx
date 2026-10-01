"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SITE } from "@/content/site";
import { CATEGORIES } from "@/content/products";
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
          {SITE.nav.map((n) =>
            n.label === "Collections" ? (
              <div key={n.href} className="group relative">
                <Link href={n.href} className="inline-flex items-center gap-1 transition-colors hover:text-white">
                  {n.label}
                  <span className="text-[10px] opacity-70 transition-transform group-hover:rotate-180">▾</span>
                </Link>
                {/* hover dropdown (pt-2 keeps a bridge so it doesn't close between trigger and panel) */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                  <div className="min-w-[210px] rounded-2xl border border-white/10 bg-ink/95 p-2 shadow-2xl backdrop-blur-xl">
                    <Link
                      href="/collections"
                      className="block rounded-lg px-3 py-2 text-white/85 transition hover:bg-white/5 hover:text-white"
                    >
                      All collections
                    </Link>
                    <div className="my-1 h-px bg-white/10" />
                    {CATEGORIES.map((c) => (
                      <Link
                        key={c}
                        href={`/collections?c=${encodeURIComponent(c)}`}
                        className="block rounded-lg px-3 py-2 text-white/70 transition hover:bg-white/5 hover:text-white"
                      >
                        {c}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={n.href} href={n.href} className="transition-colors hover:text-white">
                {n.label}
              </Link>
            ),
          )}
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
