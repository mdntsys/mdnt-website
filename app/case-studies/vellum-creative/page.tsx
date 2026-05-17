import type { Metadata } from "next";
import Link from "next/link";
import { HeroNav } from "../../hero-nav";

export const metadata: Metadata = {
  title: "Vellum Creative",
  description:
    "How Midnite freed Vellum Creative's senior team from 180 hours of monthly admin by deploying an AI account coordinator across 12 retainer accounts.",
  alternates: { canonical: "/case-studies/vellum-creative" },
  openGraph: {
    title: "Vellum Creative | Midnite Systems Case Study",
    description:
      "180 hrs/month reclaimed. $7,200/mo saved. 30% more retainer load.",
    url: "/case-studies/vellum-creative",
    type: "article",
  },
};

export default function VellumCreative() {
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
              <h1 className="page-h1">
                Vellum Creative,
                <br />
                <em>180 hours back.</em>
              </h1>
              <p className="page-lead">
                A mid-market marketing agency, drowning in the
                administrative tissue between senior strategists and
                their twelve retainer clients. We deployed an AI account
                coordinator. Their best people stopped writing status
                emails at 11 PM.
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
                  Twelve retainers, two senior strategists, and an
                  <em> admin layer</em> eating both of them.
                </h2>
                <p className="detail-p">
                  Vellum runs twelve active retainer accounts at any
                  given time. The two senior strategists who do the
                  thinking were also writing weekly recap emails,
                  building status decks, drafting kickoff agendas,
                  reconciling timesheets against scope, and answering the
                  same client questions they&apos;d already answered last
                  month.
                </p>
                <p className="detail-p">
                  Hiring a third strategist wasn&apos;t the move. The
                  work doesn&apos;t need a third strategist. It needs
                  someone (or something) handling the layer underneath.
                </p>
              </div>

              <aside className="detail-aside reveal reveal-delay-2">
                <div className="bezel-outer">
                  <div className="bezel-inner">
                    <span className="card-eyebrow">
                      At a <em>glance</em>
                    </span>
                    <ul className="card-checklist">
                      <li>Industry: Marketing &amp; creative services</li>
                      <li>Engagement: Custom Employee Build (managed)</li>
                      <li>Role replaced: Account coordinator</li>
                      <li>Retainer accounts covered: 12</li>
                      <li>Time to first live agent: 5 weeks</li>
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
                An AI account coordinator that does the work the
                <em> strategists were stuck doing.</em>
              </h2>
              <p className="detail-p">
                We trained a Custom Employee on Vellum&apos;s voice,
                client history, and process. It now drafts the weekly
                recaps, builds the status decks, queues the kickoff
                materials, and answers the recurring client questions.
                The senior team reviews and ships, instead of writing
                from scratch.
              </p>
              <p className="detail-p">
                The coordinator runs on our managed operating layer.
                Vellum&apos;s strategists got their evenings back. The
                agency took on 30% more retainer load without adding
                headcount.
              </p>
              <div className="detail-metrics">
                <div className="detail-metric">
                  <span className="detail-metric-num">180</span>
                  <span className="detail-metric-unit">hrs/mo reclaimed</span>
                </div>
                <div className="detail-metric">
                  <span className="detail-metric-num">$7,200</span>
                  <span className="detail-metric-unit">/mo saved</span>
                </div>
                <div className="detail-metric">
                  <span className="detail-metric-num">+30%</span>
                  <span className="detail-metric-unit">retainer load</span>
                </div>
              </div>
              <blockquote className="detail-quote">
                &ldquo;Our strategists stopped writing status emails at
                11 PM. That alone paid for it.&rdquo;
                <cite>Maria Sandoval, Director of Operations</cite>
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
