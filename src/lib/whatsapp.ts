import { SITE } from "@/content/site";

/** Build a wa.me deep link with a pre-filled message. */
export function waLink(message: string): string {
  return `https://wa.me/${SITE.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

/** Order a specific product via WhatsApp. */
export function orderLink(productName: string): string {
  return waLink(`Hi PaintVerse! I'd like to order the ${productName}. Is it available?`);
}

/** Generic "get in touch" WhatsApp link. */
export function contactLink(): string {
  return waLink("Hi PaintVerse! I have a question about your collectibles.");
}
