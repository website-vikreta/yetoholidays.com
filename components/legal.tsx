import type { ReactNode } from "react";
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
    <article className="px-5 pb-20 pt-32 sm:px-8 sm:pt-36">
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

        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-sand-600">
          Yeto Holidays
        </p>
        <h1 className="mt-3 font-display text-3xl tracking-tight text-ocean-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-ocean-800/80">
          {intro}
        </p>

        <div className="mt-10 space-y-8 text-[0.95rem] leading-relaxed text-ocean-800/80">
          {children}
        </div>
      </div>
    </article>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) {
  return (
    <section>
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
      {doc.sections.map((section) => (
        <LegalSection key={section.heading} heading={section.heading}>
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
