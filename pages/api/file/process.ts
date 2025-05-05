import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filepath } = req.body;
  if (!filepath) {
    return res.status(400).json({ error: "File path is required" });
  }
  // res.data.file.path
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const expressApiUrl =
      process.env.EXPRESS_API_URL || "http://localhost:8000";
    const apiResponse = await axios.post(
      expressApiUrl + "/process",
      { filePath: filepath },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (apiResponse.status !== 200) {
      return res
        .status(apiResponse.status)
        .json({ error: "Failed to process file" });
    }

    const { data } = apiResponse;
    if (!data) {
      return res.status(500).json({ error: "No data returned from API" });
    }

    const { processedData } = data;
    if (!processedData) {
      return res
        .status(500)
        .json({ error: "No processed data returned from API" });
    }
    return res.status(200).json({ processedData });
  } catch (error) {
    console.error("Error processing file:", error);
    return res.status(500).json({ error: "Failed to process file" });
  }
}
