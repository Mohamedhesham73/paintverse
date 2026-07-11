"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="photo-fade relative aspect-square overflow-hidden rounded-3xl border border-white/[0.07] bg-surface">
        <Image
          src={images[active]}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width:768px) 100vw, 50vw"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-8">
          {images.map((img, i) => (
            <button
              key={img}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative aspect-square overflow-hidden rounded-xl border transition ${
                i === active ? "border-accent" : "border-white/10 hover:border-white/30"
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="12vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
