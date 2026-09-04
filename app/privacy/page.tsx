import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "../legal-page";
import { pageOpenGraph } from "../seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Midnite Systems, LLC. How we collect, use, and share information on midnitesystems.com and related services, including QuickBooks-connected apps.",
  alternates: { canonical: "/privacy" },
  openGraph: pageOpenGraph({
    title: "Privacy Policy | Midnite Systems",
    description:
      "How Midnite Systems, LLC collects, uses, and shares information on midnitesystems.com and related services.",
    url: "/privacy",
  }),
};

export default function PrivacyPolicy() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={
        <>
          Privacy <em>Policy</em>
        </>
      }
      lead="How Midnite Systems, LLC collects, uses, and shares information when you use our websites, services, and connected apps."
    >
      <h2>Who we are</h2>
      <p>
        Midnite Systems, LLC (&quot;Midnite Systems,&quot; &quot;we,&quot;
        &quot;us,&quot; or &quot;our&quot;) operates midnitesystems.com and
        related Midnite Systems services and applications.
      </p>

      <h2>Scope</h2>
      <p>
        This Privacy Policy applies to midnitesystems.com and related Midnite
        Systems services and apps, including applications that connect to
        QuickBooks and other third-party platforms you choose to connect.
      </p>

      <h2>Information we may collect</h2>
      <p>We may collect:</p>
      <ul>
        <li>
          Account and contact information you provide, such as name, email
          address, and company details
        </li>
        <li>
          Usage and analytics data about how you interact with our websites and
          services
        </li>
        <li>
          Device and log information, such as IP address, browser type, and
          timestamps
        </li>
        <li>
          Data from integrations you or your organization connect, including
          information accessed through a QuickBooks connection or similar
          third-party connection you authorize
        </li>
      </ul>

      <h2>How we use information</h2>
      <p>
        We use this information to provide and improve the service, maintain
        security, provide customer support, and comply with legal obligations.
      </p>

      <h2>Sharing</h2>
      <p>
        We may share information with service providers that process data on
        our behalf, and when required by law. We do not sell personal
        information.
      </p>

      <h2>Retention and security</h2>
      <p>
        We retain information for as long as reasonably needed to provide the
        service and meet legal or operational requirements, then delete or
        de-identify it when it is no longer needed. We use reasonable
        administrative and technical measures to protect information. No method
        of transmission or storage is completely secure.
      </p>

      <h2>Your rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal
        information by emailing{" "}
        <a href="mailto:nic@midnitesystems.com">nic@midnitesystems.com</a>. We
        will respond as required by applicable law.
      </p>

      <h2>Children</h2>
      <p>
        Our services are not directed at children under 13, and we do not
        knowingly collect personal information from children under 13.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. The
        &quot;Last updated&quot; date at the top of this page reflects the
        current version. Continued use of the services after a change means you
        accept the updated policy.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy:{" "}
        <a href="mailto:nic@midnitesystems.com">nic@midnitesystems.com</a>
      </p>

      <p className="legal-crosslink">
        Also see our <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalPage>
  );
}
