/**
 * Company facts, contact details, socials and legal numbers.
 *
 * Anything the client has not supplied is an empty string, and components
 * hide the matching button or line when the value is empty. Never put a
 * placeholder number or address in here.
 *
 * Bank details are deliberately absent: they are read from BANK_* environment
 * variables by the booking confirmation step only.
 */

export type SiteSettings = {
  name: string;
  legalName: string;
  /** Display date, e.g. "12 May 2022". */
  established: string;
  /** Not confirmed by the client (they say theirs is in Drive). Footer only. */
  tagline: string;
  cin: string;
  url: string;
  address: string[];
  contact: {
    /** Digits only, with country code. */
    whatsapp: string;
    phone: string;
    email: string;
  };
  socials: { instagram: string; facebook: string; linkedin: string };
  /** Flip to true once Razorpay is live. Shows "Secure online payment". */
  onlinePaymentLive: boolean;
  /** Real Google rating and review count. Leave null until the client has them. */
  googleRating: { rating: number; count: number; url: string } | null;
  licences: {
    gst: string;
    iata: string;
    taai: string;
    otoai: string;
    tourismLicence: string;
  };
};

const env = (value: string | undefined) => (value ?? "").trim();

// Each NEXT_PUBLIC_* variable is read by its literal name so Next.js can
// inline it at build time.
export const site: SiteSettings = {
  name: "Yeto Holidays",
  legalName: "Yeto Holidays Private Limited",
  established: "12 May 2022",
  tagline: "Your Journey. Your Story. Your Yeto.", // confirm with client
  cin: "U63000MH2022PTC382509",
  url: env(process.env.NEXT_PUBLIC_SITE_URL) || "https://yetoholidays.com",
  address: [
    "Office No 10 & 15, 4th Floor, Shewalkar Arcade",
    "Laxmibhawan Square, WHC Road, Dharampeth",
    "Nagpur 440010",
  ],
  contact: {
    whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP).replace(/\D/g, ""),
    phone: env(process.env.NEXT_PUBLIC_PHONE),
    email: env(process.env.NEXT_PUBLIC_EMAIL),
  },
  onlinePaymentLive: false,
  googleRating: null,
  // TODO-CONFIRM: no social profiles confirmed yet; links stay hidden while empty.
  socials: { instagram: "", facebook: "", linkedin: "" },
  // TODO-CONFIRM: rendered only when filled.
  licences: { gst: "", iata: "", taai: "", otoai: "", tourismLicence: "" },
};

export const addressLine = site.address.join(", ");

/** Opens the office in Google Maps. */
export const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${site.name}, ${addressLine}`)}`;

/** Display form of the digits-only WhatsApp number, empty when not set. */
export const whatsappDisplay = site.contact.whatsapp
  ? `+${site.contact.whatsapp}`
  : "";

/** wa.me link with a prefilled message, or null when no WhatsApp number is set. */
export const whatsappLink = (message: string): string | null =>
  site.contact.whatsapp
    ? `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`
    : null;
