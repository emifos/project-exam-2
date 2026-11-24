import type { VenueMeta } from "@/app/types/holidaze";
import { amenities } from "@/app/lib/amenities";

type FacilitiesFieldsProps = {
  meta: VenueMeta;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FacilitiesFields({
  meta,
  onChange,
}: FacilitiesFieldsProps) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-4 text-xl text-ink">Facilities</legend>
      <div className="grid grid-cols-2 gap-3">
        {amenities.map(({ key, label, icon: Icon }) => (
          <label
            key={key}
            className="flex cursor-pointer items-center gap-2 text-sm text-ink"
          >
            <input
              type="checkbox"
              name={key}
              checked={meta[key]}
              onChange={onChange}
              className="size-4 cursor-pointer appearance-none rounded-full border border-accent checked:bg-accent"
            />
            <Icon
              aria-hidden="true"
              strokeWidth={1.5}
              className="size-4 text-slate"
            />
            {label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
