import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

type TicketProps = {
  /** Main part: photo, title, details. */
  main: ReactNode;
  /** Stub: the small tear-off part (price, button). Leave out for a `long` ticket. */
  stub?: ReactNode;
  /** The whole ticket becomes one link. Give it an `aria-label` that reads well alone. */
  href?: string;
  "aria-label"?: string;
  tone?: "light" | "sand" | "ocean";
  /**
   * pass: main part and stub split by a perforation (stub drops below on phones).
   * long: one wide strip with half-circle notches at both ends, no perforation.
   */
  shape?: "pass" | "long";
  /** Stub sits below the main part at every width (narrow columns, sidebars). */
  stacked?: boolean;
  /** Height of the stub when it sits below the main part (phones, or `stacked`). */
  stubHeight?: string;
  className?: string;
  /** Classes for the inner `.ticket` element (grid columns, width). */
  ticketClassName?: string;
};

/**
 * Boarding-pass shaped container. The shape is a CSS mask, so the shadow lives
 * on the wrapper (a mask clips box-shadow). Styles are in app/globals.css.
 */
export default function Ticket({
  main,
  stub,
  href,
  tone = "light",
  shape = "pass",
  stubHeight,
  stacked = false,
  className = "",
  ticketClassName = "",
  "aria-label": ariaLabel,
}: TicketProps) {
  const body = (
    <div
      className={`ticket ticket-${tone} ${shape === "long" ? "ticket-long" : ""} ${stacked ? "ticket-stack" : ""} ${ticketClassName}`}
      style={stubHeight ? ({ "--stub-h": stubHeight } as CSSProperties) : undefined}
    >
      <div className="ticket-main">{main}</div>
      {stub ? <div className="ticket-stub">{stub}</div> : null}
    </div>
  );

  return href ? (
    <Link href={href} aria-label={ariaLabel} className={`ticket-wrap ticket-link block ${className}`}>
      {body}
    </Link>
  ) : (
    <div className={`ticket-wrap ${className}`}>{body}</div>
  );
}
