import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/legal/LegalPage";
import { SITE } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p>This Privacy Policy explains how {SITE.name} handles your information when you use our website and contact us.</p>
      <h2>Information we collect</h2>
      <p>
        This website does not run accounts or online checkout. We only receive the information you choose to send us
        directly — for example, the message and phone number you share when you contact us on WhatsApp ({SITE.whatsapp.display})
        or by email. We may collect basic, anonymized analytics about site usage.
      </p>
      <h2>How we use it</h2>
      <p>We use your details only to respond to you, arrange your order, and provide support. We do not sell your data.</p>
      <h2>Cookies</h2>
      <p>We use only essential cookies required for the site to function. If we add analytics, we will update this policy.</p>
      <h2>Third parties</h2>
      <p>
        Messages you send us travel over WhatsApp and email, which are operated by their own providers under their own
        privacy policies. The site itself is hosted on Vercel.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask us to access or delete the information you&apos;ve shared at any time by contacting us at{" "}
        <Link href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</Link>.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? Email <Link href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</Link> or message us on WhatsApp.
      </p>
    </LegalPage>
  );
}
