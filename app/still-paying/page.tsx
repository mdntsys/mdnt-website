import type { Metadata } from "next";
import Link from "next/link";
import { HeroNav } from "../hero-nav";

export const metadata: Metadata = {
  title: "Still paying for that?",
  description:
    "You scanned the card. Here's what Midnite Systems does about the work your team still does by hand.",
  robots: { index: false, follow: true },
};

export default function StillPaying() {
  return (
    <>
      <HeroNav />

      <main className="page-shell">
        <section className="page-hero">
          <div className="section-inner">
            <div className="page-hero-header reveal">
              <span className="section-eyebrow">You scanned the card</span>
              <h1 className="page-h1">
                Still <em>paying</em> for that?
              </h1>
              <p className="page-lead">
                If Nic handed you this card, the two of you just talked
                about the work your team still does by hand. The
                follow-ups, the data entry, the status updates, the
                report someone assembles every Friday. This page is the
                follow-through.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="section-inner">
            <div className="detail-grid">
              <div className="detail-main reveal">
                <span className="section-eyebrow">The short version</span>
                <h2 className="detail-h2">
                  That work doesn&apos;t need a <em>hire.</em>
                </h2>
                <p className="detail-p">
                  Most of what eats an operating team&apos;s week is
                  recurring, rule-shaped, and beneath the judgment of the
                  people doing it. That is exactly the layer we replace.
                  We map your operation, find the tasks that
                  shouldn&apos;t need a human, then build and run AI
                  employees that take them over.
                </p>
                <p className="detail-p">
                  You keep the output. You stop paying the overhead. And
                  you don&apos;t manage any of it: every deployment runs
                  as a managed service, monitored and retrained as your
                  business changes.
                </p>
              </div>

              <aside className="detail-aside reveal reveal-delay-2">
                <div className="bezel-outer">
                  <div className="bezel-inner">
                    <span className="card-eyebrow">
                      The next <em>30 minutes</em>
                    </span>
                    <ul className="card-checklist">
                      <li>
                        A 30-minute call, no pitch deck and no obligation
                      </li>
                      <li>
                        We map where AI genuinely fits your operation
                      </li>
                      <li>
                        Honest build-vs-buy guidance, including SaaS we
                        don&apos;t sell
                      </li>
                      <li>
                        A clear first move, whether or not it involves us
                      </li>
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
              <span className="section-eyebrow">Proof, not promises</span>
              <h2 className="detail-h2">
                $22.5k a month, <em>cut to $10k.</em>
              </h2>
              <p className="detail-p">
                DSI Transportation was spending $22,500 a month on
                recurring overhead. We deployed AI employees across
                sixteen recurring tasks and brought the operating bill to
                $10,000. Same output, seven days a week.
              </p>
              <div className="detail-metrics">
                <div className="detail-metric">
                  <span className="detail-metric-num">$12,500</span>
                  <span className="detail-metric-unit">/mo saved</span>
                </div>
                <div className="detail-metric">
                  <span className="detail-metric-num">56%</span>
                  <span className="detail-metric-unit">overhead cut</span>
                </div>
                <div className="detail-metric">
                  <span className="detail-metric-num">4 wks</span>
                  <span className="detail-metric-unit">
                    to first live agent
                  </span>
                </div>
              </div>
              <Link
                href="/case-studies/dsi-transportation"
                className="btn-ghost card-cta"
              >
                Read the full case study
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        <section id="cta">
          <div className="section-inner">
            <div className="cta-bezel-outer reveal">
              <div className="cta-bezel-inner">
                <div className="cta-glow" />
                <h2 className="cta-h2">
                  Keep the card.
                  <br />
                  Book the <em>call.</em>
                </h2>
                <p className="cta-sub">
                  Thirty minutes with Nic. Bring the task that came up
                  when you got this card. We&apos;ll tell you honestly
                  whether it&apos;s worth automating.
                </p>
                <div className="cta-actions">
                  <Link href="/discovery" className="btn-primary">
                    Book a discovery call
                    <span className="icon-wrap">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
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
                  <a href="/nic-perez.vcf" className="btn-ghost" download>
                    Save Nic&apos;s contact
                  </a>
                </div>
                <p className="still-hint">
                  Or email{" "}
                  <a href="mailto:nic@midnitesystems.com">
                    nic@midnitesystems.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
