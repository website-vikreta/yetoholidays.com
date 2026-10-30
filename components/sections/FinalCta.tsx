import SmartImage from "@/components/SmartImage";
import { ButtonLink } from "@/components/ui";
import { EXPERIENCE_IMAGES } from "@/lib/data";
import { addressLine, site, whatsappLink } from "@/lib/site";

const WHATSAPP_HREF = whatsappLink("Hi Yeto Holidays, I'd like to plan a holiday.");

export default function FinalCta() {
  return (
    <section
      id="contact"
      data-scroll="through"
      className="relative flex min-h-[60svh] w-full scroll-mt-24 items-center justify-center overflow-hidden"
    >
      <div className="fx-zoom-out absolute inset-0">
        <SmartImage
          src={EXPERIENCE_IMAGES.travellers}
          alt="Travellers watching the sunset on a holiday"
          className="h-full w-full"
          sizes="100vw"
          overlay="strong"
        />
      </div>

      <div className="reveal relative z-10 mx-auto flex max-w-2xl flex-col items-center px-5 py-20 text-center text-white sm:px-8">
        <h2 className="font-display text-3xl leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
          Not sure where to go yet?
        </h2>
        <p className="mt-4 max-w-md text-balance text-sm leading-relaxed text-white/80 sm:text-base">
          Tell us your dates, your budget and who is travelling. We will
          suggest a few options.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          {WHATSAPP_HREF ? (
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-sand-400 px-6 py-3.5 text-sm font-semibold text-ocean-950 shadow-lg shadow-sand-500/25 transition-all duration-200 hover:bg-sand-300 active:scale-[0.98] sm:px-8 sm:py-4 sm:text-base"
            >
              WhatsApp us
            </a>
          ) : null}
          <ButtonLink href="/plan" variant="white" size="lg">
            Plan my holiday
          </ButtonLink>
        </div>

        {site.contact.email ? (
          <p className="mt-6 text-xs text-white/60">
            Or write to us at{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="underline underline-offset-2"
            >
              {site.contact.email}
            </a>
          </p>
        ) : null}
        <p
          className={`text-xs text-white/60 ${site.contact.email ? "mt-2" : "mt-6"}`}
        >
          Our office: {addressLine}
        </p>
      </div>
    </section>
  );
}
