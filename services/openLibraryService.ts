import { BookInfo } from "../utils/BookTypes";

interface OpenLibraryData {
  title?: string;
  authors?: { name: string }[];
  publish_date?: string;
  cover_i?: number;
  cover_url?: string;
  description?: string;
}

/**
 * Fetches additional book data from OpenLibrary API using ISBN
 */
export async function fetchBookDataByISBN(
  isbn: string
): Promise<OpenLibraryData | null> {
  try {
    console.log("Fetching extra book data for ISBN:", isbn);

    // Use the Open Library API to fetch book data by ISBN
    const response = await fetch(
      `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`
    );
    const data = await response.json();
    console.log("Open Library API response:", data);

    if (data[`ISBN:${isbn}`]) {
      const bookData = data[`ISBN:${isbn}`];
      console.log("Book data found in Open Library");

      // Prepare Open Library data
      const olData: OpenLibraryData = {
        title: bookData.title,
        authors: bookData.authors,
        publish_date: bookData.publish_date,
        description: bookData.notes || bookData.excerpts?.[0]?.text,
      };

      // Get cover if available
      if (bookData.cover?.medium) {
        console.log("Cover image URL found:", bookData.cover.medium);
        olData.cover_url = bookData.cover.medium;
      }

      console.log("Open Library data prepared:", olData);
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
      console.log(
        `Updating missing title with OpenLibrary data: ${olData.title}`
      );
      updatedInfo.title = olData.title;
    }
  }

  // Author: Only update if missing or default
  if (!updatedInfo.author || updatedInfo.author === "Unknown Author") {
    const olAuthors = olData.authors?.map((a) => a.name).join(", ");
    if (olAuthors) {
      console.log(
        `Updating missing author with OpenLibrary data: ${olAuthors}`
      );
      updatedInfo.author = olAuthors;
    }
  }

  // Description: Only add if missing
  if (!updatedInfo.description && olData.description) {
    console.log("Adding missing description from OpenLibrary data");
    updatedInfo.description = olData.description;
  }

  // Publish Year: Only add if missing
  if (!updatedInfo.publishYear && olData.publish_date) {
    const yearMatch = olData.publish_date.match(/\d{4}/);
    if (yearMatch) {
      const year = parseInt(yearMatch[0], 10);
      console.log(
        `Adding missing publication year from OpenLibrary data: ${year}`
      );
      updatedInfo.publishYear = year;
    }
  }

  // Cover Image: Only add if missing locally
  if (!updatedInfo.coverImagePath && olData.cover_url) {
    console.log("Using OpenLibrary cover since local extraction failed");
    // We store the external URL in the same field, but we'll handle the difference in the UI
    updatedInfo.externalCoverUrl = olData.cover_url;
  }

  console.log("Book info after OpenLibrary enrichment:", updatedInfo);
  return updatedInfo;
}

/**
 * Determines if we should fetch a cover from OpenLibrary
 * Only fetches if no local cover is available
 */
export function shouldFetchCover(bookInfo: BookInfo): boolean {
  return !bookInfo.coverImagePath && !!bookInfo.isbn;
}
