"use client";

import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          setInView(e.isIntersecting);
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return [ref, inView] as const;
}

function useCounter(
  target: number,
  start: boolean,
  duration = 1400,
  delay = 0,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) {
      setValue(0);
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      setValue(target);
      return;
    }
    let raf = 0;
    let t0 = 0;
    const timer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!t0) t0 = now;
        const t = Math.min(1, (now - t0) / duration);
        setValue(target * easeOutCubic(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [target, start, duration, delay]);

  return value;
}

export function TrustBand() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const orgs = useCounter(50, inView, 2000, 0);
  const hours = useCounter(2000, inView, 2000, 0);
  const dollars = useCounter(1, inView, 2000, 0);

  return (
    <div ref={ref} className="trust-band">
      <div className="trust-cell">
        <div className="trust-value">
          {Math.round(orgs)}
          <span className="trust-plus">+</span>
        </div>
        <div className="trust-label">Organizations served</div>
      </div>

      <div className="trust-divider" aria-hidden="true" />

      <div className="trust-cell">
        <div className="trust-value">
          {Math.round(hours).toLocaleString("en-US")}
          <span className="trust-plus">+</span>
        </div>
        <div className="trust-label">Hours reclaimed weekly</div>
      </div>

      <div className="trust-divider" aria-hidden="true" />

      <div className="trust-cell">
        <div className="trust-value">
          ${dollars.toFixed(dollars >= 0.95 ? 0 : 1)}M
          <span className="trust-plus">+</span>
        </div>
        <div className="trust-label">In client overhead saved</div>
      </div>
    </div>
  );
}
