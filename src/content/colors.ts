export interface BaseColor {
  name: string;
  hex: string;
}

/** The 12 pigments PaintVerse stocks. Customers pick any 3 in a kit. */
export const BASE_COLORS: BaseColor[] = [
  { name: "Titanium White", hex: "#F6F5F0" },
  { name: "Lamp Black", hex: "#16151A" },
  { name: "Raw Umber", hex: "#5A3D25" },
  { name: "Primary Yellow", hex: "#FFCE00" },
  { name: "Lemon Yellow", hex: "#F1E64A" },
  { name: "Orange", hex: "#F5731B" },
  { name: "Scarlet Red", hex: "#E02B22" },
  { name: "Cobalt Blue", hex: "#234E9E" },
  { name: "Violet", hex: "#6A2C8F" },
  { name: "Beige", hex: "#E7D6AE" },
  { name: "Cerulean Blue", hex: "#1E9BD7" },
  { name: "Emerald Green", hex: "#0F9D63" },
];

const HEX_BY_NAME: Record<string, string> = Object.fromEntries(
  BASE_COLORS.map((c) => [c.name, c.hex]),
);

export function colorHex(name: string): string {
  return HEX_BY_NAME[name] ?? "#666";
}

export interface Recipe {
  name: string;
  hex: string;
  parts: string[]; // base color names
  tip?: string;
}

/** Simple, real mixing recipes using only the 12 base pigments. */
export const RECIPES: Recipe[] = [
  { name: "Pink", hex: "#F4A6B0", parts: ["Titanium White", "Scarlet Red"], tip: "Start from white, add red a drop at a time." },
  { name: "Sky Blue", hex: "#8FC7E8", parts: ["Titanium White", "Cerulean Blue"] },
  { name: "Navy", hex: "#1B2B4A", parts: ["Cobalt Blue", "Lamp Black"], tip: "Only a touch of black." },
  { name: "Teal", hex: "#0E7C7B", parts: ["Emerald Green", "Cerulean Blue"] },
  { name: "Turquoise", hex: "#3EC3C0", parts: ["Cerulean Blue", "Emerald Green", "Titanium White"] },
  { name: "Mint", hex: "#A7E0C4", parts: ["Emerald Green", "Titanium White"] },
  { name: "Lime", hex: "#B6D64B", parts: ["Lemon Yellow", "Emerald Green"] },
  { name: "Forest Green", hex: "#0C5A38", parts: ["Emerald Green", "Lamp Black"] },
  { name: "Olive", hex: "#6B6A2E", parts: ["Emerald Green", "Raw Umber"] },
  { name: "Coral", hex: "#F4795E", parts: ["Orange", "Scarlet Red", "Titanium White"] },
  { name: "Peach", hex: "#F6C9A6", parts: ["Orange", "Titanium White", "Beige"] },
  { name: "Skin Tone", hex: "#E4B98E", parts: ["Beige", "Titanium White", "Orange"], tip: "Nudge with a speck of red or umber." },
  { name: "Gold / Ochre", hex: "#C99A2E", parts: ["Primary Yellow", "Raw Umber"] },
  { name: "Rust", hex: "#A6461F", parts: ["Orange", "Raw Umber"] },
  { name: "Brown", hex: "#6E4A2E", parts: ["Orange", "Lamp Black"], tip: "Or start from Raw Umber and warm it up." },
  { name: "Maroon", hex: "#7A1F1E", parts: ["Scarlet Red", "Lamp Black"] },
  { name: "Magenta", hex: "#B02A6B", parts: ["Scarlet Red", "Violet"] },
  { name: "Lavender", hex: "#B79CD6", parts: ["Violet", "Titanium White"] },
  { name: "Cream", hex: "#F1E7C8", parts: ["Titanium White", "Beige"], tip: "A warm off-white for backgrounds." },
  { name: "Grey", hex: "#9A9A9E", parts: ["Titanium White", "Lamp Black"] },
];

export interface Rule {
  title: string;
  body: string;
}

export const RULES: Rule[] = [
  {
    title: "Lighten with White",
    body: "Titanium White makes any colour lighter and softer (a tint). Add colour to white, never the other way — white wins fast.",
  },
  {
    title: "Deepen with Black",
    body: "Lamp Black darkens a colour into a shade. It is powerful — a tiny amount goes a long way, so add it in specks.",
  },
  {
    title: "Mute with Raw Umber",
    body: "Raw Umber calms colours that feel too bright and builds natural browns, olives and skin tones without going muddy.",
  },
];
