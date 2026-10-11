"use client";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

let activeLenis: Lenis | null = null;

export function getLenis() {
  return activeLenis;
}

export function useLenis() {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      autoRaf: false,
      anchors: true,
    });

    activeLenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      if (activeLenis === lenis) activeLenis = null;
      ScrollTrigger.refresh();
    };
  }, [reduced]);
}
