import { useState, useEffect } from "react";
import { initPdfWorker, processPdfFile } from "@/services/pdfProcessingService";
import { BookMetadata } from "@/components/upload/MetadataDisplay";
import { EnhancedChapter } from "@/components/upload/ChapterViewer";

export type TOCOutlineItem = {
  pageNumber: number;
  children?: TOCOutlineItem[];
  title?: string;
};

// interface PdfProcessingResult {
//   coverImage: string | null;
//   metadata: BookMetadata | null;
//   enhancedChapters: EnhancedChapter[] | null;
// }

export function usePdfProcessing(file: File | null) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<BookMetadata | null>(null);
  const [enhancedChapters, setEnhancedChapters] = useState<
    EnhancedChapter[] | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [outline, setOutline] = useState<TOCOutlineItem[] | null>(null);
  const [textExtractor, setTextExtractor] = useState<
    ((start: number, end: number) => Promise<string>) | null
  >(null);

  // Initialize PDF.js worker
  useEffect(() => {
    initPdfWorker();
  }, []);

  // Extract initial metadata from PDF
  useEffect(() => {
    async function extractMetadata() {
      if (!file) {
        resetState();
        return;
      }

      setIsProcessing(true);
      setError(null);

      try {
        const {
          coverImagePath,
          outline: extractedOutline,
          getTextForPageRange,
        } = await processPdfFile(file);

        setCoverImage(coverImagePath || null);
        setOutline(extractedOutline);
        setTextExtractor(() => getTextForPageRange);

        // Find TOC start page
        const { min: tocStart } = getTOCPageRange(extractedOutline);

        // Extract raw text from pages 2 to (tocStart-1)
        let infoText =
          tocStart > 2 ? await getTextForPageRange(2, tocStart - 1) : "";
        if (!infoText || infoText.trim().length === 0) {
          // Fallback: scan first 5 pages for any text
          infoText = await getTextForPageRange(1, 5);
        }

        // Truncate to ~500 words (about 3000 characters) for LLM
        if (infoText.length > 3000) {
          infoText = infoText.slice(0, 3000);
        }

        // Fetch metadata from LLM
        if (infoText && infoText.length > 0) {
          const res = await fetch("/api/ai/extract/info", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ rawText: infoText }),
          });

          if (res.ok) {
            const data = await res.json();
            const extractedMetadata = data.info;
            setMetadata({
              ...extractedMetadata,
              fileName: file.name,
            });
          } else {
            throw new Error("Failed to extract metadata");
          }
        } else {
          setMetadata({ fileName: file.name });
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to process PDF file"
        );
        setCoverImage(null);
        setMetadata(null);
        setOutline(null);
        setTextExtractor(null);
      } finally {
        setIsProcessing(false);
      }
    }

    extractMetadata();
  }, [file]);

  function resetState() {
    setCoverImage(null);
    setMetadata(null);
    setEnhancedChapters(null);
    setError(null);
    setOutline(null);
    setTextExtractor(null);
  }

  // Helper to extract a page range from the outline
  function getTOCPageRange(outline: TOCOutlineItem[]): {
    min: number;
    max: number;
  } {
    const flatPages = outline.flatMap(function flatten(
      item: TOCOutlineItem
    ): number[] {
      return [item.pageNumber].concat(
        item.children ? item.children.flatMap(flatten) : []
      );
    });

    const minPage = Math.min(...flatPages);
    const maxPage = Math.max(...flatPages);

    return { min: minPage, max: maxPage };
  }

  // Convert outline to compact string for AI processing
  function outlineToCompactString(
    outlineItems: TOCOutlineItem[],
    maxDepth = 2
  ): string {
    function itemToString(item: TOCOutlineItem, depth: number): string {
      const t = item.title || "";
      const p = item.pageNumber;
      let c = "";

      if (item.children && item.children.length > 0 && depth < maxDepth) {
        c = `,c:[${item.children
          .map((child) => itemToString(child, depth + 1))
          .join(";")}]`;
      }

      return `t:${t},p:${p}${c}`;
    }

    return outlineItems.map((item) => itemToString(item, 1)).join(";\n");
  }

  // Process the outline to extract enhanced chapters
  const processOutline = async () => {
    if (!outline) {
      setError("Missing outline data");
      return;
    }

    setIsProcessing(true);
    setEnhancedChapters(null);
    setError(null);

    try {
      // Convert outline to compact string
      const compactOutline = outlineToCompactString(outline);

      // Send to LLM for enhancement
      const res = await fetch("/api/ai/extract/toc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText: compactOutline }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      setEnhancedChapters(data.chapters);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to process outline"
      );
      setEnhancedChapters(null);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    isProcessing,
    coverImage,
    metadata,
    enhancedChapters,
    error,
    processOutline,
    outlineData: outline,
    textExtractor,
    setCoverImage,
  };
}
