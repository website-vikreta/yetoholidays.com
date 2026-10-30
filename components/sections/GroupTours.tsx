import type { CSSProperties } from "react";
import Flag from "@/components/Flag";
import Ticket from "@/components/ui/Ticket";
import { ArrowRight, Section, SectionHeading } from "@/components/ui";
import { departures, formatINR, formatStay, type Departure } from "@/lib/data";

function CheckIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" className="h-3.5 w-3.5 shrink-0 text-ocean-700">
      <path d="M3 8.5 6.2 11.5 13 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Real seat counts only. Until the client supplies them, ask for availability. */
const seats = (d: Departure) =>
  d.seatsLeft === undefined ? "Ask for availability" : `${d.seatsLeft} seats left`;

function DepartureTicket({ tour, index }: { tour: Departure; index: number }) {
  const stay = formatStay(tour.nights, tour.days);
  // Alternate the side each ticket arrives from, and offset every second one on desktop.
  const fromX = index % 2 === 0 ? "-40px" : "40px";

  return (
    <div
      className={`reveal-settle ${index % 2 === 1 ? "lg:ml-6 lg:w-[calc(100%-1.5rem)]" : ""}`}
      style={{ "--dx": fromX } as CSSProperties}
    >
      <Ticket
        href={`/destinations/${tour.slug}`}
        aria-label={`${tour.name}, ${tour.window}, ${stay}, from ${formatINR(tour.fromPrice)} per person`}
        stubHeight="11.5rem"
        ticketClassName="[--cut:72%]"
        main={
          <div className="grid gap-4 p-5 sm:p-6 md:grid-cols-[1.2fr_1fr] md:gap-8">
            <div>
              <p className="ticket-label">Date</p>
              <p className="font-display text-3xl uppercase leading-none tracking-tight text-ocean-900 sm:text-4xl">
                {tour.window}
              </p>
              <p className="mt-3 flex items-center gap-2 text-lg font-semibold text-ocean-900">
                <Flag code={tour.flag} />
                {tour.name}
              </p>
              <p className="mt-0.5 text-sm text-ocean-800/80">{stay}</p>
            </div>
            <div>
              <p className="ticket-label">Includes</p>
              <ul className="mt-1.5 space-y-1.5">
                {tour.includes.slice(0, 3).map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-ocean-800">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        }
        stub={
          <div className="flex h-full flex-col justify-between gap-3 p-4 sm:p-5">
            <div>
              <p className="ticket-label">From</p>
              <p className="font-display text-2xl leading-tight text-ocean-900 sm:text-3xl">{formatINR(tour.fromPrice)}</p>
              <p className="ticket-label">Per person</p>
              <p className="mt-2 text-xs leading-snug text-ocean-800">{seats(tour)}</p>
            </div>
            <span className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-ocean-900 px-4 text-sm font-semibold text-white">
              See itinerary
              <ArrowRight />
            </span>
          </div>
        }
      />
    </div>
  );
}

export default function GroupTours() {
  return (
    <Section id="tours" className="bg-gradient-to-b from-white to-ocean-50">
      <SectionHeading
        title="Join a group departure"
        intro="Fixed dates and a set itinerary, with a Yeto tour manager travelling with the group."
      />

      <div className="mt-12 space-y-6">
        {departures.map((tour, i) => (
          <DepartureTicket key={tour.slug + tour.packageSlug} tour={tour} index={i} />
        ))}
      </div>

      <p className="reveal mt-8 text-xs text-ocean-800/80">
        Prices are starting fares per person and change with travel date,
        availability and departure city.
      </p>
    </Section>
  );
}
