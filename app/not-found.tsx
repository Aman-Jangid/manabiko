"use client";

import { HomeIcon } from "lucide-react";

export default function NotFound() {
  const handleNavigateHome = () => {
    if (window.top) {
      window.top.location.href = "/";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 gap-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-12 text-[var(--color-text)] flex items-center justify-center gap-4">
          Page Not Found
        </h1>

        <button
          onClick={handleNavigateHome}
          className="inline-flex items-center px-2 py-1 text-base font-medium rounded-md text-[var(--color-text)]/70 border-2 border-[var(--color-text)]/70 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)]/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)] transition-colors duration-200"
        >
          <HomeIcon size={16} style={{ marginRight: 8 }} />
          Return Home
        </button>
      </div>
    </div>
  );
}
