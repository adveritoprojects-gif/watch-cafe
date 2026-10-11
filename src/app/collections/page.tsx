import { PageHero } from "@/components/PageHero";
import { WatchPlate } from "@/components/watch/WatchPlate";
import { collections } from "@/data/collections";
import { watches, type WatchVariant } from "@/data/watches";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Collections",
  description: "Signature, Heritage, Sport, and Atelier. Four ways of keeping time at AURELIS.",
};

const plates: Record<string, WatchVariant> = {
  signature: "classic",
  heritage: "heritage",
  sport: "chrono",
  atelier: "lumiere",
};

export default function CollectionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Collections"
        title="Four lines. One standard."
        copy="Each collection is a different temperament of the same house: proportion, finishing, and a dial that knows when to be quiet."
      />
      <div className="px-5 pb-24 md:px-10 lg:px-16">
        {collections.map((collection, index) => {
          const pieces = watches.filter((watch) => watch.collection.toLowerCase() === collection.slug);
          return (
            <article key={collection.slug} className="grid items-center gap-8 border-t border-line py-14 lg:grid-cols-12">
              <div className={index % 2 ? "lg:order-2 lg:col-span-6" : "lg:col-span-6"}>
                <WatchPlate variant={plates[collection.slug]} className="h-[48vh] w-full bg-secondary" />
              </div>
              <div className="lg:col-span-6 lg:px-8">
                <p className="eyebrow">{collection.eyebrow}</p>
                <h2 className="mt-4 font-serif text-6xl leading-none">{collection.name}</h2>
                <p className="mt-6 max-w-md text-sm leading-7 text-muted">{collection.description}</p>
                <p className="mt-4 text-sm text-ink">{collection.note}</p>
                <ul className="mt-8 space-y-2">
                  {pieces.map((watch) => (
                    <li key={watch.id}>
                      <Link href={`/product/${watch.slug}`} className="nav-link">
                        {watch.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}
