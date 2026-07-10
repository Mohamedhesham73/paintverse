import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/content/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="July 2026">
      <p>By accessing {SITE.name}, you agree to these Terms of Service.</p>
      <h2>Use of the site</h2>
      <p>You may browse and use this site for personal, non-commercial purposes. You agree not to misuse the site, attempt to disrupt it, or access it in unauthorized ways.</p>
      <h2>Intellectual property</h2>
      <p>All content, branding, figure designs, and imagery on this site are the property of {SITE.name} and may not be reproduced without permission.</p>
      <h2>Products &amp; availability</h2>
      <p>Product information is provided for preview. Availability, pricing (shown in EGP), and specifications may change. Purchasing functionality will be governed by additional terms when introduced.</p>
      <h2>Limitation of liability</h2>
      <p>The site is provided &quot;as is&quot; without warranties. {SITE.name} is not liable for any indirect or incidental damages arising from use of the site.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Arab Republic of Egypt.</p>
      <h2>Contact</h2>
      <p>Email <Link href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</Link>.</p>
    </LegalPage>
  );
}
