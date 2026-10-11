"use client";

import { FadeUp } from "@/animations/RevealText";
import { WatchPlate } from "@/components/watch/WatchPlate";
import { getFeaturedWatches } from "@/data/watches";
import { formatPrice } from "@/lib/format";
import Link from "next/link";

export function FeaturedCollection() {
  const featured = getFeaturedWatches();
  const [lead, ...rest] = featured;

  if (!lead) return null;

  return (
    <section className="px-5 py-24 md:px-10 md:py-32 lg:px-16" aria-labelledby="featured-title">
      <FadeUp>
        <p className="eyebrow">Featured collection</p>
        <h2 id="featured-title" className="mt-5 max-w-4xl font-serif text-[clamp(3.4rem,7vw,7rem)] leading-[0.86] tracking-[-0.04em]">
          Timeless essentials
        </h2>
      </FadeUp>

      <article className="mt-16 grid border-t border-line lg:grid-cols-12">
        <Link href={`/product/${lead.slug}`} data-cursor="product" className="group overflow-hidden bg-secondary lg:col-span-7">
          <WatchPlate variant={lead.variant} className="h-[62vh] w-full transition-transform duration-700 group-hover:scale-[1.04]" />
        </Link>
        <div className="flex flex-col justify-end border-line px-0 py-8 lg:col-span-5 lg:border-t-0 lg:border-l lg:px-10">
          <p className="text-[0.62rem] tracking-[0.28em] text-muted uppercase">01 — {lead.collection}</p>
          <h3 className="mt-4 font-serif text-6xl leading-none transition-transform duration-500 hover:translate-x-1">
            <Link href={`/product/${lead.slug}`}>{lead.name}</Link>
          </h3>
          <p className="mt-4 text-sm text-muted">
            {lead.type} · {lead.diameter}
          </p>
          <p className="mt-6 text-sm">{formatPrice(lead.price)}</p>
          <Link href={`/product/${lead.slug}`} className="gold-link mt-8 w-fit" data-cursor="cta">
            View details <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </article>

      <div className="grid border-t border-line md:grid-cols-3">
        {rest.map((watch, index) => (
          <article key={watch.id} className="border-b border-line md:border-r md:border-b-0 md:last:border-r-0">
            <Link href={`/product/${watch.slug}`} data-cursor="product" className="group block overflow-hidden bg-card">
              <WatchPlate variant={watch.variant} className="h-[46vh] w-full transition-transform duration-700 group-hover:scale-[1.04]" />
              <div className="border-t border-transparent px-4 py-6 transition-colors duration-500 group-hover:border-gold">
                <p className="text-[0.62rem] tracking-[0.24em] text-muted uppercase">
                  0{index + 2} — {watch.type} · {watch.diameter}
                </p>
                <h3 className="mt-3 text-[0.78rem] tracking-[0.2em] uppercase transition-transform duration-500 group-hover:translate-x-1">
                  {watch.name}
                </h3>
                <div className="mt-5 flex items-center justify-between text-sm">
                  <span className="text-muted">{formatPrice(watch.price)}</span>
                  <span className="text-[0.66rem] tracking-[0.18em] uppercase">
                    View details <span className="inline-block transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
