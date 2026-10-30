import Parallax from "@/components/motion/Parallax";
import ScrollScope from "@/components/motion/ScrollScope";
import SmartImage from "@/components/SmartImage";
import Divider from "@/components/ui/Divider";
import Ticket from "@/components/ui/Ticket";
import { ButtonLink } from "@/components/ui";
import { EXPERIENCE_IMAGES } from "@/lib/data";
import { addressLine, site, whatsappLink } from "@/lib/site";

const WHATSAPP_HREF = whatsappLink("Hi Yeto Holidays, I'd like to plan a holiday.");

export default function FinalCta() {
  return (
    <ScrollScope
      id="contact"
      range={[0.05, 0.5]}
      className="relative isolate flex min-h-[85svh] w-full items-center overflow-hidden bg-ocean-900"
    >
      {/* Photo, 130 percent of the frame tall, moving at its own pace */}
      <div className="absolute inset-0 overflow-hidden">
        <Parallax speed={0.25} className="absolute inset-x-0 -inset-y-[15%]">
          <SmartImage
            src={EXPERIENCE_IMAGES.landscape}
            alt=""
            className="h-full w-full"
            sizes="100vw"
            overlay="soft"
          />
        </Parallax>
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ocean-950/60 via-transparent to-ocean-950/30" />

      {/* Wave lines on the top and bottom edges of the photo */}
      <div className="pointer-events-none absolute inset-x-0 top-6 z-10">
        <Divider variant="wave" />
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-14 z-10">
        <Divider variant="wave" flip />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-5 py-32 sm:px-8">
        <div className="cta-rise">
          <Ticket
            stubHeight="9.5rem"
            ticketClassName="[--cut:68%]"
            main={
              <div className="p-6 sm:p-8">
                <h2 className="font-display text-3xl leading-[1.1] tracking-tight text-ocean-900 sm:text-4xl">
                  <span className="reveal-mask">
                    <span className="reveal-mask-line">Not sure where to go yet?</span>
                  </span>
                </h2>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ocean-800/80">
                  Tell us your dates, your budget and who is travelling. We will
                  suggest a few options.
                </p>
                <div className="mt-6 border-t-2 border-dashed border-ocean-900/20 pt-4 text-sm text-ocean-800/80">
                  <p className="ticket-label">Our office</p>
                  <p className="mt-1">{addressLine}</p>
                  {site.contact.email ? (
                    <p className="mt-2">
                      Or write to us at{" "}
                      <a href={`mailto:${site.contact.email}`} className="underline underline-offset-2">
                        {site.contact.email}
                      </a>
                    </p>
                  ) : null}
                </div>
              </div>
            }
            stub={
              <div className="flex h-full flex-col items-center justify-center gap-3 p-4 sm:p-5">
                <ButtonLink href="/plan" variant="primary" size="md" className="w-full text-center">
                  Plan my holiday
                </ButtonLink>
                {WHATSAPP_HREF ? (
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-sm font-semibold text-ocean-900 underline underline-offset-4"
                  >
                    WhatsApp us
                  </a>
                ) : null}
              </div>
            }
          />
        </div>
      </div>
    </ScrollScope>
  );
}
