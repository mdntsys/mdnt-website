import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ReactDOM from "react-dom";
import { CalEmbed } from "./cal-embed";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Book a discovery call with Midnite Systems to map the highest-leverage AI deployment opportunities inside your business.",
  alternates: { canonical: "/discovery" },
  openGraph: {
    title: "Book a Discovery Call | Midnite Systems",
    description:
      "30 minutes to map the highest-leverage AI deployment opportunities inside your business.",
    url: "/discovery",
    type: "website",
  },
};

export default function Discovery() {
  ReactDOM.preconnect("https://app.cal.com", { crossOrigin: "anonymous" });
  ReactDOM.preconnect("https://cal.com", { crossOrigin: "anonymous" });
  ReactDOM.prefetchDNS("https://app.cal.com");
  ReactDOM.prefetchDNS("https://cal.com");
  ReactDOM.preload("https://app.cal.com/embed/embed.js", { as: "script" });

  return (
    <main className="discovery">
      <div className="discovery-topbar">
        <Link
          href="/"
          className="discovery-logo-link"
          aria-label="Midnite Systems home"
        >
          <Image
            src="/mdnt-favicon.png"
            alt="Midnite Systems"
            width={36}
            height={36}
            priority
            className="discovery-logo-img"
          />
        </Link>
      </div>

      <div className="section-inner discovery-inner">
        <div className="discovery-header">
          <span className="section-eyebrow">Discovery Call</span>
          <h1 className="discovery-h1">
            Let&apos;s see if we&apos;re a <em>fit</em>.
          </h1>
          <p className="discovery-sub">
            Pick a time that works. We&apos;ll talk through where your
            business is headed and where AI deployment can pull the most
            weight, with no pitch deck and no obligation.
          </p>
        </div>

        <div className="discovery-cal-bezel-outer">
          <div className="discovery-cal-bezel-inner">
            <CalEmbed />
          </div>
        </div>

        <p className="discovery-fallback">
          Calendar not loading? Email{" "}
          <a href="mailto:nic@midnitesystems.com">nic@midnitesystems.com</a>
          {" "}or book directly at{" "}
          <a
            href="https://cal.com/nicolas-perez-ye8jb3/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            cal.com/nicolas-perez-ye8jb3
          </a>
          .
        </p>
      </div>
    </main>
  );
}
