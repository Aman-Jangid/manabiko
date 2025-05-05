import fs from "fs/promises";
import path from "path";
import { StorageProvider } from ".";

const UPLOAD_DIR = path.join(__dirname, "..", "..", "public", "uploads");
const MAX_FILE_SIZE_MB = 25; // Maximum file size in MB (for uploads)

const isFileSizeValid = (fileBuffer: Buffer) =>
  fileBuffer.length <= MAX_FILE_SIZE_MB * 1024 * 1024;

export const localStorageProvider: StorageProvider = {
  async upload(file, filename) {
    if (!filename) {
      throw new Error("Filename is required");
    }

    const filePath = path.join(UPLOAD_DIR, filename);

    await fs.mkdir(path.dirname(filePath), { recursive: true });

    // Convert file to buffer
    const buffer = Buffer.isBuffer(file)
      ? file
      : Buffer.from(await file.arrayBuffer());

    if (!isFileSizeValid(buffer)) {
      throw new Error(`File size exceeds the ${MAX_FILE_SIZE_MB}MB limit`);
    }

    if (buffer.length === 0) {
      throw new Error("File is empty");
    }

    await fs.writeFile(filePath, buffer);
    return `/uploads/${filename}`;
  },

  async download(url) {
    const filePath = path.join(UPLOAD_DIR, url.replace("/uploads/", ""));

    try {
      const file = await fs.readFile(filePath);
      return file;
    } catch {
      throw new Error("File not found");
    }
  },

  async delete(url) {
    const filePath = path.join(UPLOAD_DIR, url.replace("/uploads/", ""));

    try {
      await fs.unlink(filePath);
    } catch {
      throw new Error("Failed to delete file");
    }
  },

  async list() {
    try {
      const files = await fs.readdir(UPLOAD_DIR);
      return files.map((file) => `/uploads/${file}`);
    } catch {
      throw new Error("Failed to list files");
    }
  },

  getFilePath(filename: string): string {
    return `/uploads/${filename}`;
  },
};
