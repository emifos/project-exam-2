import { MapPin, Star } from "lucide-react";
import type { Venue } from "@/app/types/holidaze";

type VenueHeaderProps = {
  venue: Venue;
};

export default function VenueHeader({ venue }: VenueHeaderProps) {
  const { address, city, country } = venue.location;
  const location = [address, city, country]
    .map((part) => part?.trim())
    .filter(Boolean)
    .join(", ");

  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl text-primary">{venue.name}</h1>
      <div className="flex flex-wrap items-center gap-4 text-sm text-slate mb-2">
        {venue.rating > 0 && (
          <p className="flex items-center gap-1 text-ink text-lg">
            <Star aria-hidden="true" className="size-4 text-accent" />
            <span className="sr-only">Rating:</span>
            {venue.rating}
          </p>
        )}
        {location && (
          <p className="flex items-start gap-1 text-base font-light">
            <MapPin aria-hidden="true" className="mt-1 size-4 shrink-0" />
            {location}
          </p>
        )}
      </div>
    </header>
  );
}
