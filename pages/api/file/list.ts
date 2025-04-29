import { localStorageProvider } from "@/lib/storage/localStorageProvider";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const files = await localStorageProvider.list();
    return res.status(200).json({ files });
  } catch (error: unknown) {
    console.error("List error:", error);
    interface CustomError extends Error {
      code?: string;
    }

    if (error instanceof Error && (error as CustomError).code === "ENOENT") {
      return res.status(404).json({ error: "File not found" });
    }

    return res.status(500).json({ error: "Failed to list files" });
  }
}
