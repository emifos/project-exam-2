import Image from "next/image";
import type { Profile } from "@/app/types/holidaze";

type VenueOwnerProps = {
  owner?: Profile;
};

export default function VenueOwner({ owner }: VenueOwnerProps) {
  if (!owner) return null;

  return (
    <section
      aria-labelledby="host-heading"
      className="flex flex-col gap-4 mt-4"
    >
      <h2 id="host-heading" className="text-xl text-ink mb-1">
        Hosted by
      </h2>
      <div className="flex items-center gap-4">
        <div className="relative size-14 shrink-0 overflow-hidden rounded-full bg-accent/10">
          {owner.avatar?.url && (
            <Image
              src={owner.avatar.url}
              alt=""
              fill
              sizes="56px"
              className="object-cover"
              unoptimized
            />
          )}
        </div>
        <div>
          <p className="text-ink">{owner.name}</p>
          <p className="text-sm text-slate">Venue manager</p>
        </div>
      </div>
    </section>
  );
}
