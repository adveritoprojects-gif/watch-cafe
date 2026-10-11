"use client";

import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Overlays } from "@/components/Overlays";
import { AtelierProvider } from "@/context/Atelier";
import { useLenis } from "@/hooks/useLenis";
import type { ReactNode } from "react";

function Shell({ children }: { children: ReactNode }) {
  useLenis();
  return (
    <>
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-80 focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Navigation />
      <main id="content">{children}</main>
      <Footer />
      <Overlays />
      <CustomCursor />
    </>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AtelierProvider>
      <Shell>{children}</Shell>
    </AtelierProvider>
  );
}
