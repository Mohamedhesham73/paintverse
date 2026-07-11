export type Category = "DIY Kit" | "Collectible" | "Lighting";

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
    priceEgp: 250,
    tagline: "The blank canvas collectible.",
    blurb:
      "A premium unpainted figure and everything you need to make it unmistakably yours.",
    story:
      "Mecha Chameleon is where every PaintVerse story begins. You get a clean, characterful figure and a curated starter kit — then the rest is you. Prime it, paint it, seal it, and put something on your shelf that no one else on earth owns. The experience is the product.",
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
    slug: "miles-morales-spider-man",
    name: "Miles Morales — Spider-Man",
    category: "Collectible",
    priceEgp: 400,
    tagline: "Hand-finished shelf-sitter.",
    blurb:
      "A hand-painted Miles Morales, poised on the edge of your shelf like he owns it.",
    story:
      "Caught mid-thought on the ledge, this Miles Morales piece is finished by hand and built to sit on the edge of a shelf, monitor, or desk. It is the kind of detail that quietly tells everyone who walks in exactly what you're into.",
    heroImage: "/brand/spiderman.png",
    images: ["/brand/spiderman.png"],
    specs: [
      { label: "Character", value: "Miles Morales" },
      { label: "Pose", value: "Seated shelf-edge" },
      { label: "Finish", value: "Hand-painted" },
      { label: "Height", value: "≈ 12 cm" },
      { label: "Display", value: "Shelf / desk edge" },
    ],
  },
  {
    slug: "monkey-d-luffy-shadow-lamp",
    name: "Monkey D. Luffy — Shadow Lamp",
    category: "Lighting",
    priceEgp: 500,
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
