import type { Venue } from "../types/venue";
import { apiFetch } from "./api";

export async function getVenues(): Promise<Venue[]> {
  const response = await apiFetch(
    "/holidaze/venues?sort=created&sorOrder=desc",
  );

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json?.errors?.[0]?.message ?? "Could not load venues.");
  }

  return json.data;
}
