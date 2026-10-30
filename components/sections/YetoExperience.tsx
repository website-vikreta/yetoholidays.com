import Parallax from "@/components/motion/Parallax";
import SmartImage from "@/components/SmartImage";
import { Section, SectionHeading } from "@/components/ui";
import { EXPERIENCE_IMAGES } from "@/lib/data";

const ARCHES = [
  {
    id: "families",
    images: EXPERIENCE_IMAGES.travellers,
    caption: "Families",
    body: "Itineraries paced for every age, from grandparents to toddlers.",
  },
  {
    id: "groups",
    images: EXPERIENCE_IMAGES.group,
    caption: "Group departures",
    body: "Fixed dates with a Yeto tour manager travelling alongside you.",
  },
  {
    id: "honeymoons",
    images: EXPERIENCE_IMAGES.honeymoon,
    caption: "Honeymoons",
    body: "A slower pace and time for just the two of you.",
  },
  {
    id: "corporate",
    images: EXPERIENCE_IMAGES.corporate,
    caption: "Corporate",
    body: "Team offsites, incentive trips and conferences. Tell us the headcount and dates, and we plan the venue, travel and transfers.",
  },
];

// Each arch drifts at its own speed, so they separate as you scroll.
const SPEEDS = [0.04, 0.1, 0.06, 0.12];
// Vertical stagger on desktop, in px.
const OFFSETS = ["lg:pt-0", "lg:pt-12", "lg:pt-4", "lg:pt-16"];

export default function YetoExperience() {
  return (
    <Section id="experiences">
      <SectionHeading title="Who we plan for" />

      <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6">
        {ARCHES.map((arch, i) => (
          <div key={arch.id} id={arch.id} className={OFFSETS[i]}>
            <Parallax speed={SPEEDS[i]}>
              <figure className="reveal">
                <div className="relative aspect-[3/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-ocean-100">
                  <Parallax speed={0.1} className="absolute inset-x-0 -inset-y-[10%]">
                    <SmartImage
                      src={arch.images}
                      alt=""
                      className="h-full w-full"
                      sizes="(max-width: 1024px) 50vw, 280px"
                    />
                  </Parallax>
                </div>
                <figcaption className="mt-5">
                  <span aria-hidden="true" className="block w-12 border-t-2 border-dashed border-ocean-900/30" />
                  <h3 className="mt-3 font-display text-xl text-ocean-900 sm:text-2xl">{arch.caption}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ocean-800/80">{arch.body}</p>
                </figcaption>
              </figure>
            </Parallax>
          </div>
        ))}
      </div>
    </Section>
  );
}
