import express from "express";
import multer from "multer";
import {
  extractOutline,
  splitPdfByChapters,
  convertPdfToHtml,
  replaceStaticFiles,
} from "./processPdf.js";
import { processBookmark } from "./processBookmark.js";
import path from "path";
import fs from "fs/promises";

const app = express();
const upload = multer({ dest: "/data/input" });

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Upload PDF
app.post("/upload", upload.single("pdf"), async (req, res) => {
  // Rename file to have .pdf extension
  const oldPath = req.file.path;
  const newPath = oldPath + ".pdf";
  await fs.rename(oldPath, newPath);
  res.json({
    file: { ...req.file, path: newPath, filename: path.basename(newPath) },
  });
});

// Process PDF (split, outline, convert)
app.post("/process", async (req, res) => {
  const { filePath, docId } = req.body;
  if (!filePath || !docId) {
    return res.status(400).json({ error: "filePath and docId required" });
  }
  try {
    const outlinePath = filePath.replace(/\.pdf$/, "_outline.json");

    const splitDir = `/data/split/${docId}`;
    const outputDir = `/data/output/${docId}`;

    await fs.mkdir(splitDir, { recursive: true });
    await fs.mkdir(outputDir, { recursive: true });

    await extractOutline(filePath, outlinePath);

    const chapters = await splitPdfByChapters(filePath, outlinePath, splitDir);

    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      const htmlOutDir = path.join(outputDir, `chapter_${i + 1}`);
      await fs.mkdir(htmlOutDir, { recursive: true });

      await convertPdfToHtml(chapter.pdfPath, htmlOutDir);

      await replaceStaticFiles(htmlOutDir);

      chapter.htmlDir = htmlOutDir;
    }

    res.json({ status: "processing complete", chapters });
  } catch (err) {
    console.error("[PROCESS ERROR]", err);
    res.status(500).json({ error: err.toString() });
  }
});

// Process PDF with bookmarks
app.post("/process-bookmark", async (req, res) => {
  const { filePath, docId } = req.body;
  if (!filePath || !docId) {
    return res.status(400).json({ error: "filePath and docId required" });
  }
  try {
    const outputDir = `/data/output/${docId}`;

    // Process the PDF using the processBookmark function
    const result = await processBookmark(filePath, outputDir);

    res.json({
      status: "processing complete",
      result,
    });
  } catch (err) {
    console.error("[PROCESS-BOOKMARK ERROR]", err);
    res.status(500).json({ error: err.toString() });
  }
});

// Download HTML chapter
app.get("/download/:docId/:chapter", async (req, res) => {
  const { docId, chapter } = req.params;
  const htmlDir = `/data/output/${docId}/chapter_${chapter}`;
  // Find the first .html file in the directory
  try {
    const files = await fs.readdir(htmlDir);
    const htmlFile = files.find((f) => f.endsWith(".html"));
    if (!htmlFile) return res.status(404).send("HTML not found");
    res.sendFile(path.join(htmlDir, htmlFile));
  } catch {
    res.status(404).send("HTML not found");
  }
});

app.listen(8000, () => {
  console.log("API server running on port 8000");
});
