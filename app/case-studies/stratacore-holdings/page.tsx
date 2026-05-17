import type { Metadata } from "next";
import Link from "next/link";
import { HeroNav } from "../../hero-nav";

export const metadata: Metadata = {
  title: "Stratacore Holdings",
  description:
    "How Midnite consolidated 7 SaaS tools into one custom workspace for Stratacore Holdings, putting AI agents and the human team in the same UI across 3 portfolio companies.",
  alternates: { canonical: "/case-studies/stratacore-holdings" },
  openGraph: {
    title: "Stratacore Holdings | Midnite Systems Case Study",
    description:
      "$4,400/mo in killed SaaS. 12 CFO hours back per week. One unified workspace for 3 companies.",
    url: "/case-studies/stratacore-holdings",
    type: "article",
  },
};

export default function StratacoreHoldings() {
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
                Case study · Custom Workspace Build
              </span>
              <h1 className="page-h1">
                Three companies,
                <br />
                <em>one workspace.</em>
              </h1>
              <p className="page-lead">
                Stratacore Holdings runs three portfolio companies out of
                a shared back office. They had three of every tool, three
                sets of dashboards, and a CFO running it all out of five
                browser tabs. We collapsed it into one custom workspace.
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
                  Tool sprawl was the operating <em>tax.</em>
                </h2>
                <p className="detail-p">
                  Each of Stratacore&apos;s three portfolio companies had
                  evolved its own stack: separate accounting software,
                  separate CRMs, separate analytics, separate document
                  hubs. None of it talked to each other. Reporting day
                  meant downloading CSVs, reconciling in spreadsheets,
                  and emailing PDFs.
                </p>
                <p className="detail-p">
                  The CFO was losing twelve hours every week to
                  reconciliation work that should have been a query, not
                  a workflow.
                </p>
              </div>

              <aside className="detail-aside reveal reveal-delay-2">
                <div className="bezel-outer">
                  <div className="bezel-inner">
                    <span className="card-eyebrow">
                      At a <em>glance</em>
                    </span>
                    <ul className="card-checklist">
                      <li>Industry: Operating group / holdings</li>
                      <li>Engagement: Custom Workspace Build</li>
                      <li>Portfolio companies unified: 3</li>
                      <li>SaaS tools consolidated: 7</li>
                      <li>Time to launch: 9 weeks</li>
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
                One internal portal. Three companies. AI agents inside
                the <em>same UI</em> as the team.
              </h2>
              <p className="detail-p">
                We built Stratacore a custom workspace sitting on top of
                the Midnite platform. Cross-company financials,
                consolidated reporting, document intake, and a shared
                operations queue all live in one place. AI agents handle
                reconciliation, intake routing, and the recurring
                reports. The human team reviews, approves, and acts.
              </p>
              <p className="detail-p">
                Seven SaaS subscriptions got cancelled. The CFO&apos;s
                reconciliation work compressed into a Friday morning
                instead of half a week.
              </p>
              <div className="detail-metrics">
                <div className="detail-metric">
                  <span className="detail-metric-num">$4,400</span>
                  <span className="detail-metric-unit">/mo SaaS killed</span>
                </div>
                <div className="detail-metric">
                  <span className="detail-metric-num">12</span>
                  <span className="detail-metric-unit">hrs/wk CFO time</span>
                </div>
                <div className="detail-metric">
                  <span className="detail-metric-num">7→1</span>
                  <span className="detail-metric-unit">tools → workspace</span>
                </div>
              </div>
              <blockquote className="detail-quote">
                &ldquo;I went from running three companies in five tabs
                to running three companies in one.&rdquo;
                <cite>James Chen, CFO</cite>
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
