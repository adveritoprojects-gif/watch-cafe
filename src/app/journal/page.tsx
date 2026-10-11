import { PageHero } from "@/components/PageHero";
import { journal } from "@/data/collections";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the AURELIS atelier on finishing, dials, and the habit of winding.",
};

export default function JournalPage() {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the atelier."
        copy="Short essays on finishing, silence, and the small rituals of a mechanical watch."
      />
      <div className="px-5 pb-24 md:px-10 lg:px-16">
        {journal.map((article) => (
          <article key={article.slug} id={article.slug} className="grid gap-6 border-t border-line py-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="eyebrow">{article.kicker}</p>
              <p className="mt-4 text-xs tracking-[0.18em] text-muted uppercase">{article.date}</p>
            </div>
            <div className="lg:col-span-8">
              <h2 className="font-serif text-5xl leading-none">{article.title}</h2>
              <p className="mt-6 max-w-2xl text-sm leading-7 text-muted">{article.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
