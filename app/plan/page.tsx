import type { Metadata } from "next";
import { site, whatsappDisplay } from "@/lib/site";
import Ticket from "@/components/ui/Ticket";
import WaveEdge from "@/components/ui/WaveEdge";
import PlanForm from "./PlanForm";

export const metadata: Metadata = {
  title: "Plan My Trip",
  description:
    "Tell us where you want to go and request a quote from Yeto Holidays. Share your details and our team will call you back.",
};

const STEPS = [
  {
    title: "We review your enquiry",
    body: "Our travel team reads your destination, dates and budget.",
  },
  {
    title: "We call you back with a quote",
    body: "A plan with pricing options, shared with you by the Yeto team.",
  },
  {
    title: "You confirm your booking",
    body: "When you are happy with the plan, pay an advance online to confirm your booking. Visa decisions are made by the embassy.",
  },
];

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function PlanPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const month = one(query.month);
  const travellers = one(query.travellers);
  // Only well-formed values reach the form: YYYY-MM and a whole number from 1 to 99.
  const initial = {
    destination: one(query.destination),
    month: /^\d{4}-\d{2}$/.test(month) ? month : "",
    travellers: /^[1-9]\d?$/.test(travellers) ? travellers : "2",
  };

  const hasContact = Boolean(
    site.contact.whatsapp || site.contact.phone || site.contact.email,
  );

  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="bg-ocean-900 pb-20 pt-28 sm:pb-24 sm:pt-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h1 className="max-w-xl font-display text-3xl leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            Plan my trip
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
            Tell us where and when you want to travel. Our team will call you
            back with a quote.
          </p>
        </div>
      </section>

      <WaveEdge className="text-sand-50" />

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 px-5 sm:px-8 gap-10 lg:grid-cols-[1fr_360px] lg:gap-14">
          <PlanForm initial={initial} />

          {/* Reassurance column */}
          <aside className="space-y-8">
            <Ticket
              shape="long"
              className="reveal-settle"
              main={
            <div className="p-6">
              <h2 className="font-display text-xl text-ocean-900">
                What happens next
              </h2>
              <ol className="mt-5 space-y-5">
                {STEPS.map((step, index) => (
                  <li key={step.title} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ocean-900 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-ocean-900">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-sm text-ocean-800/80">
                        {step.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
              }
            />

            {hasContact ? (
              <Ticket
                shape="long"
                className="reveal-settle"
                main={
              <div className="p-6">
                <h2 className="font-display text-xl text-ocean-900">
                  Talk to us directly
                </h2>
                <div className="mt-4 space-y-3 text-sm">
                  {site.contact.whatsapp ? (
                    <a
                      href={`https://wa.me/${site.contact.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-medium text-ocean-900 hover:text-ocean-700"
                    >
                      WhatsApp: {whatsappDisplay}
                    </a>
                  ) : null}
                  {site.contact.phone ? (
                    <a
                      href={`tel:${site.contact.phone.replace(/[^\d+]/g, "")}`}
                      className="flex items-center gap-2 font-medium text-ocean-900 hover:text-ocean-700"
                    >
                      Call: {site.contact.phone}
                    </a>
                  ) : null}
                  {site.contact.email ? (
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="flex items-center gap-2 font-medium text-ocean-900 hover:text-ocean-700"
                    >
                      {site.contact.email}
                    </a>
                  ) : null}
                </div>
              </div>
                }
              />
            ) : null}
          </aside>
        </div>
      </section>
    </div>
  );
}
