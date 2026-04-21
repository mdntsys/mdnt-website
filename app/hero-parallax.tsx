"use client";

import { useEffect } from "react";

export function HeroParallax() {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const hero = document.querySelector<HTMLElement>("#hero");
    if (!hero) return;

    let rafId: number | null = null;
    let latestX = 0;
    let latestY = 0;
    let latestRect: DOMRect | null = null;

    const apply = () => {
      rafId = null;
      if (!latestRect) return;
      const x = latestX - latestRect.left;
      const y = latestY - latestRect.top;
      const nx = (x / latestRect.width) * 2 - 1;
      const ny = (y / latestRect.height) * 2 - 1;
      hero.style.setProperty("--hero-mx", `${x}px`);
      hero.style.setProperty("--hero-my", `${y}px`);
      hero.style.setProperty("--hero-tx", nx.toFixed(4));
      hero.style.setProperty("--hero-ty", ny.toFixed(4));
      hero.style.setProperty("--hero-active", "1");
    };

    const onMove = (e: PointerEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      latestRect = hero.getBoundingClientRect();
      if (rafId === null) rafId = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      hero.style.setProperty("--hero-tx", "0");
      hero.style.setProperty("--hero-ty", "0");
      hero.style.setProperty("--hero-active", "0");
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);

    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
