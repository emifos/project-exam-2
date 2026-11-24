import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Venue } from "@/app/types/venue";
import { formDate, getNights, getUpcomingBookings } from "@/app/lib/utils";
import VenueImage from "../venues/VenueImage";

type VenueBookingsDetailsProps = {
  venue: Venue;
};

export default function VenueBookingsDetails({
  venue,
}: VenueBookingsDetailsProps) {
  const upcoming = getUpcomingBookings(venue.bookings).sort(
    (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
  );

  const location = [venue.location?.city, venue.location?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="overflow-hidden flex flex-col gap-6 rounded-3xl bg-white shadow-lg md:rounded-[50px]">
      <div className="relative aspect-16/9 bg-accent/10 md:aspect-21/9">
        <VenueImage
          src={venue.media?.[0]?.url}
          alt={venue.media?.[0]?.alt || venue.name}
          sizes="(min-width: 768px) 60vw, 100vw"
        />
      </div>
      <div className="flex flex-col gap-5 p-4 md:px-8">
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
          <p className="text-xs text-ink pt-2">
            Max {venue.maxGuests} guests · ${venue.price} / night
          </p>
        </div>
        <hr className="border-line" />

        <section aria-labelledby="upcoming-heading">
          <h3 id="upcoming-heading" className="text-ink">
            Upcoming bookings ({upcoming.length})
          </h3>
          {upcoming.length === 0 ? (
            <p className="mt-3 text-sm text-slate">
              No upcoming bookings for this venue yet.
            </p>
          ) : (
            <ul className="mt-3 flex flex-col divide-y divide-line">
              {upcoming.map((booking) => {
                const nights = getNights(booking.dateFrom, booking.dateTo);
                const total = nights * venue.price;

                return (
                  <li key={booking.id} className="flex items-center gap-3 py-3">
                    <div className="relative size-10 shrink-0 overflow-hidden rounded-full bg-accent/10">
                      {booking.customer?.avatar?.url && (
                        <Image
                          src={booking.customer.avatar.url}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                          unoptimized
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm text-ink">
                        {booking.customer?.name ?? "Guest"}
                      </p>
                      <p className="flex flex-col text-xs text-slate sm:flex-row sm:flex-wrap sm:gap-x-3">
                        <span>Check-in: {formDate(booking.dateFrom)} </span>
                        <span>Check-out: {formDate(booking.dateTo)}</span>
                        <span>
                          · {booking.guests}{" "}
                          {booking.guests === 1 ? "guests" : "guests"}
                        </span>
                      </p>
                    </div>
                    <p className="text-sm text-ink">${total}</p>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </article>
  );
}
