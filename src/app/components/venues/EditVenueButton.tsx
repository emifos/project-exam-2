"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import type { Venue } from "@/app/types/holidaze";
import { useAuth } from "../context/AuthContext";
import { deleteVenue } from "@/app/lib/venues";
import { AuthError } from "@/app/lib/api";
import DeleteVenueModal from "./DeleteVenueModal";

type EditVenueButtonProps = {
  venue: Venue;
};

export default function EditVenueButton({ venue }: EditVenueButtonProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const isOwner = !!user && user.name === venue.owner?.name;

  if (!isOwner) {
    return null;
  }

  function openModal() {
    setError("");
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  async function handleDelete() {
    setError("");
    setIsDeleting(true);

    try {
      await deleteVenue(venue.id, user?.accessToken);
      router.push("/");
    } catch (error) {
      if (error instanceof AuthError) {
        router.push("/login");
        return;
      }
      setError(
        error instanceof Error ? error.message : "Something went wrong.",
      );
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <Link
          href={`/venues/${venue.id}/edit`}
          aria-label="Edit venue"
          className="text-accent hover:text-accent-hover"
        >
          <Pencil aria-hidden="true" strokeWidth={1.5} className="size-5" />
        </Link>
        <button
          type="button"
          onClick={openModal}
          aria-label="Delete venue"
          className="cursor-pointer text-accent hover:text-error"
        >
          <Trash2 aria-hidden="true" strokeWidth={1.5} className="size-5" />
        </button>
      </div>
      <DeleteVenueModal
        venue={venue}
        isOpen={isModalOpen}
        isDeleting={isDeleting}
        error={error}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </>
  );
}
