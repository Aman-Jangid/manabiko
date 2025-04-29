import { localStorageProvider } from "@/lib/storage/localStorageProvider";

import { NextApiRequest, NextApiResponse } from "next";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const { url } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ message: "Missing or Invalid file URL" });
    }

    const sanitizedFilename = path.basename(url); // Prevent path traversal
    const downloadUrl = `/uploads/${sanitizedFilename}`;
    const file = await localStorageProvider.download(downloadUrl);

    res.setHeader("Content-Type", "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${sanitizedFilename}"`
    );
    return res.status(200).send(file);
  } catch (error: unknown) {
    console.error("Download error:", error);
    interface CustomError extends Error {
      code?: string;
    }
    if (error instanceof Error && (error as CustomError).code === "ENOENT") {
      return res.status(404).json({ error: "File not found" });
    }
    res.status(500).json({ error: "Failed to download file" });
  }
}
