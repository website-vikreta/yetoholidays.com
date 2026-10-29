# Yeto Holidays website

Marketing site for Yeto Holidays Private Limited (Nagpur). Full brief: `prompt1.md`.

## Stack
Next.js 15 App Router, React 19, TypeScript strict, Tailwind 4. Fonts: Fraunces + Plus Jakarta Sans.
Colours: ocean and sand tokens in `app/globals.css`.

## Rules
- **The demo UI is approved and must not change** (https://yeto-travels-sbgprojects.vercel.app/, repo
  `sbgprojects/travel-agency`, read-only reference: never edit or push to it). Keep fonts, colours,
  reveal animations and component structure.
- All content comes from `lib/data.ts` (destinations, packages, departures, reviews, why-Yeto) and
  `lib/site.ts` (company facts, contact, socials, legal numbers). Components hardcode nothing.
- Client facts: Yeto Holidays Private Limited, established 12 May 2022, CIN U63000MH2022PTC382509,
  yetoholidays.com, Nagpur office (address in `lib/site.ts`). 11 destinations: India (domestic),
  Europe, Dubai, Singapore, Malaysia, Vietnam, Thailand, Indonesia (Bali inside), Sri Lanka, Nepal,
  Bhutan. Customers: families, youth, corporate equally.
- Package CTAs: **Request a Quote** (`/plan?destination=slug`) and **Book Now** (`/book/[slug]`, holding
  page until payments are built). Payment is online only (Razorpay later); no cash or cheque wording.
- Never invent facts. Unsupplied client content is hidden or marked placeholder: no reviews, ratings,
  awards, licences, stats, founder names or years of experience beyond "since 2022". Prices for the
  original six are `priceStatus: "placeholder"` and shown as indicative. New destinations say
  "Itinerary shared on enquiry" and "Price on request".
- Phone, WhatsApp, email and socials are empty until supplied (`NEXT_PUBLIC_*`, `lib/site.ts`); an
  empty value hides the button or line. No dummy numbers.
- Bank details and secrets never go in code or committed files; `BANK_*` env vars only, documented
  empty in `.env.example`. `.env*` is git-ignored except `.env.example`.
- Legal pages render from `content/legal/*.md` (client-supplied text; add `status: draft` to a file's front matter to show the "Draft, pending client documents" banner).
- No EMI or instalment plans anywhere (the terms say none are available). Payment terms follow
  `content/legal/terms.md`: 25% to 50% advance, balance 15 to 30 days before departure, 100% within
  15 days of travel. Cancellation charges follow `content/legal/cancellation-policy.md`.
- English only, Indian formatting for prices and dates.

## Git workflow
- Never touch `main`. All work lives on `release-10-2026`.
- For every requested change, first create a branch off `release-10-2026`: `feature/<name-of-change>`
  for changes, `bug/<name-of-bug>` for fixes. Do the work there.
- Commit and open a PR only when asked; the PR targets `release-10-2026`, never `main`.

## After every task
```
npm run lint
npx tsc --noEmit
npm run build
```

## Agents
`.claude/agents/`: builder, critic (reviews, never edits), storyteller (copy; runs humanizer).
`.claude/learning.md` holds lessons learned.
