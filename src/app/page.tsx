import { BrandStory } from "@/components/BrandStory";
import { Craftsmanship } from "@/components/Craftsmanship";
import { FeaturedCollection } from "@/components/FeaturedCollection";
import { FinalCTA } from "@/components/FinalCTA";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { WatchAssembly } from "@/components/WatchAssembly";
import { WatchExperience } from "@/components/WatchExperience";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WatchAssembly />
      <FeaturedCollection />
      <Craftsmanship />
      <WatchExperience />
      <section className="px-5 py-24 md:px-10 lg:px-16" aria-labelledby="collection-title">
        <p className="eyebrow">The collection</p>
        <div className="mt-6">
          <ProductGrid heading="The collection" headingId="collection-title" />
        </div>
      </section>
      <BrandStory />
      <FinalCTA />
    </>
  );
}
