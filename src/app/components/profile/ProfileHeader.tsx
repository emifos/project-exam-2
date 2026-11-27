import Image from "next/image";
import { Pencil } from "lucide-react";
import type { Profile } from "@/app/types/holidaze";

type ProfileHeaderProps = {
  profile: Profile;
  onEdit?: () => void;
};

export default function ProfileHeader({ profile, onEdit }: ProfileHeaderProps) {
  const role = profile.venueManager ? "Venue Manager" : "Customer";

  return (
    <section className="overflow-hidden rounded-3xl bg-white shadow-lg md:rounded-[50px]">
      <div className="relative h-28 bg-accent/10 md:h-40">
        {profile.banner?.url && (
          <Image
            src={profile.banner.url}
            alt={profile.banner.alt || ""}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-6 p-6 md:px-10 md:py-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl text-primary">My Profile</h1>
            <p className="text-sm text-slate">
              Manage your profile and upcoming stays.
            </p>
          </div>
          {onEdit && (
            <button
              type="button"
              onClick={onEdit}
              aria-label="Edit Profile"
              className="cursor-pointer text-accent hover:text-accent-hover"
            >
              <Pencil aria-hidden="true" strokeWidth={1.5} className="size-5" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative size-20 shrink-0 overflow-hidden rounded-full bg-accent/10">
            {profile.avatar?.url && (
              <Image
                src={profile.avatar.url}
                alt={profile.avatar.alt || ""}
                fill
                sizes="80px"
                className="object-cover"
              />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-ink text-lg">{profile.name}</p>
            <p
              className="truncate text-xs
             text-slate"
            >
              {profile.email}
            </p>
            <p className="mt-2 text-xs text-slate">{role}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
