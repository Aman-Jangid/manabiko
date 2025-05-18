import { signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Define types for better type safety
type AuthOptions = {
  redirect?: boolean;
  callbackUrl?: string;
};

export const useAuth = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, update } = useSession();
  const [authStatus, setAuthStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const cancelled = useRef(false);

  useEffect(() => {
    cancelled.current = false;
    return () => {
      cancelled.current = true;
    };
  }, []);

  const setSafeState = (setter: () => void) => {
    if (!cancelled.current) setter();
  };

  /**
   * Sign in with email and password
   */
  const signInWithCredentials = async (
    email: string,
    password: string,
    options: AuthOptions = {}
  ) => {
    setSafeState(() => {
      setError("");
      setIsLoading(true);
      setAuthStatus("loading");
    });

    try {
      // First ensure we're signed out of any existing session
      await signOut({ redirect: false });

      // Clear guest user data
      localStorage.removeItem("guestUserId");

      // Sign in with provided credentials
      const result = await signIn("credentials", {
        username: email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setSafeState(() => {
          setError("Invalid email or password");
          setAuthStatus("error");
        });
        setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
        return false;
      }

      // Update session to get latest user info
      await update();

      // Redirect if needed
      if (options.redirect !== false) {
        router.push(options.callbackUrl || "/profile");
      }

      setSafeState(() => {
        setAuthStatus("success");
      });
      setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
      return true;
    } catch (error) {
      console.error("Authentication error:", error);
      setSafeState(() => {
        setError("An error occurred during sign in");
        setAuthStatus("error");
      });
      setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
      return false;
    } finally {
      setSafeState(() => {
        setIsLoading(false);
      });
    }
  };

  /**
   * Create or continue as guest user
   */
  const continueAsGuest = async (options: AuthOptions = {}) => {
    setSafeState(() => {
      setError("");
      setIsLoading(true);
      setAuthStatus("loading");
    });

    try {
      // If already a guest, just redirect if needed
      if (session?.user?.isGuest) {
        if (options.redirect !== false) {
          router.push(options.callbackUrl || "/profile");
        }
        setSafeState(() => {
          setAuthStatus("success");
        });
        setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
        return true;
      }

      // Create a new guest user
      const response = await fetch("/api/user/create-guest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to create guest user");
      }

      // Store guest ID for potential future use
      localStorage.setItem("guestUserId", data.user.id);

      // Sign in as guest
      const result = await signIn("credentials", {
        username: data.user.email,
        password: "guest-no-password", // Not checked for guests
        redirect: false,
      });

      if (result?.error) {
        setSafeState(() => {
          setError("Failed to create guest session");
          setAuthStatus("error");
        });
        setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
        return false;
      }

      // Update session
      await update();

      // Redirect if needed
      if (options.redirect !== false) {
        router.push(options.callbackUrl || "/profile");
      }

      setSafeState(() => {
        setAuthStatus("success");
      });
      setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
      return true;
    } catch (error) {
      console.error("Error creating guest session:", error);
      setSafeState(() => {
        setError("Failed to create guest session");
        setAuthStatus("error");
      });
      setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
      return false;
    } finally {
      setSafeState(() => {
        setIsLoading(false);
      });
    }
  };

  /**
   * Register a new user
   */
  const registerUser = async (
    username: string,
    email: string,
    password: string
  ) => {
    setSafeState(() => {
      setError("");
      setIsLoading(true);
      setAuthStatus("loading");
    });

    try {
      // Get current guest ID if exists (for potential data migration)
      const guestUserId = localStorage.getItem("guestUserId");

      // Register the user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
          guestUserId, // Send guest ID for potential data migration
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSafeState(() => {
          setError(data.error || "Failed to create account");
          setAuthStatus("error");
        });
        setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
        return false;
      }

      // Do NOT sign in automatically after registration
      // Just return true to indicate success
      setSafeState(() => {
        setAuthStatus("success");
      });
      setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      setSafeState(() => {
        setError("An error occurred during registration");
        setAuthStatus("error");
      });
      setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
      return false;
    } finally {
      setSafeState(() => {
        setIsLoading(false);
      });
    }
  };

  /**
   * Sign out the current user
   */
  const signOutUser = async (options: AuthOptions = {}) => {
    setSafeState(() => {
      setError("");
      setIsLoading(true);
      setAuthStatus("loading");
    });

    try {
      // Check if current user is a guest
      const isGuest = session?.user?.isGuest === true;

      // For guest users, we can just redirect without signing out
      if (isGuest && options.redirect !== false) {
        router.push(options.callbackUrl || "/");
        setSafeState(() => {
          setAuthStatus("success");
        });
        setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
        return true;
      }

      // For registered users, sign out properly
      await signOut({
        redirect: false,
      });

      // Create a new guest session after logout
      await continueAsGuest({ redirect: false });

      // Redirect if needed
      if (options.redirect !== false) {
        router.push(options.callbackUrl || "/");
      }

      setSafeState(() => {
        setAuthStatus("success");
      });
      setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
      return true;
    } catch (error) {
      console.error("Sign out error:", error);
      setSafeState(() => {
        setError("An error occurred during sign out");
        setAuthStatus("error");
      });
      setTimeout(() => setSafeState(() => setAuthStatus("idle")), 2000);
      return false;
    } finally {
      setSafeState(() => {
        setIsLoading(false);
      });
    }
  };

  return {
    error,
    isLoading,
    authStatus,
    signInWithCredentials,
    continueAsGuest,
    registerUser,
    signOutUser,
    isGuest: session?.user?.isGuest === true,
  };
};
