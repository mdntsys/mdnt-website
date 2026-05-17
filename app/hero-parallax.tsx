"use client";

import { useEffect } from "react";

const PARALLAX_FACTOR = 0.35;

export function HeroParallax() {
  useEffect(() => {
    const grid = document.querySelector<HTMLElement>(".hero-grid");
    const hero = document.querySelector<HTMLElement>("#hero");
    if (!grid || !hero) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let raf = 0;
    let lastScroll = -1;

    const update = () => {
      raf = 0;
      const scrollY = window.scrollY;
      if (scrollY === lastScroll) return;
      lastScroll = scrollY;

      const heroBottom = hero.offsetTop + hero.offsetHeight;
      if (scrollY > heroBottom) return;

      const offset = scrollY * PARALLAX_FACTOR;
      grid.style.setProperty("--grid-offset", `${offset}px`);
    };

    const onScroll = () => {
      if (raf !== 0) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf !== 0) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
