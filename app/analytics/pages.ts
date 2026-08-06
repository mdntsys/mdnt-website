// Which analytics context each route belongs to.
//
// One mapping, imported everywhere. It previously lived inline in the page
// tracker and was hardcoded a second time in the calculator, which is exactly
// how the calculator ended up reporting the operations_audit magnet while
// sitting on the AI readiness page. A duplicated constant is a constant that
// will disagree with itself.

// Both the ad landing page and the worksheet it hands over map to the same
// magnet, so the funnel can be followed across the handover rather than
// stopping at the opt-in.
export const MAGNET_BY_PATH: Record<string, string> = {
  "/ai-operations-audit": "operations_audit",
  "/ai-readiness-assessment": "ai_readiness_assessment",
  "/worksheets/operations-audit": "operations_audit",
  "/worksheets/ai-readiness-assessment": "ai_readiness_assessment",
};

// Only the two pages under test. The variant cookie outlives the visit, so a
// visitor who saw a landing page and then browsed to the homepage still
// carries it; attaching it off-test would make organic page views look like
// they belonged to an arm they were never shown.
export const LANDING_PATHS = new Set([
  "/ai-operations-audit",
  "/ai-readiness-assessment",
]);

export const magnetForPath = (path: string): string | undefined =>
  MAGNET_BY_PATH[path];
