"use client";

import { WatchPlate, type WatchPlateHandle } from "@/components/watch/WatchPlate";
import { stageFor, storyStages, type StoryStage } from "@/lib/assembly";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { canUseWebGL, modelIsAvailable } from "@/lib/model";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WatchScene = dynamic(() => import("@/components/watch/WatchScene").then((mod) => mod.WatchScene), {
  ssr: false,
});

export function WatchAssembly() {
  const section = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const plate = useRef<WatchPlateHandle>(null);
  const progressRef = useRef(0);
  const dragRef = useRef(0);
  const stageRef = useRef<StoryStage["id"]>(storyStages[0].id);
  const dragOrigin = useRef<{ x: number; rotation: number } | null>(null);
  const reduced = useReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const [stageId, setStageId] = useState<StoryStage["id"]>(storyStages[0].id);
  const [modelReady, setModelReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);
  const [hint, setHint] = useState(true);
  const stage = storyStages.find((item) => item.id === stageId) ?? storyStages[0];
  const showScene = modelReady && !webglFailed;

  useEffect(() => {
    let cancelled = false;
    if (!canUseWebGL()) {
      setWebglFailed(true);
      return;
    }
    modelIsAvailable().then((available) => {
      if (!cancelled) setModelReady(available);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useGSAP(
    () => {
      if (!section.current || !pin.current) return;
      if (reduced) {
        progressRef.current = 1;
        plate.current?.setProgress(1);
        setStageId(storyStages[storyStages.length - 1].id);
        return;
      }

      const apply = (progress: number) => {
        progressRef.current = progress;
        plate.current?.setProgress(progress);
        const next = stageFor(progress);
        if (next.id !== stageRef.current) {
          stageRef.current = next.id;
          setStageId(next.id);
        }
        const rail = section.current?.querySelector<HTMLElement>("[data-rail]");
        if (rail) rail.style.transform = `scaleY(${progress})`;
      };

      ScrollTrigger.create({
        trigger: section.current,
        start: "top top",
        end: "bottom bottom",
        pin: pin.current,
        scrub: 0.65,
        anticipatePin: 1,
        onUpdate: (self) => apply(self.progress),
      });

      apply(0);
    },
    { dependencies: [reduced, showScene], scope: section },
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (progressRef.current < 0.98) return;
    dragOrigin.current = { x: event.clientX, rotation: dragRef.current };
    event.currentTarget.setPointerCapture(event.pointerId);
    setHint(false);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragOrigin.current) return;
    const dx = event.clientX - dragOrigin.current.x;
    dragRef.current = dragOrigin.current.rotation + dx * 0.45;
    plate.current?.setSpin(dragRef.current);
  };

  const onPointerUp = () => {
    dragOrigin.current = null;
  };

  return (
    <section ref={section} className={cn("relative bg-bg", reduced ? "min-h-[100svh]" : "h-[280vh] md:h-[330vh]")} aria-labelledby="assembly-title">
      <div ref={pin} className="flex h-[100svh] items-center overflow-hidden">
        <div className="grid w-full items-center gap-6 px-5 md:px-10 lg:grid-cols-12 lg:px-16">
          <div className="lg:col-span-4">
            <p className="eyebrow">The making</p>
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.id}
                initial={reduced ? false : { opacity: 0, y: 22, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={reduced ? undefined : { opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <p className="mt-8 text-[0.68rem] tracking-[0.32em] text-gold uppercase">{stage.kicker}</p>
                <h2 id="assembly-title" className="mt-4 font-serif text-[clamp(3rem,6vw,5.4rem)] leading-[0.9] tracking-[-0.03em]">
                  {stage.title}
                </h2>
                <p className="mt-6 max-w-sm text-sm leading-7 text-muted">{stage.body}</p>
              </motion.div>
            </AnimatePresence>
            <p className="mt-10 text-[0.62rem] tracking-[0.28em] text-muted uppercase">{stage.index} / 05</p>
          </div>

          <div
            className="relative lg:col-span-8"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <div className="relative mx-auto h-[48vh] w-full md:h-[70vh]">
              {showScene ? (
                <WatchScene
                  progressRef={progressRef}
                  dragRef={dragRef}
                  mobile={mobile}
                  onContextLost={() => setWebglFailed(true)}
                />
              ) : (
                <WatchPlate ref={plate} variant="obsidian" className="h-full w-full" />
              )}
              <div
                className={cn(
                  "pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 text-center text-[0.62rem] tracking-[0.28em] text-gold uppercase transition-opacity duration-700",
                  hint && stage.id === "form" ? "opacity-100" : "opacity-0",
                )}
              >
                360°
                <br />
                Drag to rotate
              </div>
            </div>
            <div className={cn("mt-4 flex justify-center gap-3 lg:absolute lg:right-0 lg:bottom-6 lg:mt-0", stage.id === "form" || reduced ? "opacity-100" : "pointer-events-none opacity-0")}>
              <button
                type="button"
                className="border border-line px-3 py-2 text-[0.62rem] tracking-[0.18em] uppercase"
                onClick={() => {
                  dragRef.current -= 25;
                  plate.current?.setSpin(dragRef.current);
                  setHint(false);
                }}
              >
                Rotate left
              </button>
              <button
                type="button"
                className="border border-line px-3 py-2 text-[0.62rem] tracking-[0.18em] uppercase"
                onClick={() => {
                  dragRef.current += 25;
                  plate.current?.setSpin(dragRef.current);
                  setHint(false);
                }}
              >
                Rotate right
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 right-4 hidden h-40 w-px -translate-y-1/2 bg-line md:block" aria-hidden>
          <span data-rail className="absolute inset-x-0 top-0 h-full origin-top bg-gold" style={{ transform: "scaleY(0)" }} />
        </div>
      </div>
    </section>
  );
}
