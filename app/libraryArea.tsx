"use client";

import { Search, PlusCircle } from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import UploadArea from "./uploadArea";
import { useLibrary } from "./hooks/useLibrary";
import { BookMetadata } from "@/types/types";

export default function LibraryArea() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [addingBook, setAddingBook] = useState(false);
  const { books, reload } = useLibrary();

  // Track scroll position and update progress indicator - optimized with useCallback
  const updateScrollProgress = useCallback(() => {
    if (!containerRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const scrollableDistance = scrollHeight - clientHeight;

    if (scrollableDistance > 0) {
      const progress = (scrollTop / scrollableDistance) * 100;
      setScrollProgress(progress);
    }
  }, []);

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
  // Render book component to reduce complexity in main render
  const renderBook = (book: BookMetadata) => (
    <div key={book.id} className="flex flex-col">
      <div className="relative aspect-[1/1.5] overflow-hidden rounded-lg mb-3 sm:mb-4">
        <div
          className="w-full h-full bg-[var(--color-surface)]/30 rounded-lg"
          style={{
            backgroundImage: `url(${book.coverImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {book.progress !== undefined && book.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 pt-3 pb-2 px-3 flex flex-col">
            <div className="flex w-full items-center gap-2 mb-1.5">
              <div className="w-full bg-gray-700 rounded-full h-1.5">
                <div
                  className="bg-blue-500 h-1.5 rounded-full"
                  style={{ width: `${book.progress}%` }}
                  title={`${book.progress}% complete`}
                />
              </div>
              <div className="text-[8px] sm:text-[10px] text-right text-gray-300 whitespace-nowrap">
                {book.progress}%
              </div>
            </div>
            {book.lastRead && (
              <p className="text-gray-400 text-[8px] sm:text-[10px] truncate">
                Last read · {book.lastRead}
              </p>
            )}
          </div>
        )}
      </div>
      <h3 className="text-sm sm:text-base md:text-lg font-medium truncate text-[var(--color-text)]">
        {book.title}
      </h3>
      <p className="text-[10px] sm:text-xs md:text-sm truncate text-[var(--color-text-secondary)]">
        {book.author}
      </p>
      {book.lastRead && book.progress === 0 && (
        <p className="text-gray-500 text-[8px] sm:text-[10px] md:text-xs mt-1.5 truncate">
          Last read · {book.lastRead}
        </p>
      )}
    </div>
  );

  return addingBook ? (
    // floating close button
    <>
      <UploadArea close={handleCancelAddBook} showClose={true} />
    </>
  ) : (
    <>
      <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8 text-white">
        <header className="flex flex-col sm:flex-row sm:items-center sm:place-content-between gap-5 sm:gap-6 mb-8 sm:mb-10">
          <h1
            className="text-6xl sm:text-6xl md:text-6xl lg:text-7xl font-light text-center sm:text-left sm:mb-0 mb-4 -mt-4 sm:mt-0"
            style={{ color: "var(--color-text)" }}
            aria-label="Library title"
          >
            Your Books
          </h1>
          <div className="flex flex-row gap-3">
            <button
              className="bg-transparent border rounded-lg p-2.5 hover:bg-[rgba(0,0,0,0.2)] transition-colors flex items-center justify-center"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
              aria-label="Add book"
              onClick={handleAddBook}
            >
              <PlusCircle size={20} />
            </button>
            <div className="relative flex-grow">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-text)]"
                size={18}
              />
              <input
                type="text"
                className="w-full bg-transparent text-[var(--color-text)] border  rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
                style={{
                  borderColor: "var(--color-border)",
                }}
                placeholder="Search books..."
                aria-label="Search books"
              />
            </div>
          </div>
        </header>

        <div className="relative h-[70vh]">
          <div
            ref={containerRef}
            className="grid grid-cols-2 h-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6 md:gap-8 overflow-y-auto scrollbar-hide pr-6"
          >
            {books.map(renderBook)}
          </div>

          <div
            className="absolute right-0 top-0 bottom-0 w-1 sm:w-1.5 rounded-full flex items-center"
            style={{
              backgroundColor: "var(--color-surface)",
            }}
          >
            <div
              className="absolute w-full rounded-full transition-all duration-150 ease-out"
              style={{
                height: `${scrollProgress}%`,
                top: 0,
                maxHeight: "100%",
                backgroundColor: "var(--color-text-secondary)",
              }}
              role="progressbar"
              aria-valuenow={Math.round(scrollProgress)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </>
  );
}
