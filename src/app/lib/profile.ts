import type { Booking, Profile, Venue } from "../types/venue";
import { authFetch } from "./api";

export async function getProfile(
  name: string,
  accessToken: string | undefined,
): Promise<Profile> {
  const response = await authFetch(`holidaze/profiles/${name}`, accessToken);

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.erros?.[0]?.message ?? "Could not load profile.");
  }

  return json.data;
}

export async function getProfileBookings(
  name: string,
  accessToken: string | undefined,
): Promise<Booking[]> {
  const response = await authFetch(
    `/holidaze/profiles/${name}/bookings?_venue=true&sort=dateFrom&sortOrder=asc`,
    accessToken,
  );

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Could not load bookings.");
  }

  return json.data;
}

export async function getProfileVenues(
  name: string,
  accessToken: string | undefined,
): Promise<Venue[]> {
  const response = await authFetch(
    `/holidaze/profiles/${name}/venues?_bookings=true`,
    accessToken,
  );

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Could not load venues.");
  }

  return json.data;
}
