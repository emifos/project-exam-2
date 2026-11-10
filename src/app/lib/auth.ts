import { LoginRequest, RegisterRequest, User } from "../types/api";
import { apiFetch } from "./api";

export async function registerUser(data: RegisterRequest) {
  const response = await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });

  const json = await response.json().catch(() => null);

  if (!response.ok || !json) {
    throw new Error(json.errors?.[0]?.message ?? "Registration failed.");
  }

  return json.data;
}

export async function loginUser(data: LoginRequest): Promise<User> {
  const response = await apiFetch("/auth/login?_holidaze=true", {
    method: "POST",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Invalid email or password.");
  }

  const json = await response.json();
  return json.data;
}

export function saveUser(user: User) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser(): User | null {
  const stored = localStorage.getItem("user");
  return stored ? JSON.parse(stored) : null;
}

export function clearUser() {
  localStorage.removeItem("user");
}
