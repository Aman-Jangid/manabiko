import { PDFDocument } from "pdf-lib";
import { BookInfo } from "../utils/BookTypes";

/**
 * Extracts basic metadata from a PDF file
 */
export async function extractBasicInfo(
  arrayBuffer: ArrayBuffer | Uint8Array
): Promise<{
  title: string;
  author: string;
  pageCount: number;
}> {
  try {
    console.log("Starting basic info extraction...");
    // Load PDF document with pdf-lib
    const pdfDoc = await PDFDocument.load(arrayBuffer);
    const pageCount = pdfDoc.getPageCount();

    // Extract metadata - pdf-lib types might not expose info directly
    const pdfDocAny = pdfDoc as any;

    // Try multiple approaches to get metadata
    let title = "Untitled";
    let author = "Unknown Author";

    // Approach 1: Standard PDF metadata
    if (pdfDocAny.getTitle) {
      try {
        const rawTitle = await pdfDocAny.getTitle();
        if (
          rawTitle &&
          typeof rawTitle === "string" &&
          rawTitle.trim().length > 0
        ) {
          title = rawTitle.trim();
          console.log("Title found using getTitle():", title);
        }
      } catch (err) {
        console.warn("Error accessing title via getTitle():", err);
      }
    }

    if (pdfDocAny.getAuthor) {
      try {
        const rawAuthor = await pdfDocAny.getAuthor();
        if (
          rawAuthor &&
          typeof rawAuthor === "string" &&
          rawAuthor.trim().length > 0
        ) {
          author = rawAuthor.trim();
          console.log("Author found using getAuthor():", author);
        }
      } catch (err) {
        console.warn("Error accessing author via getAuthor():", err);
      }
    }

    // Approach 2: Direct metadata access via info object
    if (
      (title === "Untitled" || author === "Unknown Author") &&
      pdfDocAny.info
    ) {
      const info = pdfDocAny.info || {};

      if (
        title === "Untitled" &&
        info.Title &&
        typeof info.Title === "string" &&
        info.Title.trim().length > 0
      ) {
        title = info.Title.trim();
        console.log("Title found in info.Title:", title);
      } else if (
        title === "Untitled" &&
        info.title &&
        typeof info.title === "string" &&
        info.title.trim().length > 0
      ) {
        title = info.title.trim();
        console.log("Title found in info.title:", title);
      }

      if (
        author === "Unknown Author" &&
        info.Author &&
        typeof info.Author === "string" &&
        info.Author.trim().length > 0
      ) {
        author = info.Author.trim();
        console.log("Author found in info.Author:", author);
      } else if (
        author === "Unknown Author" &&
        info.author &&
        typeof info.author === "string" &&
        info.author.trim().length > 0
      ) {
        author = info.author.trim();
        console.log("Author found in info.author:", author);
      }
    }

    // Approach 3: Look for metadata in document catalog dictionary (more low-level)
    if (
      (title === "Untitled" || author === "Unknown Author") &&
      pdfDocAny.context &&
      pdfDocAny.catalog
    ) {
      try {
        const catalogDict = pdfDocAny.catalog.dict;

        if (catalogDict && catalogDict.get) {
          const metadata = catalogDict.get("Metadata");
          if (metadata) {
            console.log(
              "Found metadata in catalog dictionary, attempting to extract"
            );
            // If needed, additional extraction code could be added here
          }
        }
      } catch (err) {
        console.warn("Error accessing catalog metadata:", err);
      }
    }

    const result = {
      title,
      author,
      pageCount,
    };

    console.log("Basic info extracted:", result);
    return result;
  } catch (error) {
    console.error("Error extracting basic info:", error);
    return {
      title: "Untitled",
      author: "Unknown Author",
      pageCount: 0,
    };
  }
}

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
    // Load PDF.js dynamically
    const pdfjs = await import("pdfjs-dist");
    console.log(
      "Using PDF.js worker from:",
      pdfjs.GlobalWorkerOptions.workerSrc
    );

    // Load the document
    const loadingTask = pdfjs.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;

    // Get text from title page and first few pages to improve metadata discovery
    const pageCount = pdfDocument.numPages;
    const maxPagesToScan = Math.min(10, pageCount); // Scan more pages for better chances
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
    const pdfjs = await import("pdfjs-dist");
    // Use a local worker from node_modules instead of CDN
    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();

    console.log("PDF.js worker initialized successfully");
  } catch (error) {
    console.error("Failed to initialize PDF.js worker:", error);
  }
}

/**
 * Process a PDF file and extract all available metadata
 */
export async function processPdfFile(file: File): Promise<{
  bookInfo: BookInfo;
  splitPages: Blob[];
}> {
  try {
    console.log("Starting file processing:", file.name);

    // Read the file only once and create copies for different operations
    const fileData = await file.arrayBuffer();
    console.log("File loaded into array buffer");

    // Create separate copies for each operation to prevent detached ArrayBuffer issues
    const basicInfoBuffer = new Uint8Array(fileData.slice(0));
    const coverImageBuffer = new Uint8Array(fileData.slice(0));
    const textExtractionBuffer = new Uint8Array(fileData.slice(0));

    // Extract metadata from filename
    const filenameMeta = extractMetadataFromFilename(file.name);

    // Extract basic info (title, author, page count)
    const basicInfo = await extractBasicInfo(basicInfoBuffer);

    // Use filename-extracted info if PDF metadata is missing
    if (basicInfo.title === "Untitled" && filenameMeta.title) {
      basicInfo.title = filenameMeta.title;
    }

    if (basicInfo.author === "Unknown Author" && filenameMeta.author) {
      basicInfo.author = filenameMeta.author;
    }

    // Extract cover image from first page
    const coverImagePath = await extractCoverImage(coverImageBuffer);
    console.log(
      "Cover image extraction result:",
      coverImagePath ? "Success" : "Failed"
    );

    // Extract text from first few pages to find ISBN
    const text = await extractTextFromFirstPages(textExtractionBuffer);
    const isbn = extractISBN(text);
    console.log("ISBN extraction result:", isbn || "Not found");

    // Split the PDF into individual pages
    console.log("Starting PDF splitting...");
    const fileUrl = URL.createObjectURL(file);

    // Import the splitPDF function dynamically to avoid circular dependencies
    const { default: splitPDF } = await import("../utils/splitPDF");
    const pages = await splitPDF(fileUrl);
    console.log(`PDF split into ${pages.length} pages`);

    // Clean up the object URL
    URL.revokeObjectURL(fileUrl);

    // Create and return BookInfo object
    const info: BookInfo = {
      title: basicInfo.title,
      author: basicInfo.author,
      isbn: isbn || undefined,
      publishYear: undefined,
      publisher: undefined,
      description: undefined,
      subjects: undefined,
      source: filenameMeta.title || filenameMeta.author ? "filename" : "manual",
      originalFileName: file.name,
      pages: basicInfo.pageCount,
      coverImagePath: coverImagePath || undefined,
      tableOfContents: [], // No TOC extracted in this simple version
    };

    console.log("Book info created:", info);
    return { bookInfo: info, splitPages: pages };
  } catch (error) {
    console.error("Error processing PDF file:", error);
    throw new Error("Failed to process PDF file");
  }
}

/**
 * Extract ISBN from text content
 */
export function extractISBN(text: string): string | null {
  // Common ISBN patterns
  const isbnPattern = /ISBN(?:-13)?:?\s*(978[\d-]{10,17}|[\d-]{10,13})/i;
  const isbnPattern2 = /ISBN[\s:-]*(\d[\d-]{9,16}[\dXx])/i; // More flexible pattern
  const isbn10Pattern = /\b\d{9}[\dXx]\b/;
  const isbn13Pattern = /\b978[\d-]{10,13}\b/;

  console.log("Starting ISBN extraction from text length:", text.length);

  // Check for ISBN patterns
  let match = text.match(isbnPattern);
  if (match && match[1]) {
    const isbn = match[1].replace(/-/g, "");
    console.log("ISBN found with pattern 1:", isbn);
    return isbn;
  }

  // Try alternative ISBN format
  match = text.match(isbnPattern2);
  if (match && match[1]) {
    const isbn = match[1].replace(/-/g, "");
    console.log("ISBN found with pattern 2:", isbn);
    return isbn;
  }

  // Check for standalone ISBN-13
  match = text.match(isbn13Pattern);
  if (match) {
    const isbn = match[0].replace(/-/g, "");
    console.log("ISBN found with pattern 3:", isbn);
    return isbn;
  }

  // Check for standalone ISBN-10
  match = text.match(isbn10Pattern);
  if (match) {
    console.log("ISBN found with pattern 4:", match[0]);
    return match[0];
  }

  // Additional text checks
  // Look for variations with OCR errors
  const isbnIndicators = text.match(/ISBN/gi);
  if (isbnIndicators && isbnIndicators.length > 0) {
    // If we find "ISBN" but couldn't extract with regex, try a different approach
    console.log(
      "ISBN keyword found but pattern matching failed. Trying alternative extraction..."
    );

    // Extract 20 characters after ISBN keyword
    const positions = [];
    const regex = /ISBN/gi;
    let match;
    while ((match = regex.exec(text)) !== null) {
      positions.push(match.index);
    }

    for (const pos of positions) {
      const potentialIsbn = text.substring(pos + 4, pos + 25).trim();
      console.log("Potential ISBN substring:", potentialIsbn);

      // Try to clean and extract a valid ISBN from this substring
      const cleaned = potentialIsbn.replace(/[^\dXx]/g, "");
      if (cleaned.length >= 10 && cleaned.length <= 13) {
        console.log(
          "Potential ISBN found through substring analysis:",
          cleaned
        );
        return cleaned;
      }
    }
  }

  console.log("No ISBN found in text");
  return null;
}

/**
 * Extract metadata from filename
 */
export function extractMetadataFromFilename(fileName: string): {
  title: string | null;
  author: string | null;
} {
  // Remove file extension
  const fileNameWithoutExt = fileName.replace(/\.pdf$/i, "");

  // Initialize result
  let extractedTitle = null;
  let extractedAuthor = null;

  // Check for common patterns

  // Pattern 1: "Title by Author"
  const byAuthorMatch = fileNameWithoutExt.match(
    /(.*?)\s+by\s+(.*?)(\s+\(|$)/i
  );

  // Pattern 2: "Title - Author"
  const dashAuthorMatch = fileNameWithoutExt.match(
    /(.*?)\s+[-–—]\s+(.*?)(\s+\(|$)/i
  );

  // Pattern 3: "Author - Title"
  const authorDashTitleMatch = fileNameWithoutExt.match(
    /([A-Z][a-zA-Z\s.]+)\s+[-–—]\s+(.*?)(\s+\(|$)/
  );

  // Pattern 4: Names with commas "Last, First - Title"
  const lastFirstTitleMatch = fileNameWithoutExt.match(
    /([A-Z][a-zA-Z]+,\s+[A-Z][a-zA-Z]+)\s+[-–—]\s+(.*?)(\s+\(|$)/
  );

  if (byAuthorMatch) {
    extractedTitle = byAuthorMatch[1].trim();
    extractedAuthor = byAuthorMatch[2].trim();
    console.log(
      "Extracted from filename (by): ",
      extractedTitle,
      extractedAuthor
    );
  } else if (dashAuthorMatch) {
    extractedTitle = dashAuthorMatch[1].trim();
    extractedAuthor = dashAuthorMatch[2].trim();
    console.log(
      "Extracted from filename (dash): ",
      extractedTitle,
      extractedAuthor
    );
  } else if (authorDashTitleMatch) {
    extractedAuthor = authorDashTitleMatch[1].trim();
    extractedTitle = authorDashTitleMatch[2].trim();
    console.log(
      "Extracted from filename (author-dash-title): ",
      extractedTitle,
      extractedAuthor
    );
  } else if (lastFirstTitleMatch) {
    extractedAuthor = lastFirstTitleMatch[1].trim();
    extractedTitle = lastFirstTitleMatch[2].trim();
    console.log(
      "Extracted from filename (last,first-title): ",
      extractedTitle,
      extractedAuthor
    );
  } else {
    // If no pattern matches, try some heuristics
    const parts = fileNameWithoutExt.split(/\s+[-–—]\s+|\s*_\s*|\s+by\s+/i);
    if (parts.length >= 2) {
      // If we have at least 2 parts, take best guess
      extractedTitle = parts[0].trim();
      extractedAuthor = parts[1].trim();
      console.log(
        "Extracted using fallback splitting: ",
        extractedTitle,
        extractedAuthor
      );
    }
  }

  return {
    title: extractedTitle,
    author: extractedAuthor,
  };
}
