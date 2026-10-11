"use client";

import type { WatchVariant } from "@/data/watches";
import { easing, segment, svgOffsets, svgWindows, type SvgPart } from "@/lib/assembly";
import { forwardRef, useId, useImperativeHandle, useRef } from "react";

export type WatchPlateHandle = {
  setProgress: (progress: number) => void;
  setSpin: (degrees: number) => void;
};

const palette: Record<
  WatchVariant,
  {
    strap: string;
    strapEdge: string;
    dial: string;
    marker: string;
    hand: string;
    second: string;
    roman?: boolean;
    chrono?: boolean;
    date?: boolean;
    gmt?: boolean;
  }
> = {
  obsidian: { strap: "#16130f", strapEdge: "#3c342b", dial: "#0e0d0b", marker: "#e0bd7a", hand: "#f4efe6", second: "#c7a56a" },
  classic: { strap: "#5c4634", strapEdge: "#8a6d52", dial: "#1a1814", marker: "#f1e9dc", hand: "#f1e9dc", second: "#c7a56a", date: true },
  heritage: { strap: "#6b4e36", strapEdge: "#c7a56a", dial: "#efe4d2", marker: "#1c1915", hand: "#1c1915", second: "#8a6232", roman: true },
  chrono: { strap: "#241f1b", strapEdge: "#5c5348", dial: "#14171c", marker: "#f1e9dc", hand: "#f1e9dc", second: "#e0bd7a", chrono: true },
  automatic: { strap: "#2a241e", strapEdge: "#6d624f", dial: "#101614", marker: "#e0bd7a", hand: "#f1e9dc", second: "#c7a56a", date: true },
  lumiere: { strap: "#d8d2c8", strapEdge: "#f7f1e6", dial: "#e7d3ae", marker: "#3a2e22", hand: "#3a2e22", second: "#8a6232" },
  nocturne: { strap: "#10120f", strapEdge: "#c7a56a", dial: "#121a16", marker: "#e0bd7a", hand: "#f1e9dc", second: "#e0bd7a" },
  meridian: { strap: "#1c2428", strapEdge: "#8aa0a8", dial: "#101418", marker: "#d5e2e6", hand: "#f1e9dc", second: "#c7a56a", gmt: true },
};

type Props = {
  variant: WatchVariant;
  className?: string;
  viewBox?: string;
};

export const WatchPlate = forwardRef<WatchPlateHandle, Props>(function WatchPlate(
  { variant, className, viewBox = "0 0 420 680" },
  ref,
) {
  const uid = useId().replace(/:/g, "");
  const root = useRef<SVGGElement>(null);
  const parts = useRef<Partial<Record<SvgPart, SVGGElement | null>>>({});
  const colors = palette[variant];

  useImperativeHandle(ref, () => ({
    setProgress(progress) {
      (Object.keys(svgWindows) as SvgPart[]).forEach((key) => {
        const node = parts.current[key];
        if (!node) return;
        const [start, end] = svgWindows[key];
        const offset = svgOffsets[key];
        const settled = segment(progress, start, end, easing[offset.ease]);
        const remain = 1 - settled;
        const origin = key === "strapTop" ? "210 160" : key === "strapBottom" || key === "buckle" ? "210 560" : "210 340";
        node.setAttribute(
          "transform",
          `translate(${offset.x * remain} ${offset.y * remain}) rotate(${offset.r * remain} ${origin})`,
        );
      });
    },
    setSpin(degrees) {
      root.current?.setAttribute("transform", `rotate(${degrees} 210 340)`);
    },
  }));

  const ticks = Array.from({ length: 60 }, (_, index) => {
    const angle = (index / 60) * Math.PI * 2;
    const inner = index % 5 === 0 ? 78 : 84;
    const outer = 90;
    const x1 = 210 + Math.sin(angle) * inner;
    const y1 = 340 - Math.cos(angle) * inner;
    const x2 = 210 + Math.sin(angle) * outer;
    const y2 = 340 - Math.cos(angle) * outer;
    return <line key={index} x1={x1} y1={y1} x2={x2} y2={y2} stroke={colors.marker} strokeWidth={index % 5 === 0 ? 1.6 : 0.6} />;
  });

  return (
    <svg viewBox={viewBox} className={className} role="img" aria-label={`${variant} watch`}>
      <defs>
        <radialGradient id={`${uid}-light`} cx="38%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#fff8ee" stopOpacity="0.55" />
          <stop offset="42%" stopColor="#c7a56a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-steel`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f4efe6" />
          <stop offset="28%" stopColor="#b7b1a6" />
          <stop offset="52%" stopColor="#6e675e" />
          <stop offset="78%" stopColor="#e7e0d4" />
          <stop offset="100%" stopColor="#8d867c" />
        </linearGradient>
        <linearGradient id={`${uid}-strap`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={colors.strapEdge} />
          <stop offset="18%" stopColor={colors.strap} />
          <stop offset="82%" stopColor={colors.strap} />
          <stop offset="100%" stopColor={colors.strapEdge} />
        </linearGradient>
        <filter id={`${uid}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="18" stdDeviation="12" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>

      <g ref={root}>
        <g ref={(node) => { parts.current.strapTop = node; }}>
          <rect x="158" y="28" width="104" height="210" rx="10" fill={`url(#${uid}-strap)`} />
          <path d="M176 48 v170 M244 48 v170" stroke={colors.strapEdge} strokeWidth="0.6" strokeDasharray="2 5" opacity="0.7" />
        </g>
        <g ref={(node) => { parts.current.strapBottom = node; }}>
          <rect x="158" y="442" width="104" height="196" rx="10" fill={`url(#${uid}-strap)`} />
          <path d="M176 462 v156 M244 462 v156" stroke={colors.strapEdge} strokeWidth="0.6" strokeDasharray="2 5" opacity="0.7" />
        </g>
        <g ref={(node) => { parts.current.buckle = node; }}>
          <rect x="172" y="592" width="76" height="40" rx="4" fill="#1a1814" stroke="#d9d1c4" strokeWidth="2" />
          <rect x="188" y="602" width="44" height="20" rx="2" fill="none" stroke="#e0bd7a" strokeWidth="1.2" />
          <path d="M210 592 v40" stroke="#f1e9dc" strokeWidth="1.4" />
        </g>
        <g ref={(node) => { parts.current.movement = node; }}>
          <circle cx="210" cy="430" r="54" fill="#12100e" stroke="#c7a56a" strokeWidth="0.6" />
          <circle cx="196" cy="418" r="16" fill="none" stroke="#a8a095" strokeWidth="3" />
          <circle cx="226" cy="436" r="12" fill="none" stroke="#e0bd7a" strokeWidth="2.4" />
          <path d="M210 430 m-30 0 a30 30 0 1 1 48 18" fill="none" stroke="#c7a56a" strokeWidth="4" />
        </g>
        <g ref={(node) => { parts.current.case = node; }} filter={`url(#${uid}-soft)`}>
          <path d="M150 292 l-18 -18 v-8 l18 -16 v84 l-18 -16 v-8 l18 -18 z" fill={`url(#${uid}-steel)`} />
          <path d="M270 292 l18 -18 v-8 l-18 -16 v84 l18 -16 v-8 l-18 -18 z" fill={`url(#${uid}-steel)`} />
          <circle cx="210" cy="340" r="118" fill={`url(#${uid}-steel)`} />
          <circle cx="210" cy="340" r="100" fill="#090807" />
        </g>
        <g ref={(node) => { parts.current.bezel = node; }}>
          <circle cx="210" cy="340" r="104" fill="none" stroke="#1b1916" strokeWidth="10" />
          <circle cx="210" cy="340" r="104" fill="none" stroke="#e0bd7a" strokeWidth="0.6" opacity="0.8" />
        </g>
        <g ref={(node) => { parts.current.dial = node; }}>
          <circle cx="210" cy="340" r="92" fill={colors.dial} />
          {ticks}
          {colors.roman ? (
            <g fill={colors.marker} fontFamily="var(--font-serif), serif" fontSize="13" textAnchor="middle">
              <text x="210" y="268">XII</text>
              <text x="286" y="345">III</text>
              <text x="210" y="422">VI</text>
              <text x="134" y="345">IX</text>
            </g>
          ) : null}
          {colors.chrono ? (
            <>
              <circle cx="210" cy="300" r="18" fill="none" stroke={colors.marker} strokeWidth="0.7" />
              <circle cx="176" cy="366" r="16" fill="none" stroke={colors.marker} strokeWidth="0.7" />
              <circle cx="244" cy="366" r="16" fill="none" stroke={colors.marker} strokeWidth="0.7" />
            </>
          ) : null}
          {colors.date ? <rect x="268" y="332" width="18" height="14" fill="#f1e9dc" /> : null}
          {colors.gmt ? <path d="M210 268 a72 72 0 0 1 62 36" fill="none" stroke="#c7a56a" strokeWidth="2" /> : null}
          <text x="210" y="378" textAnchor="middle" fill={colors.marker} fontSize="8" letterSpacing="3">
            AURELIS
          </text>
        </g>
        <g ref={(node) => { parts.current.hands = node; }}>
          <line x1="210" y1="340" x2="210" y2="274" stroke={colors.hand} strokeWidth="3.2" strokeLinecap="round" />
          <line x1="210" y1="340" x2="262" y2="318" stroke={colors.hand} strokeWidth="2.2" strokeLinecap="round" />
          <line x1="210" y1="352" x2="210" y2="262" stroke={colors.second} strokeWidth="0.8" />
          <circle cx="210" cy="340" r="3.2" fill={colors.second} />
        </g>
        <g ref={(node) => { parts.current.crystal = node; }}>
          <circle cx="210" cy="340" r="96" fill={`url(#${uid}-light)`} />
          <circle cx="210" cy="340" r="96" fill="none" stroke="#ffffff" strokeOpacity="0.28" />
        </g>
        <g ref={(node) => { parts.current.crown = node; }}>
          <rect x="324" y="322" width="10" height="16" rx="1" fill={`url(#${uid}-steel)`} />
          <rect x="334" y="318" width="8" height="24" rx="1.5" fill="#d9d2c6" />
        </g>
      </g>
      </svg>
  );
});
