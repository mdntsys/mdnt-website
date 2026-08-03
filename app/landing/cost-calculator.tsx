"use client";

import { useMemo, useState } from "react";

// The whole point of this arm: give the visitor their number before asking for
// anything. Two inputs, one figure, no email.
//
// The objection to this is that it gives away the answer and removes the
// reason to opt in. That gets it backwards. The number is what makes the
// problem real, and a reader looking at a five figure annual total has a
// reason to want the worksheet that finds the other tasks like it. A page that
// withholds the number is just asking a stranger to take an argument on faith.

const WEEKS_PER_YEAR = 52;

// Defaults are a starting point that is already plausible for the audience,
// so the figure is populated on arrival rather than showing a zero. A page
// that opens at $0 teaches the reader the tool is broken.
const DEFAULT_HOURS = 12;
const DEFAULT_RATE = 38;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const money = (value: number): string =>
  value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export function CostCalculator() {
  const [hours, setHours] = useState(DEFAULT_HOURS);
  const [rate, setRate] = useState(DEFAULT_RATE);

  const annual = useMemo(() => hours * WEEKS_PER_YEAR * rate, [hours, rate]);

  return (
    <div className="lp-calc">
      <div className="lp-calc-row">
        <label className="lp-calc-field">
          <span className="lp-calc-label">
            Hours a week your team spends on repeating tasks
          </span>
          <input
            className="lp-calc-input"
            type="number"
            inputMode="numeric"
            min={1}
            max={400}
            value={hours}
            onChange={(event) => {
              setHours(clamp(Number(event.target.value) || 0, 0, 400));
            }}
          />
        </label>

        <label className="lp-calc-field">
          <span className="lp-calc-label">
            Fully loaded cost of an hour of that time
          </span>
          <input
            className="lp-calc-input"
            type="number"
            inputMode="numeric"
            min={1}
            max={500}
            value={rate}
            onChange={(event) => {
              setRate(clamp(Number(event.target.value) || 0, 0, 500));
            }}
          />
        </label>
      </div>

      <div className="lp-calc-out">
        <span className="lp-calc-out-label">That work costs you</span>
        <span className="lp-calc-out-num">{money(annual)}</span>
        <span className="lp-calc-out-unit">a year, every year</span>
      </div>

      <p className="lp-calc-note">
        Fully loaded means salary plus tax, benefits and overhead, usually
        around 1.3 times the hourly wage. And this is one task. Most operations
        have six or seven.
      </p>
    </div>
  );
}
