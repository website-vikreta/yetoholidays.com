import Ticket from "@/components/ui/Ticket";
import WaveEdge from "@/components/ui/WaveEdge";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <>
      <section className="bg-ocean-900 px-5 pb-24 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        <div className="mx-auto max-w-2xl">
          <Ticket
            stubHeight="8rem"
            ticketClassName="[--cut:66%]"
            main={
              <div className="p-6 sm:p-8">
                <p className="ticket-label">Error 404</p>
                <h1 className="mt-2 font-display text-3xl text-ocean-900 sm:text-4xl">
                  We couldn&apos;t find that page
                </h1>
                <p className="mt-3 text-sm text-ocean-800/80 sm:text-base">
                  The link may be old or mistyped.
                </p>
              </div>
            }
            stub={
              <div className="flex h-full items-center justify-center p-4">
                <ButtonLink href="/destinations" variant="primary" size="md" className="w-full text-center">
                  Explore Destinations
                </ButtonLink>
              </div>
            }
          />
        </div>
      </section>
      <WaveEdge className="text-white" />
    </>
  );
}
