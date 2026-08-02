"use client";

import Script from "next/script";
import { GOOGLE_ADS_ID } from "./google-ads";

// The base Google tag, mounted on the paid landing pages only.
//
// Scoped rather than site-wide: this is the surface we pay per click for and
// the only place a conversion fires. Every other page stays free of a Google
// script, which is both a privacy and a page-weight call we can revisit if we
// ever want remarketing lists off organic traffic.
//
// This tag is what turns ?gclid= in the landing URL into the _gcl_aw cookie
// that the conversion below is matched against. Without it on the page the
// click id never becomes an attributable conversion, no matter what the form
// reports.
export function GoogleAdsTag() {
  return (
    <>
      <Script
        id="google-ads-gtag"
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ADS_ID}');`}
      </Script>
    </>
  );
}
