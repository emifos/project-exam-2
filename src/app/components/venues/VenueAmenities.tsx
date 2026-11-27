import type { VenueMeta } from "@/app/types/holidaze";
import { amenities } from "@/app/lib/amenities";

type VenueAmenitiesProps = {
  meta: VenueMeta;
};

export default function VenueAmenities({ meta }: VenueAmenitiesProps) {
  const available = amenities.filter((amenity) => meta[amenity.key]);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-xl text-ink mt-6 mb-1">What this place offers</h2>
      {available.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3 mb-8 font-light">
          {available.map(({ key, label, icon: Icon }) => (
            <li key={key} className="flex items-center gap-2 text-ink ">
              <Icon aria-hidden="true" className="size-4.5 text-slate" />
              {label}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate">No amnities listed.</p>
      )}
    </section>
  );
}
