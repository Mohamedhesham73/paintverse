export const SITE = {
  name: "PaintVerse",
  tagline: "Where Collectors Create",
  description:
    "Premium collectibles, DIY kits and limited creations designed for people who love to collect, create and display.",
  url: "https://paintverse.example", // replace with real domain at launch
  contactEmail: "printverse266@gmail.com",
  whatsapp: {
    number: "201043057484", // wa.me format, no + or spaces
    display: "+20 104 305 7484",
  },
  socials: [
    { label: "Instagram", href: "https://www.instagram.com/printverse_2" },
    { label: "Facebook", href: "https://www.facebook.com/share/19RSnpVHtM/" },
    { label: "TikTok", href: "https://www.tiktok.com/@printverse_1" },
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
