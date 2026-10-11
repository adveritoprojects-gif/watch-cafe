"use client";

import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { RefObject } from "react";

export function useScrollProgress(
  trigger: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  enabled = true,
) {
  useGSAP(
    () => {
      if (!enabled || !trigger.current) return;
      ScrollTrigger.create({
        trigger: trigger.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => onProgress(self.progress),
      });
    },
    { dependencies: [enabled] },
  );
}
