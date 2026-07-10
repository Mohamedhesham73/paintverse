export const SITE = {
  name: "PaintVerse",
  tagline: "Paint Your Universe",
  description:
    "Premium DIY collectible kits — unpainted figures with everything you need to bring them to life.",
  url: "https://paintverse.example", // replace with real domain at launch
  contactEmail: "hello@paintverse.example",
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
    { label: "YouTube", href: "https://youtube.com/" },
  ],
  nav: [
    { label: "Shop", href: "/shop" },
    { label: "Gallery", href: "/gallery" },
    { label: "About", href: "/about" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Safety & Age", href: "/safety" },
  ],
} as const;
