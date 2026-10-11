"use client";

import { WatchPlate } from "@/components/watch/WatchPlate";
import { useAtelier } from "@/context/Atelier";
import type { Watch } from "@/data/watches";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

export function ProductCard({ watch }: { watch: Watch }) {
  const { addToBag, toggleWishlist, wished } = useAtelier();
  const saved = wished(watch.slug);

  return (
    <article data-cursor="product" className="group border border-line bg-card transition-colors duration-500 hover:border-gold/70">
      <Link href={`/product/${watch.slug}`} className="block overflow-hidden bg-secondary">
        <WatchPlate
          variant={watch.variant}
          className="h-72 w-full origin-center transition-transform duration-700 ease-out group-hover:scale-[1.04] md:h-80"
        />
      </Link>
      <div className="flex items-start justify-between gap-4 px-4 pt-5">
        <div>
          <p className="text-[0.62rem] tracking-[0.24em] text-muted uppercase">{watch.collection}</p>
          <h3 className="mt-2 text-[0.78rem] tracking-[0.18em] uppercase transition-transform duration-500 group-hover:translate-x-1">
            <Link href={`/product/${watch.slug}`}>{watch.name}</Link>
          </h3>
        </div>
        <button
          type="button"
          aria-pressed={saved}
          aria-label={saved ? `Remove ${watch.name} from wishlist` : `Save ${watch.name}`}
          onClick={() => toggleWishlist(watch.slug)}
          className="text-xs tracking-[0.16em] text-gold uppercase"
        >
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      <div className="flex items-center justify-between px-4 py-5">
        <p className="text-sm text-muted">{formatPrice(watch.price)}</p>
        <button type="button" onClick={() => addToBag(watch.slug)} className="text-[0.66rem] tracking-[0.18em] uppercase">
          Add to bag
        </button>
      </div>
    </article>
  );
}
