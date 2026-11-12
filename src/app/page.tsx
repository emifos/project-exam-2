import { getVenues } from "./lib/venues";
import VenueCard from "./components/venues/VenueCard";

export default async function Home() {
  const venues = await getVenues();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12">
      <h1 className="text-center text-3xl text-ink">Find your next stay.</h1>
      <p className="mb-8 text-center text-slate">
        Explore places worth staying.
      </p>
      <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols:4">
        {venues.map((venue) => (
          <li key={venue.id}>
            <VenueCard venue={venue} />
          </li>
        ))}
      </ul>
    </main>
  );
}
