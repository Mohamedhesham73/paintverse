import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p>This Privacy Policy explains how {SITE.name} collects, uses, and protects your information when you use our website.</p>
      <h2>Information we collect</h2>
      <p>When you join our newsletter or a product waitlist, we collect the email address you provide and the source of the signup. We may collect basic, anonymized analytics about site usage.</p>
      <h2>How we use it</h2>
      <p>We use your email only to send you the updates you signed up for (launch news, tutorials, and product availability). We do not sell your data.</p>
      <h2>Cookies</h2>
      <p>We use only essential cookies required for the site to function. If we add analytics, we will update this policy.</p>
      <h2>Data storage</h2>
      <p>Signup data is stored securely in our database (Google Firebase/Firestore) and is not publicly readable.</p>
      <h2>Your rights</h2>
      <p>You can request access to or deletion of your data at any time by contacting us at <Link href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</Link>.</p>
      <h2>Contact</h2>
      <p>Questions? Email <Link href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</Link>.</p>
    </LegalPage>
  );
}
