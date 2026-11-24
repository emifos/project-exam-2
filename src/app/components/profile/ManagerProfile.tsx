"use client";

import { useState } from "react";
import type { Booking, Venue } from "@/app/types/holidaze";
import ProfileBookings from "./ProfileBookings";
import ManagerVenues from "./ManagerVenues";

type ManagerProfileProps = {
  venues: Venue[];
  bookings: Booking[];
};

const tabs = [
  { id: "venues", label: "My venues" },
  { id: "bookings", label: "My bookings" },
] as const;

type TabId = (typeof tabs)[number]["id"];

export default function ManagerProfile({
  venues,
  bookings,
}: ManagerProfileProps) {
  const [activeTab, setActiveTab] = useState<TabId>("venues");

  return (
    <div className="flex flex-col gap-6">
      <div
        role="tablist"
        aria-label="Profile sections"
        className="flex justify-center gap-2 md:w-[280px]"
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-selected={isActive}
              aria-controls={`panel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`cursor-pointer rounded-full px-5 py-2 text-sm ${isActive ? "bg-accent text-white" : "bg-white text-ink shadow-sm hover:bg-mist"}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === "venues" ? (
          <ManagerVenues venues={venues} />
        ) : (
          <ProfileBookings bookings={bookings} />
        )}
      </div>
    </div>
  );
}
