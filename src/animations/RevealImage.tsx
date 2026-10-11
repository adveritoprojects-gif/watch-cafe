"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { useRef, type ReactNode } from "react";

export function RevealImage({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from(ref.current, {
        clipPath: "inset(12% 0% 12% 0%)",
        opacity: 0.4,
        duration: 1.2,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });
    },
    { dependencies: [reduced] },
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      {children}
    </div>
  );
}
