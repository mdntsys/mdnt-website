import Link from "next/link";
import type { ReactNode } from "react";
import { CostCalculator } from "./cost-calculator";
import { GoogleAdsTag } from "./google-ads-tag";
import { OptInForm, type Magnet } from "./opt-in-form";
import type { LandingVariant } from "./variant";

// Shared chrome for the two paid landing pages.
//
// No site nav, deliberately. Every navigation link is a way to leave a page
// we are paying per click for. The logo links home for legitimacy and nothing
// else competes with the form.
//
// The hero differs by split test arm; everything below the fold is shared, so
// the test measures the thing it claims to measure rather than two entirely
// different pages that happen to share a form.
//
// Both heroes obey the same rules, which the page these replaced broke:
//   - the headline echoes the ad, because message match is the first thing a
//     visitor checks and roughly 60% never scroll past the fold
//   - the lead is under 30 words and stops making an argument
//   - three scannable proof points sit above the fold, not below it

export interface HeroContent {
  eyebrow: string;
  title: ReactNode;
  // Under 30 words. This is a value proposition, not a thesis.
  lead: string;
  // Three, always. Scannable in the two seconds before a decision to scroll.
  checks: readonly string[];
  trustLine: string;
}

interface LandingShellProps {
  variant: LandingVariant;
  hero: Record<LandingVariant, HeroContent>;
  proofMetrics?: readonly { num: string; unit: string }[];
  magnet: Magnet;
  worksheetHref: string;
  submitLabel: string;
  children: ReactNode;
}

function HeroChecks({ checks }: { checks: readonly string[] }) {
  return (
    <ul className="lp-hero-checks">
      {checks.map((check) => (
        <li key={check}>{check}</li>
      ))}
    </ul>
  );
}

export function LandingShell({
  variant,
  hero,
  proofMetrics,
  magnet,
  worksheetHref,
  submitLabel,
  children,
}: LandingShellProps) {
  const content = hero[variant];

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
            <span className="lp-eyebrow">{content.eyebrow}</span>
            <h1 className="lp-h1">{content.title}</h1>
            <p className="lp-hero-lead">{content.lead}</p>

            {variant === "calculator" ? (
              <CostCalculator />
            ) : (
              proofMetrics !== undefined && (
                <div className="lp-metrics lp-hero-metrics">
                  {proofMetrics.map((metric) => (
                    <div className="lp-metric" key={metric.unit}>
                      <span className="lp-metric-num">{metric.num}</span>
                      <span className="lp-metric-unit">{metric.unit}</span>
                    </div>
                  ))}
                </div>
              )
            )}

            <HeroChecks checks={content.checks} />
            <p className="lp-trust">{content.trustLine}</p>
          </div>
          <div className="lp-hero-form" id="get">
            <OptInForm
              magnet={magnet}
              variant={variant}
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
          {variant === "proof" ? (
            // The number already led the page. Repeating it at the same volume
            // reads as padding, so this reinforces and points at the detail.
            <>
              <h2 className="lp-h2">
                The whole thing is <em>written up.</em>
              </h2>
              <p className="lp-p">
                Sixteen tasks, what each one cost before, what replaced it, and
                what broke along the way. Read it before you decide whether any
                of this applies to you.
              </p>
            </>
          ) : (
            <>
              <h2 className="lp-h2">
                $22.5k a month, <em>cut to $10k.</em>
              </h2>
              <p className="lp-p">
                DSI Transportation was spending $22,500 a month on recurring
                overhead. We deployed AI employees across sixteen recurring
                tasks and brought the operating bill to $10,000. Same output,
                seven days a week.
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
            </>
          )}
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
              variant={variant}
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
