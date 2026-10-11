export interface Collection {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  note: string;
}

export const collections: Collection[] = [
  {
    slug: "signature",
    name: "Signature",
    eyebrow: "The house line",
    description:
      "Steel, sapphire, and a dial reduced until nothing remains that does not earn its place.",
    note: "Everyday pieces with the full attention of the atelier.",
  },
  {
    slug: "heritage",
    name: "Heritage",
    eyebrow: "From the archive",
    description:
      "Smaller cases, warmer dials, and manual calibres wound by hand. A conversation with the first drawings of the house.",
    note: "Proportions borrowed from an earlier century, finished for this one.",
  },
  {
    slug: "sport",
    name: "Sport",
    eyebrow: "Measured pace",
    description:
      "Chronograph and GMT watches built for travel and timing, without abandoning the quiet of the dial.",
    note: "Instruments first. Ornaments never.",
  },
  {
    slug: "atelier",
    name: "Atelier",
    eyebrow: "Private light",
    description:
      "Finer cases and limited night dials, composed for wrists that prefer a lower voice.",
    note: "Small series, finished one piece at a time.",
  },
];

export const journal = [
  {
    slug: "on-finishing",
    kicker: "Atelier notes",
    title: "The last hour of finishing",
    date: "March 2026",
    excerpt:
      "A case can be correct and still feel unfinished. The last hour is where edges are softened until the steel reads as quiet.",
  },
  {
    slug: "dial-and-silence",
    kicker: "Design",
    title: "What a dial is allowed to say",
    date: "January 2026",
    excerpt:
      "Markers, type, and empty ground. We remove a line only when the watch remains legible without it.",
  },
  {
    slug: "winding",
    kicker: "Ownership",
    title: "A note on winding",
    date: "November 2025",
    excerpt:
      "An automatic watch keeps time from the life around it. A manual one asks for a morning. Both are deliberate.",
  },
] as const;

export const craftSteps = [
  {
    index: "01",
    title: "Design",
    copy: "Proportion is drawn before decoration. The case, dial, and hand lengths are settled as one drawing.",
  },
  {
    index: "02",
    title: "Engineering",
    copy: "The calibre is specified for reserve, accuracy, and service. Nothing is hidden that a watchmaker cannot reach.",
  },
  {
    index: "03",
    title: "Assembly",
    copy: "Hands, dial, and case meet on the bench. Each timing check is recorded before the case is closed.",
  },
  {
    index: "04",
    title: "Perfection",
    copy: "Polish, pressure, and a final regulation. The piece leaves only when it meets the house standard.",
  },
] as const;
