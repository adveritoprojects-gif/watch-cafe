"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const links = [
  { href: "/watches", label: "Watches" },
  { href: "/collections", label: "Collections" },
  { href: "/craftsmanship", label: "Craftsmanship" },
  { href: "/journal", label: "Journal" },
  { href: "/craftsmanship", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/contact#faq", label: "FAQ" },
];

export function Footer() {
  const [joined, setJoined] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") ?? "");
    if (!email.includes("@")) return;
    setJoined(true);
  };

  return (
    <footer className="border-t border-line px-5 py-16 md:px-10 lg:px-16">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-sm tracking-[0.42em]">AURELIS</p>
          <p className="mt-6 max-w-xs text-sm leading-7 text-muted">Time, crafted differently.</p>
        </div>
        <nav className="grid grid-cols-2 gap-x-8 gap-y-3 lg:col-span-4" aria-label="Footer">
          {links.map((link) => (
            <Link key={link.label} href={link.href} className="nav-link w-fit">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="lg:col-span-4">
          <p className="eyebrow">Join our journal</p>
          {joined ? (
            <p className="mt-6 text-sm text-muted">You are on the list. The next note will arrive quietly.</p>
          ) : (
            <form onSubmit={submit} className="mt-6 flex border-b border-line">
              <label htmlFor="journal-email" className="sr-only">
                Email address
              </label>
              <input
                id="journal-email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted"
              />
              <button type="submit" className="px-2 text-lg" aria-label="Subscribe">
                →
              </button>
            </form>
          )}
          <div className="mt-8 flex gap-6 text-xs tracking-[0.2em] uppercase">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              YouTube
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer">
              Pinterest
            </a>
          </div>
        </div>
      </div>
      <p className="mt-16 text-xs tracking-[0.16em] text-muted uppercase">© 2026 AURELIS. All rights reserved.</p>
    </footer>
  );
}
