import { TOCItem } from "@/types/types";
import { setupPdfJsWorker } from "./pdfjs-setup";
import type { PDFDocumentProxy } from "pdfjs-dist";

// Helper to resolve page number from destination
export async function getPageNumberFromDest(
  dest: unknown,
  pdfDocument: PDFDocumentProxy
): Promise<number> {
  if (!dest) return 1;
  if (typeof dest === "string") {
    try {
      const explicitDest = await pdfDocument.getDestination(dest);
      if (explicitDest && Array.isArray(explicitDest) && explicitDest[0]) {
        const ref = explicitDest[0];
        if (typeof ref === "object" && ref !== null && "num" in ref) {
          const pageIndex = await pdfDocument.getPageIndex(ref);
          return pageIndex + 1;
        }
      }
    } catch {
      return 1;
    }
    return 1;
  }
  if (Array.isArray(dest) && dest[0]) {
    const ref = dest[0];
    if (typeof ref === "object" && ref !== null && "num" in ref) {
      try {
        const pageIndex = await pdfDocument.getPageIndex(ref);
        return pageIndex + 1;
      } catch {
        return 1;
      }
    }
  }
  return 1;
}

// Helper to recursively convert PDF.js outline to TOCItem[] (async for page number resolution)
export async function convertOutline(
  items: unknown[],
  level: number,
  pdfDocument: PDFDocumentProxy
): Promise<TOCItem[]> {
  return Promise.all(
    items.map(async (itemUnknown) => {
      const item = itemUnknown as {
        title?: string;
        dest?: unknown;
        items?: unknown[];
      };
      let pageNumber = 1;
      if (item.dest) {
        pageNumber = await getPageNumberFromDest(item.dest, pdfDocument);
      }
      const children =
        item.items && item.items.length > 0
          ? await convertOutline(item.items, level + 1, pdfDocument)
          : undefined;
      const tocItem: TOCItem = {
        title: item.title || "",
        pageNumber,
        level,
        children,
      };
      return tocItem;
    })
  );
}

/**
 * Extracts the Table of Contents (outline) from a PDF file using pdfjs-dist.
 * @param arrayBuffer The PDF file as an ArrayBuffer or Uint8Array
 * @returns Promise<TOCItem[]>
 */
export async function extractTOCFromPDF(
  arrayBuffer: ArrayBuffer | Uint8Array
): Promise<TOCItem[]> {
  if (typeof window === "undefined") return [];
  try {
    const pdfjs = await import("pdfjs-dist");
    setupPdfJsWorker(pdfjs);
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDocument: PDFDocumentProxy = await loadingTask.promise;
    const outline = await pdfDocument.getOutline();
    console.log("outline:", outline);
    if (!outline || outline.length === 0) return [];
    return await convertOutline(outline, 0, pdfDocument);
  } catch (error) {
    console.error("Error extracting TOC from PDF:", error);
    return [];
  }
}
