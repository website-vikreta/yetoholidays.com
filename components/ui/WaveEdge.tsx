/**
 * A filled wave that closes the bottom of a coloured band. Set the fill with a
 * text colour class equal to the section below, for example `text-sand-50`;
 * the band colour shows above the curve. Decorative.
 */
export default function WaveEdge({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none relative -mt-8 h-8 w-full sm:-mt-12 sm:h-12 ${className}`}>
      <svg focusable="false" viewBox="0 0 1440 48" preserveAspectRatio="none" className="block h-full w-full fill-current">
        <path d="M0 26 C240 2 480 50 720 26 S1200 2 1440 26 V48 H0 Z" />
      </svg>
    </div>
  );
}
