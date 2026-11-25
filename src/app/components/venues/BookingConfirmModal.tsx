"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { Venue } from "@/app/types/holidaze";
import { useAuth } from "../context/AuthContext";
import { createBooking } from "@/app/lib/bookings";
import { AuthError } from "@/app/lib/api";
import { formDate, getNights } from "@/app/lib/utils";
import VenueImage from "./VenueImage";

type BookingConfirmModalProps = {
  venue: Venue;
  dateFrom: Date;
  dateTo: Date;
  guests: number;
  onClose: (booked: boolean) => void;
};

export default function BookingConfirmModal({
  venue,
  dateFrom,
  dateTo,
  guests,
  onClose,
}: BookingConfirmModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState<"confirm" | "success">("confirm");
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  const from = dateFrom.toISOString();
  const to = dateTo.toISOString();
  const nights = getNights(from, to);
  const total = nights * venue.price;
  const location = [venue.location?.city, venue.location?.country]
    .filter(Boolean)
    .join(", ");

  async function handleConfirm() {
    setError("");
    setIsBooking(true);

    try {
      await createBooking(
        { dateFrom: from, dateTo: to, guests, venueId: venue.id },
        user?.accessToken,
      );
      setStep("success");
      router.refresh();
    } catch (error) {
      if (error instanceof AuthError) {
        router.push("/login");
        return;
      }
      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsBooking(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={() => onClose(step === "success")}
      aria-labelledby="booking-modal-title"
      className="m-auto w-11/12 max-w-xl rounded-[50px] bg-white p-6 backdrop:bg-black/40 md:p-10"
    >
      <button
        type="button"
        onClick={() => dialogRef.current?.close()}
        aria-label="Close"
        className="absolute top-6 right-6 cursor-pointer text-slate hover:text-ink md:top-8 md:right-8"
      >
        <X aria-hidden="true" strokeWidth={1.5} className="size-7" />
      </button>
      {step === "confirm" ? (
        <div className="flex flex-col gap-5">
          <div>
            <h2 id="booking-modal-title" className="text-xl text-ink">
              Confirm your booking
            </h2>
            <p className="text-sm text-ink">
              Review your stay before confirming.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative aspect-16/10 w-28 shrink-0 overflow-hidden rounded-xl bg-accent/10">
              <VenueImage
                src={venue.media?.[0]?.url}
                alt={venue.media?.[0]?.alt || venue.name}
                sizes="112px"
              />
            </div>
            <div className="min-w-0">
              <p className="text-ink">{venue.name}</p>
              {location && <p className="text-xs text-slate">{location}</p>}
              <p className="mt-1 text-sm text-ink">
                ${venue.price} <span className="text-slate">/ night</span>
              </p>
            </div>
          </div>
          <hr className="border-line" />
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-xs text-slate">Check-in</p>
              <p className="text-ink">{formDate(from)}</p>
            </div>
            <div>
              <p className="text-xs text-slate">Check-out</p>
              <p className="text-ink">{formDate(to)}</p>
            </div>
            <div>
              <p className="text-xs text-slate">Guests</p>
              <p className="text-ink">
                {guests} {guests === 1 ? "guest" : "guests"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate">Duration</p>
              <p className="text-ink">
                {nights} {nights === 1 ? "night" : "nights"}
              </p>
            </div>
          </div>
          <hr className="border-line" />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm text-slate">
              <span>
                ${venue.price} * {nights} {nights === 1 ? "night" : "nights"}
              </span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-ink">
              <span>Total price</span>
              <span className="text-lg font-medium">${total}</span>
            </div>
          </div>
          {error && (
            <p role="alert" className="mt-4 text-sm text-error">
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isBooking}
            className="cursor-pointer rounded-md bg-accent py-3 text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isBooking ? "Booking..." : "Confirm booking"}
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 py-6 text-center">
          <div>
            <h2
              id="booking-modal-title"
              className="text-xl text-success font-semibold"
            >
              Booking confirmed
            </h2>
            <p className="text-sm text-ink">
              Your stay at {venue.name} is booked.
            </p>
          </div>
          <div className="flex w-full items-center gap-4 rounded-3xl bg-success-light p-4 text-left">
            <div className="relative aspect-16/10 w-28 shrink-0 overflow-hidden rounded-xl bg-accent/10">
              <VenueImage
                src={venue.media?.[0]?.url}
                alt={venue.media?.[0]?.alt || venue.name}
                sizes="96px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-ink">{venue.name}</p>
              {location && <p className="text-xs text-slate">{location}</p>}
            </div>
            <div className="text-right text-xs text-ink">
              <p>
                {formDate(from)} - {formDate(to)}
              </p>
              <p>
                {guests} {guests === 1 ? "guest" : "guests"}
              </p>
            </div>
          </div>
          <Link
            href="/profile"
            className="w-full max-w-xs rounded-md bg-accent py-3 text-white hover:bg-accent-hover"
          >
            View booking
          </Link>
        </div>
      )}
    </dialog>
  );
}
