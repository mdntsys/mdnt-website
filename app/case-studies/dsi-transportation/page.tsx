import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { HeroNav } from "../../hero-nav";

export const metadata: Metadata = {
  title: "DSI Transportation",
  description:
    "How Midnite cut DSI Transportation's monthly operating overhead from $22,500 to $10,000 by replacing 16 recurring tasks with AI employees running 7 days a week.",
  alternates: { canonical: "/case-studies/dsi-transportation" },
  openGraph: {
    title: "DSI Transportation | Midnite Systems Case Study",
    description:
      "$22,500/mo to $10,000/mo. 16 tasks replaced. 7 days a week.",
    url: "/case-studies/dsi-transportation",
    type: "article",
  },
};

export default function DSITransportation() {
  return (
    <>
      <HeroNav />

      <main className="page-shell">
        <section className="page-hero">
          <div className="section-inner">
            <Link href="/#case-studies" className="back-link reveal">
              ← All case studies
            </Link>
            <div className="page-hero-header reveal reveal-delay-1">
              <span className="section-eyebrow">
                Case study · Custom Employee Build
              </span>
              <a
                href="https://dsitransportation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="case-client case-client--detail"
                aria-label="Visit DSI Transportation"
              >
                <Image
                  src="/dsi-logo.png"
                  alt="DSI Transportation"
                  width={500}
                  height={300}
                  className="case-client-logo"
                />
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 11 11"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8l5-5M4 3h4v4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <h1 className="page-h1">
                $22.5k a month,
                <br />
                <em>cut to $10k.</em>
              </h1>
              <p className="page-lead">
                DSI Transportation was burning $22,500 a month on
                recurring overhead across their operation. We took
                sixteen recurring tasks off their plate and brought the
                operating bill to $10,000. Same output. Seven days a
                week.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="section-inner">
            <div className="detail-grid">
              <div className="detail-main reveal">
                <span className="section-eyebrow">The setup</span>
                <h2 className="detail-h2">
                  An operating team buried in <em>recurring work.</em>
                </h2>
                <p className="detail-p">
                  DSI runs a national transportation operation with a
                  small back office. By the time they came to us, their
                  team was spending an outsized portion of each week on
                  the same sixteen recurring tasks: dispatch coordination
                  notes, carrier confirmations, customer status replies,
                  invoice triage, and a long tail of small but daily
                  obligations.
                </p>
                <p className="detail-p">
                  None of it required judgment their people weren&apos;t
                  capable of. All of it required *time* their people
                  didn&apos;t have to give.
                </p>
              </div>

              <aside className="detail-aside reveal reveal-delay-2">
                <div className="bezel-outer">
                  <div className="bezel-inner">
                    <span className="card-eyebrow">
                      At a <em>glance</em>
                    </span>
                    <ul className="card-checklist">
                      <li>Industry: Transportation &amp; logistics</li>
                      <li>Engagement: Custom Employee Build (managed)</li>
                      <li>Tasks replaced: 16</li>
                      <li>Time to first live agent: 4 weeks</li>
                      <li>Coverage: 7 days/week, 24/7/365</li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="page-section page-section--alt">
          <div className="section-inner">
            <div className="detail-roadmap reveal">
              <span className="section-eyebrow">What we built</span>
              <h2 className="detail-h2">
                A team of AI employees inside the <em>operation.</em>
              </h2>
              <p className="detail-p">
                We started with the Roadmap. We mapped DSI&apos;s
                operation end to end, ranked the sixteen highest-leverage
                recurring tasks, and deployed the first live AI employee
                inside four weeks.
              </p>
              <p className="detail-p">
                The deployment now sits on the managed operating layer
                we run for them: monitoring, retraining, and continuous
                improvement. They get the outcome, we handle the
                operating layer. The work runs through the same hours
                their humans don&apos;t.
              </p>
              <div className="detail-metrics">
                <div className="detail-metric">
                  <span className="detail-metric-num">$12,500</span>
                  <span className="detail-metric-unit">/mo saved</span>
                </div>
                <div className="detail-metric">
                  <span className="detail-metric-num">$150,000</span>
                  <span className="detail-metric-unit">annualized</span>
                </div>
                <div className="detail-metric">
                  <span className="detail-metric-num">56%</span>
                  <span className="detail-metric-unit">overhead cut</span>
                </div>
              </div>
              <Link href="/discovery" className="btn-primary">
                Book a discovery call
                <span className="icon-wrap">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6h7M6.5 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
