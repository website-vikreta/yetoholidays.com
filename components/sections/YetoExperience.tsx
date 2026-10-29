import SmartImage from "@/components/SmartImage";
import { EXPERIENCE_IMAGES } from "@/lib/data";

const TILES = [
  {
    images: EXPERIENCE_IMAGES.travellers,
    caption: "Families",
    body: "Itineraries paced for every age, from grandparents to toddlers.",
  },
  {
    images: EXPERIENCE_IMAGES.group,
    caption: "Group departures",
    body: "Fixed dates with a Yeto tour manager travelling alongside you.",
  },
  {
    images: EXPERIENCE_IMAGES.honeymoon,
    caption: "Honeymoons",
    body: "Quiet stays and private moments, built around just the two of you.",
  },
];

export default function YetoExperience() {
  return (
    <section id="experiences" className="bg-white">
      {/* Full-bleed signature moment */}
      <div className="reveal relative flex h-[70svh] min-h-[420px] w-full items-center justify-center overflow-hidden sm:h-[80svh]">
        <SmartImage
          src={EXPERIENCE_IMAGES.signboard}
          alt="A wooden signpost at a mountain trailhead"
          className="absolute inset-0 h-full w-full"
          sizes="100vw"
          overlay="strong"
        />
        <div className="relative z-10 flex flex-col items-center px-6 text-center text-white">
          <span className="h-px w-16 bg-sand-300 sm:w-24" aria-hidden />
          <h2 className="mt-6 font-display text-[clamp(3rem,14vw,8rem)] font-medium leading-none tracking-[0.2em]">
            YETO
          </h2>
          <span className="mt-6 h-px w-16 bg-sand-300 sm:w-24" aria-hidden />
          <p className="mt-6 max-w-md font-display text-lg italic text-white/85 sm:text-xl">
            A destination begins with a journey.
          </p>
        </div>
      </div>

      {/* Experience tiles */}
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 px-5 py-14 sm:grid-cols-3 sm:px-8 sm:py-20">
        {TILES.map((tile, i) => (
          <div
            key={tile.caption}
            className="reveal group relative overflow-hidden rounded-2xl"
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <SmartImage
              src={tile.images}
              alt={tile.caption}
              className="aspect-[4/3] w-full rounded-2xl sm:aspect-[4/5]"
              imageClassName="transition-transform duration-500 ease-out group-hover:scale-105"
              overlay="bottom"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
            {/* Anchored to the image rather than pulled up with a negative
                margin, so a two-line caption can never clip. */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 text-white">
              <h3 className="font-display text-xl">{tile.caption}</h3>
              <p className="mt-1 text-sm text-white/80">{tile.body}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Corporate travel anchor */}
      <div
        id="corporate"
        className="reveal mx-auto flex w-full max-w-6xl scroll-mt-24 flex-col gap-6 px-5 pb-16 sm:flex-row sm:items-center sm:px-8 sm:pb-24"
      >
        <SmartImage
          src={EXPERIENCE_IMAGES.corporate}
          alt="A corporate group on an offsite trip"
          className="aspect-[16/10] w-full rounded-2xl sm:w-1/2"
          sizes="(max-width: 640px) 100vw, 50vw"
        />
        <div className="sm:w-1/2">
          <span className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sand-600">
            Corporate travel
          </span>
          <h3 className="mt-3 font-display text-2xl text-ocean-900 sm:text-3xl">
            Offsites, incentives &amp; MICE
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ocean-800/70">
            From a 20-person team offsite to a full incentive programme, we
            handle venues, logistics and on-ground support so your team just
            has to show up.
          </p>
        </div>
      </div>
    </section>
  );
}
