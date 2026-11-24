import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Booking } from "@/app/types/holidaze";
import { formDate, getNights } from "@/app/lib/utils";
import VenueImage from "../venues/VenueImage";

type BookingDetailsProps = {
  booking: Booking;
};

export default function BookingDetails({ booking }: BookingDetailsProps) {
  const venue = booking.venue;

  if (!venue) return null;

  const nights = getNights(booking.dateFrom, booking.dateTo);
  const total = nights * venue.price;
  const location = [venue.location?.city, venue.location?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="overflow-hidden rounded-3xl bg-white shadow-lg md:rounded-[50px]">
      <div className="relative aspect-16/9 bg-accent/10 md:aspect-21/9">
        <VenueImage
          src={venue.media?.[0]?.url}
          alt={venue.media?.[0]?.alt || venue.name}
          sizes="(min-width: 768px) 60vw, 100vw"
        />
      </div>
      <div className="flex flex-col gap-5 p-6 md:px-8">
        <div>
          <Link
            href={`/venues/${venue.id}`}
            className="inline-flex items-center gap-2 text-lg text-ink hover:underline"
          >
            {venue.name}
            <ArrowRight
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4 text-accent"
            />
          </Link>
          {location && <p className="text-sm text-slate">{location}</p>}
        </div>
        <hr className="border-line" />
        <div className="grid grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p className="text-slate text-xs">Check-in</p>
            <p className="text-ink">{formDate(booking.dateFrom)}</p>
          </div>
          <div>
            <p className="text-slate text-xs">Check-out</p>
            <p className="text-ink">{formDate(booking.dateTo)}</p>
          </div>
          <div>
            <p className="text-slate text-xs">Guests</p>
            <p className="text-ink">
              {booking.guests} {booking.guests === 1 ? "guest" : "guests"}
            </p>
          </div>
          <div>
            <p className="text-xs text-slate">Duration</p>
            <p className="text-ink">
              {nights} {nights === 1 ? "night" : "nights"}
            </p>
          </div>
        </div>
        <hr className="border-line" />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-sm text-slate">
            <span>
              ${venue.price} x {nights} {nights === 1 ? "night" : "nights"}
            </span>
            <span>${total}</span>
          </div>
          <div className="flex justify-between text-ink">
            <span>Total price</span>
            <span className="text-lg font-medium">${total}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
