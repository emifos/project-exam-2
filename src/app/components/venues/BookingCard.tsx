"use client";

import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { CalendarDays, Minus, Plus } from "lucide-react";
import type { Venue } from "@/app/types/venue";
import BookingCalendar from "./BookingCalendar";
import { useAuth } from "../context/AuthContext";

type BookingCardProps = {
  venue: Venue;
};

function formDate(date?: Date) {
  return date ? date.toLocaleDateString("en-GB") : "Add date";
}

export default function BookingCard({ venue }: BookingCardProps) {
  const [range, setRange] = useState<DateRange | undefined>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [guests, setGuests] = useState(1);
  const { user } = useAuth();
  const isOwner = !!user && user.name === venue.owner?.name;

  function handleBook() {
    console.log({
      dateFrom: range?.from,
      dateTo: range?.to,
      guests,
      venueId: venue.id,
    });
  }

  if (isOwner) {
    return (
      <section className="mt-6 mb-8 rounded-3xl border border-line bg-white p-5 shadow-lg md:rounded-[50px] md:p-8">
        <h2 className="text-xl text-ink">This is your venue</h2>
        <p className="mt-2 text-sm text-slate">
          You can&apos;t book your own venue. Guests will be able to book it
          here.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-labelledby="booking-heading"
      className="flex flex-col gap-4 mt-6 mb-8 rounded-3xl border border-line bg-white p-5 shadow-lg md:rounded-[50px] md:p-8"
    >
      <h2 id="booking-heading" className="sr-only">
        Book this venue
      </h2>
      <p className="text-ink">
        <span className="text-2xl">${venue.price}</span>
        <span className="text-sm text-slate"> / night</span>
      </p>
      <div className="grid gap-3 md:grid-cols-2">
        {[
          { label: "Check-in", date: range?.from },
          { label: "Check-out", date: range?.to },
        ].map(({ label, date }) => (
          <div key={label} className="flex flex-col gap-1">
            <span className="text-sm text-ink">{label}</span>
            <button
              type="button"
              onClick={() => setIsCalendarOpen(true)}
              aria-expanded={isCalendarOpen}
              aria-controls="booking-calendar"
              className={`flex cursor-pointer items-center justify-between border rounded-md px-3 py-2 text-left text-sm ${
                isCalendarOpen ? "border-accent" : "border-border-strong"
              } ${date ? "text-ink" : "text-slate"}`}
            >
              {formDate(date)}
              <CalendarDays aria-hidden="true" className="size-4 text-slate" />
            </button>
          </div>
        ))}
      </div>
      {isCalendarOpen && (
        <BookingCalendar
          selected={range}
          onSelect={setRange}
          bookings={venue.bookings ?? []}
          onClose={() => setIsCalendarOpen(false)}
        />
      )}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-ink">Guests</p>
          <p className="text-sm text-slate">Maximum {venue.maxGuests} guests</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setGuests((prev) => prev - 1)}
            disabled={guests <= 1}
            aria-label="Remove one guest"
            className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border-strong text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Minus aria-hidden="true" className="size-4" />
          </button>
          <span aria-live="polite" className="w-4 text-center text-ink">
            {guests}
          </span>
          <button
            type="button"
            onClick={() => setGuests((prev) => prev + 1)}
            disabled={guests >= venue.maxGuests}
            aria-label="Add one guest"
            className="flex size-8 cursor-pointer items-center justify-center rounded-full border border-border-strong text-ink disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus aria-hidden="true" className="size-4" />
          </button>
        </div>
      </div>
      <button
        type="button"
        onClick={handleBook}
        disabled={!range?.from || !range?.to}
        className="cursor-pointer rounded-md bg-accent py-3 text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        Book now
      </button>
    </section>
  );
}
