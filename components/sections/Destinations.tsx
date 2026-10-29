import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import { Section, SectionHeading, ArrowRight } from "@/components/ui";
import {
  featuredDestinations,
  formatINR,
  leadPackage,
  type Destination,
} from "@/lib/data";

function DestinationCard({ destination }: { destination: Destination }) {
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
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 className="font-display text-2xl leading-tight">
          <span className="mr-1.5">{destination.flag}</span>
          {destination.name}
        </h3>
        <p className="mt-1 text-sm text-white/80">{destination.tagline}</p>
        <div className="mt-3 flex items-center gap-2 text-xs font-medium text-white/70">
          {pkg ? (
            <>
              <span>from {formatINR(pkg.fromPrice)}</span>
              <span aria-hidden>&middot;</span>
              <span>
                {pkg.nights}N / {pkg.days}D
              </span>
            </>
          ) : (
            <span>Price on request</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function Destinations() {
  return (
    <Section id="destinations">
      <SectionHeading
        eyebrow="Destinations"
        title="Where do you want to go?"
        intro="Six routes to start with, ready to be tailored into your holiday."
      />

      <div className="reveal -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:grid sm:snap-none sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3">
        {featuredDestinations.map((destination) => (
          <DestinationCard key={destination.slug} destination={destination} />
        ))}
      </div>

      <div className="reveal mt-10 flex justify-center sm:justify-start">
        <Link
          href="/destinations"
          className="group inline-flex items-center gap-2 text-sm font-semibold text-ocean-900 hover:text-ocean-700"
        >
          View All Destinations
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
      <p className="reveal mt-4 text-center text-xs text-ocean-800/75 sm:text-left">
        Prices are indicative starting fares per person.
      </p>
    </Section>
  );
}
