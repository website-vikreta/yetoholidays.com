import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-ocean-900 px-5 pb-20 pt-32 text-center sm:px-8 sm:pt-40">
      <h1 className="font-display text-3xl text-white sm:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-white/75 sm:text-base">
        The link may be old or mistyped.
      </p>
      <div className="mt-8 flex justify-center">
        <ButtonLink href="/destinations" variant="white" size="lg">
          Explore Destinations
        </ButtonLink>
      </div>
    </section>
  );
}
