import Link from "next/link";
import { MoveRight } from "lucide-react";
import Breadcrumbs from "./components/ui/Breadcrumbs";

export default function NotFound() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-12">
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "404 Not found" }]}
      />
      <div className="flex flex-col items-center gap-4 rounded-3xl bg-white px-6 py-16 shadow-lg text-center">
        <h1 className="text-4xl font-bold text-slate mt-12">404</h1>
        <p className="text-xl font-semibold text-primary">
          Oops! This page doesn&apos;t exist.
        </p>
        <p className="text-lg font-light text-ink">
          The page you&apos;re looking for may have been moved, deleted, or
          never existed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex w-full max-w-xs items-center justify-center gap-3 rounded-md bg-accent py-3 text-white hover:bg-accent-hover"
        >
          Return to homepage
          <MoveRight aria-hidden="true" strokeWidth={1} className="size-5" />
        </Link>
      </div>
    </main>
  );
}
