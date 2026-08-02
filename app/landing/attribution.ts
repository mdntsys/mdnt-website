// Click attribution capture for the paid landing pages.
//
// The critical property: params are read on page LOAD, not at submit. A
// visitor who lands with ?gclid=..., scrolls, opens the worksheet in another
// tab, and comes back would otherwise arrive at the form with a clean URL and
// no click id. A GCLID not captured at click time is gone permanently, and
// every downstream conversion attributes back through it.
//
// Stored in sessionStorage rather than a cookie: it is never sent to a
// server automatically, it dies with the tab session, and it survives
// in-page navigation, which covers the case above.

const STORAGE_KEY = "mdnt.attribution";

export interface CapturedAttribution {
  queryString: string;
  landingPath: string;
  referrer: string;
}

// Only persist when there is something worth persisting. Writing an empty
// record on every page view would overwrite a real capture from earlier in
// the session with nothing.
const CLICK_PARAMS = ["gclid", "gbraid", "wbraid"] as const;
const UTM_PREFIX = "utm_";

const hasAttribution = (search: string): boolean => {
  if (search.length === 0) return false;
  const params = new URLSearchParams(search);
  for (const key of CLICK_PARAMS) {
    if (params.has(key)) return true;
  }
  for (const key of params.keys()) {
    if (key.startsWith(UTM_PREFIX)) return true;
  }
  return false;
};

// Call once on mount. Safe to call repeatedly: a later page view without
// params leaves an earlier capture intact.
export function captureAttribution(): void {
  if (typeof window === "undefined") return;

  try {
    const search = window.location.search;
    if (!hasAttribution(search)) return;

    const record: CapturedAttribution = {
      queryString: search,
      landingPath: window.location.pathname,
      referrer: document.referrer,
    };
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // Storage can throw in private modes and under strict cookie policies.
    // A lead without attribution is still a lead, so never let this break
    // the page.
  }
}

// Reads whatever was captured earlier this session, falling back to the
// current URL so a direct submit still carries what it can.
export function readAttribution(): CapturedAttribution {
  const fallback: CapturedAttribution = {
    queryString: typeof window === "undefined" ? "" : window.location.search,
    landingPath: typeof window === "undefined" ? "" : window.location.pathname,
    referrer: typeof document === "undefined" ? "" : document.referrer,
  };

  if (typeof window === "undefined") return fallback;

  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (raw === null) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      typeof (parsed as CapturedAttribution).queryString === "string"
    ) {
      return parsed as CapturedAttribution;
    }
  } catch {
    // Corrupt payload, fall through.
  }

  return fallback;
}
