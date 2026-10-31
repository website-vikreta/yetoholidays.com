import DestinationTicket from "@/components/sections/DestinationTicket";
import PinnedPasses from "@/components/sections/PinnedPasses";
import Ticket from "@/components/ui/Ticket";
import { ArrowRight, Section, SectionHeading } from "@/components/ui";
import { destinations, featuredDestinations } from "@/lib/data";

const NOTE = (
  <p className="text-xs text-ocean-800/80">
    Prices are starting fares per person and change with travel date,
    availability and departure city.
  </p>
);

/** The last pass in the row: a link to every destination, in sand tone. */
function AllDestinationsTicket({ className = "" }: { className?: string }) {
  return (
    <Ticket
      href="/destinations"
      aria-label={`View all ${destinations.length} destinations`}
      tone="sand"
      stubHeight="6rem"
      className={`reveal-settle h-full ${className}`}
      ticketClassName="h-full [--cut:62%]"
      main={
        <div className="flex h-full min-h-[16rem] flex-col justify-center p-6">
          <p className="ticket-label">Destinations</p>
          <p className="mt-2 font-display text-4xl leading-none text-ocean-900">{destinations.length}</p>
          <p className="mt-3 text-sm leading-snug text-ocean-800">
            Six are shown here. Ask us about the rest.
          </p>
        </div>
      }
      stub={
        <div className="flex h-full flex-col items-center justify-center gap-2 p-3 text-center text-xs font-semibold text-ocean-900 sm:text-sm">
          View all destinations
          <ArrowRight />
        </div>
      }
    />
  );
}

export default function Destinations() {
  const heading = (
    <SectionHeading
      title="Where do you want to go?"
      intro={`Start with one of these six, or ask us about any of our ${destinations.length} destinations.`}
    />
  );
  const total = featuredDestinations.length + 1;

  return (
    <>
      {/* Large screens, fine pointer, motion allowed: pinned row that slides sideways. */}
      <PinnedPasses heading={heading} note={NOTE} count={total}>
        {featuredDestinations.map((destination) => (
          <div key={destination.slug} data-pass className="w-[360px] shrink-0 self-stretch">
            <DestinationTicket destination={destination} />
          </div>
        ))}
        <div data-pass className="w-[320px] shrink-0 self-stretch">
          <AllDestinationsTicket />
        </div>
      </PinnedPasses>

      {/* Everywhere else: a normal horizontal snap rail. */}
      <Section id="destinations-rail" className="rail-only">
        {heading}
        <div className="-mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-8 pt-2 snap-rail sm:-mx-8 sm:gap-6 sm:px-8 lg:mx-0 lg:snap-none lg:flex-wrap lg:overflow-visible lg:px-0">
          {featuredDestinations.map((destination) => (
            <div key={destination.slug} className="w-[84%] shrink-0 snap-center sm:w-[360px]">
              <DestinationTicket destination={destination} />
            </div>
          ))}
          <div className="w-[84%] shrink-0 snap-center sm:w-[320px]">
            <AllDestinationsTicket />
          </div>
        </div>
        <div className="mt-2">{NOTE}</div>
      </Section>
    </>
  );
}
