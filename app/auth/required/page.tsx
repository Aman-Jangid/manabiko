"use client";

import Link from "next/link";
import { Header } from "@/components/Header";

export default function AuthRequired() {
  return (
    <div
      className="w-full h-[100vh] font-[family-name:var(--font-geist-sans)] grid grid-rows-[5vh_95vh] relative overflow-hidden"
      style={{ background: "var(--color-bg)", color: "var(--color-strong)" }}
    >
      <Header />
      <main className="w-full grow flex items-center justify-center row-span-2 px-4 sm:px-0">
        <div
          className="w-full max-w-md space-y-6 sm:space-y-8 sm:p-10 rounded-lg shadow-md border-2 border-[var(--color-accent)]/60"
          style={{
            background: "var(--color-surface)",
            color: "var(--color-strong)",
          }}
        >
          <div>
            <h2
              className="mt-6 text-center text-3xl font-bold tracking-tight"
              style={{ color: "var(--color-strong)" }}
            >
              Authentication Required
            </h2>
            <p
              className="mt-2 text-center text-sm"
              style={{ color: "var(--color-text)" }}
            >
              Please sign in, sign up, or continue as guest to access this
              feature.
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-8 text-[var(--color-strong)]">
            <Link
              href="/auth/signin"
              className="w-full flex justify-center py-2 px-4 border-2 bg-[var(--color-accent)]/20 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-[var(--color-accent)]/30 hover:border-dashed transition-all duration-200"
              style={{
                borderColor: "var(--color-accent)",
                fontWeight: "semibold",
              }}
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="w-full flex justify-center py-2 px-4 border-2 bg-[var(--color-accent)]/20 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-[var(--color-accent)]/30 hover:border-dashed transition-all duration-200"
              style={{
                borderColor: "var(--color-accent)",
                fontWeight: "semibold",
              }}
            >
              Sign Up
            </Link>
            <div className="flex items-center my-2">
              <div className="flex-grow h-px bg-[var(--color-border)]" />
              <span className="mx-3 text-sm text-[var(--color-text-secondary)]">
                or
              </span>
              <div className="flex-grow h-px bg-[var(--color-border)]" />
            </div>
            <button
              className="w-full flex justify-center py-2 px-4 border-2 bg-[var(--color-accent-quaternary)]/20 rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-[var(--color-accent-quaternary)]/30 hover:border-dashed transition-all duration-200 disabled:opacity-50 cursor-not-allowed"
              style={{
                borderColor: "var(--color-accent-quaternary)",
                color: "var(--color-text)",
              }}
              disabled
            >
              Continue as Guest (coming soon)
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
