import { AE, BT, EU, ID, IN, LK, MY, NP, SG, TH, VN } from "country-flag-icons/react/3x2";
import type { FlagCode } from "@/lib/data";

// Named imports keep the bundle to these eleven flags. Emoji flags do not
// render on Windows (they show as "AE", "VN"), so the site uses SVG flags.
const FLAGS = { AE, BT, EU, ID, IN, LK, MY, NP, SG, TH, VN } satisfies Record<FlagCode, unknown>;

export default function Flag({ code, className = "" }: { code: FlagCode; className?: string }) {
  const Icon = FLAGS[code];
  return (
    <Icon
      aria-hidden
      focusable="false"
      className={`inline-block h-auto w-5 shrink-0 rounded-[3px] align-[-0.1em] ${className}`}
    />
  );
}
