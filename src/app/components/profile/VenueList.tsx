"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Pencil } from "lucide-react";
import type { Venue } from "@/app/types/venue";
import { getUpcomingBookings } from "@/app/lib/utils";

type VenueListProps = {
  venues: Venue[];
  selectedId?: string;
  onSelect: (id: string) => void;
};

export default function VenueList({
  venues,
  selectedId,
  onSelect,
}: VenueListProps) {
  const [isOpen, setIsOpen] = useState(false);

  const totalReservations = venues.reduce(
    (sum, venue) => sum + getUpcomingBookings(venue.bookings).length,
    0,
  );

  function handleSelect(id: string) {
    onSelect(id);
    setIsOpen(false);
  }

  return (
    <section
      aria-labelledby="venues-heading"
      className="rounded-3xl bg-white p-6 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <h2 id="venues-heading" className="text-lg text-ink">
          My venues ({venues.length})
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-ink">{totalReservations} reservation</span>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="venue-list"
            aria-label={isOpen ? "Hide venues" : "Show venues"}
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
        id="venue-list"
        className={`${isOpen ? "flex" : "hidden"} mt-2 flex-col divide-y divide-line md:flex`}
      >
        {venues.map((venue) => {
          const isSelected = venue.id === selectedId;
          const upComingCount = getUpcomingBookings(venue.bookings).length;
          const location = [venue.location?.city, venue.location?.country]
            .filter(Boolean)
            .join(", ");

          return (
            <li key={venue.id} className="flex items-start gap-2 py-4">
              <button
                type="button"
                onClick={() => handleSelect(venue.id)}
                aria-pressed={isSelected}
                className="flex flex-1 cursor-pointer flex-col items-start gap-0.5 py-4 text-left"
              >
                <span className="text-sm text-ink">
                  {venue.name} ({upComingCount})
                </span>
                {location && (
                  <span className="text-xs text-slate">{location}</span>
                )}
                {isSelected && (
                  <span className="mt-1 rounded-full bg-accent px-2 py-0.5 text-xs text-white">
                    Selected
                  </span>
                )}
              </button>
              <Link
                href={`/venues/${venue.id}/edit`}
                aria-label={`Edit ${venue.name}`}
                className="text-accent hover:text-accent-hover"
              >
                <Pencil
                  aria-hidden="true"
                  strokeWidth={1.5}
                  className="size-4"
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
