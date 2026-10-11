import { ProductDetail } from "@/components/ProductDetail";
import { getWatch, watches } from "@/data/watches";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = { slug: string };

export function generateStaticParams() {
  return watches.map((watch) => ({ slug: watch.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const watch = getWatch(slug);
  if (!watch) return { title: "Watch" };
  return {
    title: watch.name,
    description: watch.description,
    openGraph: {
      title: `${watch.name} — AURELIS`,
      description: watch.description,
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const watch = getWatch(slug);
  if (!watch) notFound();
  return <ProductDetail watch={watch} />;
}
