import type { Booking } from "../types/venue";
import { authFetch } from "./api";

export type BookingRequest = {
  dateFrom: string;
  dateTo: string;
  guests: number;
  venueId: string;
};

export async function createBooking(
  data: BookingRequest,
  accessToken: string | undefined,
): Promise<Booking> {
  const response = await authFetch("/holidaze/bookings", accessToken, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Could not create booking.");
  }

  return json.data;
}
