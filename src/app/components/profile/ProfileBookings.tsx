"use client";

import { useState } from "react";
import Link from "next/link";
import type { Booking } from "@/app/types/holidaze";
import BookingList from "./BookingList";
import BookingDetails from "./BookingDetails";

type ProfileBookingsProps = {
  bookings: Booking[];
};

export default function ProfileBookings({ bookings }: ProfileBookingsProps) {
  const today = new Date();
  const upcoming = bookings.filter(
    (booking) => new Date(booking.dateTo) >= today,
  );

  const [selectedId, setSelectedId] = useState(upcoming[0]?.id);
  const selected =
    upcoming.find((booking) => booking.id === selectedId) ?? upcoming[0];

  if (upcoming.length === 0) {
    return (
      <section className="rounded-3xl bg-white p-6 text-center shadow-lg">
        <p className="text-ink">You have no upcoming bookings.</p>
        <Link href="/" className="mt-2 inline-block text-accent underline">
          Explore venues
        </Link>
      </section>
    );
  }

  return (
    <div className="grid items-start gap-6 md:grid-cols-[280px_1fr]">
      <BookingList
        bookings={upcoming}
        selectedId={selected?.id}
        onSelect={setSelectedId}
      />
      {selected && <BookingDetails booking={selected} />}
    </div>
  );
}
