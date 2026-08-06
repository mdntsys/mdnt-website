"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { startPageAnalytics } from "./track";
import { LANDING_PATHS, magnetForPath } from "./pages";
import { VARIANT_COOKIE, isLandingVariant } from "../landing/variant";

// Mounts page-level measurement. Rendered exactly once, in the root layout, so
// every route is covered including the worksheets and the case study, which
// are about to receive organic traffic for the first time and have never had
// any measurement on them at all.
//
// Rendered once and once only: a second instance on the landing pages would
// double every page view and halve every rate computed from them.

const readVariantCookie = (): string | undefined => {
  if (typeof document === "undefined") return undefined;
  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${VARIANT_COOKIE}=`));
    if (match === undefined) return undefined;
    const value = decodeURIComponent(match.slice(VARIANT_COOKIE.length + 1));
    return isLandingVariant(value) ? value : undefined;
  } catch {
    return undefined;
  }
};

export function PageAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    const variant = LANDING_PATHS.has(pathname)
      ? readVariantCookie()
      : undefined;

    return startPageAnalytics({
      path: pathname,
      variant,
      magnet: magnetForPath(pathname),
    });
    // Re-running on pathname change is the point: a client-side navigation
    // must tear down the previous page's listeners and open a new page view,
    // or the second page is silently attributed to the first.
  }, [pathname]);

  return null;
}
