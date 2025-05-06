import { BookText, BookOpenText } from "lucide-react";
import { ExtendedBookMetadata } from "@/types/types";
import ProgressBar from "./ProgressBar";
import { useResponsive } from "@/app/hooks/useResponsive";

interface BookCardProps {
  book: ExtendedBookMetadata;
  onSelect: (book: ExtendedBookMetadata) => void;
}

export default function BookCard({ book, onSelect }: BookCardProps) {
  const { isMobile, isTablet } = useResponsive();

  const handleClick = () => {
    onSelect(book);
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2 sm:mb-1.5">
        <div className="relative overflow-hidden rounded-lg aspect-[1/1.4] group">
          <div
            className="w-full h-full bg-[var(--color-surface)]/30"
            style={{
              backgroundImage: `url('${book.coverurl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
            <div
              onClick={handleClick}
              className="group/box flex flex-col w-[10rem] h-[10rem] justify-center items-center gap-2 text-[var(--color-accent-quaternary)] hover:bg-black/50 bg-transparent hover:h-[97%] hover:w-[97%] rounded-2xl px-2 py-4 text-md font-medium transition-all duration-200"
            >
              <BookText
                size={64}
                className="block group-hover/box:hidden transition-opacity duration-200"
              />
              <BookOpenText
                size={64}
                className="hidden group-hover/box:block transition-opacity duration-200"
              />
              <span className="transition-colors group-hove/box:hidden duration-200">
                Continue ?
              </span>
            </div>
          </div>
        </div>

        {book.progress !== undefined && book.progress > 0 && (
          <div className="mt-2 px-0.5 relative">
            {/* floating button to start reading */}
            {(isMobile || isTablet) && (
              <div className="absolute bottom-5 right-2">
                <button
                  className="flex flex-row items-center gap-2 bg-[var(--color-surface-secondary)] py-1 px-1.5 backdrop-blur-sm rounded-xl font-semibold transition-all"
                  onClick={handleClick}
                  title="Start reading"
                >
                  Continue <BookOpenText size={20} />
                </button>
              </div>
            )}

            <ProgressBar
              progress={book.progress}
              height="8px"
              showPercentage={true}
              accentColor={`var(--color-accent${
                book.progress < 100 ? "" : "-quaternary"
              })`}
            />
          </div>
        )}
      </div>

      <div className="w-[50%] px-0.5">
        <p
          className="text-[8px] sm:text-[10px] md:text-[10px] truncate text-[var(--color-text-secondary)]"
          title={book.author}
        >
          {book.author}
        </p>
      </div>

      <h3
        className="text-xs sm:text-sm md:text-base font-semibold truncate text-[var(--color-text)] px-0.5"
        title={book.title}
      >
        {book.title}
      </h3>

      {book.lastRead && book.progress === 0 && (
        <p className="text-gray-500 text-[7px] sm:text-[8px] md:text-[10px] mt-1 truncate">
          Last read · {book.lastRead}
        </p>
      )}
    </div>
  );
}
