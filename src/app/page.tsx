import { getVenues, searchVenues } from "./lib/venues";
import VenueCard from "./components/venues/VenueCard";
import SearchBar from "./components/venues/SearchBar";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; guests?: string }>;
}) {
  const { q = "", guests = "1" } = await searchParams;
  const guestCount = Math.max(1, Number(guests) || 1);

  const allVenues = q ? await searchVenues(q) : await getVenues();
  const venues = allVenues.filter((venue) => venue.maxGuests >= guestCount);

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 py-8 md:px-4 md:py-12">
      <SearchBar initialQuery={q} initialGuests={guestCount} />
      <section aria-labelledby="venues-heading" className="mt-10 px-4 md:px-0">
        <h2 id="venues-heading" className="mb-6 text-2xl text-ink">
          {q ? "Search results" : "Popular Venues"}
        </h2>
        {venues.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {venues.map((venue) => (
              <li key={venue.id}>
                <VenueCard venue={venue} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-slate">
            No venues found. Try another search.
          </p>
        )}
      </section>
    </main>
  );
}
