"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

/**
 * Component that automatically creates a guest session when no active session exists.
 * This should be included in the root layout to ensure guest sessions are created on first run.
 */
export default function AutoGuestSession() {
  const { status } = useSession();
  const { continueAsGuest } = useAuth();
  const [hasAttemptedGuestCreation, setHasAttemptedGuestCreation] =
    useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Don't run on auth pages
    if (typeof pathname === "string" && pathname.startsWith("/auth/")) return;

    // Only create a guest session if not loading, not on auth pages, and not already attempted
    if (status === "unauthenticated" && !hasAttemptedGuestCreation) {
      setHasAttemptedGuestCreation(true);
      continueAsGuest({ redirect: false });
    }
  }, [status, continueAsGuest, hasAttemptedGuestCreation, pathname]);

  // This component doesn't render anything
  return null;
}
