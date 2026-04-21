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
      .querySelectorAll(".reveal, .reveal-left, .reveal-right")
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

    const journey = document.querySelector<HTMLElement>(".journey");
    if (journey) {
      const branches = Array.from(
        journey.querySelectorAll<HTMLElement>(".journey-branch"),
      );

      let journeyRaf: number | null = null;

      const updateJourney = () => {
        journeyRaf = null;
        const rect = journey.getBoundingClientRect();
        const vh = window.innerHeight;
        const s = -rect.top;
        const progress = Math.max(
          0,
          Math.min(1, (s + vh * 0.85) / rect.height),
        );

        journey.style.setProperty("--trunk-progress", progress.toString());

        branches.forEach((branch) => {
          const node = branch.querySelector<HTMLElement>(".branch-node");
          if (!node) return;
          const nodeRect = node.getBoundingClientRect();
          const nodeMid = nodeRect.top + nodeRect.height / 2;

          const active = nodeMid < vh * 0.75 && nodeMid > -nodeRect.height;
          branch.dataset.active = active ? "true" : "false";

          const servicesVisible = nodeMid < vh * 0.6;
          branch.dataset.servicesVisible = servicesVisible
            ? "true"
            : "false";
        });
      };

      const onJourneyScroll = () => {
        if (journeyRaf !== null) return;
        journeyRaf = requestAnimationFrame(updateJourney);
      };

      window.addEventListener("scroll", onJourneyScroll, { passive: true });
      window.addEventListener("resize", onJourneyScroll, { passive: true });
      const journeyInit = window.setTimeout(updateJourney, 50);

      cleanups.push(() => {
        window.removeEventListener("scroll", onJourneyScroll);
        window.removeEventListener("resize", onJourneyScroll);
        window.clearTimeout(journeyInit);
        if (journeyRaf !== null) cancelAnimationFrame(journeyRaf);
      });
    }

    return () => {
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
