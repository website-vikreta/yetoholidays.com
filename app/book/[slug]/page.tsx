import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Flag from "@/components/Flag";
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
      <section className="bg-ocean-900 pb-14 pt-28 sm:pb-16 sm:pt-32">
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

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-2xl rounded-2xl border border-ocean-900/10 bg-white p-6 sm:p-8">
          <p className="inline-block rounded-full bg-sand-100 px-3 py-1 text-xs font-semibold text-ocean-900">
            Online booking opens soon
          </p>
          <h2 className="mt-4 font-display text-2xl text-ocean-900">
            Online booking and payment are coming
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ocean-800/75 sm:text-base">
            We are getting online payment ready. Until then, request a quote
            and our team will call you back to plan your {destination.name}{" "}
            trip.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              href={`/plan?destination=${destination.slug}`}
              variant="primary"
              size="md"
            >
              Request a Quote
            </ButtonLink>
            <ButtonLink
              href={`/destinations/${destination.slug}`}
              variant="outline"
              size="md"
            >
              Back to {destination.name}
            </ButtonLink>
            {whatsappHref ? (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-ocean-900 underline-offset-4 hover:underline"
              >
                Chat on WhatsApp
              </a>
            ) : null}
          </div>

          <p className="mt-6 text-xs leading-relaxed text-ocean-800/75">
            Payment terms and cancellation charges are set out in our{" "}
            <Link href="/terms" className="font-medium underline underline-offset-2">
              Terms &amp; Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="/cancellation-policy"
              className="font-medium underline underline-offset-2"
            >
              Cancellation Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
