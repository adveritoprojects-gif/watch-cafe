"use client";

import { FadeUp } from "@/animations/RevealText";
import { WatchPlate } from "@/components/watch/WatchPlate";
import { craftSteps } from "@/data/collections";

export function Craftsmanship() {
  return (
    <section className="grid min-h-[80vh] lg:grid-cols-2" aria-labelledby="craft-title">
      <div className="relative min-h-[52vh] overflow-hidden bg-secondary">
        <WatchPlate variant="heritage" viewBox="70 210 280 260" className="absolute inset-0 h-full w-full scale-110" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,transparent,rgba(8,8,7,0.55)_70%)]" />
        <p className="absolute bottom-6 left-6 text-[0.62rem] tracking-[0.28em] text-ink uppercase">Calibre AL-03</p>
      </div>
      <div className="flex flex-col justify-center px-5 py-16 md:px-12 lg:px-16">
        <FadeUp>
          <p className="eyebrow">The craft</p>
          <h2 id="craft-title" className="mt-5 font-serif text-[clamp(3.2rem,6vw,5.8rem)] leading-[0.88] tracking-[-0.035em]">
            A masterpiece
            <br />
            in every detail.
          </h2>
          <p className="mt-8 max-w-md text-sm leading-7 text-muted">
            From the first sketch to the final polish, every component is carefully engineered, assembled and tested to meet our standards.
          </p>
        </FadeUp>
        <ol className="mt-12 space-y-6">
          {craftSteps.map((step, index) => (
            <FadeUp key={step.index} as="li" delay={index * 0.06}>
              <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-line pt-5">
                <span className="text-xs tracking-[0.22em] text-gold">{step.index}</span>
                <div>
                  <h3 className="text-sm tracking-[0.22em] uppercase">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{step.copy}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </ol>
      </div>
    </section>
  );
}
