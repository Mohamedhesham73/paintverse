"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/content/site";
import { VISIBLE_CATEGORIES } from "@/content/products";
import { contactLink } from "@/lib/whatsapp";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the category menu on outside click or Escape.
  useEffect(() => {
    if (!catOpen) return;
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setCatOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCatOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [catOpen]);

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
              <div key={n.href} ref={menuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setCatOpen((o) => !o)}
                  aria-expanded={catOpen}
                  className="inline-flex items-center gap-1 transition-colors hover:text-white"
                >
                  {n.label}
                  <span className={`text-[10px] opacity-70 transition-transform ${catOpen ? "rotate-180" : ""}`}>▾</span>
                </button>
                {catOpen && (
                  <div className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2">
                    <div className="min-w-[210px] rounded-2xl border border-white/10 bg-ink/95 p-2 shadow-2xl backdrop-blur-xl">
                      <Link
                        href="/collections"
                        onClick={() => setCatOpen(false)}
                        className="block rounded-lg px-3 py-2 text-white/85 transition hover:bg-white/5 hover:text-white"
                      >
                        All collections
                      </Link>
                      <div className="my-1 h-px bg-white/10" />
                      {VISIBLE_CATEGORIES.map((c) => (
                        <Link
                          key={c}
                          href={`/collections?c=${encodeURIComponent(c)}`}
                          onClick={() => setCatOpen(false)}
                          className="block rounded-lg px-3 py-2 text-white/70 transition hover:bg-white/5 hover:text-white"
                        >
                          {c}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
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
