"use client";

import { MagneticButton } from "@/animations/MagneticButton";
import { Parallax } from "@/animations/Parallax";
import { SplitText } from "@/animations/RevealText";

export function BrandStory() {
  return (
    <section className="relative min-h-[88vh] overflow-hidden" aria-labelledby="story-title">
      <Parallax className="absolute inset-[-12%] bg-[radial-gradient(circle_at_70%_40%,rgba(199,165,106,0.2),transparent_32%),linear-gradient(120deg,#151310,#080807_55%)]">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-1/2 left-[62%] h-[80vh] w-[80vh] -translate-y-1/2 rounded-full border border-gold/30" />
        </div>
      </Parallax>
      <div className="relative flex min-h-[88vh] flex-col justify-end px-5 py-20 md:px-10 lg:px-16">
        <p className="eyebrow">Our story</p>
        <h2 id="story-title" className="mt-5 max-w-5xl font-serif text-[clamp(3.5rem,8vw,7.4rem)] leading-[0.86] tracking-[-0.04em]">
          <SplitText text="A journey of passion & precision." />
        </h2>
        <p className="mt-8 max-w-md text-sm leading-7 text-muted">
          AURELIS was born from a simple belief: that time is not just measured, but felt.
          <br />
          <br />
          We create watches for dreamers, achievers and those who value the finer things in life.
        </p>
        <div className="mt-10">
          <MagneticButton href="/craftsmanship">
            Discover our story <span aria-hidden>→</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
