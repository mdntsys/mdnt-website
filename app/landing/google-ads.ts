// Google Ads conversion tracking for the paid landing pages.
//
// The two ids below are the account's conversion ID and the "Submit lead
// form" action's label, read out of the event snippet in Google Ads on
// 2026-08-02. They are constants rather than NEXT_PUBLIC_ env vars on
// purpose: both values are public (they ship in the page source either way),
// and an unset env var in Vercel would silently stop every conversion from
// reporting with nothing failing loudly. A wrong constant shows up in a diff.
export const GOOGLE_ADS_ID = "AW-18365626622";
export const LEAD_CONVERSION_LABEL = "OWvjCPDl8tocEP7xtLVE";

type GtagCommand = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagCommand;
    dataLayer?: unknown[];
  }
}

// Fires the lead opt-in conversion.
//
// Call this only when the API reports a first touch. The conversion action is
// configured to count one conversion per click, and the funnel's Day 90 gate
// is measured in cost per opt-in, so a repeat submitter must not read as a
// second lead.
//
// `leadId` is passed as the transaction id. Google deduplicates on it, which
// covers a double-submit or a re-render firing the same conversion twice.
//
// Value is deliberately not passed: the conversion action carries a fixed $1
// so that the Conversions column counts opt-ins rather than guessed revenue.
export function reportLeadConversion(leadId: string | null): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    // No gtag means the script was blocked or has not loaded. A lost
    // conversion report must never cost someone the worksheet.
    return;
  }

  window.gtag("event", "conversion", {
    send_to: `${GOOGLE_ADS_ID}/${LEAD_CONVERSION_LABEL}`,
    ...(leadId !== null ? { transaction_id: leadId } : {}),
  });
}
