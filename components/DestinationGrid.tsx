"use client";

import { useState } from "react";
import DestinationTicket from "@/components/sections/DestinationTicket";
import Divider from "@/components/ui/Divider";
import type { Destination } from "@/lib/data";

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

      <div className="mt-8">
        {groups.map((group, g) => (
          <section key={group.region} aria-labelledby={`group-${group.region}`}>
            {g > 0 ? <Divider variant="dashed" className="!px-0 my-12" /> : null}
            <h2
              id={`group-${group.region}`}
              className="font-display text-2xl text-ocean-900"
            >
              {group.label}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((destination) => (
                <DestinationTicket key={destination.slug} destination={destination} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
