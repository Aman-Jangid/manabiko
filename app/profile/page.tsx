"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { User, LogOut } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect } from "react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to sign-in if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    }
  }, [status, router]);

  // Show loading state while session is loading
  if (status === "loading") {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <div className="animate-pulse">Loading profile...</div>
      </div>
    );
  }

  // Get user information from session
  const userName = session?.user?.name || "Guest User";
  const userEmail = session?.user?.email;

  return (
    <div
      className="w-full h-[100vh] font-[family-name:var(--font-geist-sans)] grid grid-rows-[5vh_95vh] relative overflow-hidden"
      style={{ background: "var(--color-bg)", color: "var(--color-strong)" }}
    >
      <div className="w-full h-5vh flex items-center justify-between px-4 sm:px-6 gap-6">
        <div className="flex items-center">
          <h1
            className="text-xl font-bold cursor-pointer select-none"
            style={{ fontFamily: "Hachi Maru Pop", translate: "0 -6px" }}
            onClick={() => router.push("/")}
          >
            学ぶKo
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
        </div>
      </div>

      <main className="w-full grow flex items-center justify-center row-span-2 px-4 sm:px-0">
        <div
          className="w-full max-w-2xl space-y-6 sm:space-y-8 sm:p-10 rounded-lg shadow-md border-2 border-[var(--color-accent)]/60"
          style={{
            background: "var(--color-surface)",
            color: "var(--color-strong)",
          }}
        >
          <div>
            <div
              className="px-6 py-6 border-b"
              style={{ borderColor: "var(--color-accent)" }}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    session?.user?.name === null
                      ? "bg-[var(--color-accent-quaternary)]/50"
                      : "bg-[var(--color-accent)]/50"
                  }`}
                >
                  <User className="w-8 h-8" color="var(--color-strong)" />
                </div>
                <div className="flex flex-col">
                  <div className="flex gap-4 items-center justify-between">
                    <h1
                      className="text-2xl font-bold"
                      style={{ color: "var(--color-strong)" }}
                    >
                      {userName}
                    </h1>
                  </div>
                  {userEmail && (
                    <p style={{ color: "var(--color-text)" }}>{userEmail}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-6 py-6">
              <h2
                className="text-lg font-medium mb-4"
                style={{ color: "var(--color-strong)" }}
              >
                Account Information
              </h2>

              <div
                className="mt-8 pt-6 border-t"
                style={{ borderColor: "var(--color-border)" }}
              >
                <button
                  className="inline-flex items-center px-4 py-2 border rounded-md shadow-sm text-sm font-medium hover:bg-[var(--color-accent-secondary)]/20"
                  style={{
                    borderColor: "var(--color-accent-secondary)",
                    color: "var(--color-accent-secondary)",
                  }}
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 -ml-1 h-4 w-4" aria-hidden="true" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
