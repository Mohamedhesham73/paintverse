# PaintVerse V1 — Brand Launch Site Design

**Date:** 2026-07-10
**Status:** Approved (pending spec review)
**Owner:** Mohamed (carrotagency22)

## 1. Summary

PaintVerse is a premium DIY collectible brand — customers buy high-quality
unpainted collectible figures with everything needed to paint them ("Paint Your
Universe"). This spec covers **Version 1: a premium brand launch site**. It is a
browse-only marketing site that captures interest via a waitlist/newsletter. No
user accounts and no checkout in V1 — those are explicitly deferred to later
phases and the architecture is built to accept them.

The site should feel like "entering a creative studio rather than an online
shop": craftsmanship, creativity, community.

## 2. Goals & non-goals

### Goals
- A polished, professional, secure, launchable site pushed to GitHub and Vercel.
- Studio Dark aesthetic: near-black canvas, purple accent, glassmorphism where it earns its place.
- One real product (Mecha Chameleon) + "Coming Soon" collections.
- Email capture (newsletter + per-product "Notify me" waitlist) that the owner controls.
- Full policy pages (Privacy, Terms, Shipping & Returns, Safety & Age).
- Ready for a custom domain when purchased.

### Non-goals (deferred to later phases)
- Firebase Authentication / user accounts.
- Cart + Stripe checkout.
- User-submitted community gallery / uploads (R2) / moderation.
- Three.js / React Three Fiber interactive 3D.
- Contests, wishlist, rewards, AI paint inspiration, PWA.

These are named so the V1 architecture leaves clean seams for them.

## 3. Brand & design system

- **Palette:** Black `#111111`, White `#FFFFFF`, Purple accent `#7C3AED`. Studio Dark theme (near-black backgrounds, purple glow, subtle glass surfaces).
- **Typography:** Space Grotesk (display/headlines) + Inter (body/UI). Loaded via `next/font` (self-hosted, no external request at runtime).
- **Tagline:** "Paint Your Universe."
- **Motion:** Framer Motion — smooth reveals on scroll, subtle parallax, hover animation on product cards. Generous whitespace. Fast loading.
- **Brand assets on hand:** `app icon (home screen).png`, `cover pic.png`, `fav icon.png`, `nav bar icon.png` (in project root; will be moved into `/public` and optimized).

## 4. Architecture

### 4.1 Stack
- **Next.js (App Router) + TypeScript** (strict mode).
- **Tailwind CSS** with design tokens for the palette.
- **Framer Motion** for animation.
- **Firebase / Firestore** — a **new, dedicated** Firebase project for PaintVerse. Write-only `signups` collection.
- **Vercel** deployment; GitHub → Vercel auto-deploy.

Deliberately excluded from V1 dependencies: Three.js, Firebase Auth, Stripe, Cloudflare R2.

### 4.2 Routes
| Route | Purpose |
|-------|---------|
| `/` | Hero → Featured Collections → How It Works → Gallery preview → About teaser → Newsletter → Footer |
| `/shop` | Product grid: Mecha Chameleon + "Coming Soon" cards; filter/search UI |
| `/shop/mecha-chameleon` | Product detail: image gallery, what's in the box, FAQs, "Notify me" |
| `/gallery` | Curated painted-figure showcase (static, curated content) |
| `/about` | Story, mission, craftsmanship, sustainability |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/shipping-returns` | Shipping & Returns policy |
| `/safety` | Safety & Age notice (small parts, recommended age, paint safety) |
| `*` (404) | Branded not-found page |

### 4.3 Components (small, focused, reusable)
- **Layout:** `Navbar` (glass, sticky), `Footer` (newsletter, social links, policy links, copyright).
- **Home sections:** `Hero`, `FeaturedCollections`, `HowItWorks`, `GalleryPreview`, `AboutTeaser`, `NewsletterCTA`.
- **Product:** `ProductCard`, `ProductGrid`, `ProductDetail`, `ComingSoonCard`.
- **Primitives:** `Button`, `Badge`, `GlassCard`, `SectionHeading`, `Reveal` (scroll-animation wrapper).
- **Forms:** `SignupForm` (shared by newsletter and "Notify me").

### 4.4 Content model
Typed content data files so content edits never touch component code:
- `/content/products.ts` — product entries. Mecha Chameleon is real; others flagged `comingSoon: true`.
- `/content/gallery.ts` — curated gallery items.
- `/content/faqs.ts` — product FAQs.

**Mecha Chameleon (real content):**
- Name: Mecha Chameleon
- Price: **EGP 250** each
- Status: available (browse-only; CTA = "Notify me")
- What's inside (from blueprint): one premium unpainted figure, three paint pots (starter palette), one quality brush, instruction card with QR code, premium protective packaging.

Prices display in EGP. A single `formatPrice` helper centralizes currency formatting.

## 5. Data flow — email capture

```
SignupForm (client)
  → Next.js Server Action (server)
      → validate (email format + honeypot + source tag)
      → Firestore: create doc in `signups`
  → success / error state back to form
```

- **Source tag** distinguishes `newsletter` vs `waitlist:mecha-chameleon`.
- Stored fields: `email`, `source`, `createdAt` (server timestamp), optional `userAgent`.
- **Honeypot** hidden field for basic bot filtering; server rejects if filled.
- Firebase Admin/client access happens server-side in the Server Action.

## 6. Security

- **`.gitignore`**: `node_modules`, `.next`, `.env*` (except `.env.example`), build output, OS/editor junk, `.superpowers/`.
- **Secrets in environment variables only** — Vercel env + local `.env.local`. `.env.example` documents required keys. Nothing secret committed.
- **Firestore rules** — `signups`: `allow create` (with field/shape validation), `deny read, list, update, delete`. List cannot be scraped; owner reads via console/admin. Firebase web config is public by design; security lives in the rules.
- **Security headers** (via `next.config`/middleware): Content-Security-Policy, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Strict-Transport-Security`, frame protection (`X-Frame-Options`/CSP frame-ancestors).
- **Server-side input validation** + honeypot on all form submissions.
- Accessible, semantic HTML; correct metadata/OpenGraph tags; `sitemap.xml` and `robots.txt`.

## 7. Testing & quality

- TypeScript strict + ESLint clean.
- Vitest + React Testing Library: `SignupForm` validation behavior, and smoke render of key sections/pages.
- Production build must pass before deploy.

## 8. Delivery plan

1. Scaffold Next.js + TS + Tailwind; wire theme tokens, fonts, base layout.
2. Build primitives + layout (Navbar/Footer).
3. Build home sections, shop grid, Mecha Chameleon detail, gallery, about.
4. Build policy pages (Privacy, Terms, Shipping & Returns, Safety).
5. Wire `SignupForm` → Server Action → Firestore; add rules + env config.
6. Security headers, metadata, sitemap/robots, 404.
7. Tests, lint, production build.
8. `git init`, `.gitignore`, first commit → new GitHub repo.
9. Connect to Vercel, set env vars, deploy. Custom domain added later.

## 9. Open items (owner to provide before/at launch)
- New Firebase project created + web config values (for `.env.local` / Vercel env).
- Real product photography for Mecha Chameleon (placeholders used until then).
- Curated gallery images.
- Final legal copy review for policy pages (drafted from standard templates + brand specifics).
- GitHub repo name; Vercel account link.

## 10. Future phases (context, not built now)
- **Phase 2 — Store:** Firebase Auth, cart, Stripe checkout, order data.
- **Phase 3 — Community:** user accounts, painted-figure uploads (R2), likes, featured creators, moderation.
- **Phase 4+:** contests, wishlist, rewards, AI paint inspiration, PWA, international shipping.
