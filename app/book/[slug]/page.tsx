import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Flag from "@/components/Flag";
import Ticket from "@/components/ui/Ticket";
import WaveEdge from "@/components/ui/WaveEdge";
import { ButtonLink } from "@/components/ui";
import { destinations, getDestination } from "@/lib/data";
import { whatsappLink } from "@/lib/site";

type PageParams = { slug: string };

export async function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);

  return {
    title: destination ? `Book ${destination.name}` : "Book",
    description: "Online booking at Yeto Holidays opens soon.",
    // Holding page: keep it out of search until online booking is live.
    robots: { index: false, follow: true },
  };
}

/**
 * Holding page for online booking. The payment flow (Razorpay) is built in a
 * later phase and replaces this page.
 */
export default async function BookPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const destination = getDestination(slug);

  if (!destination) notFound();

  const whatsappHref = whatsappLink(
    `Hi Yeto Holidays, I'd like to book a ${destination.name} holiday.`,
  );

  return (
    <div className="bg-sand-50">
      <section className="bg-ocean-900 pb-20 pt-28 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sand-300">
            Book now
          </span>
          <h1 className="mt-3 flex max-w-xl items-center gap-3 font-display text-3xl leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            <Flag code={destination.flag} className="!w-7 sm:!w-9" />
            {destination.name}
          </h1>
        </div>
      </section>

      <WaveEdge className="text-sand-50" />

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="reveal-settle mx-auto max-w-3xl">
          <Ticket
            stubHeight={whatsappHref ? "15rem" : "11.5rem"}
            ticketClassName="[--cut:64%]"
            main={
              <div className="p-6 sm:p-8">
                <p className="ticket-label">Online booking</p>
                <p className="mt-1 inline-block bg-sand-100 px-3 py-1 text-xs font-semibold text-ocean-900">
                  Online booking opens soon
                </p>
                <h2 className="mt-4 font-display text-2xl text-ocean-900">
                  Online booking and payment are coming
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ocean-800/80 sm:text-base">
                  We are getting online payment ready. Until then, request a quote
                  and our team will call you back to plan your {destination.name}{" "}
                  trip.
                </p>
                <p className="mt-6 text-xs leading-relaxed text-ocean-800/80">
                  Payment terms and cancellation charges are set out in our{" "}
                  <Link href="/terms" className="font-medium underline underline-offset-2">
                    Terms &amp; Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/cancellation-policy" className="font-medium underline underline-offset-2">
                    Cancellation Policy
                  </Link>
                  .
                </p>
              </div>
            }
            stub={
              <div className="flex h-full flex-col justify-center gap-3 p-4 sm:p-5">
                <ButtonLink href={`/plan?destination=${destination.slug}`} variant="primary" size="md" className="w-full text-center">
                  Request a Quote
                </ButtonLink>
                <ButtonLink href={`/destinations/${destination.slug}`} variant="outline" size="md" className="w-full text-center">
                  Back to {destination.name}
                </ButtonLink>
                {whatsappHref ? (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center justify-center text-sm font-semibold text-ocean-900 underline underline-offset-4"
                  >
                    Chat on WhatsApp
                  </a>
                ) : null}
              </div>
            }
          />
        </div>
      </section>
    </div>
  );
}
