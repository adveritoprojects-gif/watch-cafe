import { ContactForm } from "@/components/ContactForm";
import { PageHero } from "@/components/PageHero";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to the AURELIS atelier about a piece, an allocation, or a visit.",
};

const faqs = [
  {
    q: "Do you ship a watch immediately?",
    a: "Some references are in the atelier. Others are allocated. We confirm timing before anything is promised.",
  },
  {
    q: "Can a piece be serviced later?",
    a: "Yes. Every AURELIS watch is built to be opened, regulated, and returned.",
  },
  {
    q: "Where is the atelier?",
    a: "By appointment. Write first, and the address follows with the confirmation.",
  },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ piece?: string; intent?: string }>;
}) {
  const params = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Write to the atelier."
        copy={
          params.intent === "allocation"
            ? "Your bag is noted. Tell us how to reach you and we will confirm the pieces."
            : "A short note is enough. Mention the reference if you have one."
        }
      />
      <div className="grid gap-16 px-5 pb-24 md:px-10 lg:grid-cols-12 lg:px-16">
        <div className="lg:col-span-7">
          <ContactForm piece={params.piece} />
        </div>
        <aside className="lg:col-span-4 lg:col-start-9">
          <p className="eyebrow">Atelier</p>
          <p className="mt-4 text-sm leading-7 text-muted">
            AURELIS
            <br />
            Correspondence desk
            <br />
            atelier@aurelis.example
          </p>
        </aside>
      </div>
      <section id="faq" className="border-t border-line px-5 py-16 md:px-10 lg:px-16">
        <h2 className="font-serif text-5xl">FAQ</h2>
        <dl className="mt-10 max-w-3xl space-y-8">
          {faqs.map((item) => (
            <div key={item.q} className="border-t border-line pt-6">
              <dt className="text-sm tracking-[0.14em] uppercase">{item.q}</dt>
              <dd className="mt-3 text-sm leading-7 text-muted">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
