"use client";

import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
};

export function MagneticButton({ children, className, href, onClick, type = "button", ariaLabel }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  const move = (event: MouseEvent<HTMLElement>) => {
    if (reduced || !ref.current) return;
    const bounds = ref.current.getBoundingClientRect();
    const x = event.clientX - (bounds.left + bounds.width / 2);
    const y = event.clientY - (bounds.top + bounds.height / 2);
    gsap.to(ref.current, { x: x * 0.28, y: y * 0.35, duration: 0.45, ease: "power3.out" });
  };

  const leave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.6, ease: "power3.out" });
  };

  const classes = cn(
    "gold-link inline-flex items-center gap-3 border border-line px-6 py-3 text-ink transition-colors duration-500 hover:border-gold hover:text-gold-bright",
    className,
  );

  const inner = href ? (
    <Link href={href} data-cursor="cta" className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </Link>
  ) : (
    <button type={type} data-cursor="cta" className={classes} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );

  return (
    <span ref={ref} className="inline-flex" onMouseMove={move} onMouseLeave={leave}>
      {inner}
    </span>
  );
}
