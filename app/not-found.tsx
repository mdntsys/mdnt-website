import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="notfound">
      <div className="section-inner notfound-inner">
        <span className="section-eyebrow">404</span>
        <h1 className="notfound-h1">
          Nothing <em>here</em> yet.
        </h1>
        <p className="notfound-sub">
          The page you&apos;re looking for has moved or was never deployed.
        </p>
        <div className="notfound-actions">
          <Link href="/" className="btn-primary">
            Back to home
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
          <a
            href="mailto:nic@midnitesystems.com"
            className="btn-ghost"
          >
            Contact us
          </a>
        </div>
      </div>
    </main>
  );
}
