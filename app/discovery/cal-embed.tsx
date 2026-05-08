"use client";

import { useEffect } from "react";

const CAL_LINK = "nicolas-perez-ye8jb3/30min";
const NAMESPACE = "discovery";

declare global {
  interface Window {
    Cal?: CalApi;
  }
}

type CalApi = {
  (action: string, ...args: unknown[]): void;
  loaded?: boolean;
  ns?: Record<string, CalApi>;
  q?: unknown[];
};

export function CalEmbed() {
  useEffect(() => {
    (function (C: Window, A: string, L: string) {
      const p = (a: CalApi, ar: IArguments | unknown[]) => {
        (a.q ||= []).push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        (function () {
          const cal = ((...args: unknown[]) => {
            const a = args as unknown as IArguments;
            const c = C.Cal as CalApi;
            if (!c.loaded) {
              c.ns = {};
              c.q = c.q || [];
              const s = d.createElement("script");
              s.src = A;
              d.head.appendChild(s);
              c.loaded = true;
            }
            if (a[0] === L) {
              const api = ((...inner: unknown[]) => {
                p(api as CalApi, inner);
              }) as CalApi;
              const namespace = a[1];
              api.q = api.q || [];
              if (typeof namespace === "string") {
                c.ns![namespace] = c.ns![namespace] || api;
                p(c.ns![namespace], a);
                p(c, ["initNamespace", namespace] as unknown[]);
              } else {
                p(c, a);
              }
              return;
            }
            p(c, a);
          }) as CalApi;
          return cal;
        })();
    })(window, "https://app.cal.com/embed/embed.js", "init");

    const Cal = window.Cal!;
    Cal("init", NAMESPACE, { origin: "https://app.cal.com" });

    const ns = Cal.ns![NAMESPACE];
    ns("inline", {
      elementOrSelector: "#cal-discovery-inline",
      config: { layout: "month_view", theme: "dark" },
      calLink: CAL_LINK,
    });
    ns("ui", {
      theme: "dark",
      cssVarsPerTheme: {
        light: { "cal-brand": "#F5A800" },
        dark: { "cal-brand": "#F5A800" },
      },
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <div
      id="cal-discovery-inline"
      className="discovery-cal"
      aria-label="Book a discovery call"
    />
  );
}
