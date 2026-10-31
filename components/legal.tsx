import type { ReactNode } from "react";
import Divider from "@/components/ui/Divider";
import WaveEdge from "@/components/ui/WaveEdge";
import { loadLegal, type LegalSlug } from "@/lib/legal";

export function LegalPage({
  title,
  intro,
  draft = false,
  children,
}: {
  title: string;
  intro: string;
  draft?: boolean;
  children: ReactNode;
}) {
  return (
    <>
      <section className="bg-ocean-900 px-5 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-36">
        <div className="mx-auto w-full max-w-3xl">
          <h1 className="font-display text-3xl tracking-tight text-white sm:text-4xl">{title}</h1>
          <p className="mt-5 text-base leading-relaxed text-white/85">{intro}</p>
        </div>
      </section>
      <WaveEdge className="text-white" />

      <article className="px-5 pb-20 pt-10 sm:px-8">
        <div className="mx-auto w-full max-w-3xl">
          {/* Shown only while a document's front matter says `status: draft`. */}
          {draft ? (
            <div
              role="note"
              className="mb-10 rounded-2xl border border-sand-300/60 bg-sand-50 p-5 text-sm leading-relaxed text-ocean-800/80"
            >
              <strong className="font-semibold text-ocean-900">
                Draft, pending client documents.
              </strong>{" "}
              This text is a plain-language starting point, not final or legal
              advice, and will be replaced by the company&apos;s own document.
            </div>
          ) : null}

          <div className="space-y-8 text-[0.95rem] leading-relaxed text-ocean-800/80">
            {children}
          </div>
        </div>
      </article>
    </>
  );
}

export function LegalSection({
  heading,
  divider = false,
  children,
}: {
  heading: string;
  divider?: boolean;
  children: ReactNode;
}) {
  return (
    <section>
      {divider ? <Divider variant="dashed" className="!px-0 mb-8" /> : null}
      <h2 className="font-display text-xl text-ocean-900 sm:text-2xl">
        {heading}
      </h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

/** Renders content/legal/<slug>.md inside the shared legal page layout. */
export function LegalDocument({ slug }: { slug: LegalSlug }) {
  const doc = loadLegal(slug);

  return (
    <LegalPage title={doc.title} intro={doc.intro} draft={doc.draft}>
      {doc.sections.map((section, n) => (
        <LegalSection key={section.heading} heading={section.heading} divider={n > 0}>
          {section.blocks.map((block, i) =>
            block.type === "p" ? (
              <p key={i}>{block.text}</p>
            ) : (
              <ul key={i} className="list-disc space-y-1.5 pl-5">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ),
          )}
        </LegalSection>
      ))}
    </LegalPage>
  );
}

export function legalMetadata(slug: LegalSlug) {
  const { title, description } = loadLegal(slug);
  return { title, description };
}
