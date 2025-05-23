"use client";

import {
  FormEvent,
  useState,
  //  useEffect
} from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FormInput } from "@/components/FormInput";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { useAuth } from "@/app/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState("");

  const router = useRouter();
  const { status } = useSession();
  const {
    error,
    isLoading,
    signInWithCredentials,
    // isGuest
  } = useAuth();

  // Redirect to profile if already authenticated as a non-guest user
  // useEffect(() => {
  //   if (status === "authenticated" && !isGuest) {
  //     router.push("/profile");
  //   }
  // }, [status, isGuest, router]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Basic validation
    if (!email || !password) {
      setLocalError("Please enter both email and password");
      return;
    }

    // Sign in with credentials
    const success = await signInWithCredentials(email, password, {
      redirect: true,
      callbackUrl: "/profile",
    });

    if (!success && !error) {
      setLocalError("Failed to sign in");
    }
  };

  const handleCancel = () => {
    if (status === "unauthenticated") {
      router.push("/auth/required");
    } else {
      router.push("/");
    }
  };

  return (
    <div
      className="w-full min-h-screen font-[family-name:var(--font-geist-sans)] grid grid-rows-[auto_1fr] relative overflow-hidden"
      style={{ background: "var(--color-bg)", color: "var(--color-strong)" }}
    >
      <Header />

      <main className="w-full grow flex items-center justify-center row-span-2 px-2 sm:px-4 md:px-0">
        <div
          className="w-full max-w-xs xs:max-w-sm sm:max-w-md space-y-4 xs:space-y-6 sm:space-y-8 p-4 xs:p-6 sm:p-10 rounded-lg shadow-md border-2 border-[var(--color-accent)]/60"
          style={{
            background: "var(--color-surface)",
            color: "var(--color-strong)",
          }}
        >
          <div>
            <h2
              className="mt-4 xs:mt-6 text-center text-2xl xs:text-3xl font-bold tracking-tight"
              style={{ color: "var(--color-strong)" }}
            >
              Sign in to your account
            </h2>
            <p
              className="mt-2 text-center text-xs xs:text-sm"
              style={{ color: "var(--color-text)" }}
            >
              Or{" "}
              <Link
                href="/auth/signup"
                className="font-medium hover:opacity-80"
                style={{ color: "var(--color-accent)" }}
              >
                create a new account
              </Link>
            </p>
          </div>

          {(localError || error) && (
            <div
              className="p-2 xs:p-3 rounded-md text-xs xs:text-sm"
              style={{
                backgroundColor: "var(--color-error-bg)",
                color: "var(--color-error)",
              }}
            >
              {localError || error}
            </div>
          )}

          <form
            className="mt-4 xs:mt-6 sm:mt-8 space-y-4 xs:space-y-5 sm:space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <FormInput
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="rounded-t-md"
              />
              <PasswordInput
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="rounded-b-md"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 text-xs xs:text-sm bg-[var(--color-accent)] border-2 border-dashed border-[var(--color-accent)] rounded-md shadow-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 hover:border-dashed hover:bg-[var(--color-accent)]/20 transition-all duration-200"
                style={{
                  opacity: isLoading ? 0.7 : 1,
                }}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-2 xs:mt-4 sm:mt-6 flex flex-col gap-2 xs:flex-row xs:justify-between">
            <button
              onClick={handleCancel}
              className="w-full flex justify-center py-2 px-4 text-xs xs:text-sm bg-[var(--color-text-secondary)]/20 border-2 border-[var(--color-text-secondary)]/40 rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:border-dashed hover:bg-[var(--color-border)]/10"
              style={{
                color: "var(--color-text-secondary)",
                fontWeight: "semibold",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
