import { BookDocument, BookMetadata } from "@/types/types";
import { useEffect, useState } from "react";

export function useLibrary() {
  const [books, setBooks] = useState<BookMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadLibrary = async () => {
    const fetchLibrary = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/books", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("Failed to load library:", res.statusText);
          return;
        }

        const data = await res.json();
        if (!data.success) {
          console.error("Failed to load library:", data.error);
          return;
        }

        setBooks(data.books);
        setLoading(false);
      } catch (error) {
        setError("Failed to load library");
        console.error("Error loading library:", error);
      }
    };

    fetchLibrary();
  };

  useEffect(() => {
    loadLibrary();
    console.log("Library loaded:", books);
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
            filepath: book.filePath || "failpath",
            filehash: crypto.randomUUID().replace(/-/g, "").padEnd(64, "0"), // Just for testing, should be a real 64-character hash
            uploadedbyid: 3549867, // Int
            tableofcontents: book.tableOfContents,
            progress: book.progress,
            lastopened: new Date().toISOString(), // or simply new Date()
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
