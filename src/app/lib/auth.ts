import { apiFetch } from "./api";

type RegisterData = {
  name: string;
  email: string;
  password: string;
  venueManager: boolean;
};

export async function registerUser(data: RegisterData) {
  const response = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.errors?.[0]?.message ?? "Registration failed.");
  }

  return json.data;
}
