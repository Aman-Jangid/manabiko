import express from "express";
import multer from "multer";
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

// Process PDF with bookmarks
app.post("/process-bookmark", async (req, res) => {
  const { filePath } = req.body;
  const docId = filePath.split("/").pop().split(".")[0];
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

// export type fileType = "pdf" | "html";

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

// TODO: Implement this endpoint
// app.get("/outline/:url")

app.listen(8000, () => {
  console.log("API server running on port 8000");
});
