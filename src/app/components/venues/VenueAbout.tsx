import { Users } from "lucide-react";

type VenueAboutProps = {
  description: string;
  maxGuests: number;
};

export default function VenueAbout({
  description,
  maxGuests,
}: VenueAboutProps) {
  return (
    <section className="flex flex-col gap-3 mt-4">
      <h2 className="text-2xl text-ink mb-1">About this place</h2>
      <p className="text-slate font-light">{description}</p>
      <p className="flex items-center gap-2 text-ink mt-2 mb-6 font-light">
        <Users aria-hidden="true" className="size-4" />
        Up to {maxGuests} guests
      </p>
    </section>
  );
}
