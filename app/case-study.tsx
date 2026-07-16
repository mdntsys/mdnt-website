"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BEFORE_MONTHLY = 22500;
const AFTER_MONTHLY = 10000;
const SAVED_MONTHLY = BEFORE_MONTHLY - AFTER_MONTHLY;
const SAVED_ANNUAL = SAVED_MONTHLY * 12;
const REDUCTION_PCT = Math.round(
  ((BEFORE_MONTHLY - AFTER_MONTHLY) / BEFORE_MONTHLY) * 100,
);
const AFTER_WIDTH_PCT = (AFTER_MONTHLY / BEFORE_MONTHLY) * 100;
const TASKS_REPLACED = 16;
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

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
      { threshold: 0.2 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return [ref, inView] as const;
}

function useCounter(
  target: number,
  start: boolean,
  duration = 1600,
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
    const startTimer = window.setTimeout(() => {
      const tick = (now: number) => {
        if (!t0) t0 = now;
        const t = Math.min(1, (now - t0) / duration);
        setValue(target * easeOutCubic(t));
        if (t < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      window.clearTimeout(startTimer);
      cancelAnimationFrame(raf);
    };
  }, [target, start, duration, delay]);

  return value;
}

const fmt = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;

export function CaseStudy() {
  const [graphRef, inView] = useInView<HTMLDivElement>();
  const beforeValue = useCounter(BEFORE_MONTHLY, inView, 1500, 250);
  const afterValue = useCounter(AFTER_MONTHLY, inView, 1500, 950);
  const savedValue = useCounter(SAVED_MONTHLY, inView, 1300, 1600);
  const annualValue = useCounter(SAVED_ANNUAL, inView, 1600, 1800);
  const reductionValue = useCounter(REDUCTION_PCT, inView, 1100, 1500);

  return (
    <section id="reputation">
      <div className="section-inner">
        <div className="case-row">
          <div
            ref={graphRef}
            className="case-graph reveal"
            style={
              {
                "--after-width": `${AFTER_WIDTH_PCT}%`,
              } as React.CSSProperties
            }
          >
            <div className="case-graph-head">
              <div className="case-graph-head-row">
                <span className="case-graph-eyebrow">Case study</span>
                <span
                  className="case-graph-delta"
                  data-start={inView ? "true" : "false"}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 1v7M2 5l3 3 3-3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="case-graph-delta-num">
                    {Math.round(reductionValue)}%
                  </span>
                </span>
              </div>
              <div className="case-graph-head-row">
                <span className="case-graph-title">
                  Monthly operating overhead
                </span>
                <a
                  href="https://dsitransportation.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="case-client"
                  aria-label="Visit DSI Transportation"
                >
                  <Image
                    src="/dsi-logo.png"
                    alt="DSI Transportation"
                    width={500}
                    height={300}
                    className="case-client-logo"
                  />
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3 8l5-5M4 3h4v4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="case-bars">
              <div
                className="case-bar case-bar--before"
                data-start={inView ? "true" : "false"}
              >
                <div className="case-bar-top">
                  <span className="case-bar-label">Before Midnite</span>
                  <span className="case-bar-value">
                    {fmt(beforeValue)}
                    <span className="case-bar-unit">/mo</span>
                  </span>
                </div>
                <div className="case-bar-track">
                  <div className="case-bar-fill case-bar-fill--red" />
                </div>
              </div>

              <div
                className="case-bar case-bar--after"
                data-start={inView ? "true" : "false"}
              >
                <div className="case-bar-top">
                  <span className="case-bar-label">With Midnite</span>
                  <span className="case-bar-value">
                    {fmt(afterValue)}
                    <span className="case-bar-unit">/mo</span>
                  </span>
                </div>
                <div className="case-bar-track">
                  <div className="case-bar-fill case-bar-fill--gold" />
                  <div className="case-bar-saved">
                    <span className="case-bar-saved-label">
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M4.5 8V1M1.5 4l3-3 3 3"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Saved {fmt(savedValue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="case-foot">
              <div className="case-foot-stat">
                <span className="case-foot-label">Annualized savings</span>
                <span className="case-foot-value">{fmt(annualValue)}</span>
              </div>
              <div className="case-foot-divider" aria-hidden="true" />
              <div className="case-foot-stat case-foot-stat--coverage">
                <span className="case-foot-label">
                  {TASKS_REPLACED} tasks · 7 days/week
                </span>
                <div className="case-coverage-strip" aria-hidden="true">
                  {DAYS.map((d, i) => (
                    <span
                      key={i}
                      className="case-day"
                      data-start={inView ? "true" : "false"}
                      style={
                        {
                          "--delay": `${1700 + i * 80}ms`,
                        } as React.CSSProperties
                      }
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="case-copy reveal reveal-delay-1">
            <span className="section-eyebrow">Case study</span>
            <h2 className="case-h2">
              $22.5k a month,
              <br />
              <em>cut to $10k.</em>
            </h2>
            <p className="case-lead">
              <a
                href="https://dsitransportation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="case-copy-link"
              >
                DSI Transportation
              </a>{" "}
              was burning $22,500 a month on recurring overhead across
              their operation. We came in, deployed AI employees across
              sixteen recurring tasks, and brought the operating bill to
              $10,000. Same output. Seven days a week.
            </p>
            <p className="case-lead">
              Midnite runs the AI employees inside DSI&apos;s operation.
              They don&apos;t take days off, don&apos;t need onboarding,
              and stay sharp on the monitoring and retraining we handle
              for them.
            </p>
            <Link
              href="/case-studies/dsi-transportation"
              className="btn-ghost card-cta"
            >
              Read the full case study
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
