"use client";

import { gsap, useGSAP } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import { useRef, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li" | "p";
};

export function FadeUp({ children, className, delay = 0, y = 28, as = "div" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const Tag = as;

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      gsap.from(ref.current, {
        y,
        opacity: 0,
        duration: 1.05,
        delay,
        ease: "power3.out",
        immediateRender: false,
        scrollTrigger: { trigger: ref.current, start: "top 88%", once: true },
      });
    },
    { dependencies: [reduced, delay, y] },
  );

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  );
}

export function FadeIn({ children, className, delay = 0 }: RevealProps) {
  return (
    <FadeUp className={className} delay={delay} y={0}>
      {children}
    </FadeUp>
  );
}

export function RevealText({ text, className }: { text: string; className?: string }) {
  return <SplitText text={text} className={className} />;
}

export function SplitText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const words = text.split(" ");

  useGSAP(
    () => {
      if (reduced || !ref.current) return;
      const nodes = ref.current.querySelectorAll<HTMLElement>("[data-word]");
      gsap.from(nodes, {
        yPercent: 110,
        duration: 1,
        stagger: 0.045,
        ease: "power4.out",
        immediateRender: false,
        scrollTrigger: { trigger: ref.current, start: "top 86%", once: true },
      });
    },
    { dependencies: [reduced, text] },
  );

  return (
    <span ref={ref} className={cn("inline", className)}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <span data-word className="inline-block">
            {word}
            {index < words.length - 1 ? "\u00A0" : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
