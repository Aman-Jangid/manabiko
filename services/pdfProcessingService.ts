import { extractTOCFromPDF } from "../utils/extractTOCFromPDF";
import { TOCItem } from "@/types/types";

// Define a type for accessing PDF metadata properties not fully exposed in pdf-lib types

/**
 * Extracts a cover image from the first page of a PDF
 */
export async function extractCoverImage(
  arrayBuffer: ArrayBuffer | Uint8Array
): Promise<string | null> {
  try {
    console.log("Starting cover image extraction...");
    if (typeof window === "undefined") return null;

    // Load PDF.js dynamically
    const pdfjs = await import("pdfjs-dist");

    // Ensure worker is initialized properly
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      const workerSrc = `${window.location.origin}/pdf.worker.min.js`;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
      console.log("Set PDF.js worker in cover extraction:", workerSrc);
    }
    console.log(
      "Using PDF.js worker from:",
      pdfjs.GlobalWorkerOptions.workerSrc
    );

    // Load the document
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;
    console.log("PDF document loaded for cover extraction");

    // Get the first page
    const page = await pdfDocument.getPage(1);

    // Set scale for good quality
    const viewport = page.getViewport({ scale: 1.5 });

    // Create a canvas to render to
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (!context) {
      console.log("Failed to get canvas context");
      return null;
    }

    // Set canvas dimensions
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    console.log(`Canvas dimensions set: ${canvas.width}x${canvas.height}`);

    // Render the page to canvas
    await page.render({
      canvasContext: context,
      viewport,
    }).promise;

    // Convert to JPEG data URL
    const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
    console.log("Cover image extracted successfully");
    return dataUrl;
  } catch (error) {
    console.error("Error extracting cover image:", error);
    return null;
  }
}

/**
 * Extracts text from the first few pages of a PDF to find metadata like ISBN
 */
export async function extractTextFromFirstPages(
  arrayBuffer: ArrayBuffer | Uint8Array
): Promise<string> {
  try {
    console.log("Starting text extraction from first pages...");
    // Check if we're in browser environment
    if (typeof window === "undefined") {
      console.log("Skipping text extraction in server environment");
      return "";
    }

    // Load PDF.js dynamically
    const pdfjs = await import("pdfjs-dist");

    // Ensure worker is initialized properly
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      const workerSrc = `${window.location.origin}/pdf.worker.min.js`;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
      console.log("Set PDF.js worker in text extraction:", workerSrc);
    }
    console.log(
      "Using PDF.js worker from:",
      pdfjs.GlobalWorkerOptions.workerSrc
    );

    // Load the document
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;

    // Get text from title page and first few pages to improve metadata discovery
    const pageCount = pdfDocument.numPages;
    const maxPagesToScan = Math.min(20, pageCount); // Scan more pages for better chances
    let text = "";

    console.log(`Extracting text from pages 1 to ${maxPagesToScan}`);

    for (let i = 1; i <= maxPagesToScan; i++) {
      try {
        const page = await pdfDocument.getPage(i);
        const content = await page.getTextContent();

        // Simple approach: just join all string values
        const pageText = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");

        console.log(`Extracted ${pageText.length} characters from page ${i}`);
        text += pageText + " ";
      } catch (err) {
        console.warn(`Error extracting text from page ${i}:`, err);
      }
    }

    console.log(`Total text extracted: ${text.length} characters`);
    return text;
  } catch (error) {
    console.error("Error extracting text:", error);
    return "";
  }
}

/**
 * Initialize the PDF.js worker
 */
export async function initPdfWorker(): Promise<void> {
  try {
    // Make sure we're in the browser environment
    if (typeof window === "undefined") {
      console.log(
        "Skipping PDF.js worker initialization in server environment"
      );
      return;
    }

    const pdfjs = await import("pdfjs-dist");

    // For Next.js, we need to properly handle client-side initialization
    // Set worker path to absolute URL
    const workerSrc = `${window.location.origin}/pdf.worker.min.js`;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

    console.log("PDF.js worker initialized successfully with path:", workerSrc);
  } catch (error) {
    console.error("Failed to initialize PDF.js worker:", error);
  }
}

/**
 * Extracts text from a given page range (inclusive, 1-based) using PDF.js
 */
export async function extractTextFromPageRange(
  arrayBuffer: ArrayBuffer | Uint8Array,
  startPage: number,
  endPage: number
): Promise<string> {
  try {
    if (typeof window === "undefined") return "";
    const pdfjs = await import("pdfjs-dist");
    if (!pdfjs.GlobalWorkerOptions.workerSrc) {
      const workerSrc = `${window.location.origin}/pdf.worker.min.js`;
      pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
    }
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;
    const pageCount = pdfDocument.numPages;
    const safeStart = Math.max(1, startPage);
    const safeEnd = Math.min(endPage, pageCount);
    let text = "";
    for (let i = safeStart; i <= safeEnd; i++) {
      try {
        const page = await pdfDocument.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items
          .map((item) => ("str" in item ? item.str : ""))
          .join(" ");
        text += pageText + " ";
      } catch (err) {
        console.warn(`Error extracting text from page ${i}:`, err);
      }
    }
    return text;
  } catch (error) {
    console.error("Error extracting text from page range:", error);
    return "";
  }
}

/**
 * Process a PDF file and extract all available metadata
 */
export async function processPdfFile(file: File): Promise<{
  coverImagePath: string | null;
  first20PagesText: string;
  outline: TOCItem[];
  getTextForPageRange: (start: number, end: number) => Promise<string>;
}> {
  // Read the file only once
  const fileData = await file.arrayBuffer();
  const coverImageBuffer = fileData.slice(0);
  const outlineBuffer = fileData.slice(0);
  const textBuffer = fileData.slice(0);

  // Extract cover image from first page
  const coverImagePath = await extractCoverImage(coverImageBuffer);

  // Extract outline (TOC)
  const outline = await extractTOCFromPDF(outlineBuffer);

  // Extract text from first 20 pages
  const first20PagesText = await extractTextFromFirstPages(textBuffer);

  // Helper to extract text from a given page range
  async function getTextForPageRange(
    start: number,
    end: number
  ): Promise<string> {
    const buffer = fileData.slice(0);
    return extractTextFromPageRange(buffer, start, end);
  }

  return {
    coverImagePath,
    first20PagesText,
    outline,
    getTextForPageRange,
  };
}
