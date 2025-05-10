"use client";

import { useSession } from "next-auth/react";
import { ArrowRight, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function UserAvatar() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const isGuest = session?.user?.isGuest;

  // Clear stale session data if unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      localStorage.removeItem("nextauth.message");
    }
  }, [status]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        avatarRef.current &&
        !avatarRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  const navigateToProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/profile");
    setIsMenuOpen(false);
  };

  const navigateToSignUp = (e: React.MouseEvent) => {
    e.stopPropagation();
    router.push("/auth/signup");
    setIsMenuOpen(false);
  };

  return (
    <div className="relative" style={{ zIndex: 10 }}>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        ref={avatarRef}
      >
        <div
          className={`w-7 h-7 rounded-full flex items-center justify-center border-2 border-[var(--color-strong)] transition-all duration-100 ease-in ${
            isGuest
              ? "bg-[var(--color-accent-quaternary)]/20 hover:bg-[var(--color-accent-quaternary)]/40"
              : "bg-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/40"
          }`}
        >
          <User className="w-5 h-5" />
        </div>
      </div>

      {isMenuOpen && (
        <div
          className="absolute right-0 cursor-pointer mt-2 w-48 rounded-md shadow-lg border border-[var(--color-accent)]/50"
          style={{
            background: "transparent",
            zIndex: 100,
          }}
          ref={menuRef}
          onClick={(e) => navigateToProfile(e)}
        >
          <div className="w-full px-4 py-2 bg-[var(--color-accent)]/10 hover:bg-[var(--color-accent)]/20">
            <div>
              <p className="w-full text-md font-medium text-[var(--color-text)] flex items-center justify-between">
                {session?.user?.name || "Guest"}
                <ArrowRight className="w-4 h-4" />
              </p>
              {!isGuest && (
                <p className="text-xs text-[var(--color-text-secondary)] truncate">
                  {session?.user?.email || ""}
                </p>
              )}
            </div>
          </div>

          {isGuest ? (
            <>
              <div className="px-4 py-3">
                <p className="text-xs mb-2">
                  Sign up to sync your data across devices
                </p>
                <button
                  onClick={navigateToSignUp}
                  className="w-full py-2 px-4 bg-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/70 text-[var(--color-text)] text-sm rounded-md transition-all duration-100 ease-in-out"
                >
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
    </div>
  );
}
