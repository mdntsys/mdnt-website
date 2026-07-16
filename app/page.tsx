import type { Metadata } from "next";
import Link from "next/link";
import { HeroNav } from "./hero-nav";
import { HeroParallax } from "./hero-parallax";
import { TrustBand } from "./trust-band";
import { ProcessJourney } from "./process-journey";
import { SolutionsCards } from "./solutions-cards";
import { CaseStudy } from "./case-study";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const FAQS = [
  {
    q: "What does Midnite Systems actually do?",
    a: "Midnite Systems is an AI consultancy and deployment agency for growing businesses. We map your operation with the Roadmap, build the AI that genuinely fits, then run it for you as a managed service. The work takes three forms: AI employees deployed into your operation, custom workspaces where your team and AI work together, and ongoing strategy support.",
  },
  {
    q: "What is the Roadmap?",
    a: "The Roadmap is how every engagement starts. We audit your operation, identify where AI genuinely fits, and hand you a written plan: prioritized opportunities, build-vs-buy guidance, sequencing, and budget framing. It is yours to act on with us or on your own.",
  },
  {
    q: "Do AI employees replace our team?",
    a: "They replace tasks, not judgment. The work we take over is recurring, rule-shaped, and below the level your people should be operating at. At DSI Transportation, sixteen recurring tasks moved to AI employees, and the people who had been doing them got their week back.",
  },
  {
    q: "What if off-the-shelf software already solves our problem?",
    a: "Then we tell you to buy it. The Roadmap recommends whatever fits, including SaaS we don't sell. We only recommend a custom build where custom clearly wins.",
  },
  {
    q: "How fast can something be live?",
    a: "At DSI Transportation, the first live AI employee was running four weeks after the Roadmap. Timelines depend on scope, but we build in weeks, not quarters.",
  },
  {
    q: "Who runs what you build?",
    a: "We do. Every deployment sits on the managed operating layer we run: monitoring, retraining, and continuous improvement. You get the outcome, we handle the upkeep.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
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

            <SolutionsCards />
          </div>
        </section>


        <section id="about">
          <div className="section-inner">
            <div className="about-photo reveal" aria-hidden="true">
              <div className="about-photo-placeholder">
                <span className="about-photo-label">
                  Founder photo placeholder
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
                <p className="about-byline">Nic Perez, CEO</p>
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
                One engagement, documented end to end. Real client, real
                numbers, still running today.
              </p>
            </div>
          </div>

          <CaseStudy />
        </section>


        <section id="faq">
          <div className="section-inner">
            <div className="solutions-header reveal">
              <span className="section-eyebrow">Common questions</span>
              <h2 className="solutions-h2">
                Asked before
                <br />
                every <em>engagement</em>.
              </h2>
              <p className="section-lead">
                The questions that come up on nearly every discovery
                call, answered straight.
              </p>
            </div>

            <dl className="faq-list">
              {FAQS.map((f, i) => (
                <div
                  key={f.q}
                  className={`faq-item reveal reveal-delay-${Math.min(i + 1, 5)}`}
                >
                  <dt className="faq-q">{f.q}</dt>
                  <dd className="faq-a">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqStructuredData),
            }}
          />
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
