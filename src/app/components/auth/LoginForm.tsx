"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountTypeToggle from "./AccountTypeToggle";
import { loginUser } from "@/app/lib/auth";
import { useAuth } from "../context/AuthContext";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();
  const [accountType, setAccountType] = useState<"customer" | "manager">(
    "customer",
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;

    const email = formData.email.trim();
    const newErrors: Record<string, string> = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_PATTERN.test(email)) {
      newErrors.email = "Enter a valid email address";
    } else if (!email.toLowerCase().endsWith("@stud.noroff.no")) {
      newErrors.email = "Email must be a @stud.noroff.no address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    setFormError("");

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      const user = await loginUser({ email, password: formData.password });

      const selectedManager = accountType === "manager";
      if (!!user.venueManager !== selectedManager) {
        throw new Error(
          selectedManager
            ? "This account is not a venue manager account."
            : "This is a venue manager account. Select Venue Manager to log in. ",
        );
      }
      login(user);
      router.push("/");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <AccountTypeToggle value={accountType} onChange={setAccountType} />
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm text-ink">
            Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            placeholder="example@stud.noroff.no"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="rounded-md border border-border-strong px-3 py-2 text-sm"
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-error">
              {errors.email}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm text-ink">
            Password *
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="rounded-md border border-border-strong px-3 py-2 text-sm"
          />
          {errors.password && (
            <p id="password-error" className="text-sm text-error">
              {errors.password}
            </p>
          )}
        </div>
        {formError && (
          <p role="alert" className="text-sm text-error">
            {formError}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="mt-2 rounded-md bg-accent py-2 text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <div className="flex justify-center gap-1 text-sm">
        <p className="text-center text-slate">New to Holidaze?</p>
        <Link
          href="/register"
          className="font-medium underline hover:text-accent"
        >
          Register here
        </Link>
      </div>
    </div>
  );
}
