import Ticket from "@/components/ui/Ticket";
import { destinations } from "@/lib/data";
import { mapUrl, site } from "@/lib/site";

/**
 * A long ticket of plain facts, tucked under the hero. A Google rating slot
 * appears only when real data is set in lib/site.ts.
 */
export default function TrustTicket() {
  const rating = site.googleRating;
  const dharampeth = site.address.find((line) => line.includes("Dharampeth")) ? "Dharampeth, Nagpur" : "Nagpur";

  const cells = [
    <p key="count" className="text-sm leading-snug text-ocean-800">
      <span className="block font-display text-3xl leading-none text-ocean-900">{destinations.length}</span>
      <span className="mt-1 block">destinations</span>
    </p>,
    <p key="cin" className="text-sm leading-snug text-ocean-800">
      Registered company, CIN
      <span className="mt-1 block break-all font-mono text-[0.8rem] text-ocean-900">{site.cin}</span>
    </p>,
    <p key="office" className="text-sm leading-snug text-ocean-800">
      <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="underline decoration-ocean-900/30 underline-offset-4 hover:decoration-ocean-900">
        Office in {dharampeth}
      </a>
    </p>,
    <p key="package" className="text-sm leading-snug text-ocean-800">
      Flights, hotels and sightseeing in one package
    </p>,
    rating ? (
      <p key="rating" className="text-sm leading-snug text-ocean-800">
        <a href={rating.url} target="_blank" rel="noopener noreferrer" className="underline decoration-ocean-900/30 underline-offset-4 hover:decoration-ocean-900">
          <span className="block font-display text-3xl leading-none text-ocean-900">{rating.rating}</span>
          <span className="mt-1 block">on Google, {rating.count} reviews</span>
        </a>
      </p>
    ) : null,
  ].filter(Boolean);

  return (
    <section aria-label="About Yeto Holidays" className="relative z-20 -mt-10 px-5 sm:px-8">
      <div className="reveal mx-auto max-w-6xl">
        <Ticket
          shape="long"
          main={
            <ul
              className={`grid grid-cols-2 ${cells.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4"} [&>li]:border-dashed [&>li]:border-ocean-900/25 max-lg:[&>li:nth-child(odd)]:border-r-2 max-lg:[&>li:nth-child(n+3)]:border-t-2 lg:[&>li:not(:last-child)]:border-r-2`}
            >
              {cells.map((cell, i) => (
                <li key={i} className="flex min-h-[5.5rem] items-center px-6 py-5 lg:px-8">
                  {cell}
                </li>
              ))}
            </ul>
          }
        />
      </div>
    </section>
  );
}
