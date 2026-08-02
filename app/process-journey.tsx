"use client";

import { useEffect, useRef, useState } from "react";

type Step = {
  num: string;
  title: string;
  body: string;
  side: "left" | "right";
};

const STEPS: Step[] = [
  {
    num: "01",
    title: "Roadmap",
    body: "We map your operation, identify where AI genuinely fits, and recommend the right approach for each opportunity, including SaaS we don't sell.",
    side: "left",
  },
  {
    num: "02",
    title: "Recommend",
    body: "You get a written plan: prioritized opportunities, build-vs-buy guidance, sequencing, and budget framing. Yours to act on however you choose.",
    side: "right",
  },
  {
    num: "03",
    title: "Implement",
    body: "For the custom pieces, MDNT builds and deploys as a managed service. For the SaaS pieces, we help you procure and integrate. You always own the outcome.",
    side: "left",
  },
];

// Path is in a 0–100 viewBox, preserveAspectRatio="none"
const DESKTOP_PATH =
  "M 8 8 C 8 32, 92 22, 92 50 C 92 78, 8 68, 8 92";
const DESKTOP_NODES = [
  { x: 8, y: 8 },
  { x: 92, y: 50 },
  { x: 8, y: 92 },
];

const MOBILE_PATH = "M 6 4 L 6 96";
const MOBILE_NODES = [
  { x: 6, y: 4 },
  { x: 6, y: 50 },
  { x: 6, y: 96 },
];

// Where on the path (as a 0–1 fraction) each step's node sits.
// For both desktop S-curve and mobile straight line, the three nodes are
// effectively at the start, midpoint, and end.
const STEP_THRESHOLDS = [0.04, 0.5, 0.96];

// DOMPoint is a live object with more on it than we store. Narrowing to
// plain data keeps the state serializable and comparable.
const pointOf = (p: DOMPoint): { x: number; y: number } => ({ x: p.x, y: p.y });

export function ProcessJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopPathRef = useRef<SVGPathElement>(null);
  const mobilePathRef = useRef<SVGPathElement>(null);

  const [progress, setProgress] = useState(0);
  const [desktopLength, setDesktopLength] = useState(1000);
  const [mobileLength, setMobileLength] = useState(100);
  // The leading dot's position on each path. Held in state rather than
  // derived at render time because computing it needs getPointAtLength on
  // the path element, and reading a ref during render is not safe: refs are
  // not populated on the first render or during server rendering, so the
  // output would differ between passes.
  const [dots, setDots] = useState<{
    desktop: { x: number; y: number } | null;
    mobile: { x: number; y: number } | null;
  }>({ desktop: null, mobile: null });

  useEffect(() => {
    if (desktopPathRef.current) {
      setDesktopLength(desktopPathRef.current.getTotalLength());
    }
    if (mobilePathRef.current) {
      setMobileLength(mobilePathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      // Deferred a frame rather than set synchronously, for the same
      // cascading-render reason as the counters in trust-band.tsx.
      const snap = requestAnimationFrame(() => {
        setProgress(1);
      });
      return () => {
        cancelAnimationFrame(snap);
      };
    }

    let raf = 0;

    // Map progress 0 → 1 to "section center moves from viewport bottom
    // to viewport top". Progress = 0.5 exactly when the section is
    // centered in the viewport, so the animation is at its midpoint
    // when the user is reading it head-on.
    const update = () => {
      raf = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const raw = (vh - sectionCenter) / vh;
      const next = Math.max(0, Math.min(1, raw));
      setProgress(next);

      // Inside a rAF callback, not during render, so the refs are safe to
      // read here. Length comes straight off the element rather than from
      // state, which keeps the dot correct even before the length effect
      // has run.
      const dp = desktopPathRef.current;
      const mp = mobilePathRef.current;
      setDots({
        desktop: dp
          ? pointOf(dp.getPointAtLength(next * dp.getTotalLength()))
          : null,
        mobile: mp
          ? pointOf(mp.getPointAtLength(next * mp.getTotalLength()))
          : null,
      });
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

  const desktopDot = dots.desktop;
  const mobileDot = dots.mobile;

  const reached = STEP_THRESHOLDS.map((threshold) => progress >= threshold);
  const dotVisible = progress > 0.005 && progress < 0.995;

  return (
    <section id="process" ref={sectionRef}>
      <div className="section-inner">
        <div className="solutions-header reveal">
          <span className="section-eyebrow">Our process</span>
          <h2 className="solutions-h2">
            Strategic clarity first,
            <br />
            <em>then</em> execution.
          </h2>
          <p className="section-lead">
            Without forcing you into a generic tool or a six-figure
            build.
          </p>
        </div>

        {/* Desktop journey */}
        <div className="journey-desktop" aria-hidden="false">
          <svg
            className="journey-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter
                id="journey-glow"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="1.4" />
              </filter>
            </defs>

            <path
              ref={desktopPathRef}
              d={DESKTOP_PATH}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.25"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={DESKTOP_PATH}
              fill="none"
              stroke="rgba(245, 168, 0, 0.6)"
              strokeWidth="0.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray={desktopLength}
              strokeDashoffset={(1 - progress) * desktopLength}
              style={{ transition: "none" }}
            />

            {DESKTOP_NODES.map((node, i) => (
              <g key={i}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="1.6"
                  fill="rgba(245, 168, 0, 0.12)"
                  className="journey-node-halo"
                  data-reached={reached[i] ? "true" : "false"}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="0.7"
                  fill={
                    reached[i] ? "#F5A800" : "rgba(255, 255, 255, 0.3)"
                  }
                  className="journey-node-dot"
                  data-reached={reached[i] ? "true" : "false"}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}

            {desktopDot && dotVisible && (
              <g>
                <circle
                  cx={desktopDot.x}
                  cy={desktopDot.y}
                  r="2.4"
                  fill="rgba(245, 168, 0, 0.35)"
                  filter="url(#journey-glow)"
                />
                <circle
                  cx={desktopDot.x}
                  cy={desktopDot.y}
                  r="0.9"
                  fill="#F5A800"
                />
              </g>
            )}
          </svg>

          <div className="journey-grid">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className={`journey-step journey-step--${step.side}`}
                data-reached={reached[i] ? "true" : "false"}
              >
                <span className="journey-num">{step.num}</span>
                <h3 className="journey-title">{step.title}</h3>
                <p className="journey-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile journey */}
        <div className="journey-mobile" aria-hidden="false">
          <svg
            className="journey-svg journey-svg--mobile"
            viewBox="0 0 12 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <filter
                id="journey-glow-m"
                x="-100%"
                y="-100%"
                width="300%"
                height="300%"
              >
                <feGaussianBlur stdDeviation="1.2" />
              </filter>
            </defs>

            <path
              ref={mobilePathRef}
              d={MOBILE_PATH}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="0.4"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={MOBILE_PATH}
              fill="none"
              stroke="rgba(245, 168, 0, 0.6)"
              strokeWidth="0.6"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray={mobileLength}
              strokeDashoffset={(1 - progress) * mobileLength}
              style={{ transition: "none" }}
            />

            {MOBILE_NODES.map((node, i) => (
              <g key={i}>
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="2.2"
                  fill="rgba(245, 168, 0, 0.12)"
                  className="journey-node-halo"
                  data-reached={reached[i] ? "true" : "false"}
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="0.9"
                  fill={
                    reached[i] ? "#F5A800" : "rgba(255, 255, 255, 0.3)"
                  }
                  className="journey-node-dot"
                  data-reached={reached[i] ? "true" : "false"}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            ))}

            {mobileDot && dotVisible && (
              <g>
                <circle
                  cx={mobileDot.x}
                  cy={mobileDot.y}
                  r="2.6"
                  fill="rgba(245, 168, 0, 0.35)"
                  filter="url(#journey-glow-m)"
                />
                <circle
                  cx={mobileDot.x}
                  cy={mobileDot.y}
                  r="1.1"
                  fill="#F5A800"
                />
              </g>
            )}
          </svg>

          <div className="journey-stack">
            {STEPS.map((step, i) => (
              <div
                key={i}
                className="journey-step journey-step--mobile"
                data-reached={reached[i] ? "true" : "false"}
              >
                <span className="journey-num">{step.num}</span>
                <h3 className="journey-title">{step.title}</h3>
                <p className="journey-body">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
