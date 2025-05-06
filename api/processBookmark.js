import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";

const HOST_DATA_DIR =
  "/home/aman/Documents/Code/projects/manabiko/clone/manabiko/data";
const PDF2HTMLEX_IMAGE =
  "pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64";
const PDFCPU_IMAGE = "atrus/pdfcpu:latest";
// const PYMUPDF_IMAGE = "ludy87/pymupdf:latest"; //TODO: ADD AS FALLBACK

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Execute a command in a promise wrapper
 * @param {string} cmd Command to execute
 * @returns {Promise<string>} stdout from the command
 */
const execPromise = (cmd) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error("Error executing command:", error);
        reject(error);
        return;
      }
      if (stderr) {
        console.warn("Command stderr:", stderr);
      }
      resolve(stdout);
    });
  });
};

/**
 * Extract chapter-specific outline from full outline
 * @param {Array} fullOutline Complete outline object with bookmarks
 * @param {string} chapterName Name of the chapter to extract outline for
 * @returns {Object} Chapter-specific outline with its children in the required format
 */
const extractChapterOutline = (fullOutline, chapterName) => {
  // Recursive search and formatting
  const findChapter = (bookmarks) => {
    if (!Array.isArray(bookmarks)) return null;

    for (const bookmark of bookmarks) {
      const cleanTitle = bookmark.title?.trim();
      const targetTitle = chapterName.replaceAll("_", " ").trim();

      if (cleanTitle === targetTitle) {
        return formatChapter(bookmark); // Match found
      }

      if (bookmark.kids) {
        const found = findChapter(bookmark.kids);
        if (found) return found;
      }
    }

    return null;
  };

  // Formats a chapter and its children recursively
  const formatChapter = (bookmark) => ({
    title: bookmark.title,
    page: bookmark.page,
    kids: bookmark.kids ? bookmark.kids.map(formatChapter) : [],
  });

  const chapter = findChapter(fullOutline.bookmarks);

  return (
    chapter || {
      title: chapterName,
      page: 1,
      kids: [],
    }
  );
};

/**
 * Process a PDF file using bookmarks to split it into chapters and convert to HTML
 * @param {string} pdfPath Full path to the PDF file
 * @param {string} outputDir Directory to store the output files
 * @returns {Promise<object>} Processing results
 */
export async function processBookmark(pdfPath, outputDir) {
  try {
    if (!pdfPath || !outputDir) {
      throw new Error("PDF path and output directory are required");
    }

    // Ensure the output directory exists
    await fs.mkdir(outputDir, { recursive: true });

    // Extract the filename without extension
    const filename = path.basename(pdfPath, ".pdf");

    // Create subdirectories
    const outlineDir = path.join(outputDir, "outline");
    const pdfDir = path.join(outputDir, "pdf");
    const htmlDir = path.join(outputDir, "html");

    await fs.mkdir(outlineDir, { recursive: true });
    await fs.mkdir(pdfDir, { recursive: true });
    await fs.mkdir(htmlDir, { recursive: true });

    // Step 1: Extract outline from PDF
    const outlineJsonPath = path.join(outlineDir, `${filename}_outline.json`);
    console.log("Extracting outline...");
    await execPromise(
      `docker run --rm -v ${HOST_DATA_DIR}:/data ${PDFCPU_IMAGE} pdfcpu bookmarks export /data/${path.relative(
        HOST_DATA_DIR,
        pdfPath
      )} /data/${path.relative(HOST_DATA_DIR, outlineJsonPath)}`
    );

    // Read the outline file to get bookmarks and metadata
    let outline = [];
    try {
      const outlineContent = await fs.readFile(outlineJsonPath, "utf8");
      outline = JSON.parse(outlineContent);
      console.log(
        "Outline structure:",
        JSON.stringify(outline.bookmarks[0], null, 2)
      );
    } catch (err) {
      console.warn(
        "Could not read outline or no bookmarks present:",
        err.message
      );
    }

    // Step 2: Split PDF by chapters
    console.log("Splitting PDF by chapters...");
    await execPromise(
      `docker run --rm -v ${HOST_DATA_DIR}:/data ${PDFCPU_IMAGE} pdfcpu split -m bookmark /data/${path.relative(
        HOST_DATA_DIR,
        pdfPath
      )} /data/${path.relative(HOST_DATA_DIR, pdfDir)}`
    );

    // Get the list of split PDFs
    const pdfFiles = await fs.readdir(pdfDir);
    const splitPdfPaths = pdfFiles
      .filter((file) => file.endsWith(".pdf"))
      .map((file) => path.join(pdfDir, file));

    // Step 3: Convert split PDFs to HTML files
    console.log("Converting PDFs to HTML...");
    const htmlPaths = [];

    for (let i = 0; i < splitPdfPaths.length; i++) {
      const pdfFile = splitPdfPaths[i];

      const chapterName = pdfFile.split("/").pop().replace(".pdf", "");
      const chapterDir = path.join(htmlDir, chapterName.replaceAll(" ", "_"));

      // Step 3.0: Create a directory for the chapter
      await fs.mkdir(chapterDir, { recursive: true });

      // Step 3.1: Convert PDF to HTML
      console.log(`Converting ${pdfFile} to HTML...`);
      await execPromise(
        `docker run --rm -v ${HOST_DATA_DIR}:/data ${PDF2HTMLEX_IMAGE} --embed-css=0 --embed-javascript=0 --embed-image=1 --embed-font=1 --embed-outline=0 --dest-dir /data/${path.relative(
          HOST_DATA_DIR,
          chapterDir
        )} /data/${path.relative(HOST_DATA_DIR, pdfFile)}`
      );

      // Get the HTML file path
      const htmlFiles = await fs.readdir(chapterDir);
      const htmlFile = htmlFiles.find((file) => file.endsWith(".html"));
      if (htmlFile) {
        htmlPaths.push(path.join(chapterDir, htmlFile));
      }

      // Step 3.2: Replace static files in HTML files
      try {
        // Use the correct path to static directory in api folder instead of data folder
        const staticDir = path.join(__dirname, "static");

        console.log(
          `Copying static files from ${staticDir} to ${chapterDir}...`
        );

        const staticFiles = await fs.readdir(staticDir);

        for (const staticFile of staticFiles) {
          const sourcePath = path.join(staticDir, staticFile);
          const targetPath = path.join(chapterDir, staticFile);

          const stats = await fs.stat(sourcePath);
          // Force overwrite of existing files with the same name
          if (stats.isFile()) {
            await fs.copyFile(sourcePath, targetPath);
            console.log(`Copied ${staticFile} to ${chapterDir}`);
          }
        }
      } catch (err) {
        console.error(`Error copying static files to ${chapterDir}:`, err);
      }

      // Step 3.3: Create chapter-specific outline JSON
      try {
        // Extract chapter outline from the full outline
        const chapterOutline = extractChapterOutline(outline, chapterName);

        // Save the chapter outline to a JSON file in the chapter directory
        const chapterOutlinePath = path.join(
          chapterDir,
          `${chapterName}_outline.json`
        );
        await fs.writeFile(
          chapterOutlinePath,
          JSON.stringify(chapterOutline, null, 2)
        );
        console.log(`Created chapter outline for "${chapterName}"`);
      } catch (err) {
        console.warn(
          `Could not create chapter outline for "${chapterName}":`,
          err.message
        );
      }
    }

    // Step 4: Return the JSON object with the required structure
    const result = {
      [filename]: {
        metadata: outline.header,
        outline: outline.bookmarks,
        filepaths: {
          html: htmlPaths,
          src: pdfPath,
        },
      },
    };

    // Save the result to a json file
    const resultPath = path.join(outputDir, `${filename}_result.json`);
    await fs.writeFile(resultPath, JSON.stringify(result, null, 2));

    // cleanup : remove the split pdfs
    for (const pdfFile of splitPdfPaths) {
      try {
        await fs.unlink(pdfFile);
      } catch (err) {
        console.warn("Could not delete split PDF file:", err.message);
      }
    }

    return result;
  } catch (error) {
    console.error("Error processing bookmark:", error);
    throw error;
  }
}
