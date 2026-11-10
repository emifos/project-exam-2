"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccountTypeToggle from "./AccountTypeToggle";
import { registerUser } from "@/app/lib/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const USERNAME_PATTERN = /^\w+$/;

export default function RegisterForm() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<"customer" | "manager">(
    "customer",
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isLoading) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const newErrors: Record<string, string> = {};

    if (!name) {
      newErrors.name = "Username is required";
    } else if (!USERNAME_PATTERN.test(name)) {
      newErrors.name =
        "Username can only contain letters, numbers and underscores";
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!EMAIL_PATTERN.test(email)) {
      newErrors.email = "Enter a valid email address";
    } else if (!email.toLowerCase().endsWith("@stud.noroff.no")) {
      newErrors.email = "Email must be a @stud.noroff.no address";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    setFormError("");
    setSuccessMessage("");

    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      await registerUser({
        name,
        email,
        password: formData.password,
        venueManager: accountType === "manager",
      });

      setSuccessMessage("Account created! Redirecting to login...");
      router.push("/login");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again.",
      );
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <AccountTypeToggle value={accountType} onChange={setAccountType} />
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm text-ink">
            Username *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="nickname"
            placeholder="User_name"
            value={formData.name}
            onChange={handleChange}
            disabled={isLoading}
            required
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className="rounded-md border border-border-strong px-3 py-2 text-sm"
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-error">
              {errors.name}
            </p>
          )}
        </div>
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
            autoComplete="new-password"
            placeholder="Create password"
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
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="text-sm text-ink">
            Confirm password *
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autoComplete="new-password"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={isLoading}
            required
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? "confirmPassword-error" : undefined
            }
            className="rounded-md border border-border-strong px-3 py-2 text-sm"
          />
          {errors.confirmPassword && (
            <p id="confirmPassword-error" className="text-sm text-error">
              {errors.confirmPassword}
            </p>
          )}
        </div>
        {formError && (
          <p role="alert" className="text-sm text-error">
            {formError}
          </p>
        )}
        {successMessage && (
          <p role="status" className="text-sm text-success">
            {successMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="mt-2 rounded-md bg-accent py-2 text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? "Creating account..." : "Submit"}
        </button>
      </form>
      <div className="flex justify-center gap-1 text-sm">
        <p className="text-center text-slate">Already have an account?</p>
        <Link href="/login" className="font-medium underline hover:text-accent">
          Log in
        </Link>
      </div>
    </div>
  );
}
