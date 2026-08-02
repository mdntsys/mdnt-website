import type { Metadata } from "next";
import { BookingWidget } from "./booking-widget";
import { HeroNav } from "../hero-nav";
import { pageOpenGraph } from "../seo";

export const metadata: Metadata = {
  title: "Book a Discovery Call",
  description:
    "Book a fifteen minute qualification call with Midnite Systems to map the highest-leverage AI deployment opportunities inside your business.",
  alternates: { canonical: "/discovery" },
  openGraph: pageOpenGraph({
    title: "Book a Discovery Call | Midnite Systems",
    description:
      "Fifteen minutes to map the highest-leverage AI deployment opportunities inside your business.",
    url: "/discovery",
  }),
};

export default function Discovery() {
  return (
    <>
      <HeroNav />
      <main className="discovery">
        <div className="section-inner discovery-inner">
        <div className="discovery-header">
          <span className="section-eyebrow">Discovery Call</span>
          <h1 className="discovery-h1">
            Let&apos;s see if we&apos;re a <em>fit</em>.
          </h1>
          <p className="discovery-sub">
            Pick a time that works. Fifteen minutes to talk through where your
            business is headed and where AI deployment can pull the most
            weight, with no pitch deck and no obligation.
          </p>
        </div>

        <div className="discovery-cal-bezel-outer">
          <div className="discovery-cal-bezel-inner">
            <BookingWidget />
          </div>
        </div>

        <p className="discovery-fallback">
          Calendar not loading? Email{" "}
          <a href="mailto:nic@midnitesystems.com">nic@midnitesystems.com</a>
          {" "}and we will find a time.
        </p>
      </div>
      </main>
    </>
  );
}
