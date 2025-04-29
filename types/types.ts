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

export type Chapter = { title: string; level?: number };

export type EnhancedChapter = {
  title?: string;
  c?: string;
  p?: number | string;
  t?: EnhancedChapter[];
  topics?: EnhancedChapter[];
  children?: EnhancedChapter[];
};
