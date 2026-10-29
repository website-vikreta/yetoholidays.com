import Image from "next/image";

/**
 * The supplied logo is black on a transparent background. On dark surfaces
 * (`light`) it is turned white with a CSS filter until an SVG is supplied.
 */
export default function Logo({
  light = false,
  priority = false,
  className = "h-9 sm:h-10",
  sizes = "140px",
}: {
  light?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Yeto Holidays"
      width={2172}
      height={724}
      priority={priority}
      sizes={sizes}
      className={`w-auto transition-[filter] duration-300 ${
        light ? "brightness-0 invert" : ""
      } ${className}`}
    />
  );
}
