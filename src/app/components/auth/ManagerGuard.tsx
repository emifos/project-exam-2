"use client";

import { useRequireManager } from "@/app/hooks/useRequireManager";

type ManagerGuardProps = {
  ownerName?: string;
  children: React.ReactNode;
};

export default function ManagerGuard({
  ownerName,
  children,
}: ManagerGuardProps) {
  const { isAllowed } = useRequireManager(ownerName);

  if (!isAllowed) {
    return <p className="text-slate">Checking access...</p>;
  }

  return <>{children}</>;
}
