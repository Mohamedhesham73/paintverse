"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { VISIBLE_PRODUCTS, VISIBLE_CATEGORIES, type Category } from "@/content/products";
import { ProductCard } from "./ProductCard";

type Filter = Category | "All";

export function CollectionsBrowser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabs: Filter[] = ["All", ...VISIBLE_CATEGORIES];

  // Filter is driven by the URL (?c=…), so navigating between categories — from the
  // navbar dropdown, the homepage pills, or the filter bar — always updates the view.
  const cParam = searchParams.get("c");
  const filter: Filter = cParam && (tabs as string[]).includes(cParam) ? (cParam as Filter) : "All";

  const inCategory = (p: (typeof VISIBLE_PRODUCTS)[number], c: Category) => p.category === c || !!p.also?.includes(c);
  const items = filter === "All" ? VISIBLE_PRODUCTS : VISIBLE_PRODUCTS.filter((p) => inCategory(p, filter));

  const select = (t: Filter) => {
    router.replace(t === "All" ? "/collections" : `/collections?c=${encodeURIComponent(t)}`, { scroll: false });
  };

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-6 border-b border-white/[0.06] bg-ink/85 px-6 py-3 backdrop-blur-xl">
        <div className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:flex-wrap sm:justify-center sm:overflow-visible [&::-webkit-scrollbar]:hidden">
          {tabs.map((t) => {
            const active = filter === t;
            const count = t === "All" ? VISIBLE_PRODUCTS.length : VISIBLE_PRODUCTS.filter((p) => inCategory(p, t)).length;
            return (
              <button
                key={t}
                type="button"
                onClick={() => select(t)}
                aria-pressed={active}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm transition ${
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
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {items.map((p, i) => (
          <ProductCard key={p.slug} product={p} priority={i === 0} />
        ))}
      </div>
    </div>
  );
}
