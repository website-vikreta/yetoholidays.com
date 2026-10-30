import Link from "next/link";
import Logo from "@/components/Logo";
import { destinations } from "@/lib/data";
import { addressLine, site, whatsappDisplay, whatsappLink } from "@/lib/site";

const COMPANY_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Group tours", href: "/#tours" },
  { label: "Corporate travel", href: "/#corporate" },
  { label: "Plan my trip", href: "/plan" },
  { label: "Contact", href: "/#contact" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Cancellation Policy", href: "/cancellation-policy" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-[18px] w-[18px]">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-[18px] w-[18px]">
      <path
        d="M14.5 8.5h2V5.4c-.35-.05-1.55-.15-2.95-.15-2.92 0-4.92 1.83-4.92 5.2v2.8H5.9v3.5h2.73V21h3.62v-4.25h2.62l.42-3.5h-3.04v-2.4c0-1.01.28-1.7 1.75-1.7Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-[18px] w-[18px]">
      <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M7.8 10.2v6.3M7.8 7.8v.02" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M11 16.5v-3.6c0-1.2.85-2.1 2-2.1s1.9.8 1.9 2.1v3.6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M11 12.9v3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// A link renders only when its URL is filled in lib/site.ts.
const SOCIALS = [
  { label: "Instagram", href: site.socials.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: site.socials.facebook, Icon: FacebookIcon },
  { label: "LinkedIn", href: site.socials.linkedin, Icon: LinkedInIcon },
].filter((social) => social.href);

const LICENCES = [
  { label: "GST", value: site.licences.gst },
  { label: "IATA", value: site.licences.iata },
  { label: "TAAI", value: site.licences.taai },
  { label: "OTOAI", value: site.licences.otoai },
  { label: "Tourism licence", value: site.licences.tourismLicence },
].filter((licence) => licence.value);

const WHATSAPP_HREF = whatsappLink("Hi Yeto Holidays, I'd like to plan a trip.");

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ocean-950 text-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="max-w-sm">
            <div className="flex items-center gap-4">
              <Link href="/" aria-label="Yeto Holidays home" className="inline-flex shrink-0">
                <Logo light className="h-10" />
              </Link>
              <p className="font-display text-sm italic text-sand-100">{site.tagline}</p>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/60">
              Yeto Holidays plans international and domestic holidays,
              honeymoons, group tours and corporate trips from our office in
              Dharampeth, Nagpur.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-400">
              Destinations
            </h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {destinations.map((destination) => (
                <li key={destination.slug}>
                  <Link
                    href={`/destinations/${destination.slug}`}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {destination.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-400">
              Company
            </h3>
            <ul className="mt-5 space-y-3">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-sand-400">
              Get in touch
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-white/70">
              <li>
                <address className="not-italic leading-relaxed">
                  {site.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </li>
              {WHATSAPP_HREF ? (
                <li>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-200 hover:text-white"
                  >
                    WhatsApp: {whatsappDisplay}
                  </a>
                </li>
              ) : null}
              {site.contact.phone ? (
                <li>
                  <a
                    href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    Call: {site.contact.phone}
                  </a>
                </li>
              ) : null}
              {site.contact.email ? (
                <li>
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="transition-colors duration-200 hover:text-white"
                  >
                    {site.contact.email}
                  </a>
                </li>
              ) : null}
            </ul>

            {SOCIALS.length > 0 ? (
            <div className="mt-6 flex items-center gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors duration-200 hover:border-white/35 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="space-y-1">
            <p>
              &copy; {year} {site.legalName}. All rights reserved.
            </p>
            <p className="text-white/60">
              CIN {site.cin} &middot; Established {site.established}
              {LICENCES.map((licence) => (
                <span key={licence.label}>
                  {" "}
                  &middot; {licence.label} {licence.value}
                </span>
              ))}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="mx-auto w-full max-w-6xl px-5 pb-6 text-[0.7rem] leading-relaxed text-white/60 sm:px-8">
          Prices are starting fares per person and change with travel date,
          availability and departure city. Visa decisions are made by the
          embassy, and travel insurance is recommended. Registered office:{" "}
          {addressLine}.
        </p>
      </div>
    </footer>
  );
}
