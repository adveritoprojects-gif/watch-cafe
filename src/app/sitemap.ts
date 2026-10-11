import { watches } from "@/data/watches";
import { site } from "@/lib/site";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/watches", "/collections", "/craftsmanship", "/journal", "/contact", ...watches.map((watch) => `/product/${watch.slug}`)];
  return paths.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date("2026-10-08"),
  }));
}
