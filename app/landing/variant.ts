// The landing page split test.
//
// Two arms only, and both are new. The page these replaced is not the control:
// it failed five things the research is settled on (no message match with the
// ad, a 65 word argument before any value, the strongest proof below the fold,
// nothing scannable above it), and at 109 clicks a week keeping it live for a
// third of traffic would spend roughly $1,400 to re-learn that.
//
// Two arms rather than three is a power decision, not a taste one. At a 6%
// baseline, detecting a doubling needs ~354 opt-ins per arm: 6.5 weeks with
// two arms, 9.7 with three, against a 12.9 week gate. Two arms leaves room to
// run a second test after this one; three does not.
//
// Must stay in step with LANDING_VARIANTS in the portal's crm/schema.ts and
// leads_landing_variant_chk in Postgres.

export const LANDING_VARIANTS = ["calculator", "proof"] as const;

export type LandingVariant = (typeof LANDING_VARIANTS)[number];

export const VARIANT_COOKIE = "mdnt_lp";
export const VARIANT_HEADER = "x-mdnt-lp";

export const isLandingVariant = (
  value: string | undefined | null,
): value is LandingVariant =>
  value !== undefined &&
  value !== null &&
  (LANDING_VARIANTS as readonly string[]).includes(value);

// Falls back rather than throwing. A missing header means middleware did not
// run, which must still render a page.
export const readVariant = (value: string | undefined | null): LandingVariant =>
  isLandingVariant(value) ? value : "proof";
