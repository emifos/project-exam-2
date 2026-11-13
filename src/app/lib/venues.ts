import type { Venue } from "../types/venue";
import { apiFetch } from "./api";

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
    `/holidaze/venues/${id}?_owner=true&_booking=true`,
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
