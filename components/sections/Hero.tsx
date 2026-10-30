import Link from "next/link";
import HeroShell from "@/components/sections/HeroShell";
import QuickPlanTicket from "@/components/sections/QuickPlanTicket";
import Parallax from "@/components/motion/Parallax";
import SmartImage from "@/components/SmartImage";
import { ArrowRight, ButtonLink } from "@/components/ui";
import { HERO_IMAGES } from "@/lib/data";

/** A soft cloud blob, white at low opacity. Decorative. */
function Cloud({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 160 90" className={`absolute ${className}`}>
      <path
        d="M22 80 C0 80 -2 50 24 48 C27 24 60 14 80 32 C96 16 126 24 129 48 C152 46 162 80 136 80 Z"
        fill="#fff"
        fillOpacity="0.13"
      />
    </svg>
  );
}

/** A few gull strokes, drawn as plain curves. Decorative. */
function Gulls({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 120 60" className={`absolute ${className}`} fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2.2" strokeOpacity="0.8">
      <path d="M2 14 Q12 2 22 12 Q32 2 42 14" />
      <path d="M62 34 Q70 25 78 32 Q86 25 94 34" strokeWidth="1.8" />
      <path d="M92 8 Q98 1 104 7 Q110 1 116 8" strokeWidth="1.6" />
    </svg>
  );
}

export default function Hero() {
  return (
    <HeroShell className="relative isolate min-h-[100svh] w-full overflow-hidden bg-ocean-950">
      {/* 1. Background photo, taller than the frame so it can move. */}
      <div className="absolute inset-0 overflow-hidden">
        <Parallax speed={0.35} className="absolute inset-x-0 -inset-y-[18%]">
          <SmartImage
            src={HERO_IMAGES}
            alt="Boats among the limestone islands of Ha Long Bay, Vietnam"
            className="h-full w-full"
            sizes="100vw"
            priority
          />
        </Parallax>
      </div>
      {/* Dark gradient from the bottom and the left keeps the text at 4.5 to 1 or better. */}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ocean-950/85 via-ocean-950/35 to-ocean-950/25" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ocean-950/75 via-ocean-950/30 to-transparent" />

      {/* 2. Clouds */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax speed={0.2} className="absolute inset-0">
          <Cloud className="left-[8%] top-[14%] w-56 sm:w-72" />
        </Parallax>
        <Parallax speed={0.12} className="absolute inset-0">
          <Cloud className="right-[6%] top-[26%] w-44 sm:w-60" />
        </Parallax>
      </div>

      {/* 3. Gulls drift up faster than the page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <Parallax speed={-0.1} className="absolute inset-0">
          <Gulls className="right-[6%] top-[9%] w-20 sm:right-[14%] sm:top-[20%] sm:w-40" />
        </Parallax>
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-end px-5 pb-44 pt-32 sm:px-8 sm:pb-48">
        <div className="hero-fade grid items-end gap-10 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-14">
          <div>
            <h1 className="max-w-3xl font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.04] tracking-tight text-white">
              Plan your next holiday with Yeto
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/90 sm:text-lg">
              International and domestic trips, group departures, honeymoons and
              corporate travel, planned by our team in Nagpur.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href="/plan" variant="sand" size="lg">
                Plan my trip
              </ButtonLink>
              <Link
                href="/destinations"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-white underline decoration-white/40 underline-offset-[6px] transition-colors hover:decoration-white"
              >
                See destinations
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <QuickPlanTicket />
        </div>
      </div>

      {/* 4. Foreground waves. The front one is the exact colour of the next section. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-[150px] overflow-hidden sm:h-[170px]">
        <Parallax speed={-0.06} className="absolute inset-0">
          <svg focusable="false" viewBox="0 0 1440 170" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0 70 C240 20 480 120 720 70 S1200 20 1440 70 V170 H0 Z" className="fill-ocean-900" />
          </svg>
        </Parallax>
        <Parallax speed={-0.12} className="absolute inset-0">
          <svg focusable="false" viewBox="0 0 1440 170" preserveAspectRatio="none" className="h-full w-full">
            <path d="M0 98 C200 62 420 134 700 98 S1180 58 1440 102 V170 H0 Z" className="fill-ocean-800" />
          </svg>
        </Parallax>
        <svg focusable="false" viewBox="0 0 1440 170" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
          <path d="M0 130 C260 100 520 154 800 126 S1260 100 1440 130 V170 H0 Z" fill="#fff" />
        </svg>
      </div>
    </HeroShell>
  );
}
