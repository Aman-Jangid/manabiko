import formidable from "formidable";
import fs from "fs/promises";
import { NextApiRequest, NextApiResponse } from "next";
import { localStorageProvider } from "@/lib/storage/localStorageProvider";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      console.error("Parsed fields:", fields);
      console.error("Parsed files:", files);

      const file = files.file?.[0] ?? files.file;
      const filename = Array.isArray(fields.filename)
        ? fields.filename[0]
        : fields.filename;

      if (!file || !filename) {
        return res.status(400).json({ error: "Missing file or filename" });
      }

      const buffer = await fs.readFile((file as formidable.File).filepath);
      const filePath = await localStorageProvider.upload(
        buffer,
        filename as string
      );
      return res.status(200).json({ filePath });
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).json({ error: "Failed to upload file" });
  }
}
