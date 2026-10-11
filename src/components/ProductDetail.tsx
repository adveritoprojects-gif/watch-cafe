"use client";

import { MagneticButton } from "@/animations/MagneticButton";
import { WatchPlate } from "@/components/watch/WatchPlate";
import { useAtelier } from "@/context/Atelier";
import type { Watch } from "@/data/watches";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/cn";
import { useState, type MouseEvent } from "react";

const views = [
  { id: "Portrait", viewBox: "0 0 420 680" },
  { id: "Dial", viewBox: "110 240 200 200" },
  { id: "Case", viewBox: "240 270 170 150" },
  { id: "Strap", viewBox: "145 24 130 210" },
];

export function ProductDetail({ watch }: { watch: Watch }) {
  const { addToBag, toggleWishlist, wished } = useAtelier();
  const [view, setView] = useState(views[0]);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 40%");
  const saved = wished(watch.slug);

  const track = (event: MouseEvent<HTMLButtonElement>) => {
    if (!zoom) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  const specs = [
    ["Case", watch.material],
    ["Crystal", watch.crystal],
    ["Movement", watch.movement],
    ["Power reserve", watch.powerReserve],
    ["Water resistance", watch.waterResistance],
  ];

  return (
    <article className="grid gap-12 px-5 pt-28 pb-24 md:px-10 lg:grid-cols-12 lg:px-16">
      <div className="lg:col-span-7">
        <button
          type="button"
          className="relative block w-full overflow-hidden bg-secondary"
          onClick={() => setZoom((value) => !value)}
          onMouseMove={track}
          aria-pressed={zoom}
          aria-label={zoom ? "Exit zoom" : "Zoom image"}
        >
          <div className={cn("transition-transform duration-500", zoom && "scale-[1.7]")} style={{ transformOrigin: origin }}>
            <WatchPlate variant={watch.variant} viewBox={view.viewBox} className="h-[68vh] w-full" />
          </div>
        </button>
        <div className="mt-4 flex gap-3" role="listbox" aria-label="Gallery">
          {views.map((item) => (
            <button
              key={item.id}
              type="button"
              role="option"
              aria-selected={view.id === item.id}
              onClick={() => setView(item)}
              className={cn("w-20 border bg-card p-1", view.id === item.id ? "border-gold" : "border-line")}
            >
              <WatchPlate variant={watch.variant} viewBox={item.viewBox} className="h-16 w-full" />
              <span className="sr-only">{item.id}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="lg:col-span-5 lg:pt-8">
        <p className="eyebrow">{watch.collection}</p>
        <h1 className="mt-4 font-serif text-6xl leading-none md:text-7xl">{watch.name}</h1>
        <p className="mt-4 text-sm text-muted">
          {watch.type}
          <span className="px-2">·</span>
          {watch.diameter}
        </p>
        <p className="mt-6 text-lg">{formatPrice(watch.price, watch.currency)}</p>
        <p className="mt-8 max-w-md text-sm leading-7 text-muted">{watch.description}</p>
        <dl className="mt-10 space-y-4">
          {specs.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[9rem_1fr] gap-4 border-t border-line pt-4 text-sm">
              <dt className="text-[0.66rem] tracking-[0.2em] text-muted uppercase">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <MagneticButton onClick={() => addToBag(watch.slug)}>
            Add to bag <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton href={`/contact?piece=${watch.slug}`}>
            Enquire now <span aria-hidden>→</span>
          </MagneticButton>
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => toggleWishlist(watch.slug)}
            className="text-[0.68rem] tracking-[0.2em] text-gold uppercase"
          >
            {saved ? "Saved" : "Wishlist"}
          </button>
        </div>
        <p className="mt-6 text-xs tracking-[0.18em] text-muted uppercase">{watch.sku}</p>
      </div>
    </article>
  );
}
