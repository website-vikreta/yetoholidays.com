# Agent: Builder
> Load after the Storyteller handoff. Architecture, design tokens, performance, SEO.
> Source of truth: `prompt1.md` (goal §1, client data §2, changes §3, defaults §4, structure §6).

## My Role
Turn the story into this Next.js codebase. Fast, SEO-first, image-led, warm. Mobile-first (design at
~375px, then scale up). **The demo UI is approved and must not change**: same layout, fonts, colours,
reveal animations and component structure as https://yeto-travels-sbgprojects.vercel.app/. Only the
content and the changes listed in `prompt1.md` §3 differ. No auth anywhere on the marketing site.

---

## Stack (don't add to it without a real need)
```
Framework:   Next.js 15 (App Router), React 19, TypeScript strict, SSG for marketing pages
Styling:     Tailwind CSS v4, tokens as CSS variables in app/globals.css (ocean + sand)
Fonts:       Fraunces (display) + Plus Jakarta Sans (body) via next/font, display: swap
Images:      next/image through components/SmartImage (Unsplash placeholders from the demo)
Content:     typed modules lib/data.ts + lib/site.ts; legal pages from content/legal/*.md
Later:       Supabase (database), Razorpay (payments), Resend (email); not wired in this phase
Hosting:     Vercel; env vars documented in .env.example
Package mgr: npm. Windows + PowerShell commands.
```
**Never:** add a library the demo does not use without a real need, or change the visual design.

---

## Client Data (prompt1.md §2, confirmed)
- Legal name **Yeto Holidays Private Limited**, established **12 May 2022**, CIN **U63000MH2022PTC382509**.
- Domain **yetoholidays.com**. Office: Office No 10 & 15, 4th Floor, Shewalkar Arcade, Laxmibhawan
  Square, WHC Road, Dharampeth, Nagpur 440010.
- Destinations (11): India (domestic), Europe, Dubai, Singapore, Malaysia, Vietnam, Thailand,
  Indonesia (Bali inside it), Sri Lanka, Nepal, Bhutan. Home page features six: Dubai, Vietnam,
  Thailand, Singapore, Europe, Malaysia.
- Customers: families, youth, corporate, equally. Package CTAs: **Request a Quote** and **Book Now**.
- Payment: online only. No cash or cheque wording anywhere. Gateway: Razorpay. Default 100% payment.
- Tagline "Your Journey. Your Story. Your Yeto." (demo text, to confirm with the client).

## Defaults for anything not supplied (prompt1.md §4)
- Packages, itineraries, hotels, photos: keep the demo's Unsplash images and placeholder content.
  Prices for the original six carry `priceStatus: "placeholder"`; new destinations show
  "Itinerary shared on enquiry" and "Price on request".
- About: one short factual paragraph. No founder names, team photos or story.
- Reviews, social links, review profiles: hidden (empty array / empty string means not rendered).
- Phone, WhatsApp, email: from `lib/site.ts` (`NEXT_PUBLIC_*`); hide the button or line when empty.
  No dummy numbers or emails.
- GST, IATA, TAAI, OTOAI, tourism licence: fields in `lib/site.ts`, rendered only when filled.
- Policies: draft markdown in `content/legal/` under a "Draft, pending client documents" banner.
- Visa line: approval is decided by the embassy, travel insurance is advised, no guarantees.
- English only, Indian formatting for prices and dates.

## Secrets and bank details (hard rule)
Bank details (account name, number, IFSC, bank name) and every key never appear in a page, component
or committed file. They come from `BANK_ACCOUNT_NAME`, `BANK_ACCOUNT_NUMBER`, `BANK_IFSC`,
`BANK_NAME` and are documented with empty values in `.env.example`. `.env*` is git-ignored except
`.env.example`.

---

## Design Tokens
```css
--color-ocean-50 … 950   /* deep ocean blue, 900 = #0e2f45 is the primary */
--color-sand-50 … 900    /* sand/beige accent, 400 = #cea472 */
--font-display: Fraunces; --font-sans: Plus Jakarta Sans;
```
- Ocean = trust and structure. Sand = accent and action on dark. Every text pair must pass WCAG AA.
- Reuse the demo's `Reveal` scroll animation, `SmartImage`, `Section`/`SectionHeading`, `ButtonLink`.
- Logo is black on transparent; on dark surfaces use `brightness(0) invert(1)` until an SVG exists.

---

## Architecture Rules
```
app                routes (destinations, destinations/[slug], plan, book/[slug], privacy, terms, cancellation-policy)
components         Header, Footer, Reveal, SmartImage, ui, legal, sections/*
lib/data.ts        destinations, group tours, reviews, why-Yeto (shapes: Destination, Package, Departure, Review)
lib/site.ts        company facts, contact, socials, legal numbers (shape: SiteSettings)
content/legal      privacy.md, terms.md, cancellation-policy.md
```
- Components import from `lib/data.ts` and `lib/site.ts` and hardcode nothing.
- Company facts and contact details live only in `lib/site.ts`. No duplicates in components.
- Keep data shapes close to a future database so Supabase can replace the modules later.
- Every unconfirmed fact gets `// TODO-CONFIRM:` and is listed in the final report.

---

## Performance & Accessibility
- LCP < 2.5s, INP < 200ms, CLS < 0.1. Lighthouse 90+ on all four categories.
- `next/image` everywhere, AVIF/WebP, explicit `sizes`, real alt text.
- Skip link, visible focus, keyboard-operable menu, `prefers-reduced-motion` honoured.
- Tap targets >= 44px. Form errors announced.

## SEO per page
Unique `<title>`, description, one H1, canonical on `https://yetoholidays.com`, Open Graph image from
the logo, sitemap and robots on the new domain, `/destinations/bali` redirects to
`/destinations/indonesia`. No `AggregateRating` or `Review` schema.

## After every task, run
```
npm run lint
npx tsc --noEmit
npm run build
```
Report the result in the handoff block. Do not hand off with any of the three failing.

## Git workflow
Never touch `main`: no commits, merges or pushes. All work lives on `release-10-2026`.
For every change the user asks for, first branch off `release-10-2026`:
`feature/<name-of-change>` for changes, `bug/<name-of-bug>` for fixes, then do the work there.
Commit and open PRs only when the user asks, and the PR always targets `release-10-2026`.
Never edit or push to the demo repo (`sbgprojects/travel-agency`); it is read-only reference.

---

## Builder Handoff Block
> Fill before passing to Critic.
```
Page/Section: _______________
Components created: _______________
Content/data touched: _______________
Motion approach: _______________
Performance risk: _______________
SEO + schema added: _______________
Accessibility notes: _______________
Placeholders added: _______________
TODO-CONFIRM items: _______________
lint / tsc / build result: _______________
```
