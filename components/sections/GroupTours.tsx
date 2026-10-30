import Flag from "@/components/Flag";
import SmartImage from "@/components/SmartImage";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { departures, formatINR, formatStay, type Departure } from "@/lib/data";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
      className="h-3.5 w-3.5 shrink-0 text-ocean-700"
    >
      <path
        d="M3 8.5 6.2 11.5 13 4.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TourCard({ tour }: { tour: Departure }) {
  return (
    <article className="flex min-w-[82%] snap-center flex-col overflow-hidden rounded-2xl border border-ocean-900/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg sm:min-w-0">
      <div className="relative">
        <SmartImage
          src={tour.images}
          alt={`${tour.name} group tour`}
          className="aspect-[4/3] w-full"
          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 50vw, 384px"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="flex items-center gap-2 font-display text-xl text-ocean-900">
          <Flag code={tour.flag} />
          {tour.name}
        </h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ocean-800/55">
          {tour.window}
        </p>

        <div className="mt-4 flex items-end justify-between gap-3 border-y border-ocean-900/10 py-4">
          <div>
            <p className="text-[0.7rem] uppercase tracking-wide text-ocean-800/55">
              Starting
            </p>
            <p className="font-display text-2xl text-ocean-900">
              {formatINR(tour.fromPrice)}
              <span className="ml-1 text-xs font-sans font-normal text-ocean-800/55">
                / person
              </span>
            </p>
          </div>
          <p className="text-right text-sm font-medium text-ocean-800/70">
            {formatStay(tour.nights, tour.days)}
          </p>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {tour.includes.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 rounded-full bg-ocean-50 px-2.5 py-1 text-[0.72rem] font-medium text-ocean-800"
            >
              <CheckIcon />
              {item}
            </li>
          ))}
        </ul>

        <ButtonLink
          href={`/destinations/${tour.slug}`}
          variant="primary"
          size="md"
          className="mt-6 w-full"
        >
          See itinerary
        </ButtonLink>
      </div>
    </article>
  );
}

export default function GroupTours() {
  return (
    <Section id="tours" className="bg-gradient-to-b from-white to-ocean-50">
      <SectionHeading
        title="Join a group departure"
        intro="Fixed dates and a set itinerary, with a Yeto tour manager travelling with the group."
      />

      <div className="reveal -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {departures.map((tour) => (
          <TourCard key={tour.slug + tour.packageSlug} tour={tour} />
        ))}
      </div>

      <p className="reveal mt-6 text-xs text-ocean-800/75">
        Prices are starting fares per person and change with travel date,
        availability and departure city.
      </p>
    </Section>
  );
}
