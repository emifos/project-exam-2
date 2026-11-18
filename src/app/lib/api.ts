import { API_KEY, BASE_URL } from "./config";

export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export async function apiFetch(
  path: string,
  options: RequestInit = {},
): Promise<Response> {
  return fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
}

export async function authFetch(
  path: string,
  accessToken: string | undefined,
  options: RequestInit = {},
): Promise<Response> {
  if (!accessToken) {
    throw new AuthError("You need to log in to do this.");
  }

  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": API_KEY,
    },
  });

  if (response.status === 401) {
    throw new AuthError("Your session has expired. Please log in again.");
  }

  return response;
}
