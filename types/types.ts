export type TOCOutlineItem = {
  pageNumber: number;
  children?: TOCOutlineItem[];
  title?: string;
};

export type BookMetadata = {
  id?: string;
  title?: string;
  author?: string;
  publisher?: string;
  year?: string | number;
  isbn?: string;
  description?: string;
  coverImage?: string;
  pages?: number;
  lastRead?: string;
  progress?: number;
  fileName?: string;
};

export type ExtendedBookMetadata = {
  id: number | string;
  title: string;
  author?: string;
  publisher?: string;
  year?: string | number;
  isbn?: string;
  description?: string;
  coverImage?: string; // Optional alias for 'coverurl'
  coverurl?: string; // Base64-encoded image string
  pages?: number;
  lastRead?: string;
  lastopened?: string; // Additional field
  progress?: number;
  fileName?: string;
  filepath?: string;
  filehash?: string;
  uploadedbyid?: number;
  tableofcontents?: JSON; // You can type this more strictly if you know the structure
  createdat?: string;
  updatedat?: string;
};

export type Chapter = { title: string; level?: number };

export type EnhancedChapter = {
  title?: string;
  c?: string;
  p?: number | string;
  t?: EnhancedChapter[];
  topics?: EnhancedChapter[];
  children?: EnhancedChapter[];
};

export interface BookDocument {
  title: string;
  author: string;
  isbn: string;
  coverUrl: string;
  lastOpened: Date;
  progress: number;
  filePath: string;
  tableOfContents: EnhancedChapter[];
  description: string;
  fileHash: string;
  uploadedById: string;
  fileName?: string; // For comparison with duplicates
}

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
