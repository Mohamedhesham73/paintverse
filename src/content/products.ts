export interface Product {
  slug: string;
  name: string;
  tagline: string;
  priceEgp: number | null; // null = Coming Soon
  comingSoon: boolean;
  image: string; // path under /public
  description: string;
  whatsInside: string[];
  faqKeys: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "mecha-chameleon",
    name: "Mecha Chameleon",
    tagline: "The first PaintVerse kit.",
    priceEgp: 250,
    comingSoon: false,
    image: "/brand/cover.png",
    description:
      "A premium unpainted collectible figure with everything you need to make it yours. The experience is the product — choose it, paint it, display it, share it.",
    whatsInside: [
      "One premium unpainted collectible figure",
      "Three paint pots (starter palette)",
      "One quality brush",
      "Instruction card with QR code linking to tutorials",
      "Premium protective packaging",
    ],
    faqKeys: ["age", "paint-safe", "shipping", "tutorials"],
  },
  {
    slug: "anime-series-01",
    name: "Anime Series 01",
    tagline: "Coming soon.",
    priceEgp: null,
    comingSoon: true,
    image: "/brand/app-icon.png",
    description: "A new PaintVerse collection is on the way.",
    whatsInside: [],
    faqKeys: [],
  },
  {
    slug: "fantasy-creatures-01",
    name: "Fantasy Creatures 01",
    tagline: "Coming soon.",
    priceEgp: null,
    comingSoon: true,
    image: "/brand/nav-icon.png",
    description: "A new PaintVerse collection is on the way.",
    whatsInside: [],
    faqKeys: [],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
