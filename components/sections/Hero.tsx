import SmartImage from "@/components/SmartImage";
import { ButtonLink } from "@/components/ui";
import { HERO_IMAGES, destinations } from "@/lib/data";

const TRUST_POINTS = [
  { label: `${destinations.length} destinations`, hideOnMobile: false },
  { label: "Flights + stays + sightseeing", hideOnMobile: false },
  { label: "Tour manager on group departures", hideOnMobile: true },
  { label: "Visa assistance", hideOnMobile: true },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[92svh] w-full flex-col overflow-hidden bg-ocean-950">
      {/* Keyframes for the background's slow Ken-Burns zoom. The global
          prefers-reduced-motion rule in app/globals.css already forces every
          animation-duration to ~0, so no extra guard is needed here. */}
      <style>{`@keyframes hero-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.09); } }`}</style>

      {/* Background photo with a slow Ken-Burns zoom */}
      <div className="absolute inset-0">
        <SmartImage
          src={HERO_IMAGES}
          alt="Traveller looking out over a scenic coastline at golden hour"
          className="h-full w-full"
          imageClassName="[animation:hero-zoom_18s_ease-in-out_infinite_alternate]"
          sizes="100vw"
          priority
          overlay="strong"
        />
        {/* Extra scrim so the headline stays readable on any photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/30 to-ocean-950/10"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pt-28 pb-16 text-center sm:px-8 lg:items-start lg:pt-32 lg:text-left">
        <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-white/85 backdrop-blur">
          International &amp; domestic holidays
        </span>

        <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,9vw,5.5rem)] font-medium leading-[0.95] tracking-wide text-white">
          YETO
          <span className="block text-sand-300">HOLIDAYS</span>
        </h1>

        <p className="mt-5 font-display text-xl italic text-white/90 sm:text-2xl">
          Your Journey. Your Story. Your Yeto.
        </p>

        <p className="mt-4 max-w-xl text-balance text-sm leading-relaxed text-white/70 sm:text-base">
          Discover unforgettable holidays, carefully planned from departure to
          return.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/destinations" variant="white" size="lg">
            Explore Destinations
          </ButtonLink>
          <ButtonLink href="/plan" variant="ghostLight" size="lg">
            Plan My Trip
          </ButtonLink>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 border-t border-white/15 py-4">
        {/* A dot leads every item, so hiding items on small screens can never
            leave a dangling divider. */}
        <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-5 gap-y-2 px-5 sm:px-8 lg:justify-start">
          {TRUST_POINTS.map((point) => (
            <li
              key={point.label}
              className={`flex items-center gap-2 text-[0.72rem] font-medium tracking-wide text-white/70 sm:text-xs ${
                point.hideOnMobile ? "hidden sm:flex" : ""
              }`}
            >
              <span
                aria-hidden
                className="h-1 w-1 shrink-0 rounded-full bg-sand-300/80"
              />
              {point.label}
            </li>
          ))}
        </ul>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 sm:flex lg:bottom-28">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="h-8 w-[1.5px] animate-pulse bg-gradient-to-b from-white/70 to-transparent" />
      </div>
    </section>
  );
}
