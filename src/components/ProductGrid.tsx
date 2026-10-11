"use client";

import { FadeUp } from "@/animations/RevealText";
import { ProductCard } from "@/components/ProductCard";
import { filterWatches, type CollectionFilter } from "@/data/watches";
import { cn } from "@/lib/cn";
import { useMemo, useState } from "react";

const filters: { id: CollectionFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "men", label: "Men" },
  { id: "women", label: "Women" },
  { id: "limited", label: "Limited" },
];

export function ProductGrid({
  initialFilter = "all",
  showFilters = true,
  heading,
  headingId,
}: {
  initialFilter?: CollectionFilter;
  showFilters?: boolean;
  heading?: string;
  headingId?: string;
}) {
  const [filter, setFilter] = useState<CollectionFilter>(initialFilter);
  const items = useMemo(() => filterWatches(filter), [filter]);

  return (
    <div>
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        {heading ? (
          <h2 id={headingId} className="font-serif text-[clamp(3rem,6vw,6rem)] leading-[0.88] tracking-[-0.03em]">
            {heading}
          </h2>
        ) : (
          <span />
        )}
        {showFilters ? (
          <div className="flex flex-wrap gap-5" role="tablist" aria-label="Filter collection">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                onClick={() => setFilter(item.id)}
                className={cn(
                  "text-[0.68rem] tracking-[0.24em] uppercase",
                  filter === item.id ? "text-gold" : "text-muted",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <div className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4">
        {items.map((watch, index) => (
          <FadeUp key={watch.id} delay={Math.min(index * 0.05, 0.3)}>
            <ProductCard watch={watch} />
          </FadeUp>
        ))}
      </div>
    </div>
  );
}
