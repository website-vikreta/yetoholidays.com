import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Flag from "@/components/Flag";
import Parallax from "@/components/motion/Parallax";
import DestinationTicket from "@/components/sections/DestinationTicket";
import SmartImage from "@/components/SmartImage";
import Divider from "@/components/ui/Divider";
import Ticket from "@/components/ui/Ticket";
import { ButtonLink } from "@/components/ui";
import {
  destinations,
  formatINR,
  formatStay,
  getDestination,
  leadPackage,
} from "@/lib/data";
import { whatsappLink } from "@/lib/site";

type PageParams = { slug: string };

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    return {
      title: "Destination Not Found",
      description: "This destination could not be found.",
    };
  }

  return {
    title: `${destination.name} tour package`,
    description: destination.blurb,
  };
}

const INCLUSION_ICON = (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-4 w-4 shrink-0">
    <circle cx="10" cy="10" r="10" className="fill-ocean-900" />
    <path
      d="M6 10.2l2.4 2.4L14.2 7"
      stroke="white"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const VISA_NOTE =
  "Visa approval is decided by the embassy, so we cannot guarantee an outcome. Travel insurance is advised.";

const NOT_INCLUDED = [
  "International/domestic visa fees, where applicable",
  "Travel insurance",
  "Personal expenses, tips and anything of a personal nature",
  "Meals and activities not specifically listed under inclusions",
  "Any cost arising from flight delays, cancellations or itinerary changes beyond our control",
];

export default async function DestinationPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) {
    notFound();
  }

  const others = destinations.filter((d) => d.slug !== destination.slug).slice(0, 3);
  const pkg = leadPackage(destination);
  const enquiryMessage = pkg
    ? `Hi Yeto Holidays, I'd like to enquire about the ${destination.name} package (${formatStay(pkg.nights, pkg.days)}). Please share more details.`
    : `Hi Yeto Holidays, I'd like to enquire about a ${destination.name} holiday. Please share more details.`;
  const whatsappHref = whatsappLink(enquiryMessage);
  const quoteHref = `/plan?destination=${destination.slug}`;
  const bookHref = `/book/${destination.slug}`;

  return (
    <div className="bg-sand-50 pb-28 lg:pb-0">
      {/* Hero */}
      <section className="relative flex h-[70svh] min-h-[480px] w-full items-end overflow-hidden bg-ocean-950">
        <div className="absolute inset-0 overflow-hidden">
          <Parallax speed={0.3} className="absolute inset-x-0 -inset-y-[15%]">
            <SmartImage
              src={destination.images}
              alt={`${destination.name}, ${destination.country}`}
              className="h-full w-full"
              sizes="100vw"
              priority
              overlay="bottom"
            />
          </Parallax>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-2 z-10">
          <Divider variant="wave" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-8 pt-28 sm:px-8 sm:pb-12">
          <nav className="text-xs font-medium text-white/70" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <span className="mx-1.5" aria-hidden>
              /
            </span>
            <Link href="/destinations" className="hover:text-white">
              Destinations
            </Link>
            <span className="mx-1.5" aria-hidden>
              /
            </span>
            <span className="text-white">{destination.name}</span>
          </nav>

          <h1 className="mt-4 flex items-center gap-3 font-display text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            <Flag code={destination.flag} className="!w-8 sm:!w-10" />
            {destination.name}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/85 sm:text-base">
            {destination.places}
          </p>

          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-white/80 sm:text-sm">
            {pkg ? (
              <li>{formatStay(pkg.nights, pkg.days)}</li>
            ) : null}
            <li className={pkg ? "border-l border-white/25 pl-6" : ""}>
              Best time: {destination.bestTime}
            </li>
            <li className="border-l border-white/25 pl-6">
              Country: {destination.country}
            </li>
          </ul>
        </div>
      </section>

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-10 py-10 sm:py-14 lg:grid-cols-[1fr_320px] lg:gap-12">
          {/* Main content */}
          <div className="min-w-0">
            <p className="reveal text-base leading-relaxed text-ocean-800/80 sm:text-lg">
              {destination.blurb}
            </p>

            <div className="reveal mt-6 flex flex-wrap gap-2">
              {destination.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-full bg-ocean-50 px-3 py-1.5 text-xs font-medium text-ocean-800 sm:text-sm"
                >
                  {h}
                </span>
              ))}
            </div>

            {pkg ? (
              <>
              {/* Itinerary */}
              <div className="mt-14">
                <h2 className="reveal font-display text-2xl text-ocean-900 sm:text-3xl">
                  Day by day
                </h2>

                <ol className="mt-8 space-y-8">
                  {pkg.itinerary.map((item, index) => (
                    <li key={item.day} className="reveal relative pl-10">
                      {index !== pkg.itinerary.length - 1 && (
                        <span
                          aria-hidden
                          className="absolute left-[15px] top-8 h-[calc(100%-0.5rem)] border-l-2 border-dashed border-ocean-900/25"
                        />
                      )}
                      <span
                        aria-hidden
                        className="absolute left-0 top-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-ocean-900 text-xs font-semibold text-white"
                      >
                        {index + 1}
                      </span>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sand-700">
                        {item.day}
                      </p>
                      <h3 className="mt-1 font-display text-lg text-ocean-900 sm:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-ocean-800/75 sm:text-base">
                        {item.detail}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>

              <Divider variant="dashed" className="!px-0 mt-14" />

              {/* Inclusions */}
              <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
                <div className="reveal">
                  <h2 className="font-display text-2xl text-ocean-900 sm:text-3xl">
                    What&apos;s included
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {pkg.inclusions.map((inc) => (
                      <li
                        key={inc}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ocean-800/80 sm:text-base"
                      >
                        {INCLUSION_ICON}
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="reveal">
                  <h2 className="font-display text-2xl text-ocean-900 sm:text-3xl">
                    Not included
                  </h2>
                  <ul className="mt-5 space-y-3">
                    {NOT_INCLUDED.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ocean-800/80 sm:text-base"
                      >
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ocean-900/40" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

                <p className="reveal mt-6 text-xs leading-relaxed text-ocean-800/80 sm:text-sm">
                  {VISA_NOTE}
                </p>
              </>
            ) : (
              <div className="reveal mt-14 rounded-2xl border border-ocean-900/10 bg-white p-6 sm:p-8">
                <h2 className="font-display text-2xl text-ocean-900 sm:text-3xl">
                  Itinerary shared on enquiry
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ocean-800/75 sm:text-base">
                  We plan {destination.name} trips around your dates, group and
                  budget, so there is no fixed itinerary or price listed yet.
                  Request a quote and our team will call you back with a plan.
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ocean-800/80 sm:text-sm">
                  {VISA_NOTE}
                </p>
              </div>
            )}

            <Divider variant="dashed" className="!px-0 mt-14" />

            {/* CTA block */}
            <div className="reveal-settle mt-10">
              <Ticket
                stubHeight={whatsappHref ? "15rem" : "11.5rem"}
                ticketClassName="[--cut:62%]"
                main={
                  <div className="p-6 sm:p-8">
                    <h3 className="font-display text-xl text-ocean-900 sm:text-2xl">
                      Ready to plan your {destination.name} trip?
                    </h3>
                    <p className="mt-1.5 text-sm text-ocean-800/80">
                      Request a quote and our team will call you back, or book and
                      pay online once booking opens.
                    </p>
              <p className="mt-5 text-xs leading-relaxed text-ocean-800/80">
                Payment terms and cancellation charges are in our{" "}
                <Link href="/terms" className="font-medium underline underline-offset-2">
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/cancellation-policy"
                  className="font-medium underline underline-offset-2"
                >
                  Cancellation Policy
                </Link>
                .
              </p>
                  </div>
                }
                stub={
                  <div className="flex h-full flex-col justify-center gap-3 p-4 sm:p-5">
                    <ButtonLink href={quoteHref} variant="primary" size="md" className="w-full text-center">
                      Request a Quote
                    </ButtonLink>
                    <ButtonLink href={bookHref} variant="outline" size="md" className="w-full text-center">
                      Book Now
                    </ButtonLink>
                    {whatsappHref ? (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-ocean-900 underline underline-offset-4"
                      >
                        Chat on WhatsApp
                      </a>
                    ) : null}
                  </div>
                }
              />
            </div>
          </div>

          {/* Sticky price sidebar (lg+) */}
          <aside className="hidden lg:block">
            <div className="lg:sticky lg:top-28">
              <Ticket
                stacked
                stubHeight={whatsappHref ? "14.5rem" : "11rem"}
                main={
                  <div className="p-6">
                    {pkg ? (
                      <>
                        <p className="ticket-label">From</p>
                        <p className="mt-1 font-display text-3xl text-ocean-900">{formatINR(pkg.fromPrice)}</p>
                        <p className="ticket-label">Per person</p>
                        <div className="mt-5 space-y-3 text-sm text-ocean-900">
                          <div>
                            <p className="ticket-label">Duration</p>
                            <p>{formatStay(pkg.nights, pkg.days)}</p>
                          </div>
                          <div>
                            <p className="ticket-label">Best time</p>
                            <p>{destination.bestTime}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="font-display text-2xl text-ocean-900">Price on request</p>
                        <div className="mt-3 space-y-3 text-sm text-ocean-900">
                          <p>Itinerary shared on enquiry</p>
                          <div>
                            <p className="ticket-label">Best time</p>
                            <p>{destination.bestTime}</p>
                          </div>
                        </div>
                      </>
                    )}
                    <p className="mt-5 text-[0.7rem] leading-relaxed text-ocean-800/80">
                      {pkg
                        ? "Indicative starting fare per person. Final pricing depends on travel dates, availability and departure city."
                        : "Price and itinerary are shared once we know your dates, group size and budget."}
                    </p>
                  </div>
                }
                stub={
                  <div className="flex h-full flex-col justify-center gap-3 p-5">
                    <ButtonLink href={quoteHref} variant="primary" size="md" className="w-full text-center">
                      Request a Quote
                    </ButtonLink>
                    <ButtonLink href={bookHref} variant="outline" size="md" className="w-full text-center">
                      Book Now
                    </ButtonLink>
                    {whatsappHref ? (
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-ocean-900 underline underline-offset-4"
                      >
                        Chat on WhatsApp
                      </a>
                    ) : null}
                  </div>
                }
              />
            </div>
          </aside>
        </div>

        <Divider variant="dashed" className="!px-0" />

        {/* Other destinations */}
        <div className="py-14">
          <h2 className="reveal font-display text-2xl text-ocean-900 sm:text-3xl">
            Other destinations
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <DestinationTicket key={other.slug} destination={other} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile sticky bar */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-4 border-t border-ocean-900/10 bg-white px-5 py-3 shadow-[0_-4px_16px_rgba(14,47,69,0.08)] lg:hidden"
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="min-w-0">
          {pkg ? (
            <>
              <p className="text-[0.65rem] font-semibold uppercase tracking-wide text-sand-700">
                from
              </p>
              <p className="font-display text-lg leading-tight text-ocean-900">
                {formatINR(pkg.fromPrice)}
              </p>
            </>
          ) : (
            <p className="font-display text-base leading-tight text-ocean-900">
              Price on request
            </p>
          )}
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <ButtonLink href={bookHref} variant="outline" size="sm">
            Book Now
          </ButtonLink>
          <ButtonLink href={quoteHref} variant="primary" size="sm">
            Request a Quote
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
