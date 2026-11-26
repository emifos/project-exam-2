import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../components/context/AuthContext";

export function useRequireManager(ownerName?: string) {
  const { user } = useAuth();
  const router = useRouter();

  const isManager = !!user?.venueManager;
  const isOwner = !ownerName || user?.name === ownerName;
  const isAllowed = isManager && isOwner;

  useEffect(() => {
    if (user === undefined) return;

    if (user === null) {
      router.replace("/login");
      return;
    }

    if (!isAllowed) {
      router.replace("/");
    }
  }, [user, isAllowed, router]);

  return { isAllowed };
}
