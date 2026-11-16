"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus } from "lucide-react";

type SearchBarProps = {
  initialQuery: string;
  initialGuests: number;
};

export default function SearchBar({
  initialQuery,
  initialGuests,
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [guests, setGuests] = useState(initialGuests);

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (guests > 1) params.set("guests", String(guests));

    const search = params.toString();
    router.push(search ? `/?${search}` : "/");
  }

  return (
    <section
      aria-labelledby="search-heading"
      className="flex flex-col gap-4 bg-white p-5 shadow-md md:mx-auto md:max-w-4xl md:items-center md:bg-transparent md:p-0 md:shadow-none"
    >
      <div className="md:text-center">
        <h1 id="search-header" className="text-xl text-ink md:text-3xl">
          Find your next stay.
        </h1>
        <p className="text-sm text-slate">Explore places worth staying</p>
      </div>
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 md:flex-row md:items-center md:rounded-2xl md:bg-white md:p-4 md:shadow-lg"
      >
        <div className="flex flex-1 flex-col gap-1">
          <label htmlFor="search" className="text-sm text-ink md:sr-only">
            Destination
          </label>
          <input
            id="search"
            type="search"
            placeholder="Search venues"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="rounded-md border border-border-strong px-3 py-2 text-sm"
          />
        </div>
        <div className="flex items-center justify-between gap-3 rounded-md border border-border-strong px-3 py-2 md:py-1.5">
          <div>
            <p className="text-sm text-ink">Guests</p>
            <p className="text-xs text-slate md:hidden">Number of guests</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setGuests((prev) => prev - 1)}
              disabled={guests <= 1}
              aria-label="Remove one guest"
              className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-strong text-ink disabled:cursor-not-allowed disabled:opacity-40 md:size-6 md:border-0"
            >
              <Minus aria-hidden="true" strokeWidth={1} className="size-4" />
            </button>
            <span aria-live="polite" className="w-4 text-center text-ink">
              {guests}
            </span>
            <button
              type="button"
              onClick={() => setGuests((prev) => prev + 1)}
              aria-label="Add one guest"
              className="flex size-7 cursor-pointer items-center justify-center rounded-full border border-strong text-ink disabled:cursor-not-allowed disabled:opacity-40 md:size-6 md:border-0"
            >
              <Plus aria-hidden="true" strokeWidth={1} className="size-4" />
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="cursor-pointer rounded-md bg-primary px-5 py-3 text-white hover:bg-primary-hover md:py-2 md:text-sm"
        >
          Search
        </button>
      </form>
      <p className="text-xs text-primary-hover">
        Current search:{" "}
        <span className="font-medium text-ink">
          {initialQuery ? `"${initialQuery}"` : "All venues"} · {initialGuests}{" "}
          {initialGuests === 1 ? "guests" : "guests"}
        </span>
      </p>
    </section>
  );
}
