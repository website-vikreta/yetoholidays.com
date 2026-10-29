import Image from "next/image";

type SmartImageProps = {
  /**
   * The image URL. An array is accepted so call sites can keep listing
   * candidates in lib/data.ts; the first entry is used. If it fails to load,
   * the brand gradient behind it shows through, so a card is never broken.
   */
  src: string | string[];
  alt: string;
  /** Tailwind classes for the wrapper (control aspect ratio / rounding here). */
  className?: string;
  imageClassName?: string;
  sizes?: string;
  /**
   * Set on the LCP image only — one per page. Every other image stays lazy,
   * so it never competes with the hero for bandwidth.
   */
  priority?: boolean;
  /** Darkening overlay for images that sit behind text. */
  overlay?: "none" | "soft" | "strong" | "bottom";
  quality?: number;
};

const OVERLAYS: Record<NonNullable<SmartImageProps["overlay"]>, string> = {
  none: "",
  soft: "bg-ocean-950/25",
  strong: "bg-ocean-950/50",
  bottom: "bg-gradient-to-t from-ocean-950/85 via-ocean-950/25 to-transparent",
};

/**
 * Server component by design: rendering images without a client boundary keeps
 * them in the initial HTML, so the browser's preload scanner can start fetching
 * before any JavaScript runs and the page renders with JS disabled. Gating
 * visibility on an onLoad handler would push the LCP paint behind hydration.
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  overlay = "none",
  quality = 72,
}: SmartImageProps) {
  const url = Array.isArray(src) ? src[0] : src;

  // `fill` needs a positioned ancestor, so default to `relative` — but never
  // fight a caller that positions the wrapper itself. Tailwind resolves
  // conflicting position utilities by CSS source order, not class order, so
  // emitting both would silently override the caller.
  const positioned = /(?:^|\s)(?:absolute|fixed|sticky)(?:\s|$)/.test(className);

  return (
    <div
      className={`${positioned ? "" : "relative"} overflow-hidden bg-gradient-to-br from-ocean-800 via-ocean-600 to-sand-300 ${className}`}
    >
      {/* Brand texture, visible while the photo streams in and permanently if
          the photo fails to load. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 25% 20%, rgba(255,255,255,0.35), transparent 45%), radial-gradient(circle at 80% 75%, rgba(255,255,255,0.2), transparent 40%)",
        }}
      />

      <Image
        src={url}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        className={`object-cover ${imageClassName}`}
      />

      {overlay !== "none" && (
        <div aria-hidden className={`absolute inset-0 ${OVERLAYS[overlay]}`} />
      )}
    </div>
  );
}
