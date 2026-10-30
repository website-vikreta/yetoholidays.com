"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { destinations } from "@/lib/data";
import { site, whatsappLink } from "@/lib/site";

const INPUT_CLASS =
  "w-full rounded-xl border border-ocean-900/15 bg-white px-4 py-3 text-ocean-900 placeholder:text-ocean-900/40 focus:border-ocean-600 focus:outline-none focus:ring-2 focus:ring-ocean-600/20";

const LABEL_CLASS = "mb-1.5 block text-sm font-medium text-ocean-900";

const TRIP_TYPES = ["Family", "Honeymoon", "Group", "Corporate", "Solo"] as const;

type FormState = {
  name: string;
  email: string;
  phone: string;
  destination: string;
  month: string;
  travellers: string;
  tripType: (typeof TRIP_TYPES)[number];
  budget: string;
  message: string;
};

function buildWhatsAppMessage(form: FormState): string {
  const destinationLabel =
    form.destination === "other"
      ? "Somewhere else or not sure yet"
      : destinations.find((d) => d.slug === form.destination)?.name ??
        form.destination;

  const lines = [
    "Hi Yeto Holidays, I'd like to plan a trip.",
    "",
    `Name: ${form.name || "-"}`,
    form.email ? `Email: ${form.email}` : null,
    form.phone ? `Phone: ${form.phone}` : null,
    `Destination: ${destinationLabel || "-"}`,
    form.month ? `Travel month: ${form.month}` : null,
    form.travellers ? `Travellers: ${form.travellers}` : null,
    `Trip type: ${form.tripType}`,
    form.budget ? `Approx. budget per person: ${form.budget}` : null,
    form.message ? `Message: ${form.message}` : null,
  ].filter((line): line is string => Boolean(line));

  return lines.join("\n");
}

export default function PlanForm() {
  const searchParams = useSearchParams();
  // "bali" was its own destination in the first demo; it now lives in Indonesia.
  const requested = searchParams.get("destination") ?? "";
  const initialDestination = requested === "bali" ? "indonesia" : requested;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    destination: destinations.some((d) => d.slug === initialDestination)
      ? initialDestination
      : "",
    month: "",
    travellers: "2",
    tripType: "Family",
    budget: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const waMessage = useMemo(() => buildWhatsAppMessage(form), [form]);
  const waHref = whatsappLink(waMessage);
  const mailHref = site.contact.email
    ? `mailto:${site.contact.email}?subject=${encodeURIComponent("Quote request")}&body=${encodeURIComponent(waMessage)}`
    : null;

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Please tell us your name.");
      return;
    }
    if (!form.email.trim() && !form.phone.trim()) {
      setError("Please share an email or phone number so we can reach you.");
      return;
    }

    setError(null);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="reveal rounded-2xl border border-ocean-900/10 bg-white p-6 sm:p-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ocean-50">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden className="h-6 w-6">
            <path
              d="M4 10.5l3.5 3.5L16 5"
              stroke="#0e2f45"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="mt-4 font-display text-2xl text-ocean-900">
          {waHref || mailHref
            ? `Thanks, ${form.name.split(" ")[0] || "traveller"}!`
            : "Not sent yet"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-ocean-800/75 sm:text-base">
          {waHref || mailHref
            ? "We have noted your enquiry in your browser, but our team is not notified automatically yet. To make sure we see it, please send it to us with the button below. Your details are already filled in, so you can check them and send in one tap."
            : "We have noted your enquiry in your browser, but online submission is not connected yet, so our team has not received it. Please try again soon."}
        </p>

        {waHref ? (
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#25D366]/25 transition-all duration-200 hover:brightness-95 active:scale-[0.98] sm:w-auto"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-5 w-5">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.06-1.33A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 8.2 8.2 8.2 8.2 0 0 1-12.5 6.98l-.35-.2-3 .78.8-2.93-.23-.36A8.2 8.2 0 0 1 12 3.8Zm4.5 10.5c-.2-.1-1.4-.7-1.6-.78-.2-.08-.36-.1-.5.1-.16.2-.6.78-.73.94-.13.16-.27.18-.5.06-.2-.1-.9-.33-1.7-1.05-.63-.56-1.05-1.24-1.18-1.45-.13-.2 0-.32.1-.42.1-.1.2-.27.3-.4.1-.14.14-.24.2-.4.07-.16.03-.3-.02-.4-.06-.1-.5-1.22-.7-1.66-.18-.44-.37-.38-.5-.38h-.44c-.15 0-.4.06-.6.3-.2.24-.8.78-.8 1.9 0 1.1.82 2.18.93 2.33.1.16 1.6 2.44 3.9 3.42.55.24.97.38 1.3.48.55.17 1.04.15 1.44.09.44-.07 1.4-.57 1.6-1.13.2-.55.2-1.02.14-1.13-.06-.1-.2-.16-.4-.27Z" />
            </svg>
            Send this on WhatsApp
          </a>
        ) : mailHref ? (
          <a
            href={mailHref}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ocean-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ocean-900/15 transition-all duration-200 hover:bg-ocean-800 active:scale-[0.98] sm:w-auto"
          >
            Send this by email
          </a>
        ) : null}

        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-4 block text-sm font-medium text-ocean-900/60 underline underline-offset-2 hover:text-ocean-900"
        >
          Edit my details
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="reveal space-y-6 rounded-2xl border border-ocean-900/10 bg-white p-6 sm:p-8"
      noValidate
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL_CLASS}>
            Full name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className={INPUT_CLASS}
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="phone" className={LABEL_CLASS}>
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={INPUT_CLASS}
            placeholder="Your phone number"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="email" className={LABEL_CLASS}>
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className={INPUT_CLASS}
            placeholder="Your email"
          />
        </div>

        <div>
          <label htmlFor="destination" className={LABEL_CLASS}>
            Destination
          </label>
          <select
            id="destination"
            name="destination"
            value={form.destination}
            onChange={(e) => update("destination", e.target.value)}
            className={INPUT_CLASS}
          >
            <option value="">Select a destination</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
            <option value="other">Somewhere else or not sure yet</option>
          </select>
        </div>

        <div>
          <label htmlFor="month" className={LABEL_CLASS}>
            Travel month
          </label>
          <input
            id="month"
            name="month"
            type="month"
            value={form.month}
            onChange={(e) => update("month", e.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="travellers" className={LABEL_CLASS}>
            Number of travellers
          </label>
          <input
            id="travellers"
            name="travellers"
            type="number"
            min={1}
            value={form.travellers}
            onChange={(e) => update("travellers", e.target.value)}
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="tripType" className={LABEL_CLASS}>
            Trip type
          </label>
          <select
            id="tripType"
            name="tripType"
            value={form.tripType}
            onChange={(e) =>
              update("tripType", e.target.value as FormState["tripType"])
            }
            className={INPUT_CLASS}
          >
            {TRIP_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="budget" className={LABEL_CLASS}>
            Approximate budget per person
          </label>
          <input
            id="budget"
            name="budget"
            type="text"
            value={form.budget}
            onChange={(e) => update("budget", e.target.value)}
            className={INPUT_CLASS}
            placeholder="For example ₹60,000 to ₹80,000"
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className={LABEL_CLASS}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className={INPUT_CLASS}
            placeholder="Tell us anything else that would help us plan your trip"
          />
        </div>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {error}
        </p>
      )}

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ocean-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-ocean-900/15 transition-all duration-200 hover:bg-ocean-800 active:scale-[0.98] sm:w-auto"
      >
        Submit enquiry
      </button>
    </form>
  );
}
