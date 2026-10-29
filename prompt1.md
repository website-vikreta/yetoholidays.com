# prompt1.md: Replicate the demo UI with the client's requirements

Read this whole file before doing anything. Then do the tasks in order and report at the end.

## 1. Goal

Rebuild the Yeto Holidays site in this repo so it looks and behaves exactly like the approved demo, with the real client details below applied. Where the client has not supplied something yet, use the defaults in section 4.

Sources for the UI:
- Demo site: https://yeto-travels-sbgprojects.vercel.app/
- Demo repo: https://github.com/sbgprojects/travel-agency.git (clone it into a scratch folder outside this repo, read it, and copy what you need. Do not edit or push to it.)
- Logo: `logo/yeto_black_transparent.png` in this project (black wordmark with palm, sun and waves)
- Client brief: `Yeto_Holidays_Website_Requirements.docx` (if it is in the project, read it)

Stack: Next.js 15 App Router, React 19, TypeScript strict, Tailwind 4. Keep the demo's fonts (Fraunces and Plus Jakarta Sans), colours (ocean and sand tokens in `globals.css`), reveal animations and component structure. No visual redesign.

This prompt covers the front end and content only. Database, admin panel, payments and email come in later prompts, but structure the code so they plug in cleanly (see section 6).

## 2. Client data to put on the site (confirmed)

| Item | Value | Where it appears |
|---|---|---|
| Legal name | Yeto Holidays Private Limited | Footer, About, Terms and Privacy pages |
| Established | 12 May 2022 | About, footer |
| CIN | U63000MH2022PTC382509 | Footer, About, legal pages |
| Domain | yetoholidays.com | metadata, canonical URL, sitemap, robots |
| Office address | Office No 10 & 15, 4th Floor, Shewalkar Arcade, Laxmibhawan Square, WHC Road, Dharampeth, Nagpur 440010 | Footer, Contact section, legal pages |
| Destinations sold | India, Europe, Dubai, Singapore, Malaysia, Vietnam, Thailand, Indonesia, Sri Lanka, Nepal, Bhutan | Destinations grid, destinations page, footer, forms |
| Customers | Families, youth and corporate, all equally | Keep the Families, Group departures, Honeymoons and Corporate blocks |
| What happens when a customer picks a package | Request a quote (team calls back) and Book now with online payment | Package CTAs: "Request a Quote" and "Book Now" |
| Payment | Online payment only | No cash or cheque wording anywhere |
| Logo | Provided | Header, footer, favicon, social image |

Bank details (name Yeto Holidays Private Limited, IFSC ICIC0001965, ICICI Bank Ltd, Shankar Nagar, Nagpur, plus the account number from the client document) are for the booking confirmation step only. Do not put them in any page, component or committed file. Read them from environment variables `BANK_ACCOUNT_NAME`, `BANK_ACCOUNT_NUMBER`, `BANK_IFSC`, `BANK_NAME`, document them in `.env.example` with empty values, and ask me to fill `.env.local`.

## 3. Changes to make compared with the demo

1. **Destinations.** Show the client's 11 destinations. Keep the six featured on the home page (Dubai, Vietnam, Thailand, Singapore, Europe, Malaysia). Replace "Bali" with Indonesia as the destination, with Bali as a package or highlight inside it. Add India, Sri Lanka, Nepal and Bhutan, which the demo lacks. Group them on `/destinations` with an International and Domestic filter (India is domestic).
2. **New destination content.** For the destinations the demo has no content for, write short, factual blurbs and highlights that name only well-known places. Do not invent itineraries, hotel names or inclusions. Show "Itinerary shared on enquiry" and "Price on request" for these.
3. **Existing prices.** Keep the demo prices for the original six but store a `priceStatus: "placeholder"` field next to each, and keep the on-page note that prices are indicative. List them in your final report so I can get them confirmed.
4. **Reviews.** Remove the three invented "Yeto Traveller" quotes. Render the Reviews section only when the data array has real entries. The array stays empty for now.
5. **Stats and claims.** Remove "20+ destinations". Derive the destination count from the data, or drop the stat. Remove any claim the client has not confirmed (ratings, awards, memberships, years of experience beyond "since 2022").
6. **Package CTAs.** On each destination page add two actions: "Request a Quote" (opens `/plan` prefilled with the destination) and "Book Now" (routes to `/book/[slug]`, a clearly marked "Online booking opens soon" holding page until the payment prompt is done). Keep the WhatsApp button as a secondary action.
7. **Contact details.** The client gave no phone, WhatsApp number or email yet. Drive these from `lib/site.ts` reading `NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_PHONE` and `NEXT_PUBLIC_EMAIL`. If a value is empty, hide that button or line instead of showing a placeholder. Remove the dummy +91 90000 00000 and the unconfirmed hello@yetoholidays.com completely.
8. **Social links.** Drive from `lib/site.ts`. Hide any link that is empty. The footer should show none until the client confirms them.
9. **Footer and About.** Add legal name, CIN, address and "Established 12 May 2022". Add GST, IATA, TAAI, OTOAI and tourism licence fields to `lib/site.ts`, rendered only when filled.
10. **Logo.** Use the supplied logo in the header and footer. It is black on transparent, so on the dark hero and dark footer use a white version made with a CSS filter (`brightness(0) invert(1)`) until an SVG is supplied. Generate the favicon and Open Graph image from it.
11. **Metadata.** Change `metadataBase`, canonical and Open Graph URLs to https://yetoholidays.com. Keep the tagline "Your Journey. Your Story. Your Yeto." The client says the tagline is in their Drive, so keep the demo's text and list it in the report as "to confirm".
12. **Legal pages.** Keep `/privacy` and `/terms`. Add `/cancellation-policy`. Render all three from markdown files in `content/legal/`. The client has uploaded their documents to Drive, so put clearly marked draft text in each file and a banner at the top of the page: "Draft, pending client documents". I will replace the text later.
13. **EMI section.** Keep it exactly as is, with the "Illustration only" disclaimer. The client named no financing partner and wants online payment only. Do not describe Yeto as a lender or promise approval anywhere.
14. **Sitemap and robots.** Update to the new domain and the new destination slugs. Keep old slugs (`/destinations/bali`) working with a redirect to `/destinations/indonesia`.

## 4. Defaults for everything the client has not supplied

- Package details, itineraries, hotels, photos and videos: keep the demo's Unsplash images and placeholder content. The client will confirm after the final look.
- Team and About Us: one short factual paragraph (company name, established date, Nagpur office, services). No founder names, no team photos, no story.
- Customer reviews: hidden (see change 4).
- Social and review profiles: hidden.
- Policies: draft text as in change 12.
- Visa and travel insurance disclaimers: add a short line near "Visa assistance" saying visa approval is decided by the embassy and travel insurance is advised, with no guarantees.
- Point of contact for approvals: not supplied. Leave it out.
- Payment gateway: Razorpay. Deposit versus full payment: per package, default 100%.
- Language: English only, Indian formatting for prices and dates.

## 5. Update the agent files

This project has `.claude/agents/builder.md`, `critic.md`, `storyteller.md`, `.claude/skills/humanizer/SKILL.md` and `learning.md`. Read each first, keep their structure and format, and adapt them to this project. Do not delete content that is still useful.

- **builder.md**: add the stack, the rule that the demo UI is approved and must not change, the client data in section 2, the defaults in section 4, the rule that secrets and bank details never appear in code, and the commands to run after each task (`npm run lint`, `npx tsc --noEmit`, `npm run build`).
- **critic.md**: make it review every change against this checklist: matches the demo at 375, 768 and 1440 px; no invented facts (reviews, ratings, licences, statistics, prices presented as final); no placeholder phone or email; contact and social fields hidden when empty; no bank details in the code; accessibility (alt text, focus states, contrast, reduced motion); Lighthouse 90+. It reports problems and does not edit code.
- **storyteller.md**: make it the copywriter for site text. Voice: warm, clear, concrete, in the demo's style ("Built around how people actually travel."). Use only facts from section 2 or from the data files. Never claim awards, ratings or experience beyond "since 2022". Run the humanizer skill over all new copy.
- **humanizer skill and learning.md**: keep as they are, but add one line to `learning.md` recording that unsupplied client content defaults to hidden or marked placeholder, never invented.
- Also create `CLAUDE.md` at the repo root if it does not exist, with the project rules from sections 1 to 4 in short form.

## 6. Structure for later prompts

- Put all content in typed modules: `lib/data.ts` (destinations, group tours, reviews, why-Yeto) and `lib/site.ts` (company facts, contact, socials, legal numbers). Components import from these and hardcode nothing.
- Keep the data shapes close to a future database: `Destination`, `Package`, `Departure`, `Review`, `SiteSettings`.
- Add `.env.example` listing every variable (`NEXT_PUBLIC_WHATSAPP`, `NEXT_PUBLIC_PHONE`, `NEXT_PUBLIC_EMAIL`, `NEXT_PUBLIC_SITE_URL`, the four `BANK_*` values, and empty slots for Supabase, Razorpay and Resend). Make sure `.env*` is in `.gitignore` apart from `.env.example`.

## 7. Done means

- `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass.
- Every route matches the demo visually. Screenshot home, `/destinations`, one destination page and `/plan` at 375 px and 1440 px and compare.
- No dummy phone, email or social link is visible anywhere.
- Final report lists: what changed, what is still placeholder (prices, images, tagline, contact details, policies), and what I need to supply or confirm with the client.