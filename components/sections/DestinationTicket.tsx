import Flag from "@/components/Flag";
import Parallax from "@/components/motion/Parallax";
import SmartImage from "@/components/SmartImage";
import Ticket from "@/components/ui/Ticket";
import { formatINR, formatStay, leadPackage, type Destination } from "@/lib/data";

/** One destination as a boarding pass. The whole ticket is a single link. */
export default function DestinationTicket({
  destination,
  className = "",
}: {
  destination: Destination;
  className?: string;
}) {
  const pkg = leadPackage(destination);
  const stay = pkg ? formatStay(pkg.nights, pkg.days) : null;
  const label = pkg
    ? `${destination.name}, ${stay}, from ${formatINR(pkg.fromPrice)} per person`
    : `${destination.name}, itinerary on request, price on request`;

  return (
    <Ticket
      href={`/destinations/${destination.slug}`}
      aria-label={label}
      stubHeight="8.75rem"
      className={`reveal-settle h-full ${className}`}
      ticketClassName="h-full"
      main={
        <div>
          <div className="relative h-44 overflow-hidden sm:h-52">
            <Parallax speed={0.08} className="absolute inset-x-0 -inset-y-[10%]">
              <div className="ticket-img h-full w-full">
                <SmartImage
                  src={destination.images}
                  alt={`${destination.name}, ${destination.country}`}
                  className="h-full w-full"
                  sizes="360px"
                />
              </div>
            </Parallax>
          </div>
          <div className="px-5 pb-5 pt-4">
            <h3 className="flex items-center gap-2 font-display text-2xl leading-tight text-ocean-900">
              <Flag code={destination.flag} />
              {destination.name}
            </h3>
            <p className="mt-1 text-sm leading-snug text-ocean-800/80">{destination.places}</p>
          </div>
        </div>
      }
      stub={
        <div className="grid h-full grid-cols-2 content-start gap-x-3 gap-y-3 p-4 sm:block sm:space-y-3 sm:p-3.5">
          <div>
            <p className="ticket-label">Destination</p>
            <p className="font-display text-xl leading-tight text-ocean-900">
              {destination.code ?? "Domestic"}
            </p>
          </div>
          {pkg ? (
            <>
              <div>
                <p className="ticket-label">Duration</p>
                <p className="text-xs leading-snug text-ocean-900">{stay}</p>
              </div>
              <div>
                <p className="ticket-label">Best time</p>
                <p className="text-xs leading-snug text-ocean-900">{destination.bestTime}</p>
              </div>
              <div>
                <p className="ticket-label">From</p>
                <p className="font-display text-lg leading-tight text-ocean-900">{formatINR(pkg.fromPrice)}</p>
                <p className="ticket-label">Per person</p>
              </div>
            </>
          ) : (
            <>
              <div>
                <p className="ticket-label">Best time</p>
                <p className="text-xs leading-snug text-ocean-900">{destination.bestTime}</p>
              </div>
              <div className="col-span-2 text-xs leading-snug text-ocean-900 sm:col-span-1">
                <p>Itinerary on request</p>
                <p className="mt-1">Price on request</p>
              </div>
            </>
          )}
        </div>
      }
    />
  );
}
