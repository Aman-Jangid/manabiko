import ProgressBar from "./ProgressBar";

interface LibraryHeaderProps {
  scrollProgress: number;
}

export default function LibraryHeader({ scrollProgress }: LibraryHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1
        className="text-5xl sm:text-6xl font-light text-center sm:text-left sm:mb-0 mb-1 -mt-3 sm:mt-0"
        style={{ color: "var(--color-strong)" }}
        aria-label="Library title"
      >
        Your Books
      </h1>
      <div className="w-[66%] sm:w-full">
        <ProgressBar progress={scrollProgress} height="4px" />
      </div>
    </div>
  );
}
