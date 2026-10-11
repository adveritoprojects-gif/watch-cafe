"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useEffect, useRef } from "react";

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduced) return;
    const node = ref.current;
    if (!node) return;
    document.documentElement.classList.add("has-fine-cursor");

    const move = (event: PointerEvent) => {
      node.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      const target = event.target instanceof Element ? event.target.closest("[data-cursor]") : null;
      node.dataset.mode = target?.getAttribute("data-cursor") ?? "default";
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      document.documentElement.classList.remove("has-fine-cursor");
      window.removeEventListener("pointermove", move);
    };
  }, [reduced]);

  return <div ref={ref} className="cursor-dot" aria-hidden data-mode="default" />;
}
