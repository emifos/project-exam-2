import Link from "next/link";
import { MapPin, Star, Users } from "lucide-react";
import type { Venue } from "@/app/types/venue";
import VenueImage from "./VenueImage";

type VenueCardProps = {
  venue: Venue;
};

export default function VenueCard({ venue }: VenueCardProps) {
  const image = venue.media[0];
  const location = [venue.location.city, venue.location.country]
    .filter(Boolean)
    .join(", ");

  return (
    <article className="relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg">
      <div className="relative aspect-16/10 bg-accent/10">
        <VenueImage
          src={image?.url}
          alt={image?.alt || venue.name}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h2 className="inline-clamp-1 font-medium text-ink">{venue.name}</h2>
          {venue.rating > 0 && (
            <p className="flex shrink-0 items-center gap-1 text-lg text-ink">
              <Star
                aria-hidden="true"
                strokeWidth={1.5}
                className="size-4.5 text-accent"
              />
              <span className="sr-only">Rating:</span>
              {venue.rating}
            </p>
          )}
        </div>
        {location && (
          <p className="flex items-center gap-1 text-sm text-slate">
            <MapPin aria-hidden="true" className="size-4" />
            {location}
          </p>
        )}
        <p className="flex items-center gap-1 text-sm text-slate">
          <Users aria-hidden="true" className="size-4" />
          Up to {venue.maxGuests} guests
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-line pt-3">
          <p className="text-ink">
            <span className="text-lg">$ {venue.price}</span>
            <span className="text-sm text-slate"> / night</span>
          </p>
          <Link
            href={`/venues/${venue.id}`}
            className="rounded-md bg-accent px-4 py-2 text-sm text-white after:absolute after:inset-0 hover:bg-accent-hover"
          >
            View more
            <span className="sr-only"> about {venue.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
