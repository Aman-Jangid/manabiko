import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";

const STATIC_DIR = "/app/static";
const PDFCPU_IMAGE = "atrus/pdfcpu:latest";
const PDF2HTMLEX_IMAGE = "pdf2htmlex/pdf2htmlex:latest";
const HOST_DATA_DIR =
  "/home/aman/Documents/Code/projects/manabiko/clone/manabiko/data";

function toHostPath(containerPath) {
  return containerPath.replace("/data", HOST_DATA_DIR);
}

/**
 * Splits a PDF by bookmarks and converts each chapter to HTML
 * @param {string} pdfPath Path to the PDF file
 * @returns {Promise<{pdfDir: string, htmlDir: string}>} Paths to the output directories
 */
export async function processBookByChapters(pdfPath) {
  console.log(`[processBookByChapters] Starting process for PDF: ${pdfPath}`);

  // Extract base filename without extension
  const pdfBaseName = path.basename(pdfPath, path.extname(pdfPath));
  console.log(`[processBookByChapters] Base filename: ${pdfBaseName}`);

  // Create directory structure
  const chaptersBaseDir = path.join(
    path.dirname(pdfPath),
    "chapters",
    pdfBaseName
  );
  const pdfOutputDir = path.join(chaptersBaseDir, "pdf");
  const htmlOutputDir = path.join(chaptersBaseDir, "html");
  console.log(`[processBookByChapters] Directory structure: 
    - Base: ${chaptersBaseDir}
    - PDF output: ${pdfOutputDir}
    - HTML output: ${htmlOutputDir}`);

  // Ensure directories exist
  console.log(`[processBookByChapters] Creating output directories`);
  await fs.mkdir(pdfOutputDir, { recursive: true });
  await fs.mkdir(htmlOutputDir, { recursive: true });
  console.log(
    `[processBookByChapters] Output directories created successfully`
  );

  // Get host paths for docker commands
  const hostPdfPath = toHostPath(pdfPath);
  const hostPdfOutputDir = toHostPath(pdfOutputDir);
  console.log(`[processBookByChapters] Host paths:
    - PDF: ${hostPdfPath}
    - PDF Output: ${hostPdfOutputDir}`);

  // Calculate relative paths for docker command
  const relativeInputPdf = `/data${hostPdfPath.slice(HOST_DATA_DIR.length)}`;
  const relativePdfOutputDir = `/data${hostPdfOutputDir.slice(
    HOST_DATA_DIR.length
  )}`;
  console.log(`[processBookByChapters] Docker relative paths:
    - Input: ${relativeInputPdf}
    - Output: ${relativePdfOutputDir}`);

  console.log(
    `[processBookByChapters] Splitting PDF at ${pdfPath} by bookmarks...`
  );

  try {
    // Split PDF by bookmarks
    const dockerCommand = `docker run --rm -v ${HOST_DATA_DIR}:/data ${PDFCPU_IMAGE} split -m bookmark '${relativeInputPdf}' '${relativePdfOutputDir}'`;
    console.log(
      `[processBookByChapters] Running docker command: ${dockerCommand}`
    );

    await new Promise((resolve, reject) => {
      exec(dockerCommand, (err, stdout, stderr) => {
        if (err) {
          console.error(
            `[processBookByChapters] PDF split failed: ${stderr.trim()}`
          );
          return reject(new Error(`PDF split failed: ${stderr.trim()}`));
        }
        console.log(`[processBookByChapters] PDF split success: ${stdout}`);
        resolve(stdout);
      });
    });

    // List all split PDF files
    console.log(
      `[processBookByChapters] Reading split files from: ${pdfOutputDir}`
    );
    const splitFiles = await fs.readdir(pdfOutputDir);
    const pdfFiles = splitFiles.filter((file) =>
      file.toLowerCase().endsWith(".pdf")
    );

    console.log(
      `[processBookByChapters] Found ${pdfFiles.length} split PDF files. Converting to HTML...`
    );

    // Convert each PDF to HTML
    for (let i = 0; i < pdfFiles.length; i++) {
      const pdfFile = pdfFiles[i];
      console.log(
        `[processBookByChapters] Processing file ${i + 1}/${
          pdfFiles.length
        }: ${pdfFile}`
      );

      const splitPdfPath = path.join(pdfOutputDir, pdfFile);
      const chapterHtmlDir = path.join(
        htmlOutputDir,
        path.basename(pdfFile, ".pdf")
      );
      console.log(
        `[processBookByChapters] PDF path: ${splitPdfPath}, HTML dir: ${chapterHtmlDir}`
      );

      // Create directory for this chapter's HTML
      console.log(
        `[processBookByChapters] Creating HTML directory: ${chapterHtmlDir}`
      );
      await fs.mkdir(chapterHtmlDir, { recursive: true });

      // Convert PDF to HTML
      console.log(`[processBookByChapters] Converting PDF to HTML: ${pdfFile}`);
      await convertPdfToHtml(splitPdfPath, chapterHtmlDir);

      // Replace static files for this chapter
      console.log(
        `[processBookByChapters] Replacing static files for: ${pdfFile}`
      );
      await replaceStaticFiles(chapterHtmlDir);
      console.log(
        `[processBookByChapters] Processed file ${i + 1}/${
          pdfFiles.length
        } successfully`
      );
    }

    console.log(
      `[processBookByChapters] All files processed. Returning output directories`
    );
    return {
      pdfDir: pdfOutputDir,
      htmlDir: htmlOutputDir,
    };
  } catch (error) {
    console.error(
      `[processBookByChapters] Error processing book by chapters: ${error.message}`
    );
    throw error;
  }
}

export async function extractOutline(pdfPath, outlinePath) {
  console.log(
    `[extractOutline] Starting extraction from ${pdfPath} to ${outlinePath}`
  );
  // Use host paths for docker run
  const hostPdfPath = toHostPath(pdfPath);
  const hostOutlinePath = toHostPath(outlinePath);
  console.log(
    `[extractOutline] Host paths: PDF=${hostPdfPath}, Outline=${hostOutlinePath}`
  );

  const dockerCommand = `docker run --rm -v ${HOST_DATA_DIR}:/data ${PDFCPU_IMAGE} pdfcpu bookmarks export '/data${hostPdfPath.slice(
    HOST_DATA_DIR.length
  )}' '/data${hostOutlinePath.slice(HOST_DATA_DIR.length)}'`;
  console.log(`[extractOutline] Running command: ${dockerCommand}`);

  return new Promise((resolve, reject) => {
    exec(dockerCommand, (err, stdout, stderr) => {
      if (err) {
        console.error(`[extractOutline] Error: ${stderr}`);
        return reject(stderr);
      }
      console.log(`[extractOutline] Success: ${stdout}`);
      resolve(stdout);
    });
  });
}

// Original splitPdfByChapters remains for backwards compatibility
export async function splitPdfByChapters(pdfPath, outlinePath, splitDir) {
  console.log(
    `[splitPdfByChapters] Starting PDF split: ${pdfPath} using outline: ${outlinePath}`
  );

  // Load and validate outline
  let outlineRaw;
  try {
    console.log(`[splitPdfByChapters] Reading outline file: ${outlinePath}`);
    outlineRaw = await fs.readFile(outlinePath, "utf-8");
    console.log(
      `[splitPdfByChapters] Outline file read successfully, length: ${outlineRaw.length}`
    );
  } catch (err) {
    console.error(
      `[splitPdfByChapters] Failed to read outline file: ${err.message}`
    );
    throw new Error(`Failed to read outline file: ${err.message}`);
  }

  let outlineData;
  try {
    console.log(`[splitPdfByChapters] Parsing outline JSON`);
    outlineData = JSON.parse(outlineRaw);

    // Process the pdfcpu outline format which can be either:
    // 1. An array of bookmark objects
    // 2. A nested structure with bookmarks property
    let outline = [];

    if (Array.isArray(outlineData)) {
      outline = outlineData;
    } else if (
      outlineData &&
      outlineData.bookmarks &&
      Array.isArray(outlineData.bookmarks)
    ) {
      outline = outlineData.bookmarks;
    }

    // Process each bookmark to extract the title and page info
    const processedOutline = outline.map((bookmark) => {
      // Handle pdfcpu format where page is in the form "page:X"
      let pageNum = 1;
      if (bookmark.page && typeof bookmark.page === "string") {
        const pageMatch = bookmark.page.match(/page:(\d+)/i);
        if (pageMatch && pageMatch[1]) {
          pageNum = parseInt(pageMatch[1], 10);
        }
      } else if (bookmark.page && typeof bookmark.page === "number") {
        pageNum = bookmark.page;
      }

      return {
        title: bookmark.title || bookmark.name || "Untitled",
        page: pageNum,
      };
    });

    console.log(
      `[splitPdfByChapters] Outline parsed successfully, found ${processedOutline.length} chapters`
    );

    // Continue only if we have valid bookmarks
    if (processedOutline.length === 0) {
      console.warn(
        `[splitPdfByChapters] Warning: No valid bookmarks found in outline file`
      );
    }

    return await processSplits(processedOutline, pdfPath, splitDir);
  } catch (err) {
    console.error(
      `[splitPdfByChapters] Failed to parse outline JSON: ${err.message}`
    );
    throw new Error("Outline is not valid JSON: " + err.message);
  }
}

// Helper function to process PDF splits based on the outline
async function processSplits(outline, pdfPath, splitDir) {
  const splits = [];

  for (let i = 0; i < outline.length; i++) {
    const chapter = outline[i];
    console.log(
      `[splitPdfByChapters] Processing chapter ${i + 1}/${outline.length}: ${
        chapter.title || "Untitled"
      }`
    );

    // Validate chapter format
    if (
      typeof chapter !== "object" ||
      chapter === null ||
      typeof chapter.title !== "string" ||
      typeof chapter.page !== "number" ||
      chapter.page < 1
    ) {
      console.error(
        `[splitPdfByChapters] Invalid chapter format at index ${i}:`,
        chapter
      );
      throw new Error(`Invalid chapter format at index ${i}`);
    }

    const startPage = chapter.page;
    const endPage =
      i + 1 < outline.length && typeof outline[i + 1].page === "number"
        ? outline[i + 1].page - 1
        : null;
    console.log(
      `[splitPdfByChapters] Chapter ${i + 1} page range: ${startPage}-${
        endPage || "end"
      }`
    );

    const chapterPdf = path.join(splitDir, `chapter_${i + 1}.pdf`);
    const pageRange = endPage ? `${startPage}-${endPage}` : `${startPage}-end`;
    console.log(`[splitPdfByChapters] Output PDF path: ${chapterPdf}`);

    const hostPdfPath = toHostPath(pdfPath);
    const hostChapterPdf = toHostPath(chapterPdf);

    const relativeInput = `/data${hostPdfPath.slice(HOST_DATA_DIR.length)}`;
    const relativeOutput = `/data${hostChapterPdf.slice(HOST_DATA_DIR.length)}`;
    console.log(
      `[splitPdfByChapters] Docker relative paths: input=${relativeInput}, output=${relativeOutput}`
    );

    try {
      const dockerCommand = `docker run --rm -v ${HOST_DATA_DIR}:/data ${PDFCPU_IMAGE} pdfcpu extract -pages ${pageRange} '${relativeInput}' '${relativeOutput}'`;
      console.log(
        `[splitPdfByChapters] Running docker command: ${dockerCommand}`
      );

      await new Promise((resolve, reject) => {
        exec(dockerCommand, (err, stdout, stderr) => {
          if (err) {
            console.error(
              `[splitPdfByChapters] Error splitting chapter ${
                i + 1
              }: ${stderr.trim()}`
            );
            return reject(new Error(`PDF split failed: ${stderr.trim()}`));
          }
          console.log(
            `[splitPdfByChapters] Chapter ${
              i + 1
            } split successfully: ${stdout.trim()}`
          );
          resolve(stdout);
        });
      });

      splits.push({
        title: chapter.title,
        startPage,
        endPage: endPage || "end",
        pdfPath: chapterPdf,
      });
      console.log(`[splitPdfByChapters] Added chapter ${i + 1} to results`);
    } catch (err) {
      console.error(
        `[splitPdfByChapters] Error processing chapter: ${err.message}`
      );
      throw new Error(
        `Error splitting chapter "${chapter.title}": ${err.message}`
      );
    }
  }

  console.log(
    `[splitPdfByChapters] Completed splitting all ${splits.length} chapters`
  );
  return splits;
}

export async function convertPdfToHtml(splitPdfPath, htmlOutDir) {
  console.log(
    `[convertPdfToHtml] Starting conversion from ${splitPdfPath} to ${htmlOutDir}`
  );
  const hostSplitPdfPath = toHostPath(splitPdfPath);
  const hostHtmlOutDir = toHostPath(htmlOutDir);
  console.log(
    `[convertPdfToHtml] Host paths: PDF=${hostSplitPdfPath}, HTML dir=${hostHtmlOutDir}`
  );

  const dockerCommand = `docker run --rm -v ${HOST_DATA_DIR}:/data ${PDF2HTMLEX_IMAGE} --embed-css=0 --embed-javascript=0 --embed-image=0 --embed-font=0 --embed-outline=0 --dest-dir '/data${hostHtmlOutDir.slice(
    HOST_DATA_DIR.length
  )}' '/data${hostSplitPdfPath.slice(HOST_DATA_DIR.length)}'`;
  console.log(`[convertPdfToHtml] Running command: ${dockerCommand}`);

  return new Promise((resolve, reject) => {
    exec(dockerCommand, (err, stdout, stderr) => {
      if (err) {
        console.error(`[convertPdfToHtml] Error converting PDF: ${stderr}`);
        return reject(stderr);
      }
      console.log(
        `[convertPdfToHtml] Successfully converted PDF to HTML: ${stdout.slice(
          0,
          100
        )}${stdout.length > 100 ? "..." : ""}`
      );
      resolve(stdout);
    });
  });
}

export async function replaceStaticFiles(htmlOutDir) {
  console.log(
    `[replaceStaticFiles] Starting static file replacement in: ${htmlOutDir}`
  );
  try {
    const cssSource = path.join(STATIC_DIR, "base.min.css");
    const cssTarget = path.join(htmlOutDir, "base.min.css");
    console.log(
      `[replaceStaticFiles] Copying CSS: ${cssSource} -> ${cssTarget}`
    );
    await fs.copyFile(cssSource, cssTarget);

    const jsSource = path.join(STATIC_DIR, "pdf2htmlEX.min.js");
    const jsTarget = path.join(htmlOutDir, "pdf2htmlEX.min.js");
    console.log(`[replaceStaticFiles] Copying JS: ${jsSource} -> ${jsTarget}`);
    await fs.copyFile(jsSource, jsTarget);

    console.log(
      `[replaceStaticFiles] Static files successfully replaced in: ${htmlOutDir}`
    );
  } catch (error) {
    console.error(
      `[replaceStaticFiles] Error replacing static files: ${error.message}`
    );
    throw error;
  }
}
