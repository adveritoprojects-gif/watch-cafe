"use client";

import { MobileMenu } from "@/components/MobileMenu";
import { useAtelier } from "@/context/Atelier";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/watches", label: "Watches" },
  { href: "/collections", label: "Collections" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/journal", label: "Journal" },
];

export function Navigation() {
  const pathname = usePathname();
  const { bagCount, openPanel } = useAtelier();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || menuOpen ? "border-b border-line bg-bg/80 backdrop-blur-md" : "bg-transparent",
      )}
    >
      <div className="flex h-18 items-center justify-between px-5 md:px-10" style={{ height: "4.5rem" }}>
        <Link href="/" className="relative z-50 text-sm tracking-[0.42em] text-ink" aria-label="AURELIS home">
          AURELIS
        </Link>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-8 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link key={link.href} href={link.href} data-active={pathname.startsWith(link.href)} className="nav-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="relative z-50 flex items-center gap-5">
          <button type="button" className="nav-link hidden sm:inline" onClick={() => openPanel("search")}>
            Search
          </button>
          <button type="button" className="nav-link hidden sm:inline" onClick={() => openPanel("account")}>
            Account
          </button>
          <button type="button" className="nav-link" onClick={() => openPanel("bag")} aria-label="Open bag">
            Bag{mounted && bagCount > 0 ? ` ${bagCount}` : ""}
          </button>
          <button
            type="button"
            className="relative z-50 h-10 w-10 lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="absolute left-2 right-2 top-[15px] h-px bg-ink" />
            <span className={cn("absolute left-2 right-2 top-[23px] h-px bg-ink transition-opacity", menuOpen && "opacity-0")} />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
