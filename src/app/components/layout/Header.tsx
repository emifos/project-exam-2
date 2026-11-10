"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const visitorLinks = [{ label: "Explore", href: "/" }];

const customerLinks = [
  { label: "Explore", href: "/" },
  { label: "Profile", href: "/profile" },
];

const managerLinks = [
  { label: "Explore", href: "/" },
  { label: "Create Venue", href: "/venues/create" },
  { label: "Profile", href: "/profile" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  //BYTTES UT SENERE
  const role: string = "visitor";

  let links = visitorLinks;
  if (role === "customer") links = customerLinks;
  if (role === "manager") links = managerLinks;

  const isLoggedIn = role !== "visitor";

  return (
    <header>
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4"
      >
        <Link href="/">
          <Image
            src="/logo-dark-small.png"
            alt="Holidaze logo - go to homepage"
            width={140}
            height={40}
            className="h-10 w-auto"
          />
        </Link>
        {/* Desktop */}
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-ink hover:text-accent">
                {link.label}
              </Link>
            </li>
          ))}
          {!isLoggedIn && (
            <li className="flex items-center gap-2">
              <Link href="/register" className="text-ink hover:text-accent">
                Register or
              </Link>
              <Link
                href="/login"
                className="rounded-md bg-accent px-4 py-1.5 text-white hover:bg-accent-hover"
              >
                Login
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button className="text-ink hover:text-accent">Logout</button>
            </li>
          )}
        </ul>
        {/* Mobile */}
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="text-ink md:hidden"
        >
          {isOpen ? (
            <X aria-hidden="true" className="size-6" />
          ) : (
            <Menu aria-hidden="true" className="size-6" />
          )}
        </button>
      </nav>
      {/* Mobile menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-linear-to-b from-gradient-start via-mist to-gradient-end md:hidden">
          <div className="mx-4 flex items-center justify-between border-b border-line py-4">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Image
                src="/logo-dark-header.png"
                alt="Holidaze logo - go to homepage"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="text-ink"
            >
              <X aria-hidden="true" className="size-6" />
            </button>
          </div>
          <ul className="flex flex-col gap-6 px-4 py-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-ink hover:text-accent"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            {!isLoggedIn && (
              <li className="flex items-center gap-2">
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-ink hover:text-accent"
                >
                  Register or
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="rounded-md bg-accent px-4 py-1.5 text-white hover:bg-accent-hover"
                >
                  Login
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button className="text-ink hover:text-accent">Logout</button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
