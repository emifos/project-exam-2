"use client";

type AccountType = "customer" | "manager";

type accountTypeToggleProps = {
  value: AccountType;
  onChange: (value: AccountType) => void;
};

const options = [
  {
    value: "customer",
    label: "Customer",
    title: "Customer account",
    description: "A customer account is used for booking venues.",
  },
  {
    value: "manager",
    label: "Venue Manager",
    title: "Venue manager account",
    description:
      "A venue manager account is used for adding and managing your own venues and bookings.",
  },
] as const;

export default function AccountTypeToggle({
  value,
  onChange,
}: accountTypeToggleProps) {
  const selected = options.find((option) => option.value === value)!;

  return (
    <fieldset className="flex flex-col items-center gap-3 text-center">
      <legend className="mb-3 text-sm text-ink">Select account type:</legend>
      <div className="flex gap-2">
        {options.map((option) => {
          const isSelected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={isSelected}
              onClick={() => onChange(option.value)}
              className={
                isSelected
                  ? "rounded-md border border-accent bg-accent/80 px-4 py-1.5 text-sm text-white"
                  : "rounded-md border border-accent bg-white px-4 py-1.5 text-sm text-accent hover:bg-accent/10"
              }
            >
              {option.label}
            </button>
          );
        })}
      </div>
      <div aria-live="polite">
        <p className="text-sm font-medium text-ink">{selected.title}</p>
        <p className="text-sm text-ink">{selected.description}</p>
      </div>
    </fieldset>
  );
}
