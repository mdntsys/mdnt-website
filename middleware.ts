import { NextResponse, type NextRequest } from "next/server";
import {
  LANDING_VARIANTS,
  VARIANT_COOKIE,
  VARIANT_HEADER,
  isLandingVariant,
} from "./app/landing/variant";

// Assigns each visitor to one arm of the landing page split test.
//
// Sticky by cookie, because a visitor who reloads or comes back tomorrow must
// see the same page. A visitor who saw both would count as one opt-in against
// two impressions and quietly bias the result.
//
// The variant is passed to the page as a request header rather than read from
// the cookie inside the page, because on a first visit the cookie only exists
// on the response. Without the header the very first render of every new
// visitor would fall to the same arm, which is exactly the population the test
// is measuring.
//
// Assignment is a coin flip rather than a hash of anything stable. There is no
// user id to hash at this point in the funnel, and hashing the IP would put
// everyone behind one corporate NAT into the same arm.

export const config = {
  matcher: ["/ai-operations-audit", "/ai-readiness-assessment"],
};

export function middleware(request: NextRequest) {
  const existing = request.cookies.get(VARIANT_COOKIE)?.value;
  const variant = isLandingVariant(existing)
    ? existing
    : LANDING_VARIANTS[Math.random() < 0.5 ? 0 : 1];

  const headers = new Headers(request.headers);
  headers.set(VARIANT_HEADER, variant);

  const response = NextResponse.next({ request: { headers } });

  if (existing !== variant) {
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
