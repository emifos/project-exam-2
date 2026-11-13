import { Car, Coffee, PawPrint, Wifi } from "lucide-react";
import type { VenueMeta } from "@/app/types/venue";

type VenueAmenitiesProps = {
  meta: VenueMeta;
};

const amenities = [
  { key: "wifi", label: "Free Wifi", icon: Wifi },
  { key: "parking", label: "Free parking", icon: Car },
  { key: "breakfast", label: "Breakfast", icon: Coffee },
  { key: "pets", label: "Pets allowed", icon: PawPrint },
] as const;

export default function VenueAmenities({ meta }: VenueAmenitiesProps) {
  const available = amenities.filter((amenity) => meta[amenity.key]);

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-2xl text-ink mt-6 mb-1">What this place offers</h2>
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
