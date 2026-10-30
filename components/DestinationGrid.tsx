"use client";

import Link from "next/link";
import { useState } from "react";
import Flag from "@/components/Flag";
import SmartImage from "@/components/SmartImage";
import { formatINR, formatStay, leadPackage, type Destination } from "@/lib/data";

type Filter = "all" | Destination["region"];

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "international", label: "International" },
  { value: "domestic", label: "Domestic" },
];

const GROUPS: { region: Destination["region"]; label: string }[] = [
  { region: "international", label: "International" },
  { region: "domestic", label: "Domestic" },
];

const CHIP_BASE =
  "rounded-full border px-4 py-2 text-sm font-medium transition-colors";
const CHIP_ON = "border-ocean-900 bg-ocean-900 text-white";
const CHIP_OFF =
  "border-ocean-900/20 bg-white text-ocean-900 hover:border-ocean-900/40";

function DestinationCard({ destination }: { destination: Destination }) {
  const pkg = leadPackage(destination);

  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-ocean-900/10 bg-white shadow-sm shadow-ocean-950/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-ocean-950/10"
    >
      <SmartImage
        src={destination.images}
        alt={`${destination.name}, ${destination.country}`}
        className="aspect-[4/3] w-full"
        imageClassName="transition-transform duration-500 ease-out group-hover:scale-105"
        overlay="bottom"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="flex items-center gap-2 font-display text-xl text-ocean-900">
            <Flag code={destination.code} />
            {destination.name}
          </h3>
        </div>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-wide text-sand-600">
          {destination.country}
        </p>
        <p className="mt-2 text-sm text-ocean-800/70">{destination.places}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {destination.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="rounded-full bg-ocean-50 px-2.5 py-1 text-[0.7rem] font-medium text-ocean-800"
            >
              {h}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-5 text-sm">
          {pkg ? (
            <>
              <span className="font-semibold text-ocean-900">
                From {formatINR(pkg.fromPrice)} per person
              </span>
              <span className="text-ocean-800/60">
                {formatStay(pkg.nights, pkg.days)}
              </span>
            </>
          ) : (
            <>
              <span className="font-semibold text-ocean-900">Price on request</span>
              <span className="text-ocean-800/60">Itinerary on request</span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}

/**
 * Destinations grouped by International / Domestic, with a filter. The server
 * renders the "All" view, so the full list is in the HTML without JavaScript.
 */
export default function DestinationGrid({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [filter, setFilter] = useState<Filter>("all");

  const groups = GROUPS.filter(
    (g) => filter === "all" || filter === g.region,
  )
    .map((g) => ({
      ...g,
      items: destinations.filter((d) => d.region === g.region),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="reveal mt-10">
      <div role="group" aria-label="Filter destinations" className="flex flex-wrap gap-2">
        {FILTERS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`${CHIP_BASE} ${filter === value ? CHIP_ON : CHIP_OFF}`}
          >
            {label}
          </button>
        ))}
      </div>

      <p className="sr-only" role="status">
        Showing {groups.reduce((n, g) => n + g.items.length, 0)} destinations
      </p>
      <p className="mt-6 text-xs text-ocean-800/75">
        Prices are starting fares per person and change with travel date,
        availability and departure city.
      </p>

      <div className="mt-8 space-y-12">
        {groups.map((group) => (
          <section key={group.region} aria-labelledby={`group-${group.region}`}>
            <h2
              id={`group-${group.region}`}
              className="font-display text-2xl text-ocean-900"
            >
              {group.label}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((destination) => (
                <DestinationCard key={destination.slug} destination={destination} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
