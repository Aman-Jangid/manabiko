import express from "express";
import multer from "multer";
import { processBookmark } from "./processBookmark.js";
import path from "path";
import fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";

const app = express();

// Ensure upload directory exists
const uploadDir = "/data/input";
if (!existsSync(uploadDir)) {
  try {
    mkdirSync(uploadDir, { recursive: true });
    console.log(`Created upload directory: ${uploadDir}`);
  } catch (err) {
    console.error(`Failed to create upload directory: ${err.message}`);
  }
}

const upload = multer({ dest: uploadDir });

app.use(express.json());

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Upload PDF
app.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Rename file to have .pdf extension
    const oldPath = req.file.path;
    const newPath = oldPath + ".pdf";
    await fs.rename(oldPath, newPath);

    console.log(`File uploaded and renamed: ${newPath}`);

    res.json({
      file: { ...req.file, path: newPath, filename: path.basename(newPath) },
    });
  } catch (err) {
    console.error("[UPLOAD ERROR]", err);
    res.status(500).json({ error: err.toString() });
  }
});

// Process PDF with bookmarks
app.post("/process", async (req, res) => {
  const { filePath } = req.body;
  const docId = filePath.split("/").pop().split(".")[0];
  if (!filePath || !docId) {
    return res.status(400).json({ error: "filePath and docId required" });
  }
  try {
    const outputDir = `/data/output/${docId}`;

    // Process the PDF using the processBookmark function
    const result = await processBookmark(filePath, outputDir);

    res
      .json({
        status: "processing complete",
        result,
      })
      .status(200);
  } catch (err) {
    console.error("[PROCESS-BOOKMARK ERROR]", err);
    res.status(500).json({ error: err.toString() });
  }
});

// Download HTML chapter
app.get("/download/:url", async (req, res) => {
  const { url } = req.params;
  try {
    const files = await fs.readdir(url);
    const htmlFile = files.find((f) => f.endsWith(".html"));
    if (!htmlFile) return res.status(404).send("HTML not found");
    // send all files in the directory
    const filePath = path.join(url, htmlFile);
    const fileStream = fs.createReadStream(filePath);
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Disposition", `attachment; filename=${htmlFile}`);
    fileStream.pipe(res);
    fileStream.on("error", (err) => {
      console.error("[DOWNLOAD ERROR]", err);
      res.status(500).send("Error reading file");
    });
    fileStream.on("end", () => {
      console.log("[DOWNLOAD COMPLETE]", htmlFile);
    });
  } catch {
    res.status(404).send("HTML not found");
  }
});

// Implementation of the outline endpoint
app.get("/outline/:url", async (req, res) => {
  const { url } = req.params;
  try {
    // Extract chapter name from the URL
    const urlParts = url.split("/");
    const chapterName = urlParts[urlParts.length - 1]; // Get the last part of the URL

    // Look for the outline JSON file
    const outlineFile = `${chapterName}_outline.json`;
    const outlinePath = path.join(url, outlineFile);

    // Check if file exists
    const outlineData = await fs.readFile(outlinePath, "utf8");
    const outline = JSON.parse(outlineData);

    res.json(outline);
  } catch (err) {
    console.error("[OUTLINE ERROR]", err);
    res.status(404).json({ error: "Outline not found" });
  }
});

app.listen(8000, () => {
  console.log("API server running on port 8000");
});
