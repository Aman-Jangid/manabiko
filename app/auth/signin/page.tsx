"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FormInput } from "@/components/FormInput";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, isLoading, signInWithCredentials, continueAsGuest } =
    useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await signInWithCredentials(email, password);
  };

  return (
    <div
      className="w-full h-[100vh] font-[family-name:var(--font-geist-sans)] grid grid-rows-[5vh_95vh] relative overflow-hidden"
      style={{ background: "var(--color-bg)", color: "var(--color-strong)" }}
    >
      <Header />

      <main className="w-full grow flex items-center justify-center row-span-2 px-4 sm:px-0">
        <div
          className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8 p-6 sm:p-10 rounded-lg shadow-md border-2 border-[var(--color-accent)]/60"
          style={{
            background: "var(--color-surface)",
            color: "var(--color-strong)",
          }}
        >
          <div>
            <h2
              className="mt-3 sm:mt-6 text-center text-2xl sm:text-3xl font-bold"
              style={{ color: "var(--color-strong)" }}
            >
              Sign in to your account
            </h2>
            <p
              className="mt-2 text-center text-sm"
              style={{ color: "var(--color-text)" }}
            >
              Or{" "}
              <Link
                href="/auth/signup"
                className="font-medium hover:opacity-80 transition-opacity duration-200"
                style={{ color: "var(--color-accent)" }}
              >
                create an account
              </Link>{" "}
              if you don&apos;t have one
            </p>
          </div>

          {error && (
            <div className="bg-[var(--color-accent-secondary)]/10 border border-[var(--color-accent-secondary)] text-[var(--color-accent-secondary)] px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form
            className="mt-6 sm:mt-8 space-y-5 sm:space-y-6"
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
                className="group relative w-full flex justify-center py-2 px-4 border-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:brightness-110 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20 disabled:opacity-50"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-4 sm:mt-6">
            <div className="text-center">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  continueAsGuest();
                }}
                className="font-medium hover:opacity-80 transition-opacity duration-200"
                style={{ color: "var(--color-accent)" }}
              >
                Continue as Guest
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
