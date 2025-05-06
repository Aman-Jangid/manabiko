import { BookInfo, BookMetadata } from "@/types/types";

interface OpenLibraryData {
  title?: string;
  authors?: { name: string }[];
  publish_date?: string;
  cover_i?: number;
  cover_url?: string;
  description?: string;
  publishers?: string[];
}

// Simple in-memory cache for OpenLibrary responses
const isbnCache: Map<
  string,
  { data: OpenLibraryData | null; timestamp: number }
> = new Map();
const titleAuthorCache: Map<
  string,
  { data: OpenLibraryData | null; timestamp: number }
> = new Map();
const CACHE_TTL = 1000 * 60 * 60; // 1 hour

function getCache(
  cache: Map<string, { data: OpenLibraryData | null; timestamp: number }>,
  key: string
): OpenLibraryData | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL) {
    return entry.data;
  }
  cache.delete(key);
  return null;
}
function setCache(
  cache: Map<string, { data: OpenLibraryData | null; timestamp: number }>,
  key: string,
  data: OpenLibraryData | null
) {
  cache.set(key, { data, timestamp: Date.now() });
}

/**
 * Fetches additional book data from OpenLibrary API using ISBN
 */
export async function fetchBookDataByISBN(
  isbn: string
): Promise<OpenLibraryData | null> {
  const cached = getCache(isbnCache, isbn);
  if (cached) return cached;
  try {
    // Use the Open Library API to fetch book data by ISBN
    const response = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
    );
    const data = await response.json();

    if (data[`ISBN:${isbn}`]) {
      const bookData = data[`ISBN:${isbn}`];

      // Prepare Open Library data
      const olData: OpenLibraryData = {
        title: bookData.title,
        authors: bookData.authors,
        publish_date: bookData.publish_date,
        description: bookData.notes || bookData.excerpts?.[0]?.text,
        publishers: bookData.publishers?.map((p: { name: string }) => p.name),
      };

      // Get cover if available
      if (bookData.cover?.medium) {
        olData.cover_url = bookData.cover.medium;
      }

      setCache(isbnCache, isbn, olData);
      return olData;
    } else {
      console.log("No book data found in Open Library for ISBN:", isbn);
      return null;
    }
  } catch (error) {
    console.error("Error fetching book data:", error);
    return null;
  }
}

/**
 * Updates existing book info with data from OpenLibrary
 * Only updates fields that are missing or incomplete in the original data
 */
export function enrichBookInfoWithOpenLibraryData(
  bookInfo: BookInfo,
  olData: OpenLibraryData
): BookInfo {
  const updatedInfo = { ...bookInfo };

  // Title: Only update if missing or default
  if (!updatedInfo.title || updatedInfo.title === "Untitled") {
    if (olData.title) {
      updatedInfo.title = olData.title;
    }
  }

  // Author: Only update if missing or default
  if (
    !updatedInfo.author ||
    updatedInfo.author === "Unknown Author" ||
    updatedInfo.author === "Unknown"
  ) {
    const olAuthors = olData.authors?.map((a) => a.name).join(", ");
    if (olAuthors) {
      updatedInfo.author = olAuthors;
    }
  }

  // Description: Only add if missing
  if (!updatedInfo.description && olData.description) {
    updatedInfo.description = olData.description;
  }

  // Publish Year: Only add if missing
  if (!updatedInfo.publishYear && olData.publish_date) {
    const yearMatch = olData.publish_date.match(/\d{4}/);
    if (yearMatch) {
      const year = parseInt(yearMatch[0], 10);
      updatedInfo.publishYear = year;
    }
  }

  // Cover Image: Only add if missing locally
  if (!updatedInfo.coverImagePath && olData.cover_url) {
    // We store the external URL in the same field, but we'll handle the difference in the UI
    updatedInfo.externalCoverUrl = olData.cover_url;
  }

  // Publisher: Only update if missing or default
  if (
    (!updatedInfo.publisher || updatedInfo.publisher === "Unknown") &&
    olData.publishers &&
    Array.isArray(olData.publishers) &&
    olData.publishers.length > 0
  ) {
    updatedInfo.publisher = olData.publishers[0];
  }

  return updatedInfo;
}

export async function setOLCover(isbn: BookMetadata["isbn"]) {
  if (!isbn) {
    console.error("ISBN is undefined");
    return;
  }
  const olData = await fetchBookDataByISBN(isbn);
  return olData ? olData.cover_url : null;
}
/**
 * Determines if we should fetch a cover from OpenLibrary
 * Only fetches if no local cover is available
 */
export function shouldFetchCover(bookInfo: BookInfo): boolean {
  return !bookInfo.coverImagePath && !!bookInfo.isbn;
}

/**
 * Fetches book data from OpenLibrary using title and/or author
 */
export async function fetchBookDataByTitleAuthor(
  title?: string,
  author?: string
): Promise<OpenLibraryData | null> {
  if (!title && !author) return null;
  const key = `${title || ""}|${author || ""}`;
  const cached = getCache(titleAuthorCache, key);
  if (cached) return cached;
  try {
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (author) params.append("author", author);
    params.append("limit", "1");
    const response = await fetch(
      `https://openlibrary.org/search.json?${params.toString()}`
    );
    const data = await response.json();
    if (data.docs && data.docs.length > 0) {
      const doc = data.docs[0];
      const olData: OpenLibraryData = {
        title: doc.title,
        authors: doc.author_name
          ? doc.author_name.map((name: string) => ({ name }))
          : undefined,
        publish_date: doc.first_publish_year
          ? String(doc.first_publish_year)
          : undefined,
        description: doc.subtitle || undefined,
        publishers: doc.publisher,
      };
      if (doc.cover_i) {
        olData.cover_url = `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`;
      }
      setCache(titleAuthorCache, key, olData);
      return olData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching book data by title/author:", error);
    return null;
  }
}
