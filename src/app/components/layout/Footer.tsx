"use client";

import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

const socialLinks = [
  { label: "Holidaze on Facebook", href: "/facebook", icon: FaFacebook },
  { label: "Holidaze on Instagram", href: "/instagram", icon: FaInstagram },
  { label: "Holidaze on Email", href: "/contact", icon: FaEnvelope },
];

const footerLinks = [
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Team", href: "/team" },
];

export default function Footer() {
  return (
    <footer className="bg-linear-to-b from-gradient-start via-mist to-gradient-end">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-16">
        <Link href="/">
          <Image
            src="/logo-dark-small.png"
            alt="Holidaze logo - go to homepage"
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-ink">Follow us</p>
          <ul className="flex items-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-label={label}
                  className="text-ink hover:text-accent"
                >
                  <Icon aria-hidden="true" className="size-6" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href="link.href"
                  className="text-sm text-ink hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-ink mt-4 text-center">
            © 2026 Holidaze. All rights reserved.
          </p>
        </nav>
      </div>
    </footer>
  );
}
