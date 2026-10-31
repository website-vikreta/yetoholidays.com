"use client";

import Form from "next/form";
import { useState, useSyncExternalStore } from "react";
import Ticket from "@/components/ui/Ticket";
import { destinations } from "@/lib/data";

type MonthOption = { value: string; label: string };

// The next 12 months. Built on the client only: the page is generated at build
// time, so a list made on the server would go stale and could mismatch.
let cached: MonthOption[] | undefined;
const clientMonths = (): MonthOption[] => {
  if (!cached) {
    const now = new Date();
    cached = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      return {
        value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: d.toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
      };
    });
  }
  return cached;
};
const serverMonths: MonthOption[] = [];
const subscribe = () => () => {};

const FIELD =
  "block min-h-11 w-full border-0 border-b border-ocean-900/25 bg-transparent px-0 py-2 text-[0.95rem] font-medium text-ocean-900 focus:border-ocean-600 focus:outline-none focus-visible:ring-0";
const STEP_BTN =
  "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ocean-900/25 text-lg text-ocean-900 transition-colors hover:bg-ocean-50 disabled:opacity-40";

/** "Plan a trip" ticket. A GET form: /plan reads the values and prefills. Nothing is saved here. */
export default function QuickPlanTicket() {
  const months = useSyncExternalStore(subscribe, clientMonths, () => serverMonths);
  const [travellers, setTravellers] = useState(2);

  return (
    <Form action="/plan" aria-label="Plan a trip">
      <Ticket
        stubHeight="5.5rem"
        ticketClassName="[--cut:64%]"
        main={
          <div className="p-5 sm:p-6">
            <h2 className="font-display text-xl text-ocean-900">Plan a trip</h2>

            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor="qp-destination" className="ticket-label block">
                  Where to
                </label>
                <select id="qp-destination" name="destination" defaultValue="" className={FIELD}>
                  <option value="">Choose a destination</option>
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="qp-month" className="ticket-label block">
                  When
                </label>
                <select id="qp-month" name="month" defaultValue="" className={FIELD}>
                  <option value="">Any month</option>
                  {months.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="qp-travellers" className="ticket-label block">
                  Travellers
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="One fewer traveller"
                    className={STEP_BTN}
                    disabled={travellers <= 1}
                    onClick={() => setTravellers((n) => Math.max(1, n - 1))}
                  >
                    <span aria-hidden="true">&minus;</span>
                  </button>
                  <input
                    id="qp-travellers"
                    name="travellers"
                    type="number"
                    min={1}
                    max={20}
                    inputMode="numeric"
                    value={travellers}
                    onChange={(e) => setTravellers(Math.min(20, Math.max(1, Number(e.target.value) || 1)))}
                    className="h-11 w-14 border-0 bg-transparent text-center text-lg font-semibold text-ocean-900 [appearance:textfield] focus:outline-none focus-visible:ring-0 [&::-webkit-inner-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    aria-label="One more traveller"
                    className={STEP_BTN}
                    disabled={travellers >= 20}
                    onClick={() => setTravellers((n) => Math.min(20, n + 1))}
                  >
                    <span aria-hidden="true">+</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
        stub={
          <div className="flex h-full items-center justify-center p-4 sm:p-3">
            <button
              type="submit"
              className="min-h-11 w-full rounded-full bg-ocean-900 px-3 py-3 text-sm font-semibold text-white transition-colors hover:bg-ocean-800 focus-visible:outline-offset-2"
            >
              Get a quote
            </button>
          </div>
        }
      />
    </Form>
  );
}
