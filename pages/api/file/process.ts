// pages/api/process-file.ts
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { filepath } = req.body;

  if (!filepath || typeof filepath !== "string") {
    return res
      .status(400)
      .json({ error: "File path is required and must be a string" });
  }

  const expressApiUrl = process.env.EXPRESS_API_URL || "http://localhost:8000";

  try {
    const apiResponse = await axios.post(
      `${expressApiUrl}/process`,
      { filePath: filepath },
      { 
        headers: { "Content-Type": "application/json" },
        timeout: 60000 // Increased timeout to 60 seconds
      }
    );

    const { processedData } = apiResponse.data || {};

    if (!processedData) {
      return res
        .status(502)
        .json({ error: "No processed data returned from API" });
    }

    return res.status(200).json({ processedData });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error processing file:",
        error?.response?.data || error.message
      );

      const status = error?.response?.status || 500;
      const message = error?.response?.data?.error || "Failed to process file";

      return res.status(status).json({ error: message });
    }
  }
}