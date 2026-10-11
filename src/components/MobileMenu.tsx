"use client";

import { getLenis } from "@/hooks/useLenis";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

const links = [
  { href: "/watches", label: "Watches" },
  { href: "/collections", label: "Collections" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/journal", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-40 bg-bg"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        >
          <nav className="flex h-full flex-col justify-end px-6 pb-16 pt-28" aria-label="Mobile">
            <ul className="space-y-2">
              {links.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + index * 0.05, duration: 0.45 }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="block font-serif text-5xl leading-none tracking-[-0.03em] text-ink"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <p className="mt-12 text-xs tracking-[0.28em] text-muted uppercase">Time, crafted differently.</p>
          </nav>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
