"use client";

import { useState } from "react";
import Link from "next/link";
import type { Venue } from "@/app/types/venue";
import VenueList from "./VenueList";
import VenueBookingsDetails from "./VenueBookingsDetails";

type ManagerVenuesProps = {
  venues: Venue[];
};

export default function ManagerVenues({ venues }: ManagerVenuesProps) {
  const [selectedId, setSelectedId] = useState(venues[0]?.id);
  const selected = venues.find((venue) => venue.id === selectedId) ?? venues[0];

  if (venues.length === 0) {
    return (
      <section className="rounded-3xl bg-white p-6 text-center shadow-lg">
        <p className="text-ink">You haven&apos;t created any venues yet.</p>
        <Link
          href="/venues/create"
          className="mt-2 inline-block text-accent underline"
        >
          Create a venue
        </Link>
      </section>
    );
  }

  return (
    <div className="grid items-start gap-6 md:grid-cols-[280px_1fr]">
      <VenueList
        venues={venues}
        selectedId={selected?.id}
        onSelect={setSelectedId}
      />
      {selected && <VenueBookingsDetails venue={selected} />}
    </div>
  );
}
