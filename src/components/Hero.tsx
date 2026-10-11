"use client";

import { MagneticButton } from "@/animations/MagneticButton";
import { WatchPlate, type WatchPlateHandle } from "@/components/watch/WatchPlate";
import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useRef, type MouseEvent } from "react";

const specs = ["Automatic movement", "Sapphire crystal", "316L steel", "5 ATM water resistant"];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const plate = useRef<WatchPlateHandle>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!root.current) return;
      const items = root.current.querySelectorAll<HTMLElement>("[data-reveal]");
      if (reduced) {
        gsap.set(items, { clearProps: "all" });
        return;
      }
      gsap.from(items, {
        y: 36,
        opacity: 0,
        duration: 1.15,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      });
      gsap.from("[data-watch]", {
        scale: 0.94,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.2,
      });
      gsap.to("[data-watch]", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: root, dependencies: [reduced] },
  );

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    plate.current?.setSpin(x * 8);
  };

  return (
    <section ref={root} className="relative min-h-[100svh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-1/4 right-[-10%] h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,rgba(224,189,122,0.16),transparent_62%)]" />
        <div className="light-spin absolute top-[18%] right-[8%] h-[78vh] w-[78vh] bg-[conic-gradient(from_120deg,transparent,rgba(224,189,122,0.16),transparent_28%)] opacity-70" />
      </div>

      <div className="relative grid min-h-[100svh] items-end gap-8 px-5 pt-28 pb-20 md:px-10 lg:grid-cols-12 lg:items-center lg:px-16">
        <div className="lg:col-span-5">
          <p data-reveal className="eyebrow">
            Timeless elegance
          </p>
          <h1 data-reveal className="mt-6 font-serif text-[clamp(4.4rem,9vw,8.4rem)] leading-[0.84] font-medium tracking-[-0.045em] text-ink">
            Time,
            <br />
            Crafted
            <br />
            Differently.
          </h1>
          <p data-reveal className="mt-8 max-w-sm text-sm leading-7 text-muted">
            More than a watch.
            <br />
            A statement of precision,
            <br />
            heritage and individuality.
          </p>
          <div data-reveal className="mt-10">
            <MagneticButton href="/watches">
              Explore collection <span aria-hidden>→</span>
            </MagneticButton>
          </div>
        </div>

        <div
          data-watch
          className="relative lg:col-span-7"
          onMouseMove={onMove}
          onMouseLeave={() => plate.current?.setSpin(0)}
        >
          <div className="pointer-events-none absolute top-1/2 left-1/2 aspect-square w-[min(78%,520px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/40" />
          <WatchPlate ref={plate} variant="obsidian" className="relative mx-auto h-[62vh] w-auto max-w-full md:h-[78vh]" />
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 lg:absolute lg:top-1/2 lg:right-0 lg:mt-0 lg:block lg:-translate-y-1/2 lg:space-y-5">
            {specs.map((spec, index) => (
              <li key={spec} data-reveal className="text-[0.62rem] tracking-[0.22em] text-muted uppercase" style={{ transitionDelay: `${index * 80}ms` }}>
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="absolute bottom-6 left-5 flex items-center gap-8 text-[0.62rem] tracking-[0.28em] text-muted uppercase md:left-10 lg:left-16">
        <span>01 / 04</span>
        <span>Scroll ↓</span>
      </div>
    </section>
  );
}
