"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AutoGuestSession() {
  const { status } = useSession();
  const { continueAsGuest } = useAuth();

  useEffect(() => {
    const createGuestSession = async () => {
      // Only create a guest session if there's no active session
      if (status === "unauthenticated") {
        // Check if there's a stored guest ID
        const lastGuestId = localStorage.getItem("lastGuestId");
        if (lastGuestId) {
          // Use the stored guest ID to continue the session
          await continueAsGuest(lastGuestId);
        } else {
          // Create a new guest session
          await continueAsGuest();
        }
      }
    };

    createGuestSession();
  }, [status, continueAsGuest]);

  // This component doesn't render anything
  return null;
}
