"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SITE } from "@/content/site";
import { getSpotlight } from "@/content/products";

export function Hero() {
  const spotlight = getSpotlight();

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <div className="bloom pointer-events-none absolute -right-24 -top-24 h-[560px] w-[560px] opacity-60" />
      <div className="bloom pointer-events-none absolute -bottom-40 left-0 h-[420px] w-[420px] opacity-30" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 pt-32 pb-20 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <Badge className="border-accent/40 bg-accent/10 text-accent-300">Premium collectibles</Badge>
          <h1 className="mt-6 text-6xl font-bold text-balance sm:text-7xl lg:text-[5.2rem]">
            Where Collectors Create.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">{SITE.description}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/collections">Explore Collections</Button>
            <Button href={`/collections/${spotlight.slug}`} variant="ghost">
              Latest Drop
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="bloom pointer-events-none absolute inset-0 -z-10 scale-125 opacity-70" />
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="photo-fade relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10"
          >
            <Image
              src="/brand/bmw-m3-lifestyle.jpeg"
              alt="PaintVerse BMW M3 3D wall decor"
              fill
              priority
              className="object-cover"
              sizes="(max-width:768px) 100vw, 45vw"
            />
          </motion.div>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-mute">
        Scroll
      </div>
    </section>
  );
}
