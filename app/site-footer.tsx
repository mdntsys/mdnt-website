import Image from "next/image";
import Link from "next/link";

export function SiteFooter() {
  return (
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
            <Link href="/#process">Process</Link>
          </li>
          <li>
            <Link href="/solutions">Solutions</Link>
          </li>
          <li>
            <Link href="/#about">About</Link>
          </li>
          <li>
            <Link href="/#case-studies">Case Studies</Link>
          </li>
          <li>
            <Link href="/discovery">Discovery</Link>
          </li>
          <li>
            <a href="mailto:nic@midnitesystems.com">Contact</a>
          </li>
        </ul>
        <span className="footer-copy">© 2026 Midnite Systems</span>
      </div>
    </footer>
  );
}
