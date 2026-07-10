import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/content/site";

export const metadata: Metadata = { title: "Shipping & Returns" };

export default function ShippingReturns() {
  return (
    <LegalPage title="Shipping & Returns" updated="July 2026">
      <p>This page explains how we ship PaintVerse kits and how returns work. Details will be finalized as we launch sales.</p>
      <h2>Shipping</h2>
      <p>We currently plan to ship within Egypt, with international shipping to follow. Estimated delivery times and costs will be shown at checkout when purchasing goes live.</p>
      <h2>Order processing</h2>
      <p>Orders are typically processed within 1–3 business days before dispatch.</p>
      <h2>Returns</h2>
      <p>Because kits include paints and consumables, unopened kits may be returned within 14 days of delivery for a refund of the item price. Opened or partially used kits are not eligible unless faulty.</p>
      <h2>Damaged or faulty items</h2>
      <p>If your kit arrives damaged, contact us within 7 days with photos and we will make it right.</p>
      <h2>Contact</h2>
      <p>Email <Link href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</Link>.</p>
    </LegalPage>
  );
}
