import gsap from "gsap";

const power3 = gsap.parseEase("power3.out");
const power4 = gsap.parseEase("power4.out");
const expo = gsap.parseEase("expo.out");
const back = gsap.parseEase("back.out(1.4)");
const power2 = gsap.parseEase("power2.inOut");

export const easing = { power3, power4, expo, back, power2 };

export function segment(
  progress: number,
  start: number,
  end: number,
  ease: (value: number) => number,
) {
  if (progress <= start) return 0;
  if (progress >= end) return 1;
  return ease((progress - start) / (end - start));
}

export const storyStages = [
  {
    id: "heart",
    index: "01",
    kicker: "The heart",
    title: "Precision Movement",
    body: "Every AURELIS timepiece begins with its mechanical heart.",
    until: 0.22,
  },
  {
    id: "dial",
    index: "02",
    kicker: "The dial",
    title: "Designed With Purpose",
    body: "Every line and marker has a reason.",
    until: 0.42,
  },
  {
    id: "hands",
    index: "03",
    kicker: "The hands",
    title: "Every Second Matters.",
    body: "Precision down to the smallest detail.",
    until: 0.6,
  },
  {
    id: "case",
    index: "04",
    kicker: "The case",
    title: "Built to Endure.",
    body: "Engineered for everyday life.",
    until: 0.8,
  },
  {
    id: "form",
    index: "05",
    kicker: "The final form",
    title: "Time, Complete.",
    body: "A watch designed to be remembered.",
    until: 1,
  },
] as const;

export type StoryStage = (typeof storyStages)[number];

export function stageFor(progress: number) {
  return storyStages.find((stage) => progress <= stage.until) ?? storyStages[storyStages.length - 1];
}

export const svgWindows = {
  movement: [0.1, 0.25],
  dial: [0.28, 0.4],
  hands: [0.4, 0.52],
  crystal: [0.52, 0.65],
  bezel: [0.65, 0.75],
  crown: [0.75, 0.82],
  strapTop: [0.82, 0.88],
  strapBottom: [0.84, 0.9],
  buckle: [0.9, 0.96],
  case: [0.7, 0.86],
} as const;

export type SvgPart = keyof typeof svgWindows;

export const svgOffsets: Record<SvgPart, { x: number; y: number; r: number; ease: keyof typeof easing }> = {
  movement: { x: 18, y: 96, r: -8, ease: "back" },
  dial: { x: -58, y: -10, r: 7, ease: "power3" },
  hands: { x: 10, y: -92, r: 18, ease: "power4" },
  crystal: { x: 0, y: -118, r: 0, ease: "expo" },
  bezel: { x: 22, y: -36, r: 6, ease: "back" },
  crown: { x: 78, y: 4, r: 12, ease: "power3" },
  strapTop: { x: -6, y: -128, r: -4, ease: "power3" },
  strapBottom: { x: 10, y: 132, r: 4, ease: "power3" },
  buckle: { x: 46, y: 156, r: 12, ease: "back" },
  case: { x: 0, y: 8, r: -2, ease: "power4" },
};

export const modelPartNames = [
  "Case",
  "Bezel",
  "Crystal",
  "Dial",
  "HourHand",
  "MinuteHand",
  "SecondHand",
  "Crown",
  "Movement",
  "Rotor",
  "Gear01",
  "Gear02",
  "Gear03",
  "StrapLeft",
  "StrapRight",
  "Buckle",
] as const;

export type ModelPartName = (typeof modelPartNames)[number];

type Vec3 = [number, number, number];

export const modelWindows: Record<ModelPartName, [number, number]> = {
  Movement: [0.1, 0.25],
  Rotor: [0.12, 0.25],
  Gear01: [0.14, 0.26],
  Gear02: [0.16, 0.27],
  Gear03: [0.18, 0.28],
  Dial: [0.28, 0.4],
  HourHand: [0.4, 0.5],
  MinuteHand: [0.43, 0.52],
  SecondHand: [0.46, 0.54],
  Crystal: [0.52, 0.65],
  Bezel: [0.65, 0.75],
  Crown: [0.75, 0.82],
  StrapLeft: [0.82, 0.88],
  StrapRight: [0.84, 0.9],
  Buckle: [0.9, 0.96],
  Case: [0.72, 0.88],
};

export const modelOffsets: Record<ModelPartName, { position: Vec3; rotation: Vec3; ease: keyof typeof easing }> = {
  Movement: { position: [0.12, -1.35, -0.85], rotation: [0.3, 0.15, 0.05], ease: "back" },
  Rotor: { position: [0.2, -1.55, -1.05], rotation: [0.4, 0.6, 0], ease: "power3" },
  Gear01: { position: [-0.55, -1.15, -0.55], rotation: [0.2, 0.8, 0.3], ease: "power4" },
  Gear02: { position: [0.6, -1.1, -0.45], rotation: [0.1, -0.5, 0.2], ease: "power3" },
  Gear03: { position: [0.05, -1.7, -0.7], rotation: [0.45, 0.2, -0.25], ease: "expo" },
  Dial: { position: [-0.9, 0.12, 0.55], rotation: [0.04, -0.18, 0.08], ease: "power3" },
  HourHand: { position: [-0.12, 1.15, 0.35], rotation: [0, 0, 0.7], ease: "power4" },
  MinuteHand: { position: [0.22, 1.35, 0.42], rotation: [0, 0, -0.45], ease: "power4" },
  SecondHand: { position: [0.04, 1.55, 0.5], rotation: [0, 0, 1.05], ease: "expo" },
  Crystal: { position: [0, 1.65, 0.12], rotation: [0.06, 0, 0], ease: "expo" },
  Bezel: { position: [0.28, 0.32, 0.8], rotation: [0.1, 0.18, 0], ease: "back" },
  Crown: { position: [1.45, 0.02, 0.08], rotation: [0, 0, 0.35], ease: "power3" },
  StrapLeft: { position: [-1.65, -0.15, -0.15], rotation: [0.05, 0.25, 0.12], ease: "power3" },
  StrapRight: { position: [1.6, -0.1, -0.1], rotation: [0.04, -0.22, -0.1], ease: "power3" },
  Buckle: { position: [0.85, -1.75, 0.35], rotation: [0.25, 0.35, 0.15], ease: "back" },
  Case: { position: [0, 0.04, 0], rotation: [0, -0.04, 0], ease: "power4" },
};
