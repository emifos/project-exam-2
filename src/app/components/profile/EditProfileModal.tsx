"use client";

import { useEffect, useRef, useState } from "react";
import type { Profile } from "@/app/types/holidaze";
import { useAuth } from "../context/AuthContext";
import { updateProfile, type ProfileUpdate } from "@/app/lib/profile";
import { AuthError } from "@/app/lib/api";
import { useRouter } from "next/navigation";

type EditProfileModalProps = {
  profile: Profile;
  onClose: () => void;
  onSaved: (profile: Profile) => void;
};

const inputClass = "rounded-md border border-border-strong px-3 py-2 text-sm";

function isValidUrl(url: string) {
  return URL.canParse(url) && url.startsWith("http");
}

export default function EditProfileModal({
  profile,
  onClose,
  onSaved,
}: EditProfileModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    avatarUrl: profile.avatar?.url ?? "",
    avatarAlt: profile.avatar?.alt ?? "",
    bannerUrl: profile.banner?.url ?? "",
    bannerAlt: profile.banner?.alt ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    dialogRef.current?.showModal();
  }, []);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    const newErrors: Record<string, string> = {};
    const avatarUrl = form.avatarUrl.trim();
    const bannerUrl = form.bannerUrl.trim();

    if (avatarUrl && !isValidUrl(avatarUrl)) {
      newErrors.avatarUrl = "Enter a valid image URL starting with http";
    }
    if (bannerUrl && !isValidUrl(bannerUrl)) {
      newErrors.bannerUrl = "Enter a valid image URL starting with http";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const data: ProfileUpdate = {};
    if (avatarUrl) data.avatar = { url: avatarUrl, alt: form.avatarAlt.trim() };
    if (bannerUrl) data.banner = { url: bannerUrl, alt: form.bannerAlt.trim() };

    setIsSaving(true);

    try {
      const updated = await updateProfile(
        profile.name,
        data,
        user?.accessToken,
      );
      onSaved(updated);
    } catch (error) {
      if (error instanceof AuthError) {
        router.push("/login");
        return;
      }
      setFormError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-labelledby="edit-profile-title"
      className="m-auto w-11/12 max-w-3xl rounded-[50px] bg-white p-6 backdrop:bg-black/40 md:rounded-[50px] md:p-10"
    >
      <h2 id="edit-profile-title" className="text-2xl text-ink">
        Edit Profile
      </h2>
      <p className="mt-1 text-sm text-slate">
        Update your avatar/profile picture and banner.
      </p>
      <hr className="my-6 border-line" />

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="avatarUrl" className="text-sm text-ink">
            Avatar/Profile picture
          </label>
          <input
            id="avatarUrl"
            name="avatarUrl"
            type="url"
            placeholder=""
            value={form.avatarUrl}
            onChange={handleChange}
            aria-invalid={!!errors.avatarUrl}
            aria-describedby={errors.avatarUrl ? "avatarUrl-error" : undefined}
            className={inputClass}
          />
          {errors.avatarUrl && (
            <p id="avatarUrl-error" className="text-sm text-error">
              {errors.avatarUrl}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 md:max-w-md">
          <label htmlFor="avatarAlt" className="text-sm text-ink">
            Alt text
          </label>
          <input
            id="avatarAlt"
            name="avatarAlt"
            type="text"
            placeholder="Describe the image"
            value={form.avatarAlt}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="bannerUrl" className="text-sm text-ink">
            Banner
          </label>
          <input
            id="bannerUrl"
            name="bannerUrl"
            type="url"
            placeholder=""
            value={form.bannerUrl}
            onChange={handleChange}
            aria-invalid={!!errors.bannerUrl}
            aria-describedby={errors.bannerUrl ? "bannerUrl-error" : undefined}
            className={inputClass}
          />
          {errors.bannerUrl && (
            <p id="bannerUrl-error" className="text-sm text-error">
              {errors.bannerUrl}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1 md:max-w-md">
          <label htmlFor="bannerAlt" className="text-sm text-ink">
            Alt text
          </label>
          <input
            id="bannerAlt"
            name="bannerAlt"
            type="text"
            placeholder="Describe the image"
            value={form.bannerAlt}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        {formError && (
          <p role="alert" className="text-sm text-error">
            {formError}
          </p>
        )}
        <div className="mt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="cursor-pointer rounded-md border border-primary px-5 py-2 text-primary hover:bg-mist"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="cursor-pointer rounded-md bg-accent px-5 py-2 text-white hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </div>
      </form>
    </dialog>
  );
}
