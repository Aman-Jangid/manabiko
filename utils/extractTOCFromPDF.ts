import { TOCItem } from "./BookTypes";

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
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      const workerSrc = `${window.location.origin}/pdf.worker.min.js`;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    }
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;
    const outline = await pdfDocument.getOutline();
    if (!outline || outline.length === 0) return [];

    // Helper to recursively convert PDF.js outline to TOCItem[] (async for page number resolution)
    async function convertOutline(
      items: unknown[],
      level: number
    ): Promise<TOCItem[]> {
      return Promise.all(
        items.map(async (itemUnknown) => {
          // The outline item structure is dynamic from pdfjs-dist
          const item = itemUnknown as {
            title?: string;
            dest?: unknown;
            items?: unknown[];
          };
          let pageNumber = 1;
          if (item.dest) {
            pageNumber = await getPageNumberFromDest(item.dest);
          }
          const children =
            item.items && item.items.length > 0
              ? await convertOutline(item.items, level + 1)
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

    // Helper to resolve page number from destination
    async function getPageNumberFromDest(dest: unknown): Promise<number> {
      // dest can be a string or an array; we try to resolve to a page index
      if (!dest) return 1;
      if (typeof dest === "string") {
        // Named destination, try to resolve
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

    return await convertOutline(outline, 0);
  } catch (error) {
    console.error("Error extracting TOC from PDF:", error);
    return [];
  }
}
