"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Booking, Profile } from "@/app/types/venue";
import { useAuth } from "../context/AuthContext";
import { getProfile, getProfileBookings } from "@/app/lib/profile";
import { AuthError } from "@/app/lib/api";
import ProfileHeader from "./ProfileHeader";
import ProfileBookings from "./ProfileBookings";

export default function ProfileView() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user === undefined) return;

    if (user === null) {
      router.push("/login");
      return;
    }

    Promise.all([
      getProfile(user.name, user.accessToken),
      getProfileBookings(user.name, user.accessToken),
    ])
      .then(([profileData, bookingsData]) => {
        setProfile(profileData);
        setBookings(bookingsData);
      })
      .catch((error) => {
        if (error instanceof AuthError) {
          router.push("/login");
          return;
        }
        setError(error.message);
      });
  }, [user, router]);

  if (error) {
    return (
      <p role="alert" className="text-error">
        {error}
      </p>
    );
  }
  if (!profile) {
    return <p className="text-slate">Loading profile...</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      <ProfileHeader profile={profile} />
      <ProfileBookings bookings={bookings} />
    </div>
  );
}
