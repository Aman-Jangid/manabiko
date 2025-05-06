interface ProgressBarProps {
  progress: number;
  height?: number | string;
  className?: string;
  showPercentage?: boolean;
  accentColor?: string;
  backgroundColor?: string;
}

export default function ProgressBar({
  progress,
  height = "2px",
  className = "",
  showPercentage = false,
  accentColor = "var(--color-text-secondary)",
  backgroundColor = "var(--color-surface)",
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(0, progress), 100);
  const completed = clampedProgress >= 100;

  return (
    <div className={`relative w-full ${className}`}>
      <div
        className="w-full rounded-full"
        style={{
          height,
          backgroundColor,
        }}
      >
        <div
          className={`h-full ${completed ? "" : "rounded-full"}`}
          style={{
            width: `${clampedProgress}%`,
            backgroundColor:
              completed && accentColor.includes("accent")
                ? accentColor.replace("accent", "accent-quaternary")
                : accentColor,
          }}
        />
      </div>

      {showPercentage && (
        <div className="absolute right-0 top-3 text-[8px] sm:text-[10px] text-[var(--color-text)] font-semibold">
          {Math.round(clampedProgress)}%
        </div>
      )}
    </div>
  );
}
