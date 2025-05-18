import { BookDocument, BookMetadata } from "@/types/types";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function useLibrary() {
  const [books, setBooks] = useState<BookMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const loadLibrary = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/books");
      const data = await response.json();

      if (response.status === 401) {
        router.push("/auth/required");
        return;
      }

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addBook = async (book: BookDocument) => {
    try {
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
            filehash: book.fileHash,
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
