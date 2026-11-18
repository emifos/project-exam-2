import { Star } from "lucide-react";

export type VenueDetails = {
  name: string;
  description: string;
  price: string;
  maxGuests: string;
};

type DetailsFieldsProps = {
  details: VenueDetails;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  rating: number;
  onRatingChange: (rating: number) => void;
  errors: Record<string, string>;
};

const inputClass = "rounded-md border border-border-strong px-3 py-2 text-sm";

export default function DetailsFields({
  details,
  onChange,
  rating,
  onRatingChange,
  errors,
}: DetailsFieldsProps) {
  return (
    <fieldset className="flex flex-col gap-4 pt-6">
      <legend className="text-lg text-ink">Property details</legend>
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-sm text-ink">
          Venue name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g Modern Poolside Villa"
          value={details.name}
          onChange={onChange}
          required
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          className={inputClass}
        />
        {errors.name && (
          <p id="name-error" className="text-sm text-error">
            {errors.name}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm text-ink">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          placeholder="Describe your property..."
          value={details.description}
          onChange={onChange}
          required
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? "description-error" : undefined
          }
          className={inputClass}
        />
        {errors.description && (
          <p id="description-error" className="text-sm text-error">
            {errors.description}
          </p>
        )}
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="price" className="text-sm text-ink">
            Price per night ($) *
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            placeholder="200"
            value={details.price}
            onChange={onChange}
            required
            aria-invalid={!!errors.price}
            aria-describedby={errors.price ? "price-error" : undefined}
            className={inputClass}
          />
          {errors.price && (
            <p id="price-error" className="text-sm text-error">
              {errors.price}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="maxGuests" className="text-sm text-ink">
            Maximum guests *
          </label>
          <input
            id="maxGuests"
            name="maxGuests"
            type="number"
            min="1"
            placeholder="4"
            value={details.maxGuests}
            onChange={onChange}
            required
            aria-invalid={!!errors.maxGuests}
            aria-describedby={errors.maxGuests ? "maxGuests-error" : undefined}
            className={inputClass}
          />
          {errors.maxGuests && (
            <p id="maxGuests-error" className="text-sm text-error">
              {errors.maxGuests}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <p id="rating-label" className="text-sm text-ink">
          Rating
        </p>
        <div
          role="group"
          aria-labelledby="rating-label"
          className="flex items-center gap-1"
        >
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onRatingChange(star === rating ? 0 : star)}
              aria-label={`${star} star${star > 1 ? "s" : ""}`}
              aria-pressed={star <= rating}
              className="cursor-pointer rounded-sm border border-line p-1"
            >
              <Star
                aria-hidden="true"
                strokeWidth={1.5}
                className={`size-4 text-accent ${star <= rating ? "fill-accent" : ""}`}
              />
            </button>
          ))}
          <span className="ml-2 text-sm text-ink">{rating.toFixed(1)}</span>
        </div>
      </div>
    </fieldset>
  );
}
