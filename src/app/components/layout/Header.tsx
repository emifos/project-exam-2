"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Plus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

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
  const router = useRouter();
  const { user, logout } = useAuth();

  let links = visitorLinks;
  if (user?.venueManager) links = managerLinks;
  else if (user) links = customerLinks;

  const isLoggedIn = !!user;
  const createLinks = links.find((link) => link.href === "/venues/create");
  const mobileLinks = createLinks
    ? [createLinks, ...links.filter((link) => link !== createLinks)]
    : links;

  function handleLogout() {
    logout();
    setIsOpen(false);
    router.push("/login");
  }

  return (
    <header>
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-8xl items-center justify-between px-8 py-4"
      >
        <Link href="/">
          <Image
            src="/holidaze-logo-1.svg"
            alt="Holidaze logo - go to homepage"
            width={140}
            height={40}
            className="h-8 w-auto"
          />
        </Link>
        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  link.href === "/venues/create"
                    ? "inline-flex items-center gap-2 rounded-md bg-accent px-4 py-1.5 text-white hover:bg-accent-hover"
                    : "text-ink hover:text-accent"
                }
              >
                {link.label}
                {link.href === "/venues/create" && (
                  <Plus aira-hidden="true" className="size-4" />
                )}
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
              <button
                onClick={handleLogout}
                className="text-ink hover:text-accent"
              >
                Log out
              </button>
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
            {mobileLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={
                    link.href === "/venues/create"
                      ? "inline-flex items-center gap-2 rounded-md bg-accent px-4 py-1.5 text-white hover:bg-accent-hover"
                      : "text-ink hover:text-accent"
                  }
                >
                  {link.label}
                  {link.href === "/venues/create" && (
                    <Plus aria-hidden="true" className="size-4" />
                  )}
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
                <button
                  onClick={handleLogout}
                  className="text-ink hover:text-accent"
                >
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
