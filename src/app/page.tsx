import { getVenues } from "./lib/venues";

export default async function Home() {
  const venues = await getVenues();

  return (
    <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12">
      <h1 className="text-center text-3xl text-ink">Find your next stay.</h1>
      <p className="mb-8 text-center text-slate">
        Explore places worth staying.
      </p>
      <ul className="flex flex-col gap-2">
        {venues.map((venue) => (
          <li key={venue.id}>
            {venue.name}, {venue.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
