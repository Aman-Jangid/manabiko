import { useState, useEffect, useCallback } from "react";

export function useLibrary() {
  const [books, setBooks] = useState<any[]>([]);

  const loadLibrary = useCallback(() => {
    const data = localStorage.getItem("manabikoLibrary");
    if (data) {
      setBooks(JSON.parse(data));
    } else {
      setBooks([]);
    }
  }, []);

  useEffect(() => {
    loadLibrary();
    // Listen for storage changes (multi-tab support)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "manabikoLibrary") loadLibrary();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [loadLibrary]);

  const addBook = (book: any) => {
    setBooks((prev) => {
      const updated = [...prev, book];
      localStorage.setItem("manabikoLibrary", JSON.stringify(updated));
      return updated;
    });
  };

  return { books, addBook, reload: loadLibrary };
}
