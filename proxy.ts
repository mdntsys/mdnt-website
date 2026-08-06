import { NextResponse, type NextRequest } from "next/server";
import {
  LANDING_VARIANTS,
  VARIANT_COOKIE,
  VARIANT_HEADER,
  isLandingVariant,
} from "./app/landing/variant";
import {
  VISITOR_COOKIE,
  VISITOR_COOKIE_MAX_AGE,
  VISITOR_HEADER,
  isVisitorId,
} from "./app/analytics/visitor";

// Formerly middleware.ts. Next 16 renamed the convention to proxy.ts and
// deprecated the old name; both still work today, but the deprecated path will
// be removed and everything below is load-bearing for measurement.
//
// Two jobs, both of which have to happen before the first byte of HTML.
//
// 1. Assign an anonymous visitor id, on every content page. Minting it here
//    rather than in the browser means a visit is attributable even if the
//    reader leaves before a script has done anything, which is exactly the
//    population a bounce metric is about.
//
// 2. Assign one arm of the landing page split test, on the two ad landing
//    pages only.
//
// Both are sticky by cookie: a visitor who reloads or returns tomorrow must
// see the same page and count as the same person. Someone who saw both arms
// would be one opt-in against two impressions and would quietly bias the test.
//
// Both are passed to the page as request headers rather than read from the
// cookie inside the page, because on a first visit the cookie only exists on
// the response. Without the header every new visitor's first render would fall
// to the same arm and carry no visitor id, and new visitors are the entire
// measurement.

export const config = {
  // Everything except Next internals and static assets. The visitor id has to
  // land on ordinary content pages too, not just the paid landing pages,
  // because organic traffic to the worksheets is about to start arriving and
  // that is traffic nobody has ever measured.
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:png|jpe?g|gif|svg|webp|ico|mp4|txt|xml|vcf)$).*)",
  ],
};

const LANDING_PATHS = new Set([
  "/ai-operations-audit",
  "/ai-readiness-assessment",
]);

// Named `proxy`, not `middleware`. Next resolves this file as
// `(isProxy ? mod.proxy : mod.middleware) || mod.default`, so in a file called
// proxy.ts an export named `middleware` is simply not found and the whole
// thing silently stops running. That would take the split test assignment and
// the visitor cookie with it, and the pages would still render fine, so
// nothing would look broken.
export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);

  const existingVisitor = request.cookies.get(VISITOR_COOKIE)?.value;
  const visitorId = isVisitorId(existingVisitor)
    ? existingVisitor
    : crypto.randomUUID();
  headers.set(VISITOR_HEADER, visitorId);

  // Assignment is a coin flip rather than a hash of anything stable. There is
  // no user id at this point in the funnel, and hashing the IP would put
  // everyone behind one corporate NAT into the same arm.
  const isLandingPage = LANDING_PATHS.has(request.nextUrl.pathname);
  const existingVariant = request.cookies.get(VARIANT_COOKIE)?.value;
  const variant = isLandingVariant(existingVariant)
    ? existingVariant
    : LANDING_VARIANTS[Math.random() < 0.5 ? 0 : 1];

  if (isLandingPage) {
    headers.set(VARIANT_HEADER, variant);
  }

  const response = NextResponse.next({ request: { headers } });

  if (existingVisitor !== visitorId) {
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      maxAge: VISITOR_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      // Readable by the tracker, which has to send it to a different origin
      // (app.midnitesystems.com) where an httpOnly cookie would never arrive.
      httpOnly: false,
      secure: true,
    });
  }

  // Only written on the pages under test. Writing it site-wide would enrol
  // visitors who never saw either arm and dilute the population.
  if (isLandingPage && existingVariant !== variant) {
    response.cookies.set(VARIANT_COOKIE, variant, {
      // Long enough that a visitor who thinks it over for a month and comes
      // back still sees the page they were measured on.
      maxAge: 60 * 60 * 24 * 90,
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      secure: true,
    });
  }

  return response;
}
