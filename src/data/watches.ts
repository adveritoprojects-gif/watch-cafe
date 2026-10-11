export type Audience = "men" | "women";

export type WatchVariant =
  | "obsidian"
  | "classic"
  | "heritage"
  | "chrono"
  | "automatic"
  | "lumiere"
  | "nocturne"
  | "meridian";

export interface Watch {
  id: string;
  slug: string;
  sku: string;
  name: string;
  collection: string;
  price: number;
  currency: "INR";
  type: string;
  diameter: string;
  movement: string;
  material: string;
  crystal: string;
  waterResistance: string;
  powerReserve: string;
  images: string[];
  description: string;
  featured: boolean;
  audience: Audience;
  limited: boolean;
  variant: WatchVariant;
}

export const watches: Watch[] = [
  {
    id: "aur-001",
    slug: "the-obsidian",
    sku: "AUR-001",
    name: "The Obsidian",
    collection: "Signature",
    price: 145000,
    currency: "INR",
    type: "Automatic",
    diameter: "42 mm",
    movement: "Automatic",
    material: "316L Stainless Steel",
    crystal: "Sapphire",
    waterResistance: "5 ATM",
    powerReserve: "48 Hours",
    images: ["/images/watches/aur-001.svg"],
    description:
      "A dark, measured dress watch. The obsidian dial is kept almost silent, so the finishing of the case and the rhythm of the hands can speak.",
    featured: false,
    audience: "men",
    limited: false,
    variant: "obsidian",
  },
  {
    id: "aur-002",
    slug: "the-classic",
    sku: "AUR-002",
    name: "The Classic",
    collection: "Signature",
    price: 132000,
    currency: "INR",
    type: "Automatic",
    diameter: "40 mm",
    movement: "Automatic",
    material: "316L Stainless Steel",
    crystal: "Sapphire",
    waterResistance: "5 ATM",
    powerReserve: "42 Hours",
    images: ["/images/watches/aur-002.svg"],
    description:
      "The house line in its purest form. A slim steel case, a warm dial, and proportions meant to disappear into a cuff until the light finds them.",
    featured: true,
    audience: "men",
    limited: false,
    variant: "classic",
  },
  {
    id: "aur-003",
    slug: "the-heritage",
    sku: "AUR-003",
    name: "The Heritage",
    collection: "Heritage",
    price: 158000,
    currency: "INR",
    type: "Manual",
    diameter: "39 mm",
    movement: "Manual",
    material: "316L Stainless Steel",
    crystal: "Sapphire",
    waterResistance: "3 ATM",
    powerReserve: "52 Hours",
    images: ["/images/watches/aur-003.svg"],
    description:
      "A smaller case and a cream dial, drawn from the house archives. The manual calibre asks to be wound, and rewards the gesture.",
    featured: true,
    audience: "men",
    limited: false,
    variant: "heritage",
  },
  {
    id: "aur-004",
    slug: "the-chrono",
    sku: "AUR-004",
    name: "The Chrono",
    collection: "Sport",
    price: 186000,
    currency: "INR",
    type: "Chronograph",
    diameter: "42 mm",
    movement: "Automatic chronograph",
    material: "316L Stainless Steel",
    crystal: "Sapphire",
    waterResistance: "10 ATM",
    powerReserve: "48 Hours",
    images: ["/images/watches/aur-004.svg"],
    description:
      "Two registers, a measured bezel, and a case shaped for the wrist in motion. Timing, without theatre.",
    featured: true,
    audience: "men",
    limited: false,
    variant: "chrono",
  },
  {
    id: "aur-005",
    slug: "the-automatic",
    sku: "AUR-005",
    name: "The Automatic",
    collection: "Signature",
    price: 162000,
    currency: "INR",
    type: "Automatic",
    diameter: "41 mm",
    movement: "Automatic",
    material: "316L Stainless Steel",
    crystal: "Sapphire",
    waterResistance: "5 ATM",
    powerReserve: "60 Hours",
    images: ["/images/watches/aur-005.svg"],
    description:
      "The everyday calibre of the house. A longer power reserve, a date at three, and a dial that stays legible from across a table.",
    featured: true,
    audience: "men",
    limited: false,
    variant: "automatic",
  },
  {
    id: "aur-006",
    slug: "the-lumiere",
    sku: "AUR-006",
    name: "The Lumière",
    collection: "Atelier",
    price: 138000,
    currency: "INR",
    type: "Automatic",
    diameter: "36 mm",
    movement: "Automatic",
    material: "316L Stainless Steel",
    crystal: "Sapphire",
    waterResistance: "5 ATM",
    powerReserve: "42 Hours",
    images: ["/images/watches/aur-006.svg"],
    description:
      "Light on the wrist, with a champagne dial and a fine bracelet of polished steel. Made for evenings that begin before dusk.",
    featured: false,
    audience: "women",
    limited: false,
    variant: "lumiere",
  },
  {
    id: "aur-007",
    slug: "the-nocturne",
    sku: "AUR-007",
    name: "The Nocturne",
    collection: "Atelier",
    price: 174000,
    currency: "INR",
    type: "Automatic",
    diameter: "38 mm",
    movement: "Automatic",
    material: "316L Stainless Steel",
    crystal: "Sapphire",
    waterResistance: "5 ATM",
    powerReserve: "48 Hours",
    images: ["/images/watches/aur-007.svg"],
    description:
      "A limited night dial, deep green beneath gold markers. Fifty pieces, each numbered on the case flank.",
    featured: false,
    audience: "women",
    limited: true,
    variant: "nocturne",
  },
  {
    id: "aur-008",
    slug: "the-meridian",
    sku: "AUR-008",
    name: "The Meridian",
    collection: "Sport",
    price: 198000,
    currency: "INR",
    type: "GMT",
    diameter: "41 mm",
    movement: "Automatic GMT",
    material: "316L Stainless Steel",
    crystal: "Sapphire",
    waterResistance: "10 ATM",
    powerReserve: "56 Hours",
    images: ["/images/watches/aur-008.svg"],
    description:
      "A second hour hand for another city, and a restrained bezel that does not shout the journey. Issued in a numbered series.",
    featured: false,
    audience: "men",
    limited: true,
    variant: "meridian",
  },
];

export function getWatch(slug: string) {
  return watches.find((watch) => watch.slug === slug);
}

export function getFeaturedWatches() {
  return watches.filter((watch) => watch.featured);
}

export type CollectionFilter = "all" | "men" | "women" | "limited";

export function filterWatches(filter: CollectionFilter) {
  if (filter === "all") return watches;
  if (filter === "limited") return watches.filter((watch) => watch.limited);
  return watches.filter((watch) => watch.audience === filter);
}
