export const SITE = {
  name: "PaintVerse",
  tagline: "Where Collectors Create",
  description:
    "Premium collectibles, DIY kits and limited creations designed for people who love to collect, create and display.",
  url: "https://paintverse.example", // replace with real domain at launch
  contactEmail: "Esmailahmed266@gmail.com",
  whatsapp: {
    number: "201002180484", // wa.me format, no + or spaces
    display: "+20 100 218 0484",
  },
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "TikTok", href: "https://tiktok.com/" },
    { label: "WhatsApp", href: "https://wa.me/201002180484" },
  ],
  nav: [
    { label: "Collections", href: "/collections" },
    { label: "Color Lab", href: "/color-lab" },
    { label: "Community", href: "/community" },
    { label: "About", href: "/about" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Shipping & Returns", href: "/shipping-returns" },
    { label: "Safety & Age", href: "/safety" },
  ],
} as const;
