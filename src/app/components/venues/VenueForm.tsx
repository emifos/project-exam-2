"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Media, VenueMeta, Venue } from "@/app/types/holidaze";
import { useAuth } from "../context/AuthContext";
import { createVenue, updateVenue } from "@/app/lib/venues";
import { AuthError } from "@/app/lib/api";
import DetailsFields, { type VenueDetails } from "./DetailsFields";
import MediaFields from "./MediaFields";
import FacilitiesFields from "./FacilitiesFields";
import LocationFields, { type LocationForm } from "./LocationFields";

type VenueFormProps = {
  venue?: Venue;
};

export default function VenueForm({ venue }: VenueFormProps) {
  const router = useRouter();
  const { user } = useAuth();
  const isEditing = !!venue;

  const [details, setDetails] = useState<VenueDetails>({
    name: venue?.name ?? "",
    description: venue?.description ?? "",
    price: venue ? String(venue.price) : "",
    maxGuests: venue ? String(venue.maxGuests) : "",
  });

  const [rating, setRating] = useState(venue?.rating ?? 0);
  const [media, setMedia] = useState<Media[]>(
    venue?.media?.length ? venue.media : [{ url: "", alt: "" }],
  );
  const [meta, setMeta] = useState<VenueMeta>(
    venue?.meta ?? {
      wifi: false,
      parking: false,
      breakfast: false,
      pets: false,
    },
  );
  const [location, setLocation] = useState<LocationForm>({
    address: venue?.location?.address ?? "",
    city: venue?.location?.city ?? "",
    zip: venue?.location?.zip ?? "",
    country: venue?.location?.country ?? "",
    continent: venue?.location?.continent ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleDetailsChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;
    setDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleMetaChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, checked } = event.target;
    setMeta((prev) => ({ ...prev, [name]: checked }));
  }

  function handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const newErrors: Record<string, string> = {};
    const price = Number(details.price);
    const maxGuests = Number(details.maxGuests);

    if (!details.name.trim()) {
      newErrors.name = "Venue name is required";
    }

    if (!details.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!details.price) {
      newErrors.price = "Price is required";
    } else if (price <= 0) {
      newErrors.price = "Price must be more than 0";
    }

    if (!details.maxGuests) {
      newErrors.maxGuests = "Maximum guests is required";
    } else if (maxGuests < 1 || maxGuests > 100) {
      newErrors.maxGuests = "Guests must be between 1 and 100";
    }
    media.forEach((image, index) => {
      const url = image.url.trim();
      if (url && (!URL.canParse(url) || !url.startsWith("http"))) {
        newErrors[`media-${index}`] =
          "Enter a valid image URL starting with http";
      }
    });

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const venueData = {
      name: details.name.trim(),
      description: details.description.trim(),
      price,
      maxGuests,
      rating,
      media: media.filter((image) => image.url.trim()),
      meta,
      location,
    };

    setIsLoading(true);

    try {
      const savedVenue = isEditing
        ? await updateVenue(venue.id, venueData, user?.accessToken)
        : await createVenue(venueData, user?.accessToken);
      router.push(`/venues/${savedVenue.id}`);
    } catch (error) {
      if (error instanceof AuthError) {
        router.push("/login");
        return;
      }
      setFormError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const submitText = isEditing ? "Save changes" : "Create venue";
  const loadingText = isEditing ? "Saving..." : "Creating...";

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      <DetailsFields
        details={details}
        onChange={handleDetailsChange}
        rating={rating}
        onRatingChange={setRating}
        errors={errors}
      />
      <hr className="border-line" />
      <MediaFields media={media} onChange={setMedia} errors={errors} />
      <hr className="border-line" />
      <FacilitiesFields meta={meta} onChange={handleMetaChange} />
      <hr className="border-line" />
      <LocationFields location={location} onChange={handleLocationChange} />
      {formError && (
        <p role="alert" className="text-sm text-error">
          {formError}
        </p>
      )}
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="cursor-pointer rounded-md border border-primary px-5 py-2 text-primary hover:bg-mist"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isLoading}
          className="cursor-pointer rounded-md bg-accent px-5 py-2 text-white hover:bg-accent-hover"
        >
          {isLoading ? loadingText : submitText}
        </button>
      </div>
    </form>
  );
}
