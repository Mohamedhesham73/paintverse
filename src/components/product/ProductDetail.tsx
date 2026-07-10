import Image from "next/image";
import type { Product } from "@/content/products";
import { FAQS } from "@/content/faqs";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { SignupForm } from "@/components/forms/SignupForm";
import type { SignupSource } from "@/lib/validation";

export function ProductDetail({ product }: { product: Product }) {
  const waitlistSource = `waitlist:${product.slug}` as SignupSource;
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="glass relative aspect-square overflow-hidden rounded-2xl">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />
        </div>
        <div>
          <Badge>{product.tagline}</Badge>
          <h1 className="mt-4 text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-white/60">{product.description}</p>
          <div className="mt-6 text-2xl font-semibold">
            {product.priceEgp === null ? "Coming Soon" : formatPrice(product.priceEgp)}
          </div>
          {product.whatsInside.length > 0 && (
            <GlassCard className="mt-6 p-6">
              <h2 className="text-lg font-semibold">What&apos;s inside the box</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {product.whatsInside.map((x) => <li key={x} className="flex gap-2"><span className="text-purple">▪</span>{x}</li>)}
              </ul>
            </GlassCard>
          )}
          <div className="mt-6">
            <p className="mb-2 text-sm text-white/60">Get notified when you can buy it:</p>
            <SignupForm source={waitlistSource} />
          </div>
        </div>
      </div>

      {product.faqKeys.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold">FAQs</h2>
          <div className="mt-6 space-y-4">
            {product.faqKeys.map((k) => FAQS[k] && (
              <GlassCard key={k} className="p-5">
                <h3 className="font-semibold">{FAQS[k].q}</h3>
                <p className="mt-2 text-sm text-white/60">{FAQS[k].a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
