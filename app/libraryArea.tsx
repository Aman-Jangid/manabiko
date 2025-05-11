"use client";

import { useState, useRef } from "react";
import { useLibrary } from "./hooks/useLibrary";
import { ExtendedBookMetadata, BookMetadata } from "@/types/types";

import LibraryHeader from "@/components/library/LibraryHeader";
import LibraryControls from "@/components/library/LibraryControls";
import BookGrid from "@/components/library/BookGrid";
import UploadArea from "./uploadArea";
import { useScrollProgress } from "./hooks/useScrollProgress";

export default function LibraryArea() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [addingBook, setAddingBook] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { books, reload } = useLibrary();

  // Use custom hook for scroll progress
  const scrollProgress = useScrollProgress(containerRef);

  const handleAddBook = () => {
    setAddingBook(true);
  };

  const handleCancelAddBook = () => {
    setAddingBook(false);
    reload();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectBook = (book: ExtendedBookMetadata) => {
    // Handle book selection - this would typically navigate to the reader
    console.log("Selected book:", book.title);
  };

  // Convert BookMetadata to ExtendedBookMetadata
  const extendedBooks: ExtendedBookMetadata[] = books.map(
    (book: BookMetadata) => ({
      id: book.id.toString(),
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      description: book.description,
      coverurl: book.coverurl,
      filepath: book.filepath,
      filehash: book.filehash,
      tableofcontents: book.tableofcontents,
      progress: book.progress,
      lastopened: book.lastopened,
      createdat: book.createdat.toISOString(),
      updatedat: book.updatedat.toISOString(),
      uploadedbyid: book.uploadedbyid,
    })
  );

  // Filter books based on search query
  const filteredBooks = searchQuery
    ? extendedBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (book.author?.toLowerCase() ?? "").includes(searchQuery.toLowerCase())
      )
    : extendedBooks;

  // Show upload area or library content
  if (addingBook) {
    return <UploadArea close={handleCancelAddBook} showClose={true} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-3 sm:p-4 md:p-5 text-white">
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <LibraryHeader scrollProgress={scrollProgress} />
        <LibraryControls
          onAddBook={handleAddBook}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
      </header>

      <div className="relative h-[68vh]">
        <BookGrid
          ref={containerRef}
          books={filteredBooks}
          onSelectBook={handleSelectBook}
        />
      </div>
    </div>
  );
}
