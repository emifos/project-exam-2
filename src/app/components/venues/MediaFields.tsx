import { ImagePlus, X } from "lucide-react";
import type { Media } from "@/app/types/holidaze";

type MediaFieldsProps = {
  media: Media[];
  onChange: (media: Media[]) => void;
  errors: Record<string, string>;
};

const inputClass = "rounded-md border border-border-strong px-3 py-2 text-sm";

export default function MediaFields({
  media,
  onChange,
  errors,
}: MediaFieldsProps) {
  function addImage() {
    onChange([...media, { url: "", alt: "" }]);
  }

  function updateImage(index: number, field: keyof Media, value: string) {
    onChange(
      media.map((image, i) =>
        i === index ? { ...image, [field]: value } : image,
      ),
    );
  }

  function removeImage(index: number) {
    onChange(media.filter((_, i) => i !== index));
  }

  return (
    <fieldset className="flex flex-col gap-4">
      <legend className="mb-4 text-xl text-ink">Photos</legend>
      {media.map((image, index) => {
        const isLast = index === media.length - 1;
        const error = errors[`media-${index}`];

        return (
          <div key={index} className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <label
                htmlFor={`image-url-${index}`}
                className="text-sm text-ink"
              >
                Image URL
              </label>
              <div className="flex items-center gap-2">
                <input
                  id={`image-url-${index}`}
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={image.url}
                  onChange={(event) =>
                    updateImage(index, "url", event.target.value)
                  }
                  aria-invalid={!!error}
                  aria-describedby={
                    error ? `image-url-${index}-error` : undefined
                  }
                  className={`flex-1 ${inputClass}`}
                />
                {isLast ? (
                  <button
                    type="button"
                    onClick={addImage}
                    aria-label="Add another image"
                    className="cursor-pointer text-accent hover:text-accent-hover"
                  >
                    <ImagePlus
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-8"
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    aria-label={`Remove image ${index + 1}`}
                    className="cursor-pointer text-slate hover:text-error"
                  >
                    <X
                      aria-hidden="true"
                      strokeWidth={1.5}
                      className="size-8"
                    />
                  </button>
                )}
              </div>
              {error && (
                <p
                  id={`image-url-${index}-error`}
                  className="text-sm text-error"
                >
                  {error}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-1 md:max-w-md">
              <label
                htmlFor={`image-alt-${index}`}
                className="text-sm text-ink"
              >
                Alt text
              </label>
              <input
                id={`image-alt-${index}`}
                type="text"
                placeholder="White villa with a pool"
                value={image.alt}
                onChange={(event) =>
                  updateImage(index, "alt", event.target.value)
                }
                className={`${inputClass}`}
              />
            </div>
          </div>
        );
      })}
    </fieldset>
  );
}
