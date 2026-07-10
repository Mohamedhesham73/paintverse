import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/content/site";

export const metadata: Metadata = { title: "Safety & Age Notice" };

export default function Safety() {
  return (
    <LegalPage title="Safety & Age Notice" updated="July 2026">
      <p>PaintVerse kits are creative products that include small parts and paint. Please read this notice before use.</p>
      <h2>Small parts — choking hazard</h2>
      <p>Kits contain small parts and are <strong>not suitable for children under 3 years</strong>. We recommend PaintVerse kits for ages 14 and up.</p>
      <h2>Paint safety</h2>
      <p>Our starter paints are water-based and non-toxic. Paint in a well-ventilated area, avoid contact with eyes and mouth, and wash hands after use. Keep away from young children and pets.</p>
      <h2>Adult supervision</h2>
      <p>Younger painters should be supervised by an adult, especially when handling small parts and brushes.</p>
      <h2>Storage</h2>
      <p>Store paints tightly closed at room temperature, away from direct sunlight.</p>
      <h2>Contact</h2>
      <p>Questions about safety? Email <Link href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</Link>.</p>
    </LegalPage>
  );
}
