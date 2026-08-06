import { describe, expect, it } from "vitest";
import { createDwellClock, MAX_FRAME_GAP_MS } from "./dwell";

// Frame timestamps are driven directly here rather than through a real
// browser, because the failure this guards against is arithmetic, not
// rendering: both previous versions of this measurement returned a confident
// zero, and a confident zero classifies every reader as a bounce.

const runFrames = (
  clock: ReturnType<typeof createDwellClock>,
  start: number,
  count: number,
  step = 16,
): number => {
  let t = start;
  for (let i = 0; i < count; i++) {
    t += step;
    clock.tick(t);
  }
  return t;
};

describe("createDwellClock", () => {
  it("starts at zero", () => {
    expect(createDwellClock(0).read()).toBe(0);
  });

  // The core property: while frames flow, dwell tracks real time. One second
  // of 60fps rendering is one second of attention.
  it("accumulates real time while frames flow", () => {
    const clock = createDwellClock(0);
    runFrames(clock, 0, 60);
    expect(clock.read()).toBe(960);
  });

  // The regression that motivated the file. A page opened in a background tab
  // mounts hidden, so no frames run until the reader looks at it. Both earlier
  // implementations were stuck at zero from that point on; this one simply
  // starts counting when the frames start.
  it("counts nothing until frames start, then counts normally", () => {
    const clock = createDwellClock(0);
    // 45 seconds in a background tab: one late frame, far beyond the gap.
    clock.tick(45_000);
    expect(clock.read()).toBe(0);

    // Reader switches to the tab and it renders for two seconds.
    runFrames(clock, 45_000, 125);
    expect(clock.read()).toBe(2000);
  });

  it("drops a gap longer than the ceiling", () => {
    const clock = createDwellClock(0);
    runFrames(clock, 0, 10); // 160ms of real frames
    clock.tick(10_000 + 160); // ten second gap, hidden
    expect(clock.read()).toBe(160);
  });

  it("counts a gap just under the ceiling", () => {
    const clock = createDwellClock(0);
    clock.tick(MAX_FRAME_GAP_MS - 1);
    expect(clock.read()).toBe(MAX_FRAME_GAP_MS - 1);
  });

  it("drops a gap exactly at the ceiling", () => {
    const clock = createDwellClock(0);
    clock.tick(MAX_FRAME_GAP_MS);
    expect(clock.read()).toBe(0);
  });

  // Alternating visible and hidden stretches. Only the visible ones count, or
  // a tab left open all afternoon reads as an afternoon of reading.
  it("sums only the visible stretches across many switches", () => {
    const clock = createDwellClock(0);
    let t = 0;
    for (let i = 0; i < 3; i++) {
      t = runFrames(clock, t, 30); // 480ms visible
      t += 30_000; // 30s hidden
      clock.tick(t);
    }
    expect(clock.read()).toBe(1440);
  });

  // A clock that can run backwards could produce a negative dwell, which the
  // database check constraint would reject, silently dropping the whole batch
  // that carried it.
  it("never decreases on an out-of-order timestamp", () => {
    const clock = createDwellClock(0);
    runFrames(clock, 0, 10);
    const before = clock.read();
    clock.tick(50); // earlier than the last tick
    expect(clock.read()).toBe(before);
    expect(clock.read()).toBeGreaterThanOrEqual(0);
  });

  it("returns whole milliseconds, since the column is an integer", () => {
    const clock = createDwellClock(0);
    clock.tick(16.6667);
    clock.tick(33.3334);
    expect(Number.isInteger(clock.read())).toBe(true);
  });
});
