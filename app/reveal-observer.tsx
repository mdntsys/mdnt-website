"use client";

import { useEffect } from "react";

export function RevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    document
      .querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    const cards = document.querySelectorAll<HTMLElement>(".bezel-outer");
    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const onMove = (e: PointerEvent) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
        card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
      };
      card.addEventListener("pointermove", onMove);
      cleanups.push(() => card.removeEventListener("pointermove", onMove));
    });

    return () => {
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
