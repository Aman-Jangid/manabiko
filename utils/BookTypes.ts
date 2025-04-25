/**
 * Core book information interface
 */
export interface BookInfo {
  // Essential book metadata
  title: string;
  author: string;
  isbn?: string;
  publishYear?: number;
  publisher?: string;
  description?: string;
  subjects?: string[];

  // Image paths
  coverImagePath?: string; // Path to extracted cover image
  externalCoverUrl?: string; // URL to external cover image (like OpenLibrary)

  // Source information
  source?: "openLibrary" | "filename" | "manual";
  sourceId?: string; // ID in the source database (like OpenLibrary ID)

  // File information
  originalFileName?: string;
  pages?: number;

  // Table of contents
  tableOfContents?: TOCItem[];
}

/**
 * Table of Contents item
 */
export interface TOCItem {
  title: string;
  pageNumber: number;
  level: number;
  children?: TOCItem[];
}

/**
 * OpenLibrary API response interfaces
 */
export interface OpenLibrarySearchResult {
  docs: OpenLibraryDoc[];
  numFound: number;
}

export interface OpenLibraryDoc {
  key: string;
  title: string;
  author_name?: string[];
  isbn?: string[];
  publish_year?: number[];
  publisher?: string[];
  subject?: string[];
  first_publish_year?: number;
}

export interface OpenLibraryBookDetail {
  title: string;
  authors?: { name: string }[];
  description?: string | { value: string };
  subjects?: { name: string }[];
  publish_date?: string;
  publishers?: { name: string }[];
}
