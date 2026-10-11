import { Craftsmanship } from "@/components/Craftsmanship";
import { PageHero } from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Craftsmanship",
  description: "How an AURELIS watch is drawn, engineered, assembled, and finished.",
};

export default function CraftsmanshipPage() {
  return (
    <>
      <PageHero
        eyebrow="Craftsmanship"
        title="The bench, not the spectacle."
        copy="AURELIS was born from a simple belief: that time is not just measured, but felt. The work happens slowly, and the watch should not show the effort — only the result."
      />
      <Craftsmanship />
      <section className="grid gap-12 px-5 py-20 md:px-10 lg:grid-cols-2 lg:px-16">
        <p className="font-serif text-4xl leading-tight">
          We create watches for dreamers, achievers and those who value the finer things in life.
        </p>
        <div className="space-y-6 text-sm leading-7 text-muted">
          <p>
            The house keeps its own drawings. A case diameter is argued in tenths of a millimetre. A marker is moved, then removed, then returned if the dial loses its hour.
          </p>
          <p>
            Assembly is done in the open, with the movement, dial, hands, crystal, and case meeting in a known order. Regulation is recorded. The piece is worn by the people who made it before it is offered.
          </p>
          <p>There is no seasonal colour story. There is the next watch, and the standard it has to meet.</p>
        </div>
      </section>
    </>
  );
}
