import { BookMetadata } from "@/components/upload/MetadataDisplay";
import { EnhancedChapter } from "@/components/upload/ChapterViewer";

export async function extractMetadata(
  file: File
): Promise<BookMetadata & { tableOfContents: EnhancedChapter[] }> {
  // For now, return basic metadata
  // In a real implementation, this would extract metadata from the PDF
  return {
    title: file.name.replace(/\.[^/.]+$/, ""), // Remove file extension
    fileName: file.name,
    tableOfContents: [], // Empty TOC for now
  };
}
