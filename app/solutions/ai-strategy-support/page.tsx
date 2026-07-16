import type { Metadata } from "next";
import Link from "next/link";
import { HeroNav } from "../../hero-nav";
import { pageOpenGraph } from "../../seo";

export const metadata: Metadata = {
  title: "AI Strategy Support",
  description:
    "Ongoing strategic consulting beyond the Roadmap. Available as dedicated hours or on-demand. Steady guidance as your business and the AI landscape evolve.",
  alternates: { canonical: "/solutions/ai-strategy-support" },
  openGraph: pageOpenGraph({
    title: "AI Strategy Support | Midnite Systems",
    description:
      "Ongoing strategic AI consulting beyond the Roadmap. Dedicated hours or on-demand.",
    url: "/solutions/ai-strategy-support",
  }),
};

export default function AIStrategySupport() {
  return (
    <>
      <HeroNav />

      <main className="page-shell">
        <section className="page-hero">
          <div className="section-inner">
            <Link href="/solutions" className="back-link reveal">
              ← All solutions
            </Link>
            <div className="page-hero-header reveal reveal-delay-1">
              <span className="section-eyebrow">
                Solution, strategy layer
              </span>
              <h1 className="page-h1">
                AI <em>Strategy</em> Support
              </h1>
              <p className="page-lead">
                Ongoing strategic consulting beyond the Roadmap. Available
                as dedicated hours or on-demand. Steady guidance as your
                business and the AI landscape evolve.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="section-inner">
            <div className="detail-grid">
              <div className="detail-main reveal">
                <span className="section-eyebrow">What it is</span>
                <h2 className="detail-h2">
                  An advisor on call, <em>not</em> a one-time deck.
                </h2>
                <p className="detail-p">
                  AI Strategy Support is ongoing access to Midnite as a
                  strategic partner. The Roadmap gives you a plan; AI
                  Strategy Support keeps the plan alive as your business,
                  your team, and the AI landscape change underneath it.
                </p>
                <p className="detail-p">
                  Engage by the dedicated hour or on-demand. Use the time
                  for vendor evaluation, internal AI initiative reviews,
                  buy-vs-build calls, or just thinking partner sessions
                  when you need someone to pressure-test a move.
                </p>
              </div>

              <aside className="detail-aside reveal reveal-delay-2">
                <div className="bezel-outer">
                  <div className="bezel-inner">
                    <span className="card-eyebrow">
                      When it&apos;s the <em>right call</em>
                    </span>
                    <ul className="card-checklist">
                      <li>
                        You have a Roadmap and want the same brain
                        available as you execute
                      </li>
                      <li>
                        Your team is evaluating new AI tools and needs an
                        outside opinion that isn&apos;t selling anything
                      </li>
                      <li>
                        Internal AI initiatives keep stalling and you want
                        steady, expert oversight
                      </li>
                      <li>
                        You aren&apos;t ready for a full build yet, but the
                        landscape moves too fast to ignore
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
              <span className="section-eyebrow">How it fits the Roadmap</span>
              <h2 className="detail-h2">
                What happens <em>after</em> the Roadmap.
              </h2>
              <p className="detail-p">
                Most clients pick up AI Strategy Support after the Roadmap,
                whether or not we&apos;re running deployments for them.
                It&apos;s the cleanest way to keep a strategic partner in
                your corner as the AI landscape shifts, without committing
                to a build.
              </p>
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
