import type { Metadata } from "next";
import DestinationGrid from "@/components/DestinationGrid";
import SmartImage from "@/components/SmartImage";
import { Section, SectionHeading } from "@/components/ui";
import { destinations } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Destinations",
  description:
    "Browse every Yeto Holidays destination: India, Europe, Dubai, Singapore, Malaysia, Vietnam, Thailand, Indonesia, Sri Lanka, Nepal and Bhutan.",
};

export default function DestinationsPage() {
  const heroImages = destinations.flatMap((d) => d.images).slice(0, 6);

  return (
    <div className="bg-sand-50">
      {/* Hero */}
      <section className="relative flex h-[45svh] min-h-[320px] w-full items-end overflow-hidden bg-ocean-950">
        <SmartImage
          src={heroImages}
          alt="Collage of Yeto Holidays destinations around the world"
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
          priority
          overlay="strong"
        />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-10 pt-28 sm:px-8 sm:pb-14">
          <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sand-300">
            Destinations
          </span>
          <h1 className="mt-3 max-w-2xl font-display text-3xl leading-[1.1] text-white sm:text-4xl lg:text-5xl">
            Every Yeto destination
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Holidays across India, Asia, the Gulf and Europe, each one planned
            around you.
          </p>
        </div>
      </section>

      {/* Grid */}
      <Section className="!pt-14">
        <SectionHeading
          eyebrow={`${destinations.length} destinations`}
          title="Pick a place to start"
          intro="Tap any destination for highlights and the next step. Where a full itinerary is ready you will see it, otherwise we share it on enquiry."
        />

        <DestinationGrid destinations={destinations} />
      </Section>
    </div>
  );
}
