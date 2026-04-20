import Image from "next/image";
import { RevealObserver } from "./reveal-observer";

export default function Home() {
  return (
    <>
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <nav>
        <div className="nav-pill">
          <Image
            src="/mdnt-favicon.png"
            alt="Midnite Systems"
            width={36}
            height={36}
            priority
            className="nav-logo-img"
          />
          <ul className="nav-links">
            <li>
              <a href="#solutions">Solutions</a>
            </li>
            <li>
              <a href="#consulting">Consulting</a>
            </li>
            <li>
              <a href="#why">Why</a>
            </li>
            <li>
              <a href="#cta">Contact</a>
            </li>
          </ul>
          <a href="#cta" className="nav-cta">
            Get Started
          </a>
        </div>
      </nav>

      <main>
        <section id="hero">
          <div className="hero-grid" />

          <span className="hero-eyebrow">AI Deployment Agency</span>

          <h1 className="hero-h1">
            Custom AI
            <br />
            Deployment for
            <br />
            <em>growing</em> businesses
          </h1>

          <p className="hero-sub">
            We integrate AI inside your organization the way a great operator
            would. Replace repetitive workflows bleeding your team, or upgrade
            the people you already have with the tools they&apos;ve been
            missing.
          </p>

          <div className="hero-actions">
            <a href="#solutions" className="btn-primary">
              Explore Solutions
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
            </a>
            <a href="#why" className="btn-ghost">
              How we work
            </a>
          </div>

          <div className="scroll-hint">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        <div className="divider" />

        <section id="solutions">
          <div className="section-inner">
            <div className="solutions-header reveal">
              <div>
                <span className="section-eyebrow">Our Solutions</span>
                <h2 className="solutions-h2">
                  Two paths.
                  <br />
                  One <em>deployment</em> partner.
                </h2>
              </div>
              <p className="solutions-desc reveal reveal-delay-1">
                Two deployment paths, engineered to compound. Replace the
                workflows slowing your operation, or empower the team you
                already have.
              </p>
            </div>

            <div className="branches-grid">
              <div className="branch-column reveal reveal-delay-1">
                <div className="branch-label branch-replace">
                  <span className="branch-dot" />
                  Replacing Personnel
                </div>

                <div className="branch-cards">
                  <div className="bezel-outer">
                    <div className="bezel-inner">
                      <div className="service-number">01</div>
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
                          <path d="M21 12a9 9 0 1 1-9-9c2.5 0 4.8 1 6.5 2.6" />
                          <polyline points="21 3 21 9 15 9" />
                        </svg>
                      </div>
                      <h3 className="service-title">
                        Agentic &amp; Automated Solutions
                      </h3>
                      <p className="service-desc">
                        Autonomous agents that handle repetitive work end to
                        end, from lead qualification to data entry, so your
                        team never touches the busywork again.
                      </p>
                      <span className="card-tag">Automation</span>
                    </div>
                  </div>

                  <div className="bezel-outer">
                    <div className="bezel-inner">
                      <div className="service-number">02</div>
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
                      <h3 className="service-title">
                        Build Your Dream Employee
                      </h3>
                      <p className="service-desc">
                        Custom-trained AI agents built around the exact role
                        you&apos;d hire for. A tireless specialist that
                        onboards in days, not months, and never churns.
                      </p>
                      <span className="card-tag">Custom Agents</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="branch-column reveal reveal-delay-2">
                <div className="branch-label branch-empower">
                  <span className="branch-dot" />
                  Empowering Personnel
                </div>

                <div className="branch-cards">
                  <div className="bezel-outer">
                    <div className="bezel-inner">
                      <div className="service-number">03</div>
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
                      <h3 className="service-title">Customized Platforms</h3>
                      <p className="service-desc">
                        Internal tools built around how your team actually
                        works, not bent to fit off-the-shelf SaaS. The software
                        your operation has been asking for.
                      </p>
                      <span className="card-tag">Internal Tools</span>
                    </div>
                  </div>

                  <div className="bezel-outer">
                    <div className="bezel-inner">
                      <div className="service-number">04</div>
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
                          <line x1="6" y1="20" x2="6" y2="16" />
                          <line x1="12" y1="20" x2="12" y2="10" />
                          <line x1="18" y1="20" x2="18" y2="4" />
                        </svg>
                      </div>
                      <h3 className="service-title">
                        Customized Reporting Solutions
                      </h3>
                      <p className="service-desc">
                        Dashboards and reports engineered around the numbers
                        you actually make decisions on. Real-time clarity, zero
                        spreadsheet archaeology.
                      </p>
                      <span className="card-tag">Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        <section id="consulting">
          <div className="section-inner">
            <div className="consulting-header reveal">
              <span className="section-eyebrow">Additional Service</span>
            </div>

            <div className="bezel-outer consulting-bezel reveal reveal-delay-1">
              <div className="bezel-inner consulting-inner">
                <div className="consulting-icon service-icon service-icon-replace">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#F5A800"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18h6" />
                    <path d="M10 22h4" />
                    <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
                  </svg>
                </div>
                <div className="consulting-copy">
                  <h3 className="consulting-title">AI Consulting</h3>
                  <p className="service-desc">
                    Not ready to deploy? Start with a strategy session. We
                    audit your workflows, identify the highest-leverage AI
                    opportunities, and map a deployment plan you can act on,
                    with or without us.
                  </p>
                </div>
                <a href="#cta" className="btn-ghost consulting-cta">
                  Book a session
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        <section id="why">
          <div className="section-inner">
            <div className="why-grid">
              <div>
                <span className="section-eyebrow reveal">
                  Why Midnite Systems
                </span>
                <h2 className="why-h2 reveal reveal-delay-1">
                  Obsessed with
                  <br />
                  <em>outcomes,</em>
                  <br />
                  not deliverables.
                </h2>
                <p className="why-p reveal reveal-delay-2">
                  Most agencies ship work and move on. We architect systems
                  that compound, where every AI deployment makes the next one
                  sharper and every workflow we touch gets easier for your
                  team to run.
                </p>

                <ul className="pillar-list">
                  <li className="pillar-item reveal reveal-delay-2">
                    <span className="pillar-num">01</span>
                    <div className="pillar-content">
                      <h3>Built for Real Operations</h3>
                      <p>
                        Every deployment is engineered for the real complexity
                        of running a growing business: security, reliability,
                        and scale without the enterprise bloat.
                      </p>
                    </div>
                  </li>
                  <li className="pillar-item reveal reveal-delay-3">
                    <span className="pillar-num">02</span>
                    <div className="pillar-content">
                      <h3>Full-Stack Ownership</h3>
                      <p>
                        From strategy through deployment and optimization, we
                        own the outcome. One partner. Zero handoff friction.
                      </p>
                    </div>
                  </li>
                  <li className="pillar-item reveal reveal-delay-4">
                    <span className="pillar-num">03</span>
                    <div className="pillar-content">
                      <h3>AI-Native by Default</h3>
                      <p>
                        We don&apos;t bolt AI onto existing workflows. We
                        design with intelligence as a first-class citizen at
                        every layer.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="stats-grid reveal reveal-delay-2">
                <div className="stat-cell">
                  <div className="stat-number">B2B</div>
                  <div className="stat-label">Deployment focused</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-number">2</div>
                  <div className="stat-label">Deployment paths</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Scalable</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-number">AI</div>
                  <div className="stat-label">Native by default</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        <section id="cta">
          <div className="section-inner">
            <div className="cta-bezel-outer reveal">
              <div className="cta-bezel-inner">
                <div className="cta-glow" />
                <h2 className="cta-h2">
                  Ready to build
                  <br />
                  <em>at midnight?</em>
                </h2>
                <p className="cta-sub">
                  Tell us where your business is headed. We&apos;ll deploy the
                  AI systems to get you there faster.
                </p>
                <div className="cta-actions">
                  <a
                    href="mailto:nic@midnitesystems.com"
                    className="btn-primary"
                  >
                    Start a Conversation
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
                  </a>
                  <a href="tel:+1" className="btn-ghost">
                    Schedule a Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <Image
            src="/mdnt-favicon.png"
            alt="Midnite Systems"
            width={28}
            height={28}
            className="footer-logo-img"
          />
          <ul className="footer-links">
            <li>
              <a href="#solutions">Solutions</a>
            </li>
            <li>
              <a href="#consulting">Consulting</a>
            </li>
            <li>
              <a href="#why">Why</a>
            </li>
            <li>
              <a href="#cta">Contact</a>
            </li>
          </ul>
          <span className="footer-copy">© 2026 Midnite Systems</span>
        </div>
      </footer>

      <RevealObserver />
    </>
  );
}
