import { exec } from "child_process";
import fs from "fs/promises";
import path from "path";

const HOST_DATA_DIR =
  "/home/aman/Documents/Code/projects/manabiko/clone/manabiko/data";
const PDFCPU_IMAGE = "atrus/pdfcpu:latest";
const PDF2HTMLEX_IMAGE =
  "pdf2htmlex/pdf2htmlex:0.18.8.rc2-master-20200820-alpine-3.12.0-x86_64";

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

    // Read the outline file to get bookmarks
    let outline = [];
    try {
      const outlineContent = await fs.readFile(outlineJsonPath, "utf8");
      outline = JSON.parse(outlineContent);
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
      const chapterName = `chapter_${i + 1}`;
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

      // Step 3.2: Replace static files in HTML files (optional)
      try {
        const staticDir = path.join(HOST_DATA_DIR, "scripts", "static");
        const staticFiles = await fs.readdir(staticDir);

        for (const staticFile of staticFiles) {
          const sourcePath = path.join(staticDir, staticFile);
          const targetPath = path.join(chapterDir, staticFile);
          await fs.copyFile(sourcePath, targetPath);
        }
      } catch (err) {
        console.warn("Could not replace static files:", err.message);
      }
    }

    // Step 4: Return the JSON object with the required structure
    const result = {
      [filename]: {
        metadata: {},
        outline: outline,
        filepaths: {
          pdf: splitPdfPaths,
          html: htmlPaths,
          src: pdfPath,
        },
      },
    };

    // Save the result to a json file
    const resultPath = path.join(outputDir, `${filename}_result.json`);
    await fs.writeFile(resultPath, JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error("Error processing bookmark:", error);
    throw error;
  }
}
