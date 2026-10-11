"use client";

import { MagneticButton } from "@/animations/MagneticButton";
import { SplitText } from "@/animations/RevealText";
import { WatchPlate } from "@/components/watch/WatchPlate";

export function FinalCTA() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden" aria-labelledby="cta-title">
      <div className="absolute inset-0 bg-secondary">
        <WatchPlate variant="chrono" viewBox="40 180 340 340" className="h-full w-full scale-125 opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/30" />
      </div>
      <div className="relative flex min-h-[100svh] flex-col justify-end px-5 py-20 md:px-10 lg:px-16">
        <h2 id="cta-title" className="font-serif text-[clamp(4.5rem,11vw,9rem)] leading-[0.82] tracking-[-0.045em]">
          <SplitText text="Find your time." />
        </h2>
        <p className="mt-6 max-w-sm text-sm leading-7 text-muted">Explore our collection of timeless craftsmanship.</p>
        <div className="mt-10">
          <MagneticButton href="/watches">
            Shop now <span aria-hidden>→</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
