"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { useRef, type ReactNode } from "react";

export function Parallax({
  children,
  className,
  distance = 80,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.fromTo(
        ref.current,
        { y: distance * -0.35 },
        {
          y: distance * 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { dependencies: [reduced, distance] },
  );

  return (
    <div ref={ref} className={cn("will-change-transform", className)}>
      {children}
    </div>
  );
}

export function ParallaxImage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Parallax className={className} distance={60}>
      {children}
    </Parallax>
  );
}
