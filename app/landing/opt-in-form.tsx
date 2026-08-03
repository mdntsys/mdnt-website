"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { captureAttribution, readAttribution } from "./attribution";
import { reportLeadConversion } from "./google-ads";
import type { LandingVariant } from "./variant";

// The opt-in form for both landing pages.
//
// Two steps, deliberately. Step 1 is three fields and fires the conversion;
// step 2 asks company size and role after the fact. Form length is the single
// biggest lever on opt-in rate, and opt-in rate is the exact metric the Day 90
// kill gate turns on, so anything that can wait until after the conversion
// does.
//
// The magnet is a hosted page, not an emailed PDF, so the success state hands
// it over immediately. That removes a drop-off point and means delivery does
// not depend on transactional email being wired up.

const API_BASE =
  process.env.NEXT_PUBLIC_LEADS_API_URL ??
  "https://app.midnitesystems.com/api/leads";

export type Magnet = "operations_audit" | "ai_readiness_assessment";

const COMPANY_SIZES = ["1-10", "11-50", "51-200", "200+"] as const;

const JOB_ROLES = [
  { value: "owner", label: "Owner or founder" },
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance" },
  { value: "it", label: "IT" },
  { value: "other", label: "Other" },
] as const;

type Stage = "capture" | "enrich" | "done";

interface OptInFormProps {
  magnet: Magnet;
  // Which arm of the split test rendered this form. Sent with the opt-in so
  // conversion by variant is a column on the lead rather than something we
  // have to reconstruct from Google's reporting later.
  variant: LandingVariant;
  worksheetHref: string;
  submitLabel: string;
}

export function OptInForm({
  magnet,
  variant,
  worksheetHref,
  submitLabel,
}: OptInFormProps) {
  const [stage, setStage] = useState<Stage>("capture");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [leadId, setLeadId] = useState<string | null>(null);

  // On mount, before anything else. See attribution.ts for why load-time
  // matters more than submit-time.
  useEffect(() => {
    captureAttribution();
  }, []);

  async function handleCapture(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setPending(true);

    const data = new FormData(event.currentTarget);
    const attribution = readAttribution();

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          firstName: String(data.get("firstName") ?? "") || undefined,
          company: String(data.get("company") ?? "") || undefined,
          magnet,
          variant,
          landingPath: attribution.landingPath,
          queryString: attribution.queryString,
          referrer: attribution.referrer,
        }),
      });

      if (response.status === 429) {
        setError(
          "That is a lot of submissions from your network. Try again shortly, or email nic@midnitesystems.com.",
        );
        return;
      }

      if (!response.ok) {
        setError(
          "That did not go through. Try again, or email nic@midnitesystems.com and we will send it over.",
        );
        return;
      }

      const body: unknown = await response.json();
      const payload =
        typeof body === "object" && body !== null
          ? (body as { leadId?: unknown; isFirstTouch?: unknown })
          : {};

      const id = typeof payload.leadId === "string" ? payload.leadId : null;
      if (id !== null) setLeadId(id);

      // Only a first touch is a conversion. The API tells us whether this
      // email was already in the CRM, and someone coming back for the second
      // worksheet must not report as a second opt-in: cost per opt-in is the
      // number the Day 90 kill gate is decided on.
      if (payload.isFirstTouch === true) reportLeadConversion(id);

      setStage("enrich");
    } catch {
      setError(
        "Could not reach us just now. Check your connection, or email nic@midnitesystems.com.",
      );
    } finally {
      setPending(false);
    }
  }

  async function handleEnrich(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);

    const data = new FormData(event.currentTarget);

    // Best effort. The conversion already fired and the reader already has
    // the worksheet, so a failure here must never block them.
    try {
      if (leadId !== null) {
        await fetch(`${API_BASE}/${leadId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            companySize: String(data.get("companySize") ?? "") || undefined,
            jobRole: String(data.get("jobRole") ?? "") || undefined,
          }),
        });
      }
    } catch {
      // Swallowed on purpose.
    } finally {
      setPending(false);
      setStage("done");
    }
  }

  if (stage === "done") {
    return (
      <div className="lp-form lp-form-done">
        <span className="lp-form-eyebrow">Ready</span>
        <h2 className="lp-form-h2">
          It is <em>open.</em>
        </h2>
        <p className="lp-form-p">
          Do not fill it in alone. The person who actually does the work knows
          the real frequency, and that is the number everything else depends
          on.
        </p>
        <Link href={worksheetHref} className="lp-btn">
          Open the worksheet
          <span aria-hidden="true"> &rarr;</span>
        </Link>
        {/* Says only what is actually wired. The nurture sequence is written
            but has no sender yet, and promising email we cannot send is how a
            funnel loses the trust the worksheet just earned. Put the promise
            back when @midnite/email is connected. */}
        <p className="lp-form-fine">
          The worksheet is yours to keep, and nothing else is required. If you
          want a second pair of eyes on what you find, that is what{" "}
          <a href="mailto:nic@midnitesystems.com">nic@midnitesystems.com</a> is
          for.
        </p>
      </div>
    );
  }

  if (stage === "enrich") {
    return (
      <form className="lp-form" onSubmit={handleEnrich}>
        <span className="lp-form-eyebrow">Almost there</span>
        <h2 className="lp-form-h2">
          Two questions, then it is <em>yours.</em>
        </h2>

        <label className="lp-field">
          <span className="lp-label">Company size</span>
          <select name="companySize" className="lp-input" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            {COMPANY_SIZES.map((size) => (
              <option key={size} value={size}>
                {size} people
              </option>
            ))}
          </select>
        </label>

        <label className="lp-field">
          <span className="lp-label">Your role</span>
          <select name="jobRole" className="lp-input" defaultValue="">
            <option value="" disabled>
              Select
            </option>
            {JOB_ROLES.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="lp-btn" disabled={pending}>
          {pending ? "One moment" : "Send it to me"}
        </button>

        <button
          type="button"
          className="lp-skip"
          onClick={() => {
            setStage("done");
          }}
        >
          Skip, just open it
        </button>
      </form>
    );
  }

  return (
    <form className="lp-form" onSubmit={handleCapture}>
      <span className="lp-form-eyebrow">Free</span>
      <h2 className="lp-form-h2">{submitLabel}</h2>

      <label className="lp-field">
        <span className="lp-label">First name</span>
        <input
          className="lp-input"
          name="firstName"
          type="text"
          autoComplete="given-name"
          maxLength={200}
        />
      </label>

      <label className="lp-field">
        <span className="lp-label">
          Work email <span className="lp-req">required</span>
        </span>
        <input
          className="lp-input"
          name="email"
          type="email"
          required
          autoComplete="email"
          maxLength={200}
        />
      </label>

      <label className="lp-field">
        <span className="lp-label">Company</span>
        <input
          className="lp-input"
          name="company"
          type="text"
          autoComplete="organization"
          maxLength={200}
        />
      </label>

      {error !== null && (
        <p className="lp-error" role="alert">
          {error}
        </p>
      )}

      <button type="submit" className="lp-btn" disabled={pending}>
        {pending ? "Sending" : "Get the worksheet"}
      </button>

      <p className="lp-form-fine">
        No newsletter, no sales sequence. You get the worksheet immediately, on
        the next screen.
      </p>
    </form>
  );
}
