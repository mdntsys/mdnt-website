import type { Metadata } from "next";
import Link from "next/link";
import { HeroNav } from "./hero-nav";
import { HeroParallax } from "./hero-parallax";
import { TrustBand } from "./trust-band";
import { ProcessJourney } from "./process-journey";
import { CaseStudy } from "./case-study";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <HeroNav />
      <HeroParallax />

      <main>
        <section id="hero">
          <div className="hero-ambient" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-grain" aria-hidden="true" />

          <div className="hero-content">
            <div className="hero-main">
              <h1 className="hero-h1">
                <span className="hero-h1-line">AI consultancy</span>
                <span className="hero-h1-line">and deployment for</span>
                <span className="hero-h1-line">
                  <em>growing</em> businesses
                </span>
              </h1>

              <p className="hero-sub">
                We don&apos;t just advise. We map your operation,
                identify where AI genuinely fits, then build, deploy, and
                run it for you as a managed service.
              </p>

              <div className="hero-actions">
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
                <a href="#process" className="btn-ghost">
                  How we work
                </a>
              </div>
            </div>

            <div className="hero-trust">
              <TrustBand />
            </div>
          </div>
        </section>


        <ProcessJourney />


        <section id="solutions">
          <div className="section-inner">
            <div className="solutions-header reveal">
              <span className="section-eyebrow">Solutions</span>
              <h2 className="solutions-h2">
                Three ways
                <br />
                we <em>implement</em>.
              </h2>
              <p className="section-lead">
                Once the Roadmap points the way, here&apos;s how MDNT
                delivers.
              </p>
            </div>

            <div className="solutions-grid">
              <div className="bezel-outer reveal reveal-delay-1">
                <div className="bezel-inner">
                  <div className="card-header">
                    <div className="service-icon service-icon-replace">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#F5A800"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                      </svg>
                    </div>
                    <span className="card-eyebrow">
                      The <em>role</em> layer
                    </span>
                  </div>
                  <h3 className="service-title">
                    Custom <em>Employee</em> Build
                  </h3>
                  <p className="card-solution">
                    Bespoke AI employees deployed across your operation:
                    admin, sales, accounting, ops. Junior to executive,
                    full-time or half-time.
                  </p>
                  <Link
                    href="/solutions/custom-employee-build"
                    className="btn-ghost card-cta"
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="bezel-outer reveal reveal-delay-2">
                <div className="bezel-inner">
                  <div className="card-header">
                    <div className="service-icon service-icon-empower">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#D4900A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                    </div>
                    <span className="card-eyebrow">
                      The <em>workspace</em> layer
                    </span>
                  </div>
                  <h3 className="service-title">
                    Custom <em>Workspace</em> Build
                  </h3>
                  <p className="card-solution">
                    A client-specific UI or internal portal connected to
                    the platform. Your team and AI employees working in
                    one unified place.
                  </p>
                  <Link
                    href="/solutions/custom-workspace-build"
                    className="btn-ghost card-cta"
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="bezel-outer reveal reveal-delay-3">
                <div className="bezel-inner">
                  <div className="card-header">
                    <div className="service-icon service-icon-replace">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#F5A800"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                      </svg>
                    </div>
                    <span className="card-eyebrow">
                      The <em>strategy</em> layer
                    </span>
                  </div>
                  <h3 className="service-title">
                    AI <em>Strategy</em> Support
                  </h3>
                  <p className="card-solution">
                    Ongoing strategic consulting beyond the Roadmap.
                    Dedicated hours or on-demand. Steady guidance as your
                    business and AI evolve.
                  </p>
                  <Link
                    href="/solutions/ai-strategy-support"
                    className="btn-ghost card-cta"
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="about">
          <div className="section-inner">
            <div className="about-photo reveal" aria-hidden="true">
              <div className="about-photo-placeholder">
                <span className="about-photo-label">
                  Founder photo placeholder
                </span>
                <span className="about-photo-sub">
                  Replace /public/founders.jpg
                </span>
              </div>
            </div>

            <div className="about-header reveal reveal-delay-1">
              <span className="section-eyebrow">Who we are</span>
              <h2 className="about-h2">
                Operators <em>first.</em>
                <br />
                Consultants second.
              </h2>
              <p className="about-sub">
                MDNT was built by people running operating businesses, not
                by advisors theorizing about them.
              </p>
            </div>

            <div className="about-grid">
              <div className="about-copy reveal reveal-delay-2">
                <h3 className="about-h3">
                  We&apos;re a small team running operating businesses
                  of our own.
                </h3>
                <p className="about-p">
                  The infrastructure, methodology, and AI employees
                  we&apos;ll deploy at your company are the same ones we
                  use to run our own work, every day.
                </p>
                <p className="about-p">
                  Our recommendations come from doing, not from reading.
                  Every approach we suggest has been deployed somewhere
                  already, by us, at our own risk first.
                </p>
                <p className="about-byline">
                  {/* TODO_NAME: swap once founders are confirmed */}
                  Nic Perez, CEO &nbsp;·&nbsp; {"{CTO Name}"}, CTO
                </p>
              </div>

              <ul className="about-pillars reveal reveal-delay-3">
                <li className="about-pillar">
                  <span className="about-pillar-num">01</span>
                  <h4 className="about-pillar-title">
                    We operate before we advise.
                  </h4>
                </li>
                <li className="about-pillar">
                  <span className="about-pillar-num">02</span>
                  <h4 className="about-pillar-title">
                    We use what we recommend.
                  </h4>
                </li>
                <li className="about-pillar">
                  <span className="about-pillar-num">03</span>
                  <h4 className="about-pillar-title">
                    We deploy what we build.
                  </h4>
                </li>
              </ul>
            </div>
          </div>
        </section>


        <section id="case-studies">
          <div className="section-inner">
            <div className="solutions-header reveal">
              <span className="section-eyebrow">Case studies</span>
              <h2 className="solutions-h2">
                The work behind
                <br />
                the <em>claims</em>.
              </h2>
              <p className="section-lead">
                One featured engagement, then three more across the
                solution set.
              </p>
            </div>
          </div>

          <CaseStudy />

          <div className="section-inner">
            <div className="case-grid-compact">
              <Link
                href="/case-studies/vellum-creative"
                className="case-compact reveal reveal-delay-1"
              >
                <div className="case-compact-inner">
                  <div className="case-compact-head">
                    <span className="case-compact-eyebrow">
                      Custom Employee Build
                    </span>
                    <span className="case-compact-arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                  <h3 className="case-compact-title">Vellum Creative</h3>
                  <p className="case-compact-blurb">
                    Deployed an AI account coordinator across 12 retainer
                    accounts. Replaces the admin layer between senior
                    strategists and clients.
                  </p>
                  <div className="case-compact-metrics">
                    <div className="case-compact-metric">
                      <span className="case-compact-num">180</span>
                      <span className="case-compact-unit">hrs/mo</span>
                    </div>
                    <div className="case-compact-metric">
                      <span className="case-compact-num">$7,200</span>
                      <span className="case-compact-unit">/mo saved</span>
                    </div>
                    <div className="case-compact-metric">
                      <span className="case-compact-num">+30%</span>
                      <span className="case-compact-unit">retainer load</span>
                    </div>
                  </div>
                  <blockquote className="case-compact-quote">
                    &ldquo;Our strategists stopped writing status emails
                    at 11 PM. That alone paid for it.&rdquo;
                    <cite>Maria Sandoval, Director of Operations</cite>
                  </blockquote>
                </div>
              </Link>

              <Link
                href="/case-studies/stratacore-holdings"
                className="case-compact reveal reveal-delay-2"
              >
                <div className="case-compact-inner">
                  <div className="case-compact-head">
                    <span className="case-compact-eyebrow">
                      Custom Workspace Build
                    </span>
                    <span className="case-compact-arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                  <h3 className="case-compact-title">
                    Stratacore Holdings
                  </h3>
                  <p className="case-compact-blurb">
                    One internal workspace covering 3 portfolio
                    companies. AI agents and human team in the same UI.
                    Replaced a stack of disconnected SaaS tools.
                  </p>
                  <div className="case-compact-metrics">
                    <div className="case-compact-metric">
                      <span className="case-compact-num">$4,400</span>
                      <span className="case-compact-unit">/mo cut</span>
                    </div>
                    <div className="case-compact-metric">
                      <span className="case-compact-num">12</span>
                      <span className="case-compact-unit">hrs/wk CFO</span>
                    </div>
                    <div className="case-compact-metric">
                      <span className="case-compact-num">1</span>
                      <span className="case-compact-unit">unified portal</span>
                    </div>
                  </div>
                  <blockquote className="case-compact-quote">
                    &ldquo;I went from running three companies in five
                    tabs to running three companies in one.&rdquo;
                    <cite>James Chen, CFO</cite>
                  </blockquote>
                </div>
              </Link>

              <Link
                href="/case-studies/pemberton-industrial"
                className="case-compact reveal reveal-delay-3"
              >
                <div className="case-compact-inner">
                  <div className="case-compact-head">
                    <span className="case-compact-eyebrow">
                      AI Strategy Support
                    </span>
                    <span className="case-compact-arrow" aria-hidden="true">
                      →
                    </span>
                  </div>
                  <h3 className="case-compact-title">
                    Pemberton Industrial
                  </h3>
                  <p className="case-compact-blurb">
                    Monthly strategy retainer through a year of AI vendor
                    evaluations. Buy-vs-build calls, due diligence,
                    sequencing.
                  </p>
                  <div className="case-compact-metrics">
                    <div className="case-compact-metric">
                      <span className="case-compact-num">$180k</span>
                      <span className="case-compact-unit">SaaS avoided</span>
                    </div>
                    <div className="case-compact-metric">
                      <span className="case-compact-num">3</span>
                      <span className="case-compact-unit">priority builds</span>
                    </div>
                    <div className="case-compact-metric">
                      <span className="case-compact-num">2</span>
                      <span className="case-compact-unit">commissioned</span>
                    </div>
                  </div>
                  <blockquote className="case-compact-quote">
                    &ldquo;Midnite told us <em>not</em> to buy three of
                    the tools we were pricing. That&apos;s the meeting
                    that won me.&rdquo;
                    <cite>Linda Patel, COO</cite>
                  </blockquote>
                </div>
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
                  Ready to build
                  <br />
                  at <em>Midnite?</em>
                </h2>
                <p className="cta-sub">
                  Tell us where your business is headed. We&apos;ll map
                  the Roadmap and run the systems that get you there.
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
                  <a
                    href="mailto:nic@midnitesystems.com"
                    className="btn-ghost"
                  >
                    Email us
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
