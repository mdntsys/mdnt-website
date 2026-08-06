"use client";

import { VISITOR_COOKIE, isVisitorId } from "./visitor";

// First-party funnel analytics.
//
// No third-party script. That is a deliberate trade: we give up the reporting
// UI a hosted product would bring, and in exchange the data is ours, it joins
// directly to the leads table on visitor id, no consent banner is required for
// it, and ad blockers do not silently delete the measurement. On a paid funnel
// where the whole question is "why did this click not convert", losing a third
// of the sample to blockers would be worse than having no dashboard.
//
// Every function here is best-effort and swallows its own errors. Analytics
// must never be the reason a page breaks or a form fails to submit.

const API_BASE =
  process.env.NEXT_PUBLIC_ANALYTICS_API_URL ??
  "https://app.midnitesystems.com/api/funnel-events";

export type FunnelEventType =
  | "page_view"
  | "scroll"
  | "form_start"
  | "form_submit"
  | "calculator_use"
  | "cta_click"
  | "page_exit";

export interface TrackPayload {
  type: FunnelEventType;
  path: string;
  variant?: string;
  magnet?: string;
  scrollDepth?: 25 | 50 | 75 | 100;
  dwellMs?: number;
  referrer?: string;
}

const readVisitorCookie = (): string | null => {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${VISITOR_COOKIE}=`));
    if (match === undefined) return null;
    const value = decodeURIComponent(match.slice(VISITOR_COOKIE.length + 1));
    return isVisitorId(value) ? value : null;
  } catch {
    return null;
  }
};

const send = (events: TrackPayload[], useBeacon: boolean): void => {
  const visitorId = readVisitorCookie();
  // No cookie means the visitor blocked it or middleware did not run. Drop the
  // event rather than invent an id: a fabricated one would look like a real
  // person in every count that follows.
  if (visitorId === null || events.length === 0) return;

  const body = JSON.stringify({ visitorId, events });

  try {
    if (useBeacon && typeof navigator.sendBeacon === "function") {
      // text/plain on purpose. A beacon fired during unload cannot complete a
      // CORS preflight, and application/json would trigger one. text/plain is
      // CORS-safelisted, so this crosses the origin without a preflight; the
      // route parses the body as JSON regardless of content type.
      navigator.sendBeacon(API_BASE, new Blob([body], { type: "text/plain" }));
      return;
    }

    void fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      // Survives the request outliving the page, which matters for anything
      // fired late in a visit.
      keepalive: true,
    }).catch(() => {
      // Swallowed. Nothing downstream reads this.
    });
  } catch {
    // Swallowed for the same reason.
  }
};

export const track = (payload: TrackPayload): void => {
  send([payload], false);
};

interface PageContext {
  path: string;
  variant?: string;
  magnet?: string;
}

const SCROLL_MILESTONES = [25, 50, 75, 100] as const;

// Starts page-level measurement and returns a teardown function.
//
// Two things get measured that a page view alone cannot express: how far down
// the reader got, and how long the page was actually visible. Together they
// separate "bounced in four seconds" from "read the whole thing and declined",
// which need opposite fixes and are otherwise the same absence of a lead.
export const startPageAnalytics = (context: PageContext): (() => void) => {
  if (typeof window === "undefined") return () => {};

  const referrer = typeof document === "undefined" ? "" : document.referrer;

  track({
    type: "page_view",
    path: context.path,
    variant: context.variant,
    magnet: context.magnet,
    referrer: referrer.length > 0 ? referrer : undefined,
  });

  const reached = new Set<number>();

  // Visible time, not wall clock. A tab left open in the background overnight
  // is not eight hours of attention, and letting it count as such would make
  // any median it lands in meaningless.
  //
  // Computed as elapsed-minus-hidden rather than by accumulating visible
  // stretches, and that choice is about the failure mode. Accumulating visible
  // time starts at zero and only grows when visibilitychange fires as
  // expected; anywhere that event is unreliable the result is a confident
  // zero. Zero is the worst possible wrong answer here, because the bounce
  // test is "left almost immediately" and a zero silently classifies every
  // visit as a bounce. Subtracting hidden time from elapsed instead degrades
  // to a mild overestimate, which is visible as an implausible number rather
  // than invisible as a plausible one.
  const mountedAt = Date.now();
  let hiddenMs = 0;
  let hiddenSince =
    document.visibilityState === "hidden" ? mountedAt : null;
  let exited = false;

  const visibleMsNow = (): number => {
    const now = Date.now();
    const hiddenTotal =
      hiddenMs + (hiddenSince === null ? 0 : now - hiddenSince);
    return Math.max(0, now - mountedAt - hiddenTotal);
  };

  // Sampled on requestAnimationFrame rather than driven by a scroll listener.
  //
  // This site runs Lenis for smooth scrolling, and Lenis virtualises the
  // scroll: it moves the page without ever emitting a native `scroll` event on
  // window, document, or documentElement. A listener-based implementation
  // records nothing here, and records it silently, which would have shown up
  // as "no visitor ever scrolls" rather than as a broken instrument.
  //
  // Sampling the position instead is agnostic to whatever is driving it, which
  // is the property that failed: Lenis, native scrolling when Lenis is
  // disabled by prefers-reduced-motion, keyboard paging and anchor jumps all
  // move window.scrollY, and all of them are caught by reading it.
  let lastY = -1;
  let rafId = 0;

  const sample = (): void => {
    // Cheap early-out. This runs every frame, so it must do nothing at all in
    // the common case where the page has not moved.
    const y = window.scrollY;
    if (y !== lastY) {
      lastY = y;

      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      // A page shorter than the viewport cannot be scrolled, so depth carries
      // no information. Recording 100% for it would inflate every engagement
      // rate on the site.
      if (scrollable > 0) {
        const percent = (y / scrollable) * 100;

        for (const milestone of SCROLL_MILESTONES) {
          if (percent >= milestone && !reached.has(milestone)) {
            reached.add(milestone);
            track({
              type: "scroll",
              path: context.path,
              variant: context.variant,
              magnet: context.magnet,
              scrollDepth: milestone,
            });
          }
        }
      }
    }

    // Every milestone is recorded, so there is nothing left to observe. Stops
    // the loop rather than burning a frame callback for the rest of the visit.
    if (reached.size === SCROLL_MILESTONES.length) return;

    rafId = requestAnimationFrame(sample);
  };

  // Sends the current dwell. Re-armable: a reader who switches tabs, comes
  // back, and reads for another five minutes would otherwise be frozen at
  // whatever the first tab-switch measured, which for this audience is most of
  // them. Each departure emits a fresh row with a larger dwell, and the
  // analysis takes max(dwell_ms) per visitor and path, so the extra rows cost
  // nothing and the last one is the true total.
  const onExit = (): void => {
    if (exited) return;
    exited = true;
    send(
      [
        {
          type: "page_exit",
          path: context.path,
          variant: context.variant,
          magnet: context.magnet,
          dwellMs: visibleMsNow(),
        },
      ],
      true,
    );
  };

  const onVisibility = (): void => {
    if (document.visibilityState === "visible") {
      if (hiddenSince !== null) {
        hiddenMs += Date.now() - hiddenSince;
        hiddenSince = null;
      }
      // Re-arm. They came back, so the visit is not over and the dwell we
      // already sent is now an undercount.
      exited = false;
      return;
    }
    hiddenSince = Date.now();
    // hidden is the last moment a beacon is reliably allowed to fire, and on
    // mobile it is often the only one: pagehide is not guaranteed when an app
    // is backgrounded or the tab is discarded.
    onExit();
  };

  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", onExit);

  // Starts immediately, which also covers pages that open already scrolled
  // (an anchor link, a restored position).
  sample();

  return () => {
    cancelAnimationFrame(rafId);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", onExit);
    // Client-side navigation away from the page is an exit too. Without this,
    // anyone who clicks through to the worksheet would have no dwell recorded
    // for the page that persuaded them.
    onExit();
  };
};

// Exposed so the opt-in form can attach the visitor id to the lead itself.
// That join is what turns an opt-in rate measured against Google's click count
// into one measured against people we watched read the page.
export const currentVisitorId = (): string | null => readVisitorCookie();
