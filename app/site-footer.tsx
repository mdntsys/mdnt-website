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
            <Link href="/#solutions">Solutions</Link>
          </li>
          <li>
            <Link href="/#consulting">Consulting</Link>
          </li>
          <li>
            <Link href="/#why">Why</Link>
          </li>
          <li>
            <Link href="/#cta">Contact</Link>
          </li>
        </ul>
        <span className="footer-copy">© 2026 Midnite Systems</span>
      </div>
    </footer>
  );
}
