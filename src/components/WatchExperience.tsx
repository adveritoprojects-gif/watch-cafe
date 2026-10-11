"use client";

import { WatchPlate, type WatchPlateHandle } from "@/components/watch/WatchPlate";
import { watches, type WatchVariant } from "@/data/watches";
import { cn } from "@/lib/cn";
import { useRef, useState, type PointerEvent } from "react";

const frames: { variant: WatchVariant; label: string }[] = [
  { variant: "obsidian", label: "Obsidian" },
  { variant: "classic", label: "Classic" },
  { variant: "chrono", label: "Chrono" },
  { variant: "lumiere", label: "Lumière" },
];

export function WatchExperience() {
  const plate = useRef<WatchPlateHandle>(null);
  const drag = useRef<{ x: number; spin: number } | null>(null);
  const spin = useRef(0);
  const [active, setActive] = useState<WatchVariant>("obsidian");
  const [hint, setHint] = useState(true);

  const down = (event: PointerEvent<HTMLDivElement>) => {
    drag.current = { x: event.clientX, spin: spin.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    setHint(false);
  };
  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!drag.current) return;
    spin.current = drag.current.spin + (event.clientX - drag.current.x) * 0.35;
    plate.current?.setSpin(spin.current);
  };

  return (
    <section className="overflow-hidden px-5 py-24 md:px-10 lg:px-16" aria-labelledby="experience-title">
      <div className="grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 id="experience-title" className="font-serif text-[clamp(3.4rem,6vw,5.6rem)] leading-[0.86] tracking-[-0.04em]">
            More
            <br />
            than a
            <br />
            watch.
          </h2>
          <p className="mt-6 max-w-xs text-sm leading-7 text-muted">
            A journey through design, innovation and the art of fine watchmaking.
          </p>
        </div>
        <div className="relative lg:col-span-7">
          <div className="pointer-events-none absolute inset-[8%] rounded-full border border-gold/30" />
          <div className="pointer-events-none absolute inset-[16%] rounded-full border border-line" />
          <div className="relative cursor-grab active:cursor-grabbing" onPointerDown={down} onPointerMove={move} onPointerUp={() => (drag.current = null)}>
            <WatchPlate ref={plate} variant={active} className="mx-auto h-[58vh] w-full" />
          </div>
          <p className={cn("mt-2 text-center text-[0.62rem] tracking-[0.28em] text-gold uppercase transition-opacity", hint ? "opacity-100" : "opacity-0")}>
            360° drag to rotate
          </p>
        </div>
        <div className="flex gap-3 lg:col-span-2 lg:flex-col lg:items-end" role="listbox" aria-label="Watch views">
          {frames.map((frame) => {
            const watch = watches.find((item) => item.variant === frame.variant);
            return (
              <button
                key={frame.variant}
                type="button"
                role="option"
                aria-selected={active === frame.variant}
                onClick={() => {
                  setActive(frame.variant);
                  spin.current = 0;
                  plate.current?.setSpin(0);
                }}
                className={cn(
                  "w-24 border bg-card p-1 transition-colors",
                  active === frame.variant ? "border-gold" : "border-line",
                )}
              >
                <WatchPlate variant={frame.variant} className="h-20 w-full" />
                <span className="sr-only">{watch?.name ?? frame.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
