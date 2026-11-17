import { getVenues, searchVenues } from "./lib/venues";
import VenueCard from "./components/venues/VenueCard";
import SearchBar from "./components/venues/SearchBar";
import Hero from "./components/ui/Hero";

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
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col md:px-4 md:py-12">
      <div className="order-2 md:order-1">
        <SearchBar initialQuery={q} initialGuests={guestCount} />
      </div>
      <div className="contents md:order-2 md:mt-10 md:block md:overflow-hidden md:rounded-[50px] md:bg-white md:shadow-lg">
        <div className="order-1">
          <Hero />
        </div>
        <section
          aria-labelledby="venues-heading"
          className="order-3 mt-10 min-w-0 px-4 pb-12 md:mt-0 md:p-10"
        >
          <h2
            id="venues-heading"
            className="mb-6 text-2xl text-ink md:text-center"
          >
            {q ? "Search results" : "Popular Venues"}
          </h2>
          {venues.length > 0 ? (
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </main>
  );
}
