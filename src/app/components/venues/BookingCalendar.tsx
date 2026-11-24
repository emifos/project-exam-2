"use client";

import { DayPicker, type DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import "./BookingCalendar.css";
import { X } from "lucide-react";
import type { Booking } from "@/app/types/holidaze";

type BookingCalendarProps = {
  selected: DateRange | undefined;
  onSelect: (range: DateRange | undefined) => void;
  bookings: Booking[];
  onClose: () => void;
};

export default function BookingCalendar({
  selected,
  onSelect,
  bookings,
  onClose,
}: BookingCalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const bookedRanges = bookings.map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  return (
    <div
      id="booking-calendar"
      className="booking-calendar relative rounded-xl border border-line p-3"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close calendar"
        className="absolute top-3 right-3 z-10 cursor-pointer text-slate hover:text-ink"
      >
        <X aria-hidden="true" className="size-5" />
      </button>
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={onSelect}
        disabled={[{ before: today }, ...bookedRanges]}
        excludeDisabled
        modifiers={{ booked: bookedRanges }}
        modifiersClassNames={{ booked: "booked-day" }}
        weekStartsOn={1}
        navLayout="around"
      />
      <ul className="mt-3 flex flex-wrap gap-4 text-xs text-slate">
        <li className="flex items-center gap-1">
          <span className="size-3 rounded-sm border border-line bg-white" />
          Available
        </li>
        <li className="flex items-center gap-1">
          <span className="size-3 rounded-sm bg-line" />
          Booked
        </li>
        <li className="flex items-center gap-1">
          <span className="size-3 rounded-sm bg-accent" />
          Selected
        </li>
      </ul>
    </div>
  );
}
