import Link from "next/link";
import type { ReactNode } from "react";
import { GoogleAdsTag } from "./google-ads-tag";
import { OptInForm, type Magnet } from "./opt-in-form";

// Shared chrome for the two paid landing pages.
//
// No site nav, deliberately. Every navigation link is a way to leave a page
// we are paying per click for. The logo links home for legitimacy and nothing
// else competes with the form.

interface LandingShellProps {
  eyebrow: string;
  title: ReactNode;
  lead: ReactNode;
  trustLine: string;
  magnet: Magnet;
  worksheetHref: string;
  submitLabel: string;
  children: ReactNode;
}

export function LandingShell({
  eyebrow,
  title,
  lead,
  trustLine,
  magnet,
  worksheetHref,
  submitLabel,
  children,
}: LandingShellProps) {
  return (
    <main className="lp">
      <GoogleAdsTag />
      <header className="lp-topbar">
        <Link href="/" className="lp-brand">
          Midnite Systems
        </Link>
      </header>

      <section className="lp-hero">
        <div className="lp-hero-inner">
          <div className="lp-hero-copy">
            <span className="lp-eyebrow">{eyebrow}</span>
            <h1 className="lp-h1">{title}</h1>
            <div className="lp-lead">{lead}</div>
            <p className="lp-trust">{trustLine}</p>
          </div>
          <div className="lp-hero-form" id="get">
            <OptInForm
              magnet={magnet}
              worksheetHref={worksheetHref}
              submitLabel={submitLabel}
            />
          </div>
        </div>
      </section>

      {children}

      <section className="lp-section lp-section-proof">
        <div className="lp-inner">
          <span className="lp-eyebrow">Proof, not promises</span>
          <h2 className="lp-h2">
            $22.5k a month, <em>cut to $10k.</em>
          </h2>
          <p className="lp-p">
            DSI Transportation was spending $22,500 a month on recurring
            overhead. We deployed AI employees across sixteen recurring tasks
            and brought the operating bill to $10,000. Same output, seven days
            a week.
          </p>
          <div className="lp-metrics">
            <div className="lp-metric">
              <span className="lp-metric-num">$12,500</span>
              <span className="lp-metric-unit">/mo saved</span>
            </div>
            <div className="lp-metric">
              <span className="lp-metric-num">56%</span>
              <span className="lp-metric-unit">overhead cut</span>
            </div>
            <div className="lp-metric">
              <span className="lp-metric-num">4 wks</span>
              <span className="lp-metric-unit">to first live agent</span>
            </div>
          </div>
          <Link
            href="/case-studies/dsi-transportation"
            className="lp-ghost-link"
          >
            Read the full case study
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </section>

      <section className="lp-section lp-section-close">
        <div className="lp-inner lp-close-inner">
          <div>
            <h2 className="lp-h2">
              Find the number.
              <br />
              Then <em>decide.</em>
            </h2>
            <p className="lp-p">
              Fill it in before you talk to anyone, us included. If the number
              comes out small, you have saved yourself a sales call. If it comes
              out large, you will know exactly which task to ask about.
            </p>
          </div>
          <div>
            <OptInForm
              magnet={magnet}
              worksheetHref={worksheetHref}
              submitLabel={submitLabel}
            />
          </div>
        </div>
      </section>

      <footer className="lp-foot">
        <p>
          Midnite Systems deploys AI to do work businesses currently pay people
          to do.
        </p>
        <p>
          <a href="mailto:nic@midnitesystems.com">nic@midnitesystems.com</a>
        </p>
      </footer>
    </main>
  );
}

export function LandingSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="lp-section">
      <div className="lp-inner">
        <span className="lp-eyebrow">{eyebrow}</span>
        <h2 className="lp-h2">{title}</h2>
        {children}
      </div>
    </section>
  );
}
