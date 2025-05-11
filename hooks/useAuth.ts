import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export const useAuth = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const signInWithCredentials = async (email: string, password: string) => {
    setError("");
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        username: email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return false;
      }

      router.push("/profile");
      return true;
    } catch (error) {
      setError("An error occurred during sign in");
      console.error(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const continueAsGuest = async (guestId?: string) => {
    setError("");
    setIsLoading(true);

    try {
      // Check if there's already a guest session
      if (session?.user?.isGuest) {
        router.push("/profile");
        return true;
      }

      const result = await signIn("credentials", {
        redirect: false,
        guestId,
      });

      if (result?.error) {
        setError("Failed to create guest session");
        return false;
      }

      router.push("/profile");
      return true;
    } catch (error) {
      console.error("Error creating guest session:", error);
      setError("Failed to create guest session");
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    error,
    isLoading,
    signInWithCredentials,
    continueAsGuest,
  };
};
