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
      const trunk = journey.querySelector<SVGPathElement>(".journey-trunk");
      const splitLeft = journey.querySelector<SVGPathElement>(
        ".journey-split-left",
      );
      const splitRight = journey.querySelector<SVGPathElement>(
        ".journey-split-right",
      );

      if (trunk) {
        journey.style.setProperty(
          "--trunk-length",
          trunk.getTotalLength().toString(),
        );
      }
      const branchLen = Math.max(
        splitLeft?.getTotalLength() ?? 0,
        splitRight?.getTotalLength() ?? 0,
      );
      journey.style.setProperty("--branch-length", branchLen.toString());

      let journeyRaf: number | null = null;

      const updateJourney = () => {
        journeyRaf = null;
        const rect = journey.getBoundingClientRect();
        const vh = window.innerHeight;
        const s = -rect.top;
        const progress = Math.max(
          0,
          Math.min(1, (s + vh / 2) / rect.height),
        );

        const trunkProgress = Math.max(0, Math.min(1, progress / 0.2));
        const branchProgress = Math.max(
          0,
          Math.min(1, (progress - 0.2) / 0.2),
        );
        journey.style.setProperty(
          "--trunk-progress",
          trunkProgress.toString(),
        );
        journey.style.setProperty(
          "--branch-progress",
          branchProgress.toString(),
        );

        branches.forEach((branch) => {
          const node = branch.querySelector<HTMLElement>(".branch-node");
          if (!node) return;
          const nodeRect = node.getBoundingClientRect();
          const nodeMid = nodeRect.top + nodeRect.height / 2;

          const active = nodeMid < vh * 0.7 && nodeMid > -nodeRect.height;
          branch.dataset.active = active ? "true" : "false";

          const servicesVisible = nodeMid < vh * 0.55;
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

    const heroLines = document.querySelectorAll<HTMLElement>(
      ".hero-h1 .type-line",
    );
    heroLines.forEach((line) => {
      const onEnd = () => {
        line.style.clipPath = "none";
      };
      line.addEventListener("animationend", onEnd, { once: true });
      cleanups.push(() => line.removeEventListener("animationend", onEnd));
    });

    return () => {
      observer.disconnect();
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return null;
}
