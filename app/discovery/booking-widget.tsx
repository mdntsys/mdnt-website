"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

// Booking, in-house. Replaces the Cal.com embed.
//
// The reason for owning this is attribution: a booking written into the same
// database as the contact keeps the GCLID chain intact by foreign key, where
// a third-party webhook plus a join-by-email was the most fragile link in the
// measurement story the Day 90 gate depends on.
//
// Everything is rendered in the VISITOR's timezone, resolved from the
// browser. The server deals only in absolute instants and never guesses what
// zone someone is in.

const API_BASE =
  process.env.NEXT_PUBLIC_BOOKING_API_URL ??
  "https://app.midnitesystems.com/api/booking";

interface SlotsResponse {
  slots?: unknown;
}

type Stage = "loading" | "picking" | "details" | "booked" | "unavailable";

const dayKey = (date: Date, timeZone: string): string =>
  new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

const dayLabel = (date: Date, timeZone: string): string =>
  new Intl.DateTimeFormat("en-US", {
    timeZone,
    weekday: "long",
    month: "long",
    day: "numeric",
  }).format(date);

const timeLabel = (date: Date, timeZone: string): string =>
  new Intl.DateTimeFormat("en-US", {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

export function BookingWidget() {
  const [stage, setStage] = useState<Stage>("loading");
  const [slots, setSlots] = useState<Date[]>([]);
  const [selected, setSelected] = useState<Date | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<Date | null>(null);
  const [invited, setInvited] = useState(false);

  // Resolved once on the client. Intl always returns something; the fallback
  // only guards a non-browser render.
  const timeZone = useMemo(
    () =>
      typeof Intl === "undefined"
        ? "UTC"
        : (Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC"),
    [],
  );

  // Nothing sets state before the first await. Doing so synchronously inside
  // an effect body triggers a cascading render, which React lints against
  // and which would flash the loading state twice on mount.
  const fetchSlots = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/slots?kind=qualification`, {
        headers: { Accept: "application/json" },
      });
      if (!response.ok) {
        setStage("unavailable");
        return;
      }
      const body = (await response.json()) as SlotsResponse;
      const parsed = Array.isArray(body.slots)
        ? body.slots
            .filter((value): value is string => typeof value === "string")
            .map((value) => new Date(value))
            .filter((date) => !Number.isNaN(date.getTime()))
        : [];

      setSlots(parsed);
      setStage(parsed.length === 0 ? "unavailable" : "picking");
    } catch {
      setStage("unavailable");
    }
  }, []);

  // Retry is an event handler, so resetting state synchronously here is fine
  // and gives immediate feedback that the click registered.
  const retry = useCallback(() => {
    setStage("loading");
    setError(null);
    void fetchSlots();
  }, [fetchSlots]);

  // Fetch-on-mount is one of the cases an effect is genuinely for. The rule
  // fires on any effect that transitively sets state, which this must: the
  // slot list cannot be fetched on the server because availability is
  // rendered against the visitor's own timezone, resolved in the browser.
  // Nothing is set synchronously here, so there is no cascading render.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchSlots();
  }, [fetchSlots]);

  const grouped = useMemo(() => {
    const byDay = new Map<string, Date[]>();
    for (const slot of slots) {
      const key = dayKey(slot, timeZone);
      const existing = byDay.get(key);
      if (existing === undefined) byDay.set(key, [slot]);
      else existing.push(slot);
    }
    return [...byDay.entries()].map(([key, daySlots]) => ({
      key,
      label: dayLabel(daySlots[0] as Date, timeZone),
      slots: daySlots,
    }));
  }, [slots, timeZone]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selected === null) return;

    setPending(true);
    setError(null);

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startsAt: selected.toISOString(),
          kind: "qualification",
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          notes: String(data.get("notes") ?? "") || undefined,
          timeZone,
        }),
      });

      // The world changed underneath the slot list this browser is holding.
      // Reload availability rather than showing a dead end.
      if (response.status === 409) {
        setError(
          "Someone just took that time. Here are the times that are still open.",
        );
        setSelected(null);
        setStage("picking");
        await fetchSlots();
        return;
      }

      if (response.status === 429) {
        setError(
          "That is a lot of booking attempts from your network. Try again shortly, or email nic@midnitesystems.com.",
        );
        return;
      }

      if (!response.ok) {
        setError(
          "That did not go through. Try again, or email nic@midnitesystems.com and we will sort it out.",
        );
        return;
      }

      // The API tells us whether a calendar invite actually reached them.
      // Only claim an email is coming when one is.
      const body: unknown = await response.json().catch(() => ({}));
      const sent =
        typeof body === "object" &&
        body !== null &&
        (body as { confirmationSent?: unknown }).confirmationSent === true;

      setInvited(sent);
      setConfirmed(selected);
      setStage("booked");
    } catch {
      setError(
        "Could not reach us just now. Check your connection, or email nic@midnitesystems.com.",
      );
    } finally {
      setPending(false);
    }
  }

  if (stage === "loading") {
    return (
      <div className="bk bk-status" role="status">
        <p className="bk-status-text">Loading available times</p>
      </div>
    );
  }

  if (stage === "unavailable") {
    return (
      <div className="bk bk-status">
        <p className="bk-status-text">
          No times are showing right now. Email{" "}
          <a href="mailto:nic@midnitesystems.com">nic@midnitesystems.com</a> and
          we will find one.
        </p>
        <button type="button" className="bk-ghost" onClick={retry}>
          Try again
        </button>
      </div>
    );
  }

  if (stage === "booked" && confirmed !== null) {
    return (
      <div className="bk bk-status">
        <span className="bk-eyebrow">Confirmed</span>
        <p className="bk-confirm-time">
          {dayLabel(confirmed, timeZone)} at {timeLabel(confirmed, timeZone)}
        </p>
        <p className="bk-status-text">
          {invited
            ? "Fifteen minutes. Bring the task that is on your mind. A calendar invite with the meeting link is on its way, and you can move or cancel it from there."
            : "Fifteen minutes. Bring the task that is on your mind. We have you down and Nic will confirm the details by email shortly."}
        </p>
      </div>
    );
  }

  if (stage === "details" && selected !== null) {
    return (
      <form className="bk" onSubmit={handleSubmit}>
        <span className="bk-eyebrow">Almost done</span>
        <p className="bk-chosen">
          {dayLabel(selected, timeZone)} at {timeLabel(selected, timeZone)}
          <button
            type="button"
            className="bk-change"
            onClick={() => {
              setSelected(null);
              setStage("picking");
            }}
          >
            change
          </button>
        </p>

        <label className="bk-field">
          <span className="bk-label">Name</span>
          <input className="bk-input" name="name" required maxLength={200} />
        </label>

        <label className="bk-field">
          <span className="bk-label">Work email</span>
          <input
            className="bk-input"
            name="email"
            type="email"
            required
            maxLength={200}
          />
        </label>

        <label className="bk-field">
          <span className="bk-label">
            What is on your mind? <span className="bk-optional">optional</span>
          </span>
          <textarea className="bk-input" name="notes" rows={3} maxLength={2000} />
        </label>

        {error !== null && (
          <p className="bk-error" role="alert">
            {error}
          </p>
        )}

        <button type="submit" className="bk-submit" disabled={pending}>
          {pending ? "Booking" : "Book the call"}
        </button>
      </form>
    );
  }

  return (
    <div className="bk">
      <div className="bk-head">
        <span className="bk-eyebrow">Pick a time</span>
        <span className="bk-tz">Times shown in {timeZone.replace(/_/g, " ")}</span>
      </div>

      {error !== null && (
        <p className="bk-error" role="alert">
          {error}
        </p>
      )}

      <div className="bk-days">
        {grouped.map((day) => (
          <div key={day.key} className="bk-day">
            <h3 className="bk-day-label">{day.label}</h3>
            <div className="bk-slots">
              {day.slots.map((slot) => (
                <button
                  key={slot.toISOString()}
                  type="button"
                  className="bk-slot"
                  onClick={() => {
                    setSelected(slot);
                    setError(null);
                    setStage("details");
                  }}
                >
                  {timeLabel(slot, timeZone)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
