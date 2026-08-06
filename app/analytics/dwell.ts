// The dwell clock.
//
// Pure and separated from the tracker on purpose. This number decides whether
// a visit reads as "bounced" or "read it and declined", those two have
// opposite fixes, and the wrong one costs a month of work pointed at the wrong
// problem. It has already been got wrong twice, both times silently, so the
// arithmetic is isolated where it can be tested directly.
//
// The measurement is a count of animation frame time. Browsers only run
// animation frames while a page is actually visible, which makes the frame
// clock a direct observation of attention rather than an inference from
// visibility events. Both earlier attempts inferred it from
// `visibilitychange`, and both produced a permanent zero for any page that
// mounted hidden: open an ad result in a background tab, read it a minute
// later, and the most considered reader on the site records a zero second
// visit and classifies as a bounce.

// A frame at 60fps is about 16ms, and even a slow one stays well under this.
// A larger gap means the tab was backgrounded, throttled, or the machine
// slept, and none of that was someone reading the page.
export const MAX_FRAME_GAP_MS = 1000;

export interface DwellClock {
  // Call once per animation frame, with that frame's timestamp.
  tick: (at: number) => void;
  // Visible milliseconds so far.
  read: () => number;
}

export const createDwellClock = (startedAt: number): DwellClock => {
  let visibleMs = 0;
  let lastTick = startedAt;

  return {
    tick: (at: number): void => {
      const delta = at - lastTick;
      lastTick = at;
      // Gaps are dropped rather than clamped. A clamp would credit a
      // background tab with a second of attention every time it woke up,
      // which over a long session silently invents engagement.
      //
      // Negative deltas are dropped by the same test, which matters because
      // it makes the clock monotonic: no timestamp can ever reduce it.
      if (delta > 0 && delta < MAX_FRAME_GAP_MS) visibleMs += delta;
    },
    read: (): number => Math.round(visibleMs),
  };
};
