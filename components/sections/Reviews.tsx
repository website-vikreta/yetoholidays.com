import type { CSSProperties } from "react";
import { Section, SectionHeading } from "@/components/ui";
import { reviews } from "@/lib/data";

function Stars() {
  return (
    <div className="flex gap-1 text-sand-500" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
          <path d="M10 1.5l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6-4.5-4.2 6.1-.7L10 1.5Z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({
  review,
  style,
}: {
  review: (typeof reviews)[number];
  style?: CSSProperties;
}) {
  return (
    <div
      style={style}
      className="flex min-w-[85%] snap-center flex-col rounded-2xl bg-white p-6 shadow-sm shadow-ocean-950/5 sm:min-w-0 sm:p-7"
    >
      <Stars />
      <p className="mt-4 font-display text-lg italic leading-relaxed text-ocean-900">
        &ldquo;{review.quote}&rdquo;
      </p>
      <div className="mt-5 text-sm">
        <p className="font-semibold text-ocean-900">{review.name}</p>
        <p className="text-ocean-800/60">{review.trip}</p>
      </div>
    </div>
  );
}

export default function Reviews() {
  // Only real reviews are ever shown: no entries, no section.
  if (reviews.length === 0) return null;

  return (
    <Section className="bg-ocean-50">
      <SectionHeading
        title="What our travellers say"
        align="center"
      />

      <div className="reveal -mx-5 mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 snap-rail sm:mx-0 sm:grid sm:snap-none sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0">
        {reviews.map((review, i) => (
          <ReviewCard
            key={review.name + review.trip}
            review={review}
            style={{ transitionDelay: `${i * 70}ms` }}
          />
        ))}
      </div>

    </Section>
  );
}
