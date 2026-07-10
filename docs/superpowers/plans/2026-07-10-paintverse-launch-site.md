# PaintVerse V1 Launch Site — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship a premium, browse-only PaintVerse brand launch site (Studio Dark theme) that captures newsletter/waitlist emails into a write-only Firestore collection, deployable to Vercel.

**Architecture:** Next.js App Router + TypeScript. Presentational React components consume typed content data files. Email capture flows through a Next.js Server Action to a Firestore `signups` collection whose security rules allow create-only. Styling via Tailwind design tokens; animation via Framer Motion. Security via env-only secrets, HTTP security headers, locked Firestore rules, and honeypot form validation.

**Tech Stack:** Next.js (App Router), TypeScript (strict), Tailwind CSS, Framer Motion, Firebase Web SDK + Firestore, Vitest + React Testing Library, Vercel.

**Spec:** `docs/superpowers/specs/2026-07-10-paintverse-launch-site-design.md`

---

## Conventions used in this plan

- Package manager: **npm**.
- Path alias: `@/*` → project root `src/*` (configured by scaffold).
- Every component file default-exports the named component.
- Run all commands from the project root: `D:\Mohamed\my-own-fuckin-work-bitches\PaintVerse\PaintVerse`.
- Commit after each task with the message shown.

---

## File structure (created across tasks)

```
src/
  app/
    layout.tsx                 # root layout, fonts, metadata, <body> theme
    page.tsx                   # home
    globals.css                # Tailwind + base theme
    shop/page.tsx              # product grid
    shop/mecha-chameleon/page.tsx
    gallery/page.tsx
    about/page.tsx
    privacy/page.tsx
    terms/page.tsx
    shipping-returns/page.tsx
    safety/page.tsx
    not-found.tsx
    sitemap.ts
    robots.ts
    actions/signup.ts          # 'use server' action
  components/
    layout/Navbar.tsx
    layout/Footer.tsx
    home/Hero.tsx
    home/FeaturedCollections.tsx
    home/HowItWorks.tsx
    home/GalleryPreview.tsx
    home/AboutTeaser.tsx
    home/NewsletterCTA.tsx
    product/ProductCard.tsx
    product/ProductGrid.tsx
    product/ProductDetail.tsx
    product/ComingSoonCard.tsx
    forms/SignupForm.tsx
    ui/Button.tsx
    ui/Badge.tsx
    ui/GlassCard.tsx
    ui/SectionHeading.tsx
    ui/Reveal.tsx
    legal/LegalPage.tsx        # shared policy-page shell
  content/
    products.ts
    gallery.ts
    faqs.ts
    site.ts                    # nav links, socials, contact email
  lib/
    format.ts                  # formatPrice
    validation.ts              # signup input validation
    firebase.ts                # firebase app + firestore init
tests/
  lib/format.test.ts
  lib/validation.test.ts
  components/SignupForm.test.tsx
firestore.rules
next.config.ts                 # security headers
.env.example
```

---

## Task 0: Scaffold the Next.js project

**Files:**
- Create: whole Next.js app skeleton in project root.

- [ ] **Step 1: Scaffold in a temp dir and move into the existing repo**

The project root already contains git + brand PNGs + `docs/`. `create-next-app` refuses a non-empty dir, so scaffold in a temp subfolder then move files up.

Run:
```bash
npx --yes create-next-app@latest _scaffold --ts --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack --use-npm
```
Expected: creates `_scaffold/` with a working Next.js app.

- [ ] **Step 2: Move scaffold contents into project root, then remove temp dir**

Run (Git Bash):
```bash
shopt -s dotglob
mv _scaffold/* .
mv _scaffold/.eslintrc* . 2>/dev/null || true
rmdir _scaffold
shopt -u dotglob
```
Expected: `package.json`, `next.config.*`, `src/app/`, `tsconfig.json` now in root. (If `create-next-app` produced `.gitignore`, keep OUR existing `.gitignore` — restore it with `git checkout .gitignore` if overwritten.)

- [ ] **Step 3: Restore our .gitignore and add brand assets to /public**

Run:
```bash
git checkout .gitignore 2>/dev/null || true
mkdir -p public/brand
mv "app icon (home screen).png" public/brand/app-icon.png
mv "cover pic.png" public/brand/cover.png
mv "fav icon.png" public/brand/favicon-source.png
mv "nav bar icon.png" public/brand/nav-icon.png
```
Expected: brand images relocated under `public/brand/`.

- [ ] **Step 4: Install runtime deps**

Run:
```bash
npm install framer-motion firebase
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```
Expected: installs succeed.

- [ ] **Step 5: Verify dev build boots**

Run:
```bash
npm run build
```
Expected: build completes without errors (default template).

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app + relocate brand assets"
```

---

## Task 1: Vitest configuration

**Files:**
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Modify: `package.json` (add test script)

- [ ] **Step 1: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
```

- [ ] **Step 2: Create `vitest.setup.ts`**

```ts
import "@testing-library/jest-dom/vitest";
```

- [ ] **Step 3: Add test script to `package.json`**

Add to `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Verify Vitest runs (no tests yet)**

Run: `npm test`
Expected: exits 0 with "No test files found" (acceptable) OR passes if it detects none. If it errors on "no tests", that's fine to proceed.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts vitest.setup.ts package.json
git commit -m "chore: configure Vitest + RTL"
```

---

## Task 2: Currency formatting (TDD)

**Files:**
- Create: `src/lib/format.ts`
- Test: `tests/lib/format.test.ts`

- [ ] **Step 1: Write the failing test**

`tests/lib/format.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { formatPrice } from "@/lib/format";

describe("formatPrice", () => {
  it("formats EGP whole numbers without decimals", () => {
    expect(formatPrice(250)).toBe("EGP 250");
  });
  it("adds thousands separators", () => {
    expect(formatPrice(1250)).toBe("EGP 1,250");
  });
  it("handles zero", () => {
    expect(formatPrice(0)).toBe("EGP 0");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- format`
Expected: FAIL — cannot find module `@/lib/format`.

- [ ] **Step 3: Implement**

`src/lib/format.ts`:
```ts
export function formatPrice(amountEgp: number): string {
  return `EGP ${amountEgp.toLocaleString("en-US", { maximumFractionDigits: 0 })}`;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- format`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/format.ts tests/lib/format.test.ts
git commit -m "feat: add EGP price formatter"
```

---

## Task 3: Signup validation (TDD)

**Files:**
- Create: `src/lib/validation.ts`
- Test: `tests/lib/validation.test.ts`

- [ ] **Step 1: Write the failing test**

`tests/lib/validation.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { validateSignup } from "@/lib/validation";

describe("validateSignup", () => {
  it("accepts a valid email + known source", () => {
    const r = validateSignup({ email: "a@b.com", source: "newsletter", honeypot: "" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.email).toBe("a@b.com");
  });
  it("lowercases and trims email", () => {
    const r = validateSignup({ email: "  A@B.COM ", source: "newsletter", honeypot: "" });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.email).toBe("a@b.com");
  });
  it("rejects invalid email", () => {
    const r = validateSignup({ email: "nope", source: "newsletter", honeypot: "" });
    expect(r.ok).toBe(false);
  });
  it("rejects unknown source", () => {
    const r = validateSignup({ email: "a@b.com", source: "hacker", honeypot: "" });
    expect(r.ok).toBe(false);
  });
  it("rejects when honeypot is filled (bot)", () => {
    const r = validateSignup({ email: "a@b.com", source: "newsletter", honeypot: "x" });
    expect(r.ok).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- validation`
Expected: FAIL — cannot find module `@/lib/validation`.

- [ ] **Step 3: Implement**

`src/lib/validation.ts`:
```ts
export const SIGNUP_SOURCES = ["newsletter", "waitlist:mecha-chameleon"] as const;
export type SignupSource = (typeof SIGNUP_SOURCES)[number];

export interface SignupInput {
  email: string;
  source: string;
  honeypot: string;
}

export interface ValidSignup {
  email: string;
  source: SignupSource;
}

export type ValidationResult =
  | { ok: true; value: ValidSignup }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignup(input: SignupInput): ValidationResult {
  if (input.honeypot && input.honeypot.trim() !== "") {
    return { ok: false, error: "Rejected." };
  }
  const email = input.email.trim().toLowerCase();
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!SIGNUP_SOURCES.includes(input.source as SignupSource)) {
    return { ok: false, error: "Invalid signup source." };
  }
  return { ok: true, value: { email, source: input.source as SignupSource } };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- validation`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add src/lib/validation.ts tests/lib/validation.test.ts
git commit -m "feat: add signup input validation with honeypot"
```

---

## Task 4: Content data + site config

**Files:**
- Create: `src/content/site.ts`, `src/content/products.ts`, `src/content/gallery.ts`, `src/content/faqs.ts`

- [ ] **Step 1: Create `src/content/site.ts`**

```ts
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
```

- [ ] **Step 2: Create `src/content/products.ts`**

```ts
export interface Product {
  slug: string;
  name: string;
  tagline: string;
  priceEgp: number | null; // null = Coming Soon
  comingSoon: boolean;
  image: string; // path under /public
  description: string;
  whatsInside: string[];
  faqKeys: string[];
}

export const PRODUCTS: Product[] = [
  {
    slug: "mecha-chameleon",
    name: "Mecha Chameleon",
    tagline: "The first PaintVerse kit.",
    priceEgp: 250,
    comingSoon: false,
    image: "/brand/cover.png",
    description:
      "A premium unpainted collectible figure with everything you need to make it yours. The experience is the product — choose it, paint it, display it, share it.",
    whatsInside: [
      "One premium unpainted collectible figure",
      "Three paint pots (starter palette)",
      "One quality brush",
      "Instruction card with QR code linking to tutorials",
      "Premium protective packaging",
    ],
    faqKeys: ["age", "paint-safe", "shipping", "tutorials"],
  },
  {
    slug: "anime-series-01",
    name: "Anime Series 01",
    tagline: "Coming soon.",
    priceEgp: null,
    comingSoon: true,
    image: "/brand/app-icon.png",
    description: "A new PaintVerse collection is on the way.",
    whatsInside: [],
    faqKeys: [],
  },
  {
    slug: "fantasy-creatures-01",
    name: "Fantasy Creatures 01",
    tagline: "Coming soon.",
    priceEgp: null,
    comingSoon: true,
    image: "/brand/nav-icon.png",
    description: "A new PaintVerse collection is on the way.",
    whatsInside: [],
    faqKeys: [],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
```

- [ ] **Step 3: Create `src/content/faqs.ts`**

```ts
export const FAQS: Record<string, { q: string; a: string }> = {
  age: {
    q: "What age is this for?",
    a: "PaintVerse kits contain small parts and are recommended for ages 14+. See our Safety & Age notice for details.",
  },
  "paint-safe": {
    q: "Is the paint safe?",
    a: "Our starter paints are water-based and non-toxic. Always paint in a ventilated space and wash hands after use.",
  },
  shipping: {
    q: "How does shipping work?",
    a: "See our Shipping & Returns page for delivery times, costs, and our returns policy.",
  },
  tutorials: {
    q: "How do I learn to paint it?",
    a: "Every kit includes an instruction card with a QR code linking to step-by-step tutorials.",
  },
};
```

- [ ] **Step 4: Create `src/content/gallery.ts`**

```ts
export interface GalleryItem {
  id: string;
  title: string;
  creator: string; // display credit only; no private data
  image: string;
  featured: boolean;
}

export const GALLERY: GalleryItem[] = [
  { id: "g1", title: "Emerald Mecha", creator: "Studio sample", image: "/brand/cover.png", featured: true },
  { id: "g2", title: "Midnight Chameleon", creator: "Studio sample", image: "/brand/app-icon.png", featured: false },
  { id: "g3", title: "Neon Scales", creator: "Studio sample", image: "/brand/nav-icon.png", featured: false },
];
```

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/content
git commit -m "feat: add typed content data (site, products, gallery, faqs)"
```

---

## Task 5: Theme tokens, fonts, globals

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`
- Reference: Tailwind v4 uses `@theme` in CSS (create-next-app default). If the scaffold produced `tailwind.config.ts` (v3), add tokens there instead — detect which by checking for `tailwind.config.*`.

- [ ] **Step 1: Replace `src/app/globals.css`**

```css
@import "tailwindcss";

@theme {
  --color-ink: #111111;
  --color-ink-800: #17141f;
  --color-ink-700: #1e1a29;
  --color-paper: #ffffff;
  --color-purple: #7c3aed;
  --color-purple-300: #c4b5fd;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
}

:root {
  color-scheme: dark;
}

body {
  background:
    radial-gradient(120% 90% at 50% -10%, #20143a 0%, #141018 45%, #0b0b0f 100%) fixed,
    #0b0b0f;
  color: #ece9f3;
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, .font-display {
  font-family: var(--font-display);
  letter-spacing: -0.02em;
}

.glass {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px);
}

::selection {
  background: rgba(124, 58, 237, 0.4);
}
```

- [ ] **Step 2: Replace `src/app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { SITE } from "@/content/site";
import "./globals.css";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display-loaded", weight: ["500", "700"] });
const body = Inter({ subsets: ["latin"], variable: "--font-body-loaded", weight: ["400", "600"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s — ${SITE.name}` },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    images: ["/brand/cover.png"],
    type: "website",
  },
  icons: { icon: "/brand/favicon-source.png", apple: "/brand/app-icon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Wire font variables into the theme**

In `globals.css`, update the `@theme` font vars to consume the loaded fonts:
```css
  --font-display: var(--font-display-loaded), "Space Grotesk", system-ui, sans-serif;
  --font-body: var(--font-body-loaded), "Inter", system-ui, sans-serif;
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: builds successfully.

- [ ] **Step 5: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx
git commit -m "feat: Studio Dark theme tokens + Space Grotesk/Inter fonts"
```

---

## Task 6: UI primitives

**Files:**
- Create: `src/components/ui/Button.tsx`, `Badge.tsx`, `GlassCard.tsx`, `SectionHeading.tsx`, `Reveal.tsx`

- [ ] **Step 1: `src/components/ui/Button.tsx`**

```tsx
import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";
const styles: Record<Variant, string> = {
  primary: "bg-[--color-purple] text-white hover:brightness-110",
  ghost: "glass text-white hover:bg-white/10",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: { href?: string; variant?: Variant } & ComponentProps<"button">) {
  const cls = `inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold transition ${styles[variant]} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
```

- [ ] **Step 2: `src/components/ui/Badge.tsx`**

```tsx
export function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-[--color-purple]/40 bg-[--color-purple]/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-[--color-purple-300]">
      {children}
    </span>
  );
}
```

- [ ] **Step 3: `src/components/ui/GlassCard.tsx`**

```tsx
export function GlassCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`glass rounded-2xl ${className}`}>{children}</div>;
}
```

- [ ] **Step 4: `src/components/ui/SectionHeading.tsx`**

```tsx
import { Badge } from "./Badge";

export function SectionHeading({ label, title, subtitle }: { label?: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      {label && <Badge>{label}</Badge>}
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 text-white/60">{subtitle}</p>}
    </div>
  );
}
```

- [ ] **Step 5: `src/components/ui/Reveal.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 6: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors.
```bash
git add src/components/ui
git commit -m "feat: UI primitives (Button, Badge, GlassCard, SectionHeading, Reveal)"
```

---

## Task 7: Layout — Navbar & Footer

**Files:**
- Create: `src/components/layout/Navbar.tsx`, `src/components/layout/Footer.tsx`

- [ ] **Step 1: `src/components/layout/Navbar.tsx`**

```tsx
import Link from "next/link";
import { SITE } from "@/content/site";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-xl font-bold">
          Paint<span className="text-[--color-purple]">Verse</span>
        </Link>
        <div className="hidden gap-8 text-sm text-white/70 md:flex">
          {SITE.nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-white">{n.label}</Link>
          ))}
        </div>
        <Button href="/shop" className="px-4 py-2">Shop Kits</Button>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: `src/components/layout/Footer.tsx`**

```tsx
import Link from "next/link";
import { SITE } from "@/content/site";
import { SignupForm } from "@/components/forms/SignupForm";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-3">
        <div>
          <div className="font-display text-lg font-bold">Paint<span className="text-[--color-purple]">Verse</span></div>
          <p className="mt-2 max-w-xs text-sm text-white/50">{SITE.tagline}. {SITE.description}</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white/80">Newsletter</h4>
          <p className="mt-2 text-sm text-white/50">Get launch news and painting inspiration.</p>
          <div className="mt-3"><SignupForm source="newsletter" compact /></div>
        </div>
        <div className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-semibold text-white/80">Explore</h4>
            <ul className="mt-2 space-y-1 text-white/50">
              {SITE.nav.map((n) => <li key={n.href}><Link href={n.href} className="hover:text-white">{n.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white/80">Legal</h4>
            <ul className="mt-2 space-y-1 text-white/50">
              {SITE.legal.map((l) => <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>)}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Commit** (build verified in Task 10 after SignupForm exists)

```bash
git add src/components/layout
git commit -m "feat: Navbar and Footer"
```

---

## Task 8: Firebase init + Firestore rules + signup Server Action

**Files:**
- Create: `src/lib/firebase.ts`, `src/app/actions/signup.ts`, `firestore.rules`, `.env.example`
- Modify: none

- [ ] **Step 1: Create `.env.example`**

```bash
# Firebase Web config (public by design — security is enforced by Firestore rules)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

- [ ] **Step 2: Create `src/lib/firebase.ts`**

```ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length ? getApp() : initializeApp(config);
export const db = getFirestore(app);
```

- [ ] **Step 3: Create `src/app/actions/signup.ts`**

```ts
"use server";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { validateSignup } from "@/lib/validation";

export interface SignupState {
  status: "idle" | "success" | "error";
  message: string;
}

export async function submitSignup(
  _prev: SignupState,
  formData: FormData
): Promise<SignupState> {
  const result = validateSignup({
    email: String(formData.get("email") ?? ""),
    source: String(formData.get("source") ?? ""),
    honeypot: String(formData.get("company") ?? ""), // honeypot field named "company"
  });

  if (!result.ok) {
    // Honeypot hit: pretend success so bots get no signal.
    if (String(formData.get("company") ?? "").trim() !== "") {
      return { status: "success", message: "Thanks! You're on the list." };
    }
    return { status: "error", message: result.error };
  }

  try {
    await addDoc(collection(db, "signups"), {
      email: result.value.email,
      source: result.value.source,
      createdAt: serverTimestamp(),
    });
    return { status: "success", message: "Thanks! You're on the list." };
  } catch {
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
```

- [ ] **Step 4: Create `firestore.rules`**

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Signups: create-only. No reads, updates, or deletes from clients.
    match /signups/{doc} {
      allow read, update, delete: if false;
      allow create: if
        request.resource.data.keys().hasOnly(['email', 'source', 'createdAt'])
        && request.resource.data.email is string
        && request.resource.data.email.size() > 3
        && request.resource.data.email.size() < 255
        && request.resource.data.source is string
        && request.resource.data.source in ['newsletter', 'waitlist:mecha-chameleon'];
    }
    // Everything else denied.
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

- [ ] **Step 5: Typecheck + commit**

Run: `npx tsc --noEmit`
Expected: no errors.
```bash
git add src/lib/firebase.ts src/app/actions/signup.ts firestore.rules .env.example
git commit -m "feat: Firebase init, write-only signups action, Firestore rules"
```

---

## Task 9: SignupForm component (TDD)

**Files:**
- Create: `src/components/forms/SignupForm.tsx`
- Test: `tests/components/SignupForm.test.tsx`

- [ ] **Step 1: Write the failing test**

`tests/components/SignupForm.test.tsx`:
```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { SignupForm } from "@/components/forms/SignupForm";

// The action is a server action; mock it for the client render.
vi.mock("@/app/actions/signup", () => ({
  submitSignup: vi.fn(async () => ({ status: "idle", message: "" })),
}));

describe("SignupForm", () => {
  it("renders an email input and the hidden source + honeypot fields", () => {
    const { container } = render(<SignupForm source="newsletter" />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    const source = container.querySelector('input[name="source"]') as HTMLInputElement;
    expect(source.value).toBe("newsletter");
    const honeypot = container.querySelector('input[name="company"]');
    expect(honeypot).toBeInTheDocument();
    expect(honeypot).toHaveClass("sr-only");
  });

  it("passes the given source through", () => {
    const { container } = render(<SignupForm source="waitlist:mecha-chameleon" />);
    const source = container.querySelector('input[name="source"]') as HTMLInputElement;
    expect(source.value).toBe("waitlist:mecha-chameleon");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- SignupForm`
Expected: FAIL — cannot find module.

- [ ] **Step 3: Implement `src/components/forms/SignupForm.tsx`**

```tsx
"use client";

import { useActionState } from "react";
import { submitSignup, type SignupState } from "@/app/actions/signup";
import type { SignupSource } from "@/lib/validation";

const initial: SignupState = { status: "idle", message: "" };

export function SignupForm({ source, compact = false }: { source: SignupSource; compact?: boolean }) {
  const [state, formAction, pending] = useActionState(submitSignup, initial);

  return (
    <form action={formAction} className="w-full">
      <input type="hidden" name="source" value={source} />
      {/* Honeypot: hidden from humans, tempting to bots */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />
      <div className={compact ? "flex gap-2" : "flex flex-col gap-3 sm:flex-row"}>
        <input
          type="email"
          name="email"
          required
          placeholder="Your email"
          aria-label="Email address"
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-[--color-purple]"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-[--color-purple] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "…" : "Notify me"}
        </button>
      </div>
      {state.status !== "idle" && (
        <p className={`mt-2 text-sm ${state.status === "success" ? "text-[--color-purple-300]" : "text-red-400"}`}>
          {state.message}
        </p>
      )}
    </form>
  );
}
```

Note: `.sr-only` is provided by Tailwind by default.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- SignupForm`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add src/components/forms/SignupForm.tsx tests/components/SignupForm.test.tsx
git commit -m "feat: SignupForm with honeypot + server action wiring"
```

---

## Task 10: Home page + sections

**Files:**
- Create: `src/components/home/Hero.tsx`, `FeaturedCollections.tsx`, `HowItWorks.tsx`, `GalleryPreview.tsx`, `AboutTeaser.tsx`, `NewsletterCTA.tsx`
- Create: `src/components/product/ProductCard.tsx`, `ComingSoonCard.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: `src/components/product/ProductCard.tsx`**

```tsx
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/content/products";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="glass overflow-hidden rounded-2xl transition group-hover:-translate-y-1 group-hover:shadow-2xl">
        <div className="relative aspect-[4/5] overflow-hidden bg-black/30">
          <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:768px) 100vw, 33vw" />
        </div>
        <div className="p-4">
          <h3 className="font-display text-lg">{product.name}</h3>
          <p className="mt-1 text-sm text-white/50">{product.tagline}</p>
          <div className="mt-3">
            {product.comingSoon || product.priceEgp === null ? (
              <Badge>Coming Soon</Badge>
            ) : (
              <span className="font-semibold text-white">{formatPrice(product.priceEgp)}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 2: `src/components/product/ComingSoonCard.tsx`**

```tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { Badge } from "@/components/ui/Badge";

export function ComingSoonCard({ name }: { name: string }) {
  return (
    <GlassCard className="flex aspect-[4/5] flex-col items-center justify-center gap-3 p-6 text-center">
      <Badge>Coming Soon</Badge>
      <p className="font-display text-lg text-white/80">{name}</p>
    </GlassCard>
  );
}
```

- [ ] **Step 3: `src/components/home/Hero.tsx`**

```tsx
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SITE } from "@/content/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <Badge>{SITE.tagline}</Badge>
          <h1 className="mt-5 text-5xl font-bold leading-[1.05] sm:text-6xl">
            Collectors become creators.
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/60">{SITE.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/shop">Shop Kits</Button>
            <Button href="/gallery" variant="ghost">Explore Gallery</Button>
          </div>
        </div>
        <div className="relative aspect-square">
          <div className="absolute inset-0 rounded-full bg-[--color-purple]/25 blur-3xl" />
          <Image src="/brand/cover.png" alt="PaintVerse figure" fill priority className="object-contain drop-shadow-2xl" sizes="(max-width:768px) 100vw, 50vw" />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: `src/components/home/FeaturedCollections.tsx`**

```tsx
import { PRODUCTS } from "@/content/products";
import { ProductCard } from "@/components/product/ProductCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading label="Collections" title="Start with Mecha Chameleon" subtitle="More collections landing soon." />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}><ProductCard product={p} /></Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: `src/components/home/HowItWorks.tsx`**

```tsx
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Reveal } from "@/components/ui/Reveal";

const STEPS = [
  { n: "01", title: "Choose", body: "Pick a premium unpainted figure kit." },
  { n: "02", title: "Paint", body: "Use the starter palette and brush, guided by QR tutorials." },
  { n: "03", title: "Display", body: "Show off your one-of-a-kind collectible." },
  { n: "04", title: "Share", body: "Join the community and inspire other creators." },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading label="How it works" title="Choose. Paint. Display. Share." />
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.05}>
            <GlassCard className="h-full p-6">
              <div className="font-display text-3xl text-[--color-purple]">{s.n}</div>
              <h3 className="mt-3 text-xl">{s.title}</h3>
              <p className="mt-2 text-sm text-white/60">{s.body}</p>
            </GlassCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: `src/components/home/GalleryPreview.tsx`**

```tsx
import Image from "next/image";
import Link from "next/link";
import { GALLERY } from "@/content/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function GalleryPreview() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <SectionHeading label="Community" title="Painted by creators" subtitle="A glimpse of what's possible." />
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {GALLERY.map((g) => (
          <div key={g.id} className="glass overflow-hidden rounded-2xl">
            <div className="relative aspect-square"><Image src={g.image} alt={g.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" /></div>
            <div className="p-4"><h3 className="text-base">{g.title}</h3><p className="text-sm text-white/50">{g.creator}</p></div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center"><Button href="/gallery" variant="ghost">View the gallery</Button></div>
    </section>
  );
}
```

- [ ] **Step 7: `src/components/home/AboutTeaser.tsx`**

```tsx
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export function AboutTeaser() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <Badge>Our story</Badge>
      <h2 className="mt-4 text-3xl font-bold sm:text-4xl">The experience is the product.</h2>
      <p className="mx-auto mt-4 max-w-2xl text-white/60">
        PaintVerse combines premium figure design, beautiful packaging, and a modern digital experience —
        so collectors don't just buy figures, they create them.
      </p>
      <div className="mt-8"><Button href="/about" variant="ghost">More about PaintVerse</Button></div>
    </section>
  );
}
```

- [ ] **Step 8: `src/components/home/NewsletterCTA.tsx`**

```tsx
import { GlassCard } from "@/components/ui/GlassCard";
import { SignupForm } from "@/components/forms/SignupForm";

export function NewsletterCTA() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <GlassCard className="p-10 text-center">
        <h2 className="text-3xl font-bold">Join the universe</h2>
        <p className="mx-auto mt-3 max-w-md text-white/60">Be first to hear about drops, tutorials, and limited editions.</p>
        <div className="mx-auto mt-6 max-w-md"><SignupForm source="newsletter" /></div>
      </GlassCard>
    </section>
  );
}
```

- [ ] **Step 9: `src/app/page.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { HowItWorks } from "@/components/home/HowItWorks";
import { GalleryPreview } from "@/components/home/GalleryPreview";
import { AboutTeaser } from "@/components/home/AboutTeaser";
import { NewsletterCTA } from "@/components/home/NewsletterCTA";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedCollections />
        <HowItWorks />
        <GalleryPreview />
        <AboutTeaser />
        <NewsletterCTA />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 10: Build + commit**

Run: `npm run build`
Expected: builds successfully; `/` prerenders.
```bash
git add src/components src/app/page.tsx
git commit -m "feat: home page and all home sections"
```

---

## Task 11: Shop grid + product detail

**Files:**
- Create: `src/components/product/ProductGrid.tsx`, `src/components/product/ProductDetail.tsx`
- Create: `src/app/shop/page.tsx`, `src/app/shop/mecha-chameleon/page.tsx`

- [ ] **Step 1: `src/components/product/ProductGrid.tsx`**

```tsx
import { PRODUCTS } from "@/content/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {PRODUCTS.map((p) => <ProductCard key={p.slug} product={p} />)}
    </div>
  );
}
```

- [ ] **Step 2: `src/app/shop/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductGrid } from "@/components/product/ProductGrid";

export const metadata: Metadata = { title: "Shop Kits" };

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading label="Shop" title="PaintVerse Kits" subtitle="Browse the collection. More coming soon." />
        <div className="mt-10"><ProductGrid /></div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: `src/components/product/ProductDetail.tsx`**

```tsx
import Image from "next/image";
import type { Product } from "@/content/products";
import { FAQS } from "@/content/faqs";
import { formatPrice } from "@/lib/format";
import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { SignupForm } from "@/components/forms/SignupForm";
import type { SignupSource } from "@/lib/validation";

export function ProductDetail({ product }: { product: Product }) {
  const waitlistSource = `waitlist:${product.slug}` as SignupSource;
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="glass relative aspect-square overflow-hidden rounded-2xl">
          <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" priority />
        </div>
        <div>
          <Badge>{product.tagline}</Badge>
          <h1 className="mt-4 text-4xl font-bold">{product.name}</h1>
          <p className="mt-4 text-white/60">{product.description}</p>
          <div className="mt-6 text-2xl font-semibold">
            {product.priceEgp === null ? "Coming Soon" : formatPrice(product.priceEgp)}
          </div>
          {product.whatsInside.length > 0 && (
            <GlassCard className="mt-6 p-6">
              <h2 className="text-lg font-semibold">What's inside the box</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {product.whatsInside.map((x) => <li key={x} className="flex gap-2"><span className="text-[--color-purple]">▪</span>{x}</li>)}
              </ul>
            </GlassCard>
          )}
          <div className="mt-6">
            <p className="mb-2 text-sm text-white/60">Get notified when you can buy it:</p>
            <SignupForm source={waitlistSource} />
          </div>
        </div>
      </div>

      {product.faqKeys.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold">FAQs</h2>
          <div className="mt-6 space-y-4">
            {product.faqKeys.map((k) => FAQS[k] && (
              <GlassCard key={k} className="p-5">
                <h3 className="font-semibold">{FAQS[k].q}</h3>
                <p className="mt-2 text-sm text-white/60">{FAQS[k].a}</p>
              </GlassCard>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
```

Note: add `"waitlist:mecha-chameleon"` is already in `SIGNUP_SOURCES`. Other slugs' waitlist sources are NOT in the allowlist, so only Mecha Chameleon's waitlist writes succeed — acceptable for V1 since only it has a real page. The `as SignupSource` cast is safe here because the only rendered product detail is Mecha Chameleon (Coming Soon items link to cards, not detail pages). If future products get detail pages, extend `SIGNUP_SOURCES`.

- [ ] **Step 4: `src/app/shop/mecha-chameleon/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductDetail } from "@/components/product/ProductDetail";
import { getProduct } from "@/content/products";

export const metadata: Metadata = { title: "Mecha Chameleon" };

export default function MechaChameleonPage() {
  const product = getProduct("mecha-chameleon");
  if (!product) notFound();
  return (
    <>
      <Navbar />
      <main><ProductDetail product={product} /></main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Build + commit**

Run: `npm run build`
Expected: builds; `/shop` and `/shop/mecha-chameleon` prerender.
```bash
git add src/components/product src/app/shop
git commit -m "feat: shop grid and Mecha Chameleon product detail"
```

---

## Task 12: Gallery & About pages

**Files:**
- Create: `src/app/gallery/page.tsx`, `src/app/about/page.tsx`

- [ ] **Step 1: `src/app/gallery/page.tsx`**

```tsx
import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GALLERY } from "@/content/gallery";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <SectionHeading label="Community" title="The PaintVerse Gallery" subtitle="Painted figures from the community." />
        <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
          {GALLERY.map((g) => (
            <div key={g.id} className="glass overflow-hidden rounded-2xl break-inside-avoid">
              <div className="relative aspect-square"><Image src={g.image} alt={g.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 33vw" /></div>
              <div className="p-4"><h3>{g.title}</h3><p className="text-sm text-white/50">{g.creator}</p></div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: `src/app/about/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";

export const metadata: Metadata = { title: "About" };

const PILLARS = [
  { title: "Craftsmanship", body: "Premium figure design and beautiful, protective packaging." },
  { title: "Creativity", body: "You are the artist. Every figure becomes one-of-a-kind." },
  { title: "Community", body: "Share your work and get inspired by other creators." },
  { title: "Sustainability", body: "Thoughtful materials and packaging as we grow." },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        <SectionHeading label="About" title="Paint Your Universe" subtitle="A premium DIY collectible brand where collectors become creators." />
        <p className="mt-8 text-white/70">
          PaintVerse is built on a simple idea: the experience is the product. Each kit contains a premium
          unpainted collectible figure and everything needed to bring it to life — starter paints, a quality
          brush, and QR-linked tutorials — wrapped in premium packaging. Our mission is to become the most
          recognizable DIY collectible brand by combining premium design, beautiful packaging, community
          sharing, and a modern digital experience.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <GlassCard key={p.title} className="p-6"><h3 className="text-xl">{p.title}</h3><p className="mt-2 text-sm text-white/60">{p.body}</p></GlassCard>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Build + commit**

Run: `npm run build`
Expected: builds; both pages prerender.
```bash
git add src/app/gallery src/app/about
git commit -m "feat: gallery and about pages"
```

---

## Task 13: Policy pages

**Files:**
- Create: `src/components/legal/LegalPage.tsx`
- Create: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/shipping-returns/page.tsx`, `src/app/safety/page.tsx`

- [ ] **Step 1: `src/components/legal/LegalPage.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-white/40">Last updated: {updated}</p>
        <div className="prose-legal mt-8 space-y-6 text-white/70 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-white [&_a]:text-[--color-purple-300] [&_a]:underline">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: `src/app/privacy/page.tsx`**

```tsx
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
```

- [ ] **Step 3: `src/app/terms/page.tsx`**

```tsx
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
      <p>The site is provided "as is" without warranties. {SITE.name} is not liable for any indirect or incidental damages arising from use of the site.</p>
      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the Arab Republic of Egypt.</p>
      <h2>Contact</h2>
      <p>Email <Link href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</Link>.</p>
    </LegalPage>
  );
}
```

- [ ] **Step 4: `src/app/shipping-returns/page.tsx`**

```tsx
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
```

- [ ] **Step 5: `src/app/safety/page.tsx`**

```tsx
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
```

- [ ] **Step 6: Build + commit**

Run: `npm run build`
Expected: all four policy pages prerender.
```bash
git add src/components/legal src/app/privacy src/app/terms src/app/shipping-returns src/app/safety
git commit -m "feat: policy pages (privacy, terms, shipping-returns, safety)"
```

---

## Task 14: Security headers, sitemap, robots, 404

**Files:**
- Modify: `next.config.ts`
- Create: `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/not-found.tsx`

- [ ] **Step 1: Replace `next.config.ts` with security headers**

```ts
import type { NextConfig } from "next";

const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://firestore.googleapis.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
```

Note: `'unsafe-inline'` for script/style is needed for Next.js inline runtime + Tailwind. This is a pragmatic V1 baseline; a nonce-based CSP is a future hardening step.

- [ ] **Step 2: `src/app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/shop", "/shop/mecha-chameleon", "/gallery", "/about", "/privacy", "/terms", "/shipping-returns", "/safety"];
  return routes.map((r) => ({ url: `${SITE.url}${r}`, lastModified: new Date() }));
}
```

- [ ] **Step 3: `src/app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 4: `src/app/not-found.tsx`**

```tsx
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="mx-auto flex max-w-3xl flex-col items-center px-6 py-32 text-center">
        <div className="font-display text-6xl font-bold text-[--color-purple]">404</div>
        <h1 className="mt-4 text-3xl font-bold">This universe hasn't been painted yet.</h1>
        <p className="mt-3 text-white/60">The page you're looking for doesn't exist.</p>
        <div className="mt-8"><Button href="/">Back home</Button></div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 5: Build + commit**

Run: `npm run build`
Expected: builds; sitemap/robots routes generated.
```bash
git add next.config.ts src/app/sitemap.ts src/app/robots.ts src/app/not-found.tsx
git commit -m "feat: security headers, sitemap, robots, 404"
```

---

## Task 15: Final verification pass

**Files:** none (verification only)

- [ ] **Step 1: Run all tests**

Run: `npm test`
Expected: all tests pass (format ×3, validation ×5, SignupForm ×2).

- [ ] **Step 2: Lint**

Run: `npm run lint`
Expected: no errors. Fix any reported issues (e.g., unused imports).

- [ ] **Step 3: Production build**

Run: `npm run build`
Expected: clean build; all routes listed.

- [ ] **Step 4: Manual smoke via dev server (verify skill)**

Run: `npm run dev` and visit each route: `/`, `/shop`, `/shop/mecha-chameleon`, `/gallery`, `/about`, `/privacy`, `/terms`, `/shipping-returns`, `/safety`, plus a bogus URL for 404. Confirm the Studio Dark theme renders, fonts load, hero image shows, and the newsletter form renders. (Firestore submit will error until env vars + a real Firebase project exist — that is expected pre-launch; validation still runs.)

- [ ] **Step 5: Commit any lint fixes**

```bash
git add -A
git commit -m "chore: lint fixes and final verification" || echo "nothing to commit"
```

---

## Task 16: GitHub + Vercel (owner-assisted)

**Files:** none

These steps need the owner's GitHub/Vercel accounts and a real Firebase project. Document exact commands; run interactively.

- [ ] **Step 1: Create the new Firebase project + Firestore**

In the Firebase console: create a new project "PaintVerse", enable Firestore (production mode). Copy the Web app config values.

- [ ] **Step 2: Deploy Firestore rules**

Either paste `firestore.rules` in the console Rules tab, or via CLI:
```bash
npx --yes firebase-tools login
npx --yes firebase-tools deploy --only firestore:rules --project <project-id>
```
Expected: rules published.

- [ ] **Step 3: Local `.env.local`**

Copy `.env.example` → `.env.local` and fill in the six Firebase values. Verify `.env.local` is git-ignored (`git check-ignore .env.local` prints the path).

- [ ] **Step 4: Push to a new GitHub repo**

```bash
gh repo create paintverse --private --source . --remote origin --push
```
Expected: repo created and `main` pushed.

- [ ] **Step 5: Connect Vercel + env vars**

Import the repo in Vercel (or `npx vercel`). Add all six `NEXT_PUBLIC_FIREBASE_*` env vars for Production + Preview. Deploy.
Expected: live preview URL. Test the signup form end-to-end (submit an email, confirm a doc appears in Firestore `signups`, and confirm reads are denied).

- [ ] **Step 6: Final commit / done**

Custom domain gets added in Vercel → Domains when purchased. Update `SITE.url` in `src/content/site.ts` to the real domain and redeploy.

---

## Self-review notes

- **Spec coverage:** Hero (T10), Featured Collections (T10), How It Works (T10), Community Gallery preview + page (T10/T12), Product grid + detail + what's-inside + FAQs (T11), About (T12), Footer + newsletter (T7/T10), policy pages ×4 (T13), email→Firestore write-only + rules (T8/T9), security headers/secrets/gitignore (T14 + existing), fonts/theme (T5), tests (T2/T3/T9/T15), deploy (T16). All spec sections mapped.
- **Deferred correctly:** no auth, cart, Stripe, R2, Three.js, PWA — matches non-goals.
- **Type consistency:** `Product`, `SignupSource`, `SignupState`, `formatPrice`, `validateSignup`, `submitSignup`, `getProduct` names are used consistently across tasks.
- **Known V1 limitation (documented):** only `waitlist:mecha-chameleon` is in `SIGNUP_SOURCES`; other products have no detail page in V1, so no other waitlist source is emitted.
```
