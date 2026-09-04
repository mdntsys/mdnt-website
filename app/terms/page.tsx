import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "../legal-page";
import { pageOpenGraph } from "../seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Midnite Systems, LLC. The terms that apply when you use our websites, software, and related services, including QuickBooks-connected apps.",
  alternates: { canonical: "/terms" },
  openGraph: pageOpenGraph({
    title: "Terms of Service | Midnite Systems",
    description:
      "Terms that apply when you use websites, software, and services provided by Midnite Systems, LLC.",
    url: "/terms",
  }),
};

export default function TermsOfService() {
  return (
    <LegalPage
      eyebrow="Legal"
      title={
        <>
          Terms of <em>Service</em>
        </>
      }
      lead="The terms that apply when you use websites, software, and services provided by Midnite Systems, LLC."
    >
      <h2>Acceptance of terms</h2>
      <p>
        By accessing or using Midnite Systems websites, software, or related
        services, you agree to these Terms of Service. If you do not agree, do
        not use the services.
      </p>

      <h2>Service description</h2>
      <p>
        Midnite Systems, LLC provides software, tools, and related services for
        operating businesses. Some features may connect to third-party
        platforms such as Intuit QuickBooks. Those third parties have their own
        terms and privacy policies. Your use of those platforms is governed by
        those terms, not these.
      </p>

      <h2>Accounts and acceptable use</h2>
      <p>
        You are responsible for account credentials and for activity under your
        account. You agree not to misuse the services, including attempting
        unauthorized access, interfering with the service, or using it for
        unlawful purposes.
      </p>

      <h2>Customer responsibilities for connected integration data</h2>
      <p>
        If you connect a third-party account or integration, you represent that
        you have the authority to do so. You are responsible for the data you
        make available through that connection, for configuring access
        appropriately, and for complying with the third party&apos;s terms.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Midnite Systems and its licensors retain all rights in the services,
        software, branding, and related materials. You retain rights in data
        you provide. You grant us a limited license to use that data as needed
        to provide and support the services.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The services are provided &quot;as is&quot; and &quot;as
        available,&quot; without warranties of any kind, express or implied,
        including merchantability, fitness for a particular purpose, and
        non-infringement. We do not warrant that the services will be
        uninterrupted, error-free, or free of harmful components.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, Midnite Systems, LLC is not
        liable for indirect, incidental, special, consequential, or punitive
        damages, or for lost profits, data, or business, arising from your use
        of the services.
      </p>

      <h2>Termination</h2>
      <p>
        We may suspend or terminate access if you violate these terms or if we
        discontinue a service. You may stop using the services at any time.
        Provisions that by their nature should survive, including intellectual
        property, disclaimers, and limitation of liability, will survive
        termination.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the United States. Disputes
        will be resolved in courts of competent jurisdiction.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. The &quot;Last
        updated&quot; date on this page reflects the current version. Continued
        use after changes means you accept the updated terms.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms:{" "}
        <a href="mailto:nic@midnitesystems.com">nic@midnitesystems.com</a>
      </p>

      <p className="legal-crosslink">
        Also see our <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
