import { notFound } from "next/navigation";
import { getVenuesById } from "@/app/lib/venues";
import VenueHeader from "@/app/components/venues/VenueHeader";
import VenueGallery from "@/app/components/venues/VenueGallery";
import VenueAbout from "@/app/components/venues/VenueAbout";
import VenueAmenities from "@/app/components/venues/VenueAmenities";

export default async function VenuePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const venue = await getVenuesById(id);

  if (!venue) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-12">
      <div className="flex flex-col gap-6 md:rounded-3xl md:bg-white md:p-8 md:shadow-lg">
        <article className="flex flex-col gap-3 rounded-3xl bg-white p-5 shadow-lg md:rounded-noe md:bg-transparent md:p-0 md:shadow-none">
          <VenueHeader venue={venue} />
          <VenueGallery media={venue.media} name={venue.name} />
          <VenueAbout
            description={venue.description}
            maxGuests={venue.maxGuests}
          />
          <hr className="border-line" />
          <VenueAmenities meta={venue.meta} />
          <hr className="border-line" />
        </article>
      </div>
    </main>
  );
}
