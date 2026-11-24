"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Booking } from "@/app/types/holidaze";
import { formShortDate } from "@/app/lib/utils";

type BookingListProps = {
  bookings: Booking[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export default function BookingList({
  bookings,
  selectedId,
  onSelect,
}: BookingListProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSelect(id: string) {
    onSelect(id);
    setIsOpen(false);
  }

  return (
    <section
      aria-labelledby="bookings-heading"
      className="rounded-3xl bg-white p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h2 id="bookings-heading" className="text-lg text-ink">
          My bookings
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-ink">{bookings.length}</span>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="booking-list"
            aria-label={isOpen ? "Hide bookings" : "Show bookings"}
            className="cursor-pointer text-slate md:hidden"
          >
            <ChevronDown
              aria-hidden="true"
              className={`size-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
      <ul
        id="booking-list"
        className={`${isOpen ? "flex" : "hidden"} mt-2 flex-col divide-y divide-line md:flex`}
      >
        {bookings.map((booking) => {
          const isSelected = booking.id === selectedId;
          const location = [
            booking.venue?.location?.city,
            booking.venue?.location?.country,
          ]
            .filter(Boolean)
            .join(", ");

          return (
            <li key={booking.id}>
              <button
                type="button"
                onClick={() => handleSelect(booking.id)}
                aria-pressed={isSelected}
                className="flex w-full cursor-pointer flex-col items-start gap-0.5 py-4 text-left"
              >
                <span className="text-sm text-ink">
                  {booking.venue?.name ?? "Unknown venue"}{" "}
                </span>
                {location && (
                  <span className="text-xs text-slate">{location}</span>
                )}
                <span className="text-xs text-slate">
                  {formShortDate(booking.dateFrom)} -{" "}
                  {formShortDate(booking.dateTo)}
                </span>
                {isSelected && (
                  <span className="mt-1 rounded-full bg-accent px-2 py-0.5 text-xs text-white">
                    Selected
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
