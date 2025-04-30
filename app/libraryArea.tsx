"use client";

import { Search, PlusCircle, BookOpenText, BookText } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import UploadArea from "./uploadArea";
import { useLibrary } from "./hooks/useLibrary";
import { ExtendedBookMetadata } from "@/types/types";
import { useResponsive } from "./hooks/useResponsive";

export default function LibraryArea() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [addingBook, setAddingBook] = useState(false);
  const { books, reload } = useLibrary();

  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollableDistance = scrollHeight - clientHeight;

    if (scrollableDistance > 0) {
      const progress = (scrollTop / scrollableDistance) * 100;
      setScrollProgress(progress);
    }
  }, []);

  const { isMobile, isTablet } = useResponsive();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollProgress);
      updateScrollProgress();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", updateScrollProgress);
      }
    };
  }, [updateScrollProgress]);

  const handleAddBook = () => {
    setAddingBook(true);
  };

  const handleCancelAddBook = () => {
    setAddingBook(false);
    reload();
  };

  const renderBook = (book: ExtendedBookMetadata) => (
    <div key={book.id} className="flex flex-col">
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
            <div className="group/box flex flex-col w-[10rem] h-[10rem] justify-center items-center gap-2 text-[var(--color-accent-quaternary)] hover:bg-black/50 bg-transparent hover:h-[97%] hover:w-[97%] rounded-2xl px-2 py-4 text-md font-medium transition-all duration-200">
              <BookText
                size={64}
                className="block group-hover/box:hidden transition-opacity duration-200"
              />
              <BookOpenText
                size={64}
                className="hidden group-hover/box:block transition-opacity duration-200"
              />
              <span className="transition-colors group-hove/box:hidden duration-200  ">
                Continue ?
              </span>
            </div>
          </div>
        </div>
        {book.progress !== undefined && book.progress > 0 && (
          <div className="mt-2 px-0.5 relative">
            {/* floating button to start reading */}
            {isMobile || isTablet ? (
              <div className="absolute bottom-5 right-2">
                <button
                  className=" flex flex-row items-center gap-2 bg-[var(--color-surface-secondary)] py-1 px-1.5 backdrop-blur-sm rounded-xl font-semibold transition-all"
                  onClick={() => {}}
                  title="Start reading"
                >
                  Continue <BookOpenText size={20} />
                </button>
              </div>
            ) : null}
            <div className="relative w-full h-2 bg-[var(--color-surface)] rounded-full">
              <div
                className={`h-full ${
                  book.progress < 100 ? "rounded-full" : ""
                } brightness-125`}
                style={{
                  width: `${Math.min(book.progress, 100)}%`,
                  backgroundColor: `var(--color-accent${
                    book.progress < 100 ? "" : "-quaternary"
                  })`,
                }}
                title={`${book.progress}% complete`}
              />

              <div className="absolute right-0 top-3 text-[8px] sm:text-[10px] text-[var(--color-text)] font-semibold">
                {book.progress}%
              </div>
            </div>
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

  return addingBook ? (
    <UploadArea close={handleCancelAddBook} showClose={true} />
  ) : (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 md:p-5 text-white">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="flex flex-col items-center gap-2">
          <h1
            className="text-5xl sm:text-6xl font-light text-center sm:text-left sm:mb-0 mb-1 -mt-3 sm:mt-0"
            style={{ color: "var(--color-strong)" }}
            aria-label="Library title"
          >
            Your Books
          </h1>
          {/* scroll bar */}
          <div className="w-[66%] sm:block sm:w-full h-1 bg-[var(--color-surface)] rounded-full">
            <div
              className="h-full bg-[var(--color-text-secondary)] rounded-full"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>
        </div>
        <div className="flex flex-row gap-2 mt-4">
          <button
            className="bg-transparent border rounded-md p-2 hover:bg-[rgba(0,0,0,0.2)] transition-colors flex items-center justify-center"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            aria-label="Add book"
            title="Add new book"
            onClick={handleAddBook}
          >
            <PlusCircle size={18} />
          </button>
          <div className="relative flex-grow">
            <Search
              className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-[var(--color-text)]"
              size={16}
            />
            <input
              type="text"
              className="w-full bg-transparent text-[var(--color-text)] border rounded-md pl-9  pr-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600 text-sm"
              style={{
                borderColor: "var(--color-border)",
              }}
              placeholder="Search books..."
              aria-label="Search books"
            />
          </div>
        </div>
      </header>

      <div className="relative h-[68vh]">
        <div
          ref={containerRef}
          className="grid grid-cols-2 h-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6 overflow-y-auto scrollbar-hide scroll-smooth"
        >
          {(books as ExtendedBookMetadata[]).map(renderBook)}
        </div>
      </div>
    </div>
  );
}
