export type Category = "DIY Kit" | "Lighting" | "Wall Decor" | "Accessories" | "Incense";

export const CATEGORIES: Category[] = ["DIY Kit", "Wall Decor", "Lighting", "Accessories", "Incense"];

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
  /** Optional note shown under the price (e.g. what's included / ships white). */
  priceNote?: string;
  /** Optional variants; selecting one swaps the gallery to its own images (when provided). */
  variants?: { name: string; images?: string[] }[];
  blurb: string;
  story: string;
  heroImage: string; // path under /public
  images: string[]; // gallery, first is the main image
  specs: Spec[];
  insideBox?: string[];
  /** Featured as the cinematic "Latest Drop" showcase on the home page. */
  spotlight?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    slug: "car-wall-decor",
    name: "3D Car — Wall Decor & Key Holder",
    category: "Wall Decor",
    priceEgp: 1100,
    tagline: "Your favourite rear end, on the wall.",
    variants: [
      { name: "BMW M3 · Racing Green", images: ["/brand/bmw-m3-lifestyle.jpeg", "/brand/bmw-m3.jpeg"] },
      { name: "Porsche 911 GT3 · Graphite", images: ["/brand/porsche-gt3-lifestyle.jpeg", "/brand/porsche-gt3.jpeg"] },
    ],
    blurb: "A supercar rear captured in 3D — half sculpture, half key holder.",
    story:
      "Badge, diffuser, wing and quad tips, all captured in 3D and hung on your wall. Built-in hooks turn it into a statement key holder by the door, or pure petrolhead art above the desk. Choose your machine — the racing-green BMW M3 or the graphite Porsche 911 GT3 — same price, same wow factor.",
    heroImage: "/brand/bmw-m3-lifestyle.jpeg",
    images: [
      "/brand/bmw-m3-lifestyle.jpeg",
      "/brand/bmw-m3.jpeg",
      "/brand/porsche-gt3-lifestyle.jpeg",
      "/brand/porsche-gt3.jpeg",
    ],
    specs: [
      { label: "Models", value: "BMW M3 / Porsche 911 GT3" },
      { label: "Material", value: "PLA+ plastic" },
      { label: "Mount", value: "Wall-mounted" },
      { label: "Function", value: "Wall decor + key hooks" },
      { label: "Best for", value: "Entryway / desk wall" },
    ],
  },
  {
    slug: "mecha-chameleon",
    name: "Mecha Chameleon",
    category: "DIY Kit",
    priceEgp: 300,
    tagline: "The blank canvas collectible.",
    priceNote: "Includes 3 paint colours of your choice — mix them for more.",
    blurb: "A premium unpainted figure and everything you need to make it unmistakably yours.",
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
      { label: "Finish", value: "Ships white — you paint it" },
      { label: "Difficulty", value: "Beginner friendly" },
      { label: "Best for", value: "First-time painters & collectors" },
    ],
    insideBox: [
      "One premium unpainted collectible figure",
      "Three paint pots (colours of your choice)",
      "One quality brush",
      "Instruction card with QR code linking to tutorials",
      "Premium protective packaging",
    ],
  },
  {
    slug: "powerpuff-girls",
    name: "Powerpuff Girls — DIY Figure",
    category: "DIY Kit",
    priceEgp: 300,
    tagline: "Ships white. You bring the colour.",
    priceNote: "Ships white & unpainted — includes 3 colours of your choice. Paint any of the girls.",
    variants: [
      { name: "Blossom · Red", images: ["/brand/red.png"] },
      { name: "Bubbles · Blue", images: ["/brand/blue.png"] },
      { name: "Buttercup · Green", images: ["/brand/green.png"] },
    ],
    blurb: "A blank Powerpuff figure that ships pure white — paint Blossom, Bubbles or Buttercup yourself.",
    story:
      "This one arrives completely white and unpainted — the fun is making it yours. It ships white; click a girl above to preview how she looks painted (red Blossom, blue Bubbles, green Buttercup) — or go completely off-script. It comes with any 3 paint colours of your choice, and our Color Lab shows you how to mix the rest.",
    heroImage: "/brand/red.png",
    images: ["/brand/red1.png"],
    specs: [
      { label: "Type", value: "DIY paint kit" },
      { label: "Finish", value: "Ships white — you paint it" },
      { label: "Paint as", value: "Blossom / Bubbles / Buttercup" },
      { label: "Difficulty", value: "Beginner friendly" },
    ],
    insideBox: [
      "One white, unpainted Powerpuff figure",
      "Three paint pots (colours of your choice)",
      "One quality brush",
      "Instruction card with QR code linking to tutorials",
      "Premium protective packaging",
    ],
  },
  {
    slug: "monkey-d-luffy-shadow-lamp",
    name: "Monkey D. Luffy — Shadow Lamp",
    category: "Lighting",
    priceEgp: 900,
    tagline: "Cast the Wanted poster on your wall.",
    blurb: "A warm-LED shadow lamp that throws Luffy's ‘Wanted’ silhouette across the room.",
    story:
      "Part lamp, part poster, part statement. Switch it on in a low-lit room and Luffy's ‘Dead or Alive’ bounty spills across your wall as a giant living shadow. It is ambient lighting for people who decorate with their fandom, not around it.",
    heroImage: "/brand/luffy-lamp.jpeg",
    images: ["/brand/luffy-lamp.jpeg", "/brand/luffy-lamp1.jpeg"],
    specs: [
      { label: "Theme", value: "One Piece — Luffy ‘Wanted’" },
      { label: "Light", value: "Warm white LED" },
      { label: "Power", value: "2 × AA batteries" },
      { label: "Effect", value: "Wall shadow projection" },
      { label: "Best in", value: "Low light" },
    ],
    spotlight: true,
  },
  {
    slug: "toothless-phone-holder",
    name: "Toothless & Light Fury — Phone Holder",
    category: "Accessories",
    priceEgp: 400,
    tagline: "A dragon that holds your phone.",
    variants: [
      { name: "Night Fury · Black", images: ["/brand/toothless.png"] },
      { name: "Light Fury · White", images: ["/brand/light-fury.png"] },
    ],
    blurb: "The Night Fury (and his Light Fury) reimagined as a desk phone stand.",
    story:
      "Toothless curls up on your desk and props your phone at the perfect angle — in landscape for videos or portrait for scrolling. Pick the black Night Fury or the white Light Fury to match your setup.",
    heroImage: "/brand/toothless.png",
    images: ["/brand/toothless.png", "/brand/light-fury.png"],
    specs: [
      { label: "Characters", value: "Night Fury / Light Fury" },
      { label: "Function", value: "Phone / mobile stand" },
      { label: "Fits", value: "Most phones, any orientation" },
      { label: "Material", value: "PLA+ plastic" },
      { label: "Colours", value: "Black or White" },
    ],
  },
  {
    slug: "spongebob-money-card-holder",
    name: "SpongeBob Money — Card Holder",
    category: "Accessories",
    priceEgp: 300,
    tagline: "Your bank card, hidden in a SpongeBob dollar.",
    variants: [
      { name: "Green", images: ["/brand/sponge-visa.png", "/brand/sponge-visa1.png"] },
      { name: "Blue" },
      { name: "Pink" },
    ],
    blurb: "A slim card holder shaped like the SpongeBob dollar — slide your Visa or bank card inside and pay with it anywhere.",
    story:
      "It looks like Bikini Bottom money, but it holds your real money. Slot your Visa or bank card into it and the card stays tucked inside while you carry it and pay wherever you go — no separate wallet needed. A fun everyday-carry piece that people will actually ask about at the till. Comes in green, blue or pink.",
    heroImage: "/brand/sponge-visa.png",
    images: ["/brand/sponge-visa.png", "/brand/sponge-visa1.png"],
    specs: [
      { label: "Function", value: "Holds your Visa / bank card — pay with it anywhere" },
      { label: "Style", value: "SpongeBob dollar bill" },
      { label: "Colours", value: "Green / Blue / Pink" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "alien-incense-holder",
    name: "Alien — Incense Holder",
    category: "Incense",
    priceEgp: 350,
    tagline: "Chill alien, cosmic smoke.",
    blurb: "A laid-back alien and a crashed UFO catch the ash while your incense drifts.",
    story:
      "The most relaxed extraterrestrial in the galaxy reclines on an ash tray while your incense stick smoulders overhead — a crashed saucer on the other end completes the scene. Equal parts desk toy and calming ritual.",
    heroImage: "/brand/incense.png",
    images: ["/brand/incense.png"],
    specs: [
      { label: "Theme", value: "Alien / UFO" },
      { label: "Type", value: "Incense stick holder" },
      { label: "Tray", value: "Ash-catching base" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "archer-incense-holder",
    name: "Archer — Incense Holder",
    category: "Incense",
    priceEgp: 350,
    tagline: "The stick is the arrow.",
    blurb: "A hooded archer draws back — and your incense stick becomes the arrow.",
    story:
      "Clever and cinematic: the archer nocks your incense stick like an arrow, aimed down the length of a Celtic-patterned tray that catches the ash. A centrepiece for anyone who loves fantasy and a slow-burning ritual.",
    heroImage: "/brand/incense1.png",
    images: ["/brand/incense1.png"],
    specs: [
      { label: "Theme", value: "Fantasy archer" },
      { label: "Type", value: "Incense stick holder" },
      { label: "Tray", value: "Ash-catching base" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "sun-wukong-incense-holder",
    name: "Sun Wukong — Incense Holder",
    category: "Incense",
    priceEgp: 350,
    tagline: "The Monkey King's staff of smoke.",
    blurb: "Sun Wukong holds your incense stick like his legendary staff.",
    story:
      "The Monkey King, mid-stance, grips your incense stick like the Ruyi Jingu Bang itself. A striking piece for fans of Journey to the West and anyone who likes their desk with a little myth.",
    heroImage: "/brand/incense2.png",
    images: ["/brand/incense2.png"],
    specs: [
      { label: "Theme", value: "Sun Wukong (Monkey King)" },
      { label: "Type", value: "Incense stick holder" },
      { label: "Tray", value: "Ash-catching base" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "samurai-incense-holder",
    name: "Samurai — Incense Holder",
    category: "Incense",
    priceEgp: 350,
    tagline: "Still blade, drifting smoke.",
    blurb: "A crouched samurai holds your incense stick like a drawn spear.",
    story:
      "Poised and patient, the samurai holds your incense stick like a spear across a wave-patterned tray. Calm, deliberate, and quietly dramatic — the kind of piece that sets the mood of a whole room.",
    heroImage: "/brand/incense3.png",
    images: ["/brand/incense3.png"],
    specs: [
      { label: "Theme", value: "Samurai warrior" },
      { label: "Type", value: "Incense stick holder" },
      { label: "Tray", value: "Ash-catching base" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getSpotlight(): Product {
  return PRODUCTS.find((p) => p.spotlight) ?? PRODUCTS[PRODUCTS.length - 1];
}

export function relatedProducts(slug: string): Product[] {
  const current = getProduct(slug);
  const others = PRODUCTS.filter((p) => p.slug !== slug);
  // Prefer same-category products first.
  const sameCat = others.filter((p) => p.category === current?.category);
  const rest = others.filter((p) => p.category !== current?.category);
  return [...sameCat, ...rest].slice(0, 2);
}
