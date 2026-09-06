export type Category = "DIY Kit" | "Lighting" | "Wall Decor" | "Accessories" | "Incense";

export const CATEGORIES: Category[] = ["DIY Kit", "Wall Decor", "Lighting", "Accessories", "Incense"];

export interface Spec {
  label: string;
  value: string;
}

export interface Package {
  name: string;
  pieces?: number;
  priceEgp: number;
  image?: string; // photo of this specific package
}

export interface Product {
  slug: string;
  name: string;
  category: Category; // primary category (shown on the card badge)
  also?: Category[]; // extra categories this product also appears under in filters
  priceEgp: number;
  /** Optional original price shown struck-through (for a discount). */
  compareAtEgp?: number;
  tagline: string;
  /** Optional note shown under the price (e.g. what's included / ships white). */
  priceNote?: string;
  /** Optional variants; selecting one swaps the gallery to its own images (when provided). */
  variants?: { name: string; images?: string[] }[];
  /** Optional multi-piece packages, each with its own price. */
  packages?: Package[];
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
      { name: "BMW M5 · White", images: ["/brand/bmw-m5.jpeg"] },
      { name: "Porsche 911 GT3 · Graphite", images: ["/brand/porsche-gt3-lifestyle.jpeg", "/brand/porsche-gt3.jpeg"] },
      { name: "Lamborghini · Lime", images: ["/brand/lamborghini.jpeg", "/brand/lamborghini1.jpeg"] },
      { name: "Lamborghini · Orange", images: ["/brand/lamborghini1.jpeg"] },
    ],
    blurb: "A supercar rear captured in 3D — half sculpture, half key holder.",
    story:
      "Badge, diffuser, wing and quad tips, all captured in 3D and hung on your wall. Built-in hooks turn it into a statement key holder by the door, or pure petrolhead art above the desk. Choose your machine — BMW M3, BMW M5, Porsche 911 GT3 or Lamborghini — same price, same wow factor.",
    heroImage: "/brand/bmw-m3-lifestyle.jpeg",
    images: [
      "/brand/bmw-m3-lifestyle.jpeg",
      "/brand/bmw-m3.jpeg",
      "/brand/bmw-m5.jpeg",
      "/brand/porsche-gt3-lifestyle.jpeg",
      "/brand/porsche-gt3.jpeg",
      "/brand/lamborghini.jpeg",
      "/brand/lamborghini1.jpeg",
    ],
    specs: [
      { label: "Models", value: "BMW M3 / M5 / Porsche GT3 / Lamborghini" },
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
    priceNote: "For every bundle you choose which poses you want and which paint colours you get — then mix for even more.",
    packages: [
      { name: "Bundle 1", pieces: 3, priceEgp: 300, image: "/brand/package1.jpeg" },
      { name: "Bundle 2", pieces: 5, priceEgp: 400 },
      { name: "Bundle 3", pieces: 8, priceEgp: 500 },
    ],
    blurb: "A premium unpainted figure and everything you need to make it unmistakably yours.",
    story:
      "Mecha Chameleon is where every PaintVerse story begins. You get clean, characterful figures and a curated starter kit — pick the poses you want and the paint colours you like, then mix your way to the rest. Prime it, paint it, seal it, and put something on your shelf that no one else on earth owns. Grab a bigger bundle to paint with friends or gift the extras.",
    heroImage: "/brand/pose-1.png",
    images: [
      "/brand/package1.jpeg",
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
      { label: "Bundles", value: "3 / 5 / 8 pieces" },
      { label: "Difficulty", value: "Beginner friendly" },
    ],
    insideBox: [
      "Premium unpainted collectible figures (3, 5 or 8)",
      "Three paint pots (colours of your choice)",
      "One quality brush",
      "Premium protective packaging",
    ],
  },
  {
    slug: "powerpuff-girls",
    name: "Powerpuff Girls — DIY Figure",
    category: "DIY Kit",
    priceEgp: 350,
    tagline: "Ships white. You bring the colour.",
    priceNote: "Ships white & unpainted — includes 3 colours of your choice. Paint any of the girls.",
    variants: [
      { name: "Blossom · Red", images: ["/brand/red.png", "/brand/red1.png"] },
      { name: "Bubbles · Blue", images: ["/brand/blue.png", "/brand/blue1.jpeg", "/brand/blue2.jpeg", "/brand/blue3.jpeg"] },
      { name: "Buttercup · Green", images: ["/brand/green.png"] },
    ],
    blurb: "A blank Powerpuff figure that ships pure white — paint Blossom, Bubbles or Buttercup yourself.",
    story:
      "This one arrives completely white and unpainted — the fun is making it yours. It ships white; click a girl above to preview how she looks painted (red Blossom, blue Bubbles, green Buttercup) — or go completely off-script. It comes with any 3 paint colours of your choice, and our Color Lab shows you how to mix the rest.",
    heroImage: "/brand/red.png",
    images: ["/brand/blue1.jpeg", "/brand/blue2.jpeg", "/brand/blue3.jpeg", "/brand/red1.png"],
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
      "Premium protective packaging",
    ],
  },
  {
    slug: "shadow-lamp",
    name: "Shadow Lamp — One Piece",
    category: "Lighting",
    also: ["Wall Decor"],
    priceEgp: 900,
    tagline: "Cast a Wanted poster on your wall.",
    variants: [
      { name: "Luffy · Wanted", images: ["/brand/luffy-lamp.jpeg", "/brand/luffy-lamp1.jpeg"] },
      { name: "Luffy · Gear 5", images: ["/brand/luffy-gear5.jpeg"] },
      { name: "Zoro · Wanted", images: ["/brand/zorro-lamp.jpeg"] },
    ],
    blurb: "A warm-LED shadow lamp that throws a One Piece ‘Wanted’ silhouette across the room.",
    story:
      "Part lamp, part poster, part statement. Switch it on in a low-lit room and your pick — Luffy, Luffy in Gear 5, or Zoro — spills across the wall as a giant living shadow, framed by their ‘Wanted’ bounty. Ambient lighting for people who decorate with their fandom, not around it.",
    heroImage: "/brand/luffy-lamp.jpeg",
    images: ["/brand/luffy-lamp.jpeg", "/brand/luffy-lamp1.jpeg", "/brand/luffy-gear5.jpeg", "/brand/zorro-lamp.jpeg"],
    specs: [
      { label: "Theme", value: "One Piece — Luffy / Zoro" },
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
    priceEgp: 200,
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
    compareAtEgp: 500,
    tagline: "Your bank card, hidden in a SpongeBob dollar.",
    variants: [
      { name: "Green", images: ["/brand/sponge-visa.png", "/brand/sponge-visa1.png"] },
      { name: "Pink", images: ["/brand/sponge-visa-pink.png"] },
      { name: "Blue" },
    ],
    blurb: "A slim card holder shaped like the SpongeBob dollar — slide your Visa or bank card inside and pay with it anywhere.",
    story:
      "It looks like Bikini Bottom money, but it holds your real money. Slot your Visa or bank card into it and the card stays tucked inside while you carry it and pay wherever you go — no separate wallet needed. A fun everyday-carry piece that people will actually ask about at the till. Comes in green or pink (blue coming soon).",
    heroImage: "/brand/sponge-visa.png",
    images: ["/brand/sponge-visa.png", "/brand/sponge-visa1.png"],
    specs: [
      { label: "Function", value: "Holds your Visa / bank card — pay with it anywhere" },
      { label: "Style", value: "SpongeBob dollar bill" },
      { label: "Colours", value: "Green / Pink (Blue soon)" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "stitch-phone-holder",
    name: "Stitch — Phone Holder",
    category: "Accessories",
    priceEgp: 350,
    tagline: "Experiment 626, holding your phone.",
    blurb: "A full-colour Stitch that props your phone at the perfect angle.",
    story:
      "Stitch sits on your desk and leans your phone back for hands-free scrolling or videos. Hand-finished in his classic blue with pink ears — the cutest desk upgrade you'll make.",
    heroImage: "/brand/stitch.jpeg",
    images: ["/brand/stitch.jpeg", "/brand/stitch1.jpeg", "/brand/stitch2.jpeg"],
    specs: [
      { label: "Character", value: "Stitch (full colour)" },
      { label: "Function", value: "Phone / mobile stand" },
      { label: "Fits", value: "Most phones" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "stitch-phone-holder-blue",
    name: "Stitch — Phone Holder (All Blue)",
    category: "Accessories",
    priceEgp: 200,
    tagline: "The minimalist Stitch.",
    blurb: "A clean, all-blue Stitch phone stand — same pose, single colour.",
    story:
      "Same lovable Experiment 626 propping up your phone, finished in a single clean blue. A more understated — and more affordable — take on the desk favourite.",
    heroImage: "/brand/stitch-blue.jpeg",
    images: ["/brand/stitch-blue.jpeg"],
    specs: [
      { label: "Character", value: "Stitch (all blue)" },
      { label: "Function", value: "Phone / mobile stand" },
      { label: "Fits", value: "Most phones" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "rabbit-phone-holder",
    name: "Rabbit — Phone Holder",
    category: "Accessories",
    priceEgp: 150,
    tagline: "A sleepy bunny for your desk.",
    blurb: "A chubby little rabbit that cradles your phone while it naps.",
    story:
      "This roly-poly bunny lies back and holds your phone at a comfy viewing angle. Small, soft-looking and impossibly cute — the friendliest thing on your desk.",
    heroImage: "/brand/rabbit.jpeg",
    images: ["/brand/rabbit.jpeg", "/brand/rabbit1.jpeg", "/brand/rabbit2.jpeg"],
    specs: [
      { label: "Design", value: "Chubby rabbit" },
      { label: "Function", value: "Phone / mobile stand" },
      { label: "Fits", value: "Most phones" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "alien-incense-holder",
    name: "Alien — Incense Holder",
    category: "Incense",
    priceEgp: 300,
    tagline: "Chill alien, cosmic smoke.",
    blurb: "A laid-back alien and a crashed UFO catch the ash while your incense drifts.",
    story:
      "The most relaxed extraterrestrial in the galaxy reclines on an ash tray while your incense stick smoulders overhead — a crashed saucer on the other end completes the scene. Equal parts desk toy and calming ritual.",
    heroImage: "/brand/incense.jpeg",
    images: ["/brand/incense.jpeg"],
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
    priceEgp: 300,
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
    heroImage: "/brand/incense2.jpeg",
    images: ["/brand/incense2.jpeg"],
    specs: [
      { label: "Theme", value: "Sun Wukong (Monkey King)" },
      { label: "Type", value: "Incense stick holder" },
      { label: "Tray", value: "Ash-catching base" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "samurai-posing-incense-holder",
    name: "Samurai warrior posing - incense stick holder",
    category: "Incense",
    priceEgp: 300,
    tagline: "Still blade, drifting smoke.",
    blurb: "A crouched samurai holds your incense stick like a drawn spear.",
    story:
      "Poised and patient, the samurai holds your incense stick like a spear across a wave-patterned tray. Calm, deliberate, and quietly dramatic — the kind of piece that sets the mood of a whole room.",
    heroImage: "/brand/incense3.jpeg",
    images: ["/brand/incense3.jpeg"],
    specs: [
      { label: "Theme", value: "Samurai warrior" },
      { label: "Type", value: "Incense stick holder" },
      { label: "Tray", value: "Ash-catching base" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "samurai-striking-incense-holder",
    name: "Samurai striking - incense stick holder",
    category: "Incense",
    priceEgp: 250,
    tagline: "Mid-strike, mid-burn.",
    variants: [
      { name: "Black", images: ["/brand/incense4.jpeg"] },
      { name: "White", images: ["/brand/incense4white.jpeg"] },
    ],
    blurb: "A samurai lunges into a strike, your incense stick held out like a long blade.",
    story:
      "Caught in a full lunging strike, this samurai extends your incense stick like a reaching blade across a long tray that catches the ash. Dynamic and dramatic — a centrepiece for a calm, deliberate ritual.",
    heroImage: "/brand/incense4.jpeg",
    images: ["/brand/incense4.jpeg"],
    specs: [
      { label: "Theme", value: "Samurai warrior" },
      { label: "Type", value: "Incense stick holder" },
      { label: "Tray", value: "Ash-catching base" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "skeleton-incense-holder",
    name: "Skeleton — Incense Holder",
    category: "Incense",
    priceEgp: 150,
    tagline: "Rest in smoke.",
    blurb: "A laid-back skeleton reclines with your incense stick in hand.",
    story:
      "Kicked back and utterly relaxed, this skeleton holds your incense stick while the ash drops along its frame. Equal parts spooky and chill — a year-round desk piece, not just for October.",
    heroImage: "/brand/skeleton-incense.jpeg",
    images: ["/brand/skeleton-incense.jpeg", "/brand/skeleton-incense1.jpeg"],
    specs: [
      { label: "Theme", value: "Skeleton" },
      { label: "Type", value: "Incense stick holder" },
      { label: "Tray", value: "Ash-catching base" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "hand-incense-holder",
    name: "Hand — Incense Holder",
    category: "Incense",
    priceEgp: 200,
    tagline: "An offering of smoke.",
    blurb: "An elegant sculpted hand holding your incense stick aloft.",
    story:
      "A graceful open hand rises from a small base to hold your incense stick like an offering. Minimal, sculptural and calming — the most elegant way to burn incense on a desk or shelf.",
    heroImage: "/brand/hand-incense.jpeg",
    images: ["/brand/hand-incense.jpeg"],
    specs: [
      { label: "Theme", value: "Sculpted hand" },
      { label: "Type", value: "Incense stick holder" },
      { label: "Base", value: "Ash-catching base" },
      { label: "Material", value: "PLA+ plastic" },
    ],
  },
  {
    slug: "frog-incense-holder",
    name: "Frog — Incense Holder",
    category: "Incense",
    priceEgp: 350,
    tagline: "Zen on a lily pad.",
    blurb: "A chilled-out frog lounges on a leaf with your incense stick.",
    story:
      "The most relaxed amphibian around, kicked back on a leaf tray with your incense stick in its mouth and the ash caught below. Bright, playful and instantly calming.",
    heroImage: "/brand/frog-incense.jpeg",
    images: ["/brand/frog-incense.jpeg"],
    specs: [
      { label: "Theme", value: "Frog on a leaf" },
      { label: "Type", value: "Incense stick holder" },
      { label: "Tray", value: "Leaf ash-catcher" },
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
  const sameCat = others.filter((p) => p.category === current?.category);
  const rest = others.filter((p) => p.category !== current?.category);
  return [...sameCat, ...rest].slice(0, 2);
}

/** Lowest price to advertise — the cheapest package if any, else the base price. */
export function startingPriceEgp(p: Product): number {
  return p.packages && p.packages.length ? Math.min(...p.packages.map((x) => x.priceEgp)) : p.priceEgp;
}

/** True when the advertised price should read "From …" (product has packages). */
export function isFromPrice(p: Product): boolean {
  return !!(p.packages && p.packages.length);
}
