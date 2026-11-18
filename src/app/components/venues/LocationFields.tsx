export type LocationForm = {
  address: string;
  city: string;
  zip: string;
  country: string;
  continent: string;
};

type LocationFieldsProps = {
  location: LocationForm;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const inputClass = "rounded-md border border-border-strong px-3 py-2 text-sm";

const fields = [
  { name: "city", label: "City", placeholder: "Marbella" },
  { name: "zip", label: "ZIP / Postal code", placeholder: "29620" },
  { name: "country", label: "Country", placeholder: "Spain" },
  { name: "continent", label: "Continent", placeholder: "Europe" },
] as const;

export default function LocationFields({
  location,
  onChange,
}: LocationFieldsProps) {
  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-4 text-xl text-ink">Location</legend>
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-sm font-medium text-slate">
          Street address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          placeholder="Street address"
          value={location.address}
          onChange={onChange}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-1">
            <label
              htmlFor={field.name}
              className="text-sm font-medium text-slate"
            >
              {field.label}
            </label>
            <input
              id={field.name}
              name={field.name}
              type="text"
              placeholder={field.placeholder}
              value={location[field.name]}
              onChange={onChange}
              className={inputClass}
            />
          </div>
        ))}
      </div>
    </fieldset>
  );
}
