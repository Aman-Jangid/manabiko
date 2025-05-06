import { useState, useEffect } from "react";

export default function EnhanceLoadingIndicator() {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  if (elapsed > 200) {
    const err = new Error("Extracting is taking too long.");
    err.name = "AITimeoutError";
    throw err;
  }

  return (
    <div className="flex items-start gap-2 text-[var(--color-accent)] text-sm h-10 rounded-lg px-2 py-1 relative">
      <svg
        className="animate-spin h-8 w-8 text-[var(--color-accent)]/80"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="opacity-25"
        />
        <path
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          fill="currentColor"
          className="opacity-75"
        />
      </svg>
      <span>
        Processing with AI
        <span className="absolute min-w-fit max-w-40 bottom-1 right-2 text-[11px] text-[var(--color-text-secondary)]">
          (est ~60s, {elapsed}s elapsed)
        </span>
      </span>
    </div>
  );
}
