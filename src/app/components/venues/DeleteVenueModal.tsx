"use client";

import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import type { Venue } from "@/app/types/holidaze";
import VenueImage from "./VenueImage";

type DeleteVenueModalProps = {
  venue: Venue;
  isOpen: boolean;
  isDeleting: boolean;
  error: string;
  onClose: () => void;
  onConfirm: () => void;
};

export default function DeleteVenueModal({
  venue,
  isOpen,
  isDeleting,
  error,
  onClose,
  onConfirm,
}: DeleteVenueModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  const location = [venue.location?.city, venue.location?.country]
    .filter(Boolean)
    .join(", ");

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="Close"
      className="m-auto w-11/12 max-w-3xl rounded-[50px] bg-white px-6 py-16 text-center backdrop:bg-black/40 md:p-20"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-6 right-6 cursor-pointer text-slate hover:text-ink md:top-8 md:right-8"
      >
        <X aria-hidden="true" strokeWidth={1.5} className="size-7" />
      </button>
      <h2 id="delete-venue-title" className="text-2xl font-semibold text-error">
        Are you sure you want to delete this venue?
      </h2>
      <p className="mt-2 text-ink">This action can&apos;t be undone.</p>
      <div className="mx-auto mt-8 flex max-w-md items-center gap-4 rounded-3xl bg-error-light p-6 text-left">
        <div className="relative aspect-16/10 w-36 shrink-0 overflow-hidden rounded-xl">
          <VenueImage
            src={venue.media?.[0]?.url}
            alt={venue.media?.[0]?.alt || venue.name}
            sizes="144px"
          />
        </div>
        <div className="min-w-0">
          <p className="line-clamp-2 text-lg text-ink">{venue.name}</p>
          {location && <p className="text-xs text-slate">{location}</p>}
        </div>
      </div>
      {error && (
        <p role="alert" className="mt-4 text-sm text-error">
          {error}
        </p>
      )}
      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
        <button
          type="button"
          onClick={onClose}
          className="cursor-pointer rounded-md border border-primary px-10 py-2 text-primary hover:bg-mist"
        >
          {" "}
          Keep venue
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isDeleting}
          className="cursor-pointer rounded-md bg-error px-10 py-2 text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? "Deleting..." : "Delete venue"}
        </button>
      </div>
    </dialog>
  );
}
