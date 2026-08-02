"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

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
  duration = 2000,
  delay = 0,
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Both early exits defer by a frame instead of setting state
    // synchronously. A sync setState in an effect body triggers a
    // cascading render; the value here is display-only, so a single
    // frame of delay is imperceptible and the render stays clean.
    if (!start) {
      const reset = requestAnimationFrame(() => {
        setValue(0);
      });
      return () => {
        cancelAnimationFrame(reset);
      };
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) {
      const snap = requestAnimationFrame(() => {
        setValue(target);
      });
      return () => {
        cancelAnimationFrame(snap);
      };
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

type BadgeShape = "hexagon" | "shield" | "arch";

// All three badges share the shield silhouette so the set reads as a
// coordinated credential trio.
const SHIELD_PATH =
  "M 10 8 H 140 V 132 C 140 152, 112 170, 75 176 C 38 170, 10 152, 10 132 Z";

const SHAPES: Record<BadgeShape, string> = {
  hexagon: SHIELD_PATH,
  shield: SHIELD_PATH,
  arch: SHIELD_PATH,
};

const ICON_ORGS = (
  <g
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinejoin="round"
    fill="none"
  >
    <rect x="1" y="11" width="5.5" height="11" rx="0.5" />
    <rect x="9.25" y="5.5" width="5.5" height="16.5" rx="0.5" />
    <rect x="17.5" y="13" width="5.5" height="9" rx="0.5" />
  </g>
);

const ICON_CLOCK = (
  <g
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    fill="none"
  >
    <circle cx="12" cy="12" r="9.5" />
    <path d="M 12 7 V 12 L 15.5 14.5" />
  </g>
);

const ICON_DOLLAR = (
  <g
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
  >
    <circle cx="12" cy="12" r="9.5" />
    <path d="M 12 6.5 V 17.5 M 15.25 9.25 H 10.75 A 1.75 1.75 0 0 0 10.75 12.75 H 13.25 A 1.75 1.75 0 0 1 13.25 16.25 H 9" />
  </g>
);

function StatBadge({
  shape,
  icon,
  value,
  suffix,
  label,
  ariaLabel,
}: {
  shape: BadgeShape;
  icon: ReactNode;
  value: string;
  suffix?: string;
  label: string;
  ariaLabel: string;
}) {
  const fillId = `bf-${shape}`;
  const ribbonId = `rf-${shape}`;
  const clipId = `cp-${shape}`;
  const innerGlowId = `ig-${shape}`;

  const path = SHAPES[shape];

  return (
    <div className="trust-badge" role="img" aria-label={ariaLabel}>
      <svg viewBox="0 0 150 184" aria-hidden="true">
        <defs>
          <linearGradient id={fillId} x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="#181c2d" />
            <stop offset="55%" stopColor="#0f1220" />
            <stop offset="100%" stopColor="#0a0c16" />
          </linearGradient>
          <radialGradient id={innerGlowId} cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="rgba(245, 168, 0, 0.08)" />
            <stop offset="100%" stopColor="rgba(245, 168, 0, 0)" />
          </radialGradient>
          <linearGradient id={ribbonId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F8B71F" />
            <stop offset="50%" stopColor="#F0A300" />
            <stop offset="100%" stopColor="#C88800" />
          </linearGradient>
          <clipPath id={clipId}>
            <path d={path} />
          </clipPath>
        </defs>

        {/* Filled silhouette */}
        <path d={path} fill={`url(#${fillId})`} />

        {/* Inner radial glow for depth */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="0" y="0" width="150" height="184" fill={`url(#${innerGlowId})`} />
        </g>

        {/* Hairline interior border for double-frame depth */}
        <path
          d={path}
          fill="none"
          stroke="rgba(255, 255, 255, 0.045)"
          strokeWidth="0.6"
          transform="translate(0, 0.6) scale(0.97)"
          transform-origin="75 92"
        />

        {/* Ribbon, clipped to silhouette so it hugs the shape */}
        <g clipPath={`url(#${clipId})`}>
          <rect x="0" y="118" width="150" height="26" fill={`url(#${ribbonId})`} />
          {/* Top edge sheen */}
          <rect x="0" y="118" width="150" height="1.5" fill="rgba(255, 240, 200, 0.55)" />
          {/* Bottom edge shadow */}
          <rect x="0" y="142" width="150" height="2" fill="rgba(60, 35, 0, 0.55)" />
        </g>

        {/* Outer gold border */}
        <path
          d={path}
          fill="none"
          stroke="rgba(245, 168, 0, 0.6)"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        {/* Decorative diamond accents flanking the icon */}
        <path
          d="M 28 36 L 31 33 L 34 36 L 31 39 Z"
          fill="rgba(245, 168, 0, 0.55)"
        />
        <path
          d="M 116 36 L 119 33 L 122 36 L 119 39 Z"
          fill="rgba(245, 168, 0, 0.55)"
        />

        {/* Icon */}
        <g
          transform="translate(63, 24)"
          style={{ color: "rgba(245, 168, 0, 0.95)" }}
        >
          {icon}
        </g>

        {/* Hairline separator above the number */}
        <line
          x1="50"
          y1="68"
          x2="100"
          y2="68"
          stroke="rgba(245, 168, 0, 0.22)"
          strokeWidth="0.7"
        />

        {/* Big number */}
        <text
          x="75"
          y="100"
          textAnchor="middle"
          className="trust-value-text"
        >
          {value}
          {suffix && (
            <tspan className="trust-plus-text" dx="3" dy="-5">
              {suffix}
            </tspan>
          )}
        </text>

        {/* Ribbon label */}
        <text
          x="75"
          y="135"
          textAnchor="middle"
          className="trust-ribbon-label"
        >
          {label}
        </text>
      </svg>
    </div>
  );
}

export function TrustBand() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const orgs = useCounter(50, inView, 2000, 0);
  const hours = useCounter(2000, inView, 2000, 0);
  const dollars = useCounter(1, inView, 2000, 0);

  const dollarsDisplay = `$${dollars.toFixed(dollars >= 0.95 ? 0 : 1)}M`;

  return (
    <div ref={ref} className="trust-band">
      <StatBadge
        shape="hexagon"
        icon={ICON_ORGS}
        value={`${Math.round(orgs)}`}
        suffix="+"
        label="ORGS SERVED"
        ariaLabel="50+ organizations served"
      />
      <StatBadge
        shape="shield"
        icon={ICON_CLOCK}
        value={Math.round(hours).toLocaleString("en-US")}
        suffix="+"
        label="HOURS RECLAIMED"
        ariaLabel="2,000+ hours reclaimed weekly"
      />
      <StatBadge
        shape="arch"
        icon={ICON_DOLLAR}
        value={dollarsDisplay}
        suffix="+"
        label="OVERHEAD SAVED"
        ariaLabel="$1M+ in client overhead saved"
      />
    </div>
  );
}
