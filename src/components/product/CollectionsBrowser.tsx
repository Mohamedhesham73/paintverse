"use client";

import { useEffect, useState } from "react";
import { PRODUCTS, CATEGORIES, type Category } from "@/content/products";
import { ProductCard } from "./ProductCard";

type Filter = Category | "All";

export function CollectionsBrowser() {
  const [filter, setFilter] = useState<Filter>("All");
  const tabs: Filter[] = ["All", ...CATEGORIES];

  // Allow deep links like /collections?c=Incense to pre-select a category.
  useEffect(() => {
    try {
      const c = new URLSearchParams(window.location.search).get("c");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (c && (tabs as string[]).includes(c)) setFilter(c as Filter);
    } catch {
      /* ignore */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const inCategory = (p: (typeof PRODUCTS)[number], c: Category) => p.category === c || !!p.also?.includes(c);
  const items = filter === "All" ? PRODUCTS : PRODUCTS.filter((p) => inCategory(p, filter));

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2">
        {tabs.map((t) => {
          const active = filter === t;
          const count = t === "All" ? PRODUCTS.length : PRODUCTS.filter((p) => inCategory(p, t)).length;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setFilter(t)}
              aria-pressed={active}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                active
                  ? "border-accent bg-accent/15 text-white"
                  : "border-white/12 bg-white/[0.03] text-mute hover:border-white/40 hover:text-white"
              }`}
            >
              {t} <span className="text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i === 0} />
        ))}
      </div>
    </div>
  );
}
