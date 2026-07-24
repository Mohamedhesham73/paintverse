export type Category = "DIY Kit" | "Collectible" | "Lighting" | "Wall Decor";

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  category: Category;
  priceEgp: number;
  tagline: string;
  /** Optional note shown under the price (e.g. what's included). */
  priceNote?: string;
  blurb: string;
  story: string;
  heroImage: string; // path under /public
  images: string[]; // gallery, first is usually the hero
  specs: Spec[];
  insideBox?: string[];
  /** Featured as the cinematic "Latest Drop" showcase on the home page. */
  spotlight?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    slug: "mecha-chameleon",
    name: "Mecha Chameleon",
    category: "DIY Kit",
    priceEgp: 300,
    tagline: "The blank canvas collectible.",
    priceNote: "Includes 3 paint colours of your choice — mix them for more.",
    blurb:
      "A premium unpainted figure and everything you need to make it unmistakably yours.",
    story:
      "Mecha Chameleon is where every PaintVerse story begins. You get a clean, characterful figure and a curated starter kit — pick any 3 colours and mix your way to the rest. Prime it, paint it, seal it, and put something on your shelf that no one else on earth owns. The experience is the product.",
    heroImage: "/brand/pose-1.png",
    images: [
      "/brand/pose-1.png",
      "/brand/pose-2.png",
      "/brand/pose-3.png",
      "/brand/pose-4.png",
      "/brand/pose-5.png",
      "/brand/pose-6.png",
      "/brand/pose-7.png",
      "/brand/pose-8.png",
    ],
    specs: [
      { label: "Type", value: "DIY paint kit" },
      { label: "Finish", value: "Unpainted, primed" },
      { label: "Height", value: "≈ 9 cm" },
      { label: "Difficulty", value: "Beginner friendly" },
      { label: "Best for", value: "First-time painters & collectors" },
    ],
    insideBox: [
      "One premium unpainted collectible figure",
      "Three paint pots (starter palette)",
      "One quality brush",
      "Instruction card with QR code linking to tutorials",
      "Premium protective packaging",
    ],
  },
  {
    slug: "bmw-m3-wall-decor",
    name: "BMW M3 — 3D Wall Decor",
    category: "Wall Decor",
    priceEgp: 1000,
    tagline: "The M3 rear end, on your wall.",
    blurb:
      "A hand-finished BMW M3 rear in racing green — half sculpture, half key holder.",
    story:
      "Badge, diffuser and quad tips, all captured in 3D and hung on your wall in that unmistakable racing green. Built-in hooks turn it into a statement key holder by the door, or pure petrolhead art above the desk. It's the detail that makes people stop and look twice.",
    heroImage: "/brand/bmw-m3-lifestyle.jpeg",
    images: ["/brand/bmw-m3-lifestyle.jpeg", "/brand/bmw-m3.jpeg"],
    specs: [
      { label: "Model", value: "BMW M3 (rear)" },
      { label: "Finish", value: "Hand-painted racing green" },
      { label: "Mount", value: "Wall-mounted" },
      { label: "Function", value: "Wall decor + 5 key hooks" },
      { label: "Best for", value: "Entryway / desk wall" },
    ],
  },
  {
    slug: "monkey-d-luffy-shadow-lamp",
    name: "Monkey D. Luffy — Shadow Lamp",
    category: "Lighting",
    priceEgp: 900,
    tagline: "Cast the Wanted poster on your wall.",
    blurb:
      "A warm-LED shadow lamp that throws Luffy's ‘Wanted’ silhouette across the room.",
    story:
      "Part lamp, part poster, part statement. Switch it on in a low-lit room and Luffy's ‘Dead or Alive’ bounty spills across your wall as a giant living shadow. It is ambient lighting for people who decorate with their fandom, not around it.",
    heroImage: "/brand/luffy-lamp.png",
    images: ["/brand/luffy-lamp.png"],
    specs: [
      { label: "Theme", value: "One Piece — Luffy ‘Wanted’" },
      { label: "Light", value: "Warm white LED" },
      { label: "Power", value: "USB powered" },
      { label: "Effect", value: "Wall shadow projection" },
      { label: "Best in", value: "Low light" },
    ],
    spotlight: true,
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getSpotlight(): Product {
  return PRODUCTS.find((p) => p.spotlight) ?? PRODUCTS[PRODUCTS.length - 1];
}

export function relatedProducts(slug: string): Product[] {
  return PRODUCTS.filter((p) => p.slug !== slug);
}
