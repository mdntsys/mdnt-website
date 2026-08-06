// The anonymous visitor identifier behind funnel analytics.
//
// A cookie rather than sessionStorage, for the same reason the split test uses
// one: middleware can mint it before the first byte of HTML, so the very first
// page view of a new visitor is already attributable. A client-generated id
// would miss precisely the visits that matter most, the ones that bounce
// before any script has a chance to run twice.
//
// Deliberately not a session id. It identifies a browser across visits and
// sessions are derived in SQL from inactivity gaps, which keeps "did they come
// back and read it again" answerable instead of throwing that away at write
// time. It is anonymous, carries no personal data, and is only ever joined to
// a person if that person chooses to opt in.

export const VISITOR_COOKIE = "mdnt_vid";
export const VISITOR_HEADER = "x-mdnt-vid";

// Ninety days, matching the split test cookie. Long enough to see a visitor
// who thinks it over and returns, which is a real pattern for a considered
// B2B purchase and one a 30 minute session window would erase.
export const VISITOR_COOKIE_MAX_AGE = 60 * 60 * 24 * 90;

// Bounded because the server caps it at 64 characters. A UUID is 36.
const VISITOR_ID_PATTERN = /^[a-f0-9-]{8,64}$/;

export const isVisitorId = (
  value: string | undefined | null,
): value is string =>
  value !== undefined && value !== null && VISITOR_ID_PATTERN.test(value);

// Reads the id the middleware put on the request. Returns null rather than
// minting one: analytics must never be the reason a page fails to render, and
// a visit we cannot attribute is better than a visit we cannot serve.
export const readVisitorId = (value: string | undefined | null): string | null =>
  isVisitorId(value) ? value : null;
