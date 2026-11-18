import type { Venue, VenueRequest } from "../types/venue";
import { apiFetch, authFetch } from "./api";

export async function getVenues(): Promise<Venue[]> {
  const response = await apiFetch(
    "/holidaze/venues?sort=created&sortOrder=desc",
  );

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Could not load venues.");
  }

  return json.data;
}

export async function getVenuesById(id: string): Promise<Venue | null> {
  const response = await apiFetch(
    `/holidaze/venues/${id}?_owner=true&_bookings=true`,
  );

  if (response.status === 404) {
    return null;
  }

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Could not load venue.");
  }

  return json.data;
}

export async function searchVenues(query: string): Promise<Venue[]> {
  const params = new URLSearchParams({ q: query });
  const response = await apiFetch(`/holidaze/venues/search?${params}`);

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Could not search venues.");
  }

  return json.data;
}

export async function createVenue(
  data: VenueRequest,
  accessToken: string | undefined,
): Promise<Venue> {
  const response = await authFetch("/holidaze/venues", accessToken, {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Could not create venue.");
  }

  return json.data;
}
