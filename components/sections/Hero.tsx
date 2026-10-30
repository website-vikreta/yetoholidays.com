import FlightPath from "@/components/FlightPath";
import SmartImage from "@/components/SmartImage";
import { ButtonLink } from "@/components/ui";
import { HERO_IMAGES, destinations } from "@/lib/data";

const TRUST_POINTS = [
  { label: `${destinations.length} destinations`, hideOnMobile: false },
  { label: "Flights, hotels and sightseeing in one package", hideOnMobile: false },
  { label: "Tour manager on group departures", hideOnMobile: true },
  { label: "Help with visa paperwork", hideOnMobile: true },
];

export default function Hero() {
  return (
    <section
      data-scroll="out"
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-ocean-950"
    >
      {/* Keyframes for the background's slow Ken-Burns zoom. The global
          prefers-reduced-motion rule in app/globals.css already forces every
          animation-duration to ~0, so no extra guard is needed here. */}
      <style>{`@keyframes hero-zoom { 0% { transform: scale(1); } 100% { transform: scale(1.09); } }`}</style>

      {/* Background photo: slow Ken-Burns zoom, plus a zoom-in as the page scrolls */}
      <div className="fx-zoom-in absolute inset-0">
        <SmartImage
          src={HERO_IMAGES}
          alt="Boats among the limestone islands of Ha Long Bay, Vietnam"
          className="h-full w-full"
          imageClassName="[animation:hero-zoom_18s_ease-in-out_infinite_alternate]"
          sizes="100vw"
          priority
          overlay="strong"
        />
        {/* Extra scrim so the headline stays readable on any photo */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-ocean-950/45 via-transparent to-ocean-950/15"
        />
      </div>

      {/* Main content */}
      <div className="fx-drift-up relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-5 pt-28 pb-16 text-center sm:px-8 lg:items-start lg:pt-32 lg:text-left">
        <h1 className="max-w-3xl font-display text-[clamp(2.4rem,7vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-white">
          Plan your next holiday with Yeto
        </h1>

        <p className="mt-5 max-w-xl text-balance text-base leading-relaxed text-white/85 sm:text-lg">
          International and domestic trips, group departures, honeymoons and
          corporate travel, planned by our team in Nagpur.
        </p>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/destinations" variant="white" size="lg">
            See destinations
          </ButtonLink>
          {/* The flight route starts at this button's right edge. */}
          <div className="relative">
            <ButtonLink
              href="/plan"
              variant="ghostLight"
              size="lg"
              className="w-full sm:w-auto"
            >
              Plan my trip
            </ButtonLink>
            <FlightPath />
          </div>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative z-10 border-t border-white/15 bg-ocean-950/35 py-4 backdrop-blur-sm">
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

      {/* Blend zone: the photo blurs and fades through a warm sun haze into the
          white page below. It sits under the trust strip, so the strip's text
          keeps its dark backing. */}
      <div aria-hidden className="relative h-32 sm:h-40">
        <div className="absolute inset-0 backdrop-blur-xl [mask-image:linear-gradient(to_top,black,transparent)]" />
        <div className="fx-sun-haze absolute inset-0" />
      </div>

      {/* Scroll cue */}
      <div className="fx-fade-out pointer-events-none absolute bottom-52 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 sm:flex lg:left-auto lg:right-[max(2rem,calc((100vw-1152px)/2+2rem))] lg:translate-x-0">
        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em]">
          Scroll
        </span>
        <span className="h-8 w-[1.5px] animate-pulse bg-gradient-to-b from-white/70 to-transparent" />
      </div>
    </section>
  );
}
