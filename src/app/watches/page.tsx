import { PageHero } from "@/components/PageHero";
import { ProductGrid } from "@/components/ProductGrid";
import type { CollectionFilter } from "@/data/watches";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Watches",
  description: "The AURELIS collection of mechanical watches, from signature steel pieces to limited atelier editions.",
};

function parseFilter(value?: string): CollectionFilter {
  if (value === "men" || value === "women" || value === "limited") return value;
  return "all";
}

export default async function WatchesPage({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const params = await searchParams;
  return (
    <>
      <PageHero
        eyebrow="Watches"
        title="The collection"
        copy="Eight mechanical watches. Steel cases, sapphire crystals, and dials edited until only the necessary remains."
      />
      <div className="px-5 pb-24 md:px-10 lg:px-16">
        <ProductGrid initialFilter={parseFilter(params.filter)} />
      </div>
    </>
  );
}
