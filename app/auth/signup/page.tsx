"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { FormInput } from "@/components/FormInput";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { useAuth } from "@/hooks/useAuth";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error, isLoading, continueAsGuest } = useAuth();
  const [localError, setLocalError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLocalError("");

    // Basic validation
    if (!username || !email || !password) {
      setLocalError("Please fill in all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      // Register the user
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setLocalError(data.error || "Failed to create account");
        return;
      }

      // Redirect to sign in page after successful registration
      window.location.href = "/auth/signin";
    } catch (error) {
      setLocalError("An error occurred during registration");
      console.error(error);
    }
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
              Create a new account
            </h2>
            <p
              className="mt-2 text-center text-sm"
              style={{ color: "var(--color-text)" }}
            >
              Or{" "}
              <Link
                href="/auth/signin"
                className="font-medium hover:opacity-80 transition-opacity duration-200"
                style={{ color: "var(--color-accent)" }}
              >
                sign in
              </Link>{" "}
              if you already have an account
            </p>
          </div>

          {(error || localError) && (
            <div className="bg-[var(--color-accent-secondary)]/10 border border-[var(--color-accent-secondary)] text-[var(--color-accent-secondary)] px-4 py-3 rounded">
              {error || localError}
            </div>
          )}

          <form
            className="mt-6 sm:mt-8 space-y-5 sm:space-y-6"
            onSubmit={handleSubmit}
          >
            <div className="rounded-md shadow-sm -space-y-px">
              <FormInput
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="rounded-t-md"
              />
              <FormInput
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              <PasswordInput
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="rounded-b-md"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:brightness-110 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/20 disabled:opacity-50"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
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
