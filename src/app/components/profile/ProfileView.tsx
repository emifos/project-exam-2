"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Booking, Profile, Venue } from "@/app/types/venue";
import { useAuth } from "../context/AuthContext";
import {
  getProfile,
  getProfileBookings,
  getProfileVenues,
} from "@/app/lib/profile";
import { AuthError } from "@/app/lib/api";
import ProfileHeader from "./ProfileHeader";
import ProfileBookings from "./ProfileBookings";
import ManagerProfile from "./ManagerProfile";
import EditProfileModal from "./EditProfileModal";

export default function ProfileView() {
  const { user } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [error, setError] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (user === undefined) return;

    if (user === null) {
      router.push("/login");
      return;
    }

    Promise.all([
      getProfile(user.name, user.accessToken),
      getProfileBookings(user.name, user.accessToken),
      user.venueManager
        ? getProfileVenues(user.name, user.accessToken)
        : Promise.resolve([]),
    ])
      .then(([profileData, bookingsData, venuesData]) => {
        setProfile(profileData);
        setBookings(bookingsData);
        setVenues(venuesData);
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
      <ProfileHeader profile={profile} onEdit={() => setIsEditOpen(true)} />
      {profile.venueManager ? (
        <ManagerProfile venues={venues} bookings={bookings} />
      ) : (
        <ProfileBookings bookings={bookings} />
      )}

      {isEditOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditOpen(false)}
          onSaved={(updated) => {
            setProfile(updated);
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
}
