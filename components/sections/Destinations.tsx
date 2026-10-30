import Link from "next/link";
import Flag from "@/components/Flag";
import SmartImage from "@/components/SmartImage";
import { Section, SectionHeading, ArrowRight } from "@/components/ui";
import {
  destinations,
  featuredDestinations,
  formatINR,
  formatStay,
  leadPackage,
  type Destination,
} from "@/lib/data";

function DestinationCard({
  destination,
  priority,
}: {
  destination: Destination;
  priority: boolean;
}) {
  const pkg = leadPackage(destination);
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group relative flex min-w-[78%] snap-center flex-col overflow-hidden rounded-2xl bg-ocean-900 shadow-md shadow-ocean-950/10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ocean-950/20 sm:min-w-0"
    >
      <SmartImage
        src={destination.images}
        alt={`${destination.name}, ${destination.country}`}
        className="aspect-[4/5] w-full sm:aspect-[4/3]"
        imageClassName="transition-transform duration-500 ease-out group-hover:scale-105"
        overlay="bottom"
        priority={priority}
        sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 384px"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="flex items-center gap-2 font-display text-2xl leading-tight">
          <Flag code={destination.code} />
          {destination.name}
        </h3>
        <p className="mt-1 text-sm text-white/85">{destination.places}</p>
        <p className="mt-3 text-xs font-medium text-white/75">
          {pkg ? (
            <>
              <span className="block">From {formatINR(pkg.fromPrice)} per person</span>
              <span className="block">{formatStay(pkg.nights, pkg.days)}</span>
            </>
          ) : (
            "Price on request"
          )}
        </p>
      </div>
    </Link>
  );
}

export default function Destinations() {
  return (
    <Section id="destinations">
      <SectionHeading
        title="Where do you want to go?"
        intro={`Start with one of these six, or ask us about any of our ${destinations.length} destinations.`}
      />

      <div className="reveal -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 snap-rail sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {featuredDestinations.map((destination, index) => (
          <DestinationCard
            key={destination.slug}
            destination={destination}
            priority={index < 3}
          />
        ))}
      </div>

      <div className="reveal mt-10 flex justify-center sm:justify-start">
        <Link
          href="/destinations"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-ocean-900 hover:text-ocean-700"
        >
          View all destinations
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
      <p className="reveal mt-4 text-center text-xs text-ocean-800/75 sm:text-left">
        Prices are starting fares per person and change with travel date,
        availability and departure city.
      </p>
    </Section>
  );
}
