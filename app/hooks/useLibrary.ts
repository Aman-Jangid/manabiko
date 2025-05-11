import { BookDocument, BookMetadata } from "@/types/types";
import { useEffect, useState } from "react";
import { calculateFileHash } from "@/lib/utils/fileHash";

export function useLibrary() {
  const [books, setBooks] = useState<BookMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLibrary = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/books");
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch books");
      }

      if (data.success) {
        setBooks(data.books);
      } else {
        throw new Error(data.error || "Failed to fetch books");
      }
    } catch (error) {
      console.error("Error loading library:", error);
      setError(
        error instanceof Error ? error.message : "Failed to load library"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLibrary();
  }, []);

  const addBook = async (book: BookDocument) => {
    try {
      // Calculate file hash
      const fileHash = await calculateFileHash(book.file);

      const res = await fetch("/api/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookData: {
            title: book.title,
            author: book.author,
            isbn: book.isbn,
            description: book.description,
            coverurl: book.coverUrl,
            filepath: book.filePath,
            filehash: fileHash,
            tableofcontents: book.tableOfContents,
            progress: book.progress,
            lastopened: new Date().toISOString(),
          },
        }),
      });

      if (!res.ok) {
        console.error("Failed to add book:", res.statusText);
        return;
      }

      const data = await res.json();
      if (!data.success) {
        console.error("Failed to add book:", data.error);
        return;
      }

      setBooks((prevBooks) => [...prevBooks, data.book]);
      console.log("Book added successfully:", data.book);
      // Optionally, reload the library to ensure the new book is displayed
      await loadLibrary();
    } catch (error) {
      console.error("Error adding book:", error);
      return;
    }
  };

  return { loading, error, books, addBook, reload: loadLibrary };
}
