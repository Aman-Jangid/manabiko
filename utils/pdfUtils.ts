import { TOCItem } from "./BookTypes";

// Helper to resolve page number from destination
export async function getPageNumberFromDest(
  dest: unknown,
  pdfDocument: {
    getDestination: (dest: string) => Promise<unknown>;
    getPageIndex: (ref: object) => Promise<number>;
  }
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
  pdfDocument: unknown
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
        pageNumber = await getPageNumberFromDest(
          item.dest,
          pdfDocument as {
            getDestination: (dest: string) => Promise<unknown>;
            getPageIndex: (ref: object) => Promise<number>;
          }
        );
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
