"use client";

import { watches } from "@/data/watches";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type BagLine = { slug: string; quantity: number };
type Panel = "search" | "account" | "bag" | null;

type AtelierContextValue = {
  bag: BagLine[];
  wishlist: string[];
  panel: Panel;
  bagCount: number;
  openPanel: (panel: Exclude<Panel, null>) => void;
  closePanel: () => void;
  addToBag: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeFromBag: (slug: string) => void;
  toggleWishlist: (slug: string) => void;
  wished: (slug: string) => boolean;
};

const AtelierContext = createContext<AtelierContextValue | null>(null);
const storageKey = "aurelis-atelier";

export function AtelierProvider({ children }: { children: ReactNode }) {
  const [bag, setBag] = useState<BagLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [panel, setPanel] = useState<Panel>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const parsed = JSON.parse(raw) as { bag?: BagLine[]; wishlist?: string[] };
        if (Array.isArray(parsed.bag)) setBag(parsed.bag.filter((line) => watches.some((watch) => watch.slug === line.slug)));
        if (Array.isArray(parsed.wishlist)) setWishlist(parsed.wishlist.filter((slug) => watches.some((watch) => watch.slug === slug)));
      }
    } catch {
      localStorage.removeItem(storageKey);
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(storageKey, JSON.stringify({ bag, wishlist }));
  }, [bag, wishlist, ready]);

  const addToBag = useCallback((slug: string) => {
    setBag((current) => {
      const existing = current.find((line) => line.slug === slug);
      if (existing) {
        return current.map((line) => (line.slug === slug ? { ...line, quantity: line.quantity + 1 } : line));
      }
      return [...current, { slug, quantity: 1 }];
    });
    setPanel("bag");
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setBag((current) =>
      quantity < 1
        ? current.filter((line) => line.slug !== slug)
        : current.map((line) => (line.slug === slug ? { ...line, quantity } : line)),
    );
  }, []);

  const removeFromBag = useCallback((slug: string) => {
    setBag((current) => current.filter((line) => line.slug !== slug));
  }, []);

  const toggleWishlist = useCallback((slug: string) => {
    setWishlist((current) => (current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]));
  }, []);

  const value = useMemo<AtelierContextValue>(
    () => ({
      bag,
      wishlist,
      panel,
      bagCount: bag.reduce((sum, line) => sum + line.quantity, 0),
      openPanel: (next) => setPanel(next),
      closePanel: () => setPanel(null),
      addToBag,
      setQuantity,
      removeFromBag,
      toggleWishlist,
      wished: (slug) => wishlist.includes(slug),
    }),
    [addToBag, bag, panel, removeFromBag, setQuantity, toggleWishlist, wishlist],
  );

  return <AtelierContext.Provider value={value}>{children}</AtelierContext.Provider>;
}

export function useAtelier() {
  const context = useContext(AtelierContext);
  if (!context) throw new Error("useAtelier must be used within AtelierProvider");
  return context;
}
