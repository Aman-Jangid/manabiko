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

    const sanitizedFilename = path.basename(url);
    const downloadUrl = `/uploads/${sanitizedFilename}`;
    console.log("Sanitized filename:", sanitizedFilename);
    console.log("Download URL:", downloadUrl);

    const fileExists = await localStorageProvider.list();
    if (!fileExists.includes(downloadUrl)) {
      return res.status(404).json({ error: "File not found" });
    }

    await localStorageProvider.delete(downloadUrl);

    return res.status(200).json({ message: "File deleted successfully" });
  } catch (error: unknown) {
    console.error("Delete error:", error);

    interface CustomError extends Error {
      code?: string;
    }

    if (error instanceof Error && (error as CustomError).code === "ENOENT") {
      return res.status(404).json({ error: "File not found" });
    }

    return res.status(500).json({ error: "Failed to delete file" });
  }
}
