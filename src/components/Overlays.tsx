"use client";

import { useAtelier } from "@/context/Atelier";
import { getWatch, watches } from "@/data/watches";
import { formatPrice } from "@/lib/format";
import { getLenis } from "@/hooks/useLenis";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export function Overlays() {
  const atelier = useAtelier();

  useEffect(() => {
    if (!atelier.panel) return;
    const lenis = getLenis();
    lenis?.stop();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") atelier.closePanel();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [atelier]);

  return (
    <AnimatePresence>
      {atelier.panel ? (
        <motion.div
          className="fixed inset-0 z-[70] bg-bg/70 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={atelier.closePanel}
        >
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label={atelier.panel}
            className="absolute top-0 right-0 flex h-full w-full max-w-md flex-col border-l border-line bg-secondary px-7 py-8"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-10 flex items-center justify-between">
              <p className="eyebrow">{atelier.panel}</p>
              <button type="button" onClick={atelier.closePanel} className="text-xs tracking-[0.22em] uppercase">
                Close
              </button>
            </div>
            {atelier.panel === "search" ? <SearchPanel onNavigate={atelier.closePanel} /> : null}
            {atelier.panel === "account" ? <AccountPanel /> : null}
            {atelier.panel === "bag" ? <BagPanel /> : null}
          </motion.aside>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function SearchPanel({ onNavigate }: { onNavigate: () => void }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return watches;
    return watches.filter((watch) =>
      `${watch.name} ${watch.sku} ${watch.collection} ${watch.type}`.toLowerCase().includes(needle),
    );
  }, [query]);

  return (
    <div>
      <label htmlFor="search-watches" className="sr-only">
        Search watches
      </label>
      <input
        id="search-watches"
        autoFocus
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search the collection"
        className="w-full border-b border-line bg-transparent py-3 text-lg outline-none placeholder:text-muted"
      />
      <ul className="mt-8 space-y-5">
        {results.map((watch) => (
          <li key={watch.id}>
            <Link href={`/product/${watch.slug}`} onClick={onNavigate} className="group block">
              <span className="block text-xs tracking-[0.22em] text-muted uppercase">{watch.sku}</span>
              <span className="mt-1 block font-serif text-3xl transition-transform duration-500 group-hover:translate-x-1">
                {watch.name}
              </span>
            </Link>
          </li>
        ))}
        {results.length === 0 ? <li className="text-sm text-muted">Nothing matches that search.</li> : null}
      </ul>
    </div>
  );
}

function AccountPanel() {
  return (
    <div className="flex h-full flex-col">
      <h2 className="font-serif text-5xl leading-none">The clientele atelier</h2>
      <p className="mt-6 max-w-sm text-sm leading-7 text-muted">
        Pieces are discussed personally. Leave a note with the atelier and a specialist will reply with availability.
      </p>
      <Link href="/contact" className="gold-link mt-10">
        Write to the atelier <span aria-hidden>→</span>
      </Link>
    </div>
  );
}

function BagPanel() {
  const { bag, setQuantity, removeFromBag, closePanel } = useAtelier();
  const lines = bag
    .map((line) => {
      const watch = getWatch(line.slug);
      return watch ? { ...line, watch } : null;
    })
    .filter((line): line is NonNullable<typeof line> => Boolean(line));
  const total = lines.reduce((sum, line) => sum + line.watch.price * line.quantity, 0);

  if (lines.length === 0) {
    return <p className="text-sm leading-7 text-muted">Your bag is empty. The collection is waiting.</p>;
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <ul className="min-h-0 flex-1 space-y-6 overflow-auto">
        {lines.map((line) => (
          <li key={line.slug} className="border-b border-line pb-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-serif text-2xl">{line.watch.name}</p>
                <p className="mt-1 text-xs tracking-[0.18em] text-muted uppercase">{formatPrice(line.watch.price)}</p>
              </div>
              <button type="button" className="text-xs tracking-[0.16em] text-muted uppercase" onClick={() => removeFromBag(line.slug)}>
                Remove
              </button>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(line.slug, line.quantity - 1)}>
                −
              </button>
              <span>{line.quantity}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(line.slug, line.quantity + 1)}>
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="pt-6">
        <p className="flex justify-between text-xs tracking-[0.18em] uppercase">
          <span className="text-muted">Total</span>
          <span>{formatPrice(total)}</span>
        </p>
        <Link href="/contact?intent=allocation" onClick={closePanel} className="gold-link mt-6">
          Request allocation <span aria-hidden>→</span>
        </Link>
      </div>
    </div>
  );
}
