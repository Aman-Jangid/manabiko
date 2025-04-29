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
