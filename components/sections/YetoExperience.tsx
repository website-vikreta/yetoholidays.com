import Logo from "@/components/Logo";
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
    id: "honeymoons",
    body: "A slower pace and time for just the two of you.",
  },
];

export default function YetoExperience() {
  return (
    <section id="experiences" className="bg-white">
      {/* Full-bleed signature moment */}
      <div
        data-scroll="through"
        className="reveal relative flex h-[70svh] min-h-[420px] w-full items-center justify-center overflow-hidden sm:h-[80svh]"
      >
        <div className="fx-zoom-out absolute inset-0">
          <SmartImage
            src={EXPERIENCE_IMAGES.landscape}
            alt=""
            className="h-full w-full"
            sizes="100vw"
            overlay="strong"
          />
        </div>
        <div className="relative z-10 flex flex-col items-center px-6 text-center text-white">
          <h2>
            <Logo
              light
              className="h-16 sm:h-24 lg:h-32"
              sizes="(max-width: 640px) 200px, (max-width: 1024px) 300px, 400px"
            />
          </h2>
        </div>
      </div>

      {/* Experience tiles */}
      <div className="mx-auto w-full max-w-6xl px-5 pt-14 sm:px-8 sm:pt-20">
        <h2 className="reveal font-display text-3xl leading-[1.15] tracking-tight text-ocean-900 sm:text-4xl">
          Who we plan for
        </h2>
      </div>
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-5 px-5 py-10 sm:grid-cols-3 sm:px-8 sm:pb-20">
        {TILES.map((tile, i) => (
          <div
            key={tile.caption}
            id={"id" in tile ? tile.id : undefined}
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
          <h3 className="font-display text-2xl text-ocean-900 sm:text-3xl">
            Corporate travel
          </h3>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-ocean-800/70">
            Team offsites, incentive trips and conferences. Tell us the
            headcount and dates, and we plan the venue, travel and transfers.
          </p>
        </div>
      </div>
    </section>
  );
}
