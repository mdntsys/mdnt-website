import type { Metadata } from "next";
import Link from "next/link";
import { HeroNav } from "../../hero-nav";

export const metadata: Metadata = {
  title: "Pemberton Industrial",
  description:
    "How Midnite saved Pemberton Industrial $180k in wrong-fit SaaS commitments through a year of strategic AI advisory and helped them sequence three priority builds.",
  alternates: { canonical: "/case-studies/pemberton-industrial" },
  openGraph: {
    title: "Pemberton Industrial | Midnite Systems Case Study",
    description:
      "$180k in wrong-fit SaaS avoided. 3 priority builds identified. The meeting that won the COO.",
    url: "/case-studies/pemberton-industrial",
    type: "article",
  },
};

export default function PembertonIndustrial() {
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
                Case study · AI Strategy Support
              </span>
              <h1 className="page-h1">
                $180k in SaaS,
                <br />
                <em>politely declined.</em>
              </h1>
              <p className="page-lead">
                Pemberton Industrial, a regional B2B distributor, was
                being pitched seventeen AI tools across one fiscal year.
                We took the retainer, told them which three to consider,
                and which fourteen to ignore.
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
                  Vendor fatigue meets <em>real budget.</em>
                </h2>
                <p className="detail-p">
                  Pemberton&apos;s leadership team had decided AI mattered
                  to their next five years. They started taking meetings.
                  By month four, the COO had a spreadsheet of seventeen
                  vendors, dozens of demos, and a quarterly budget cycle
                  closing in.
                </p>
                <p className="detail-p">
                  They needed someone in the room who wasn&apos;t selling
                  anything. They didn&apos;t want another Roadmap, they
                  wanted ongoing pressure-testing as decisions came up.
                </p>
              </div>

              <aside className="detail-aside reveal reveal-delay-2">
                <div className="bezel-outer">
                  <div className="bezel-inner">
                    <span className="card-eyebrow">
                      At a <em>glance</em>
                    </span>
                    <ul className="card-checklist">
                      <li>Industry: B2B distribution</li>
                      <li>Engagement: AI Strategy Support (retainer)</li>
                      <li>Engagement length: 12 months ongoing</li>
                      <li>Vendor evaluations covered: 17</li>
                      <li>Decisions overturned: 4</li>
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
              <span className="section-eyebrow">What we did</span>
              <h2 className="detail-h2">
                A standing seat at the table, not a one-time
                <em> deck.</em>
              </h2>
              <p className="detail-p">
                Pemberton bought the retainer. Every month, we sit in on
                vendor pitches, run buy-vs-build math, pressure-test
                rollout plans, and translate AI roadmap claims into real
                operational risk. When something would be wrong-fit, we
                say so before they commit, not after.
              </p>
              <p className="detail-p">
                Of the seventeen vendors they evaluated, we backed three.
                The other fourteen would have cost Pemberton $180,000 in
                annual contract value collectively, and produced
                marginal returns. Two of the three priority builds
                Pemberton commissioned afterward were ones we built for
                them as Custom Employee deployments.
              </p>
              <div className="detail-metrics">
                <div className="detail-metric">
                  <span className="detail-metric-num">$180k</span>
                  <span className="detail-metric-unit">SaaS avoided</span>
                </div>
                <div className="detail-metric">
                  <span className="detail-metric-num">3</span>
                  <span className="detail-metric-unit">priority builds</span>
                </div>
                <div className="detail-metric">
                  <span className="detail-metric-num">2</span>
                  <span className="detail-metric-unit">commissioned</span>
                </div>
              </div>
              <blockquote className="detail-quote">
                &ldquo;Midnite told us <em>not</em> to buy three of the
                tools we were already pricing. That&apos;s the meeting
                that won me.&rdquo;
                <cite>Linda Patel, COO</cite>
              </blockquote>
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
