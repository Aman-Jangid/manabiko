import type { NextApiRequest, NextApiResponse } from "next";
import { enhanceTOCWithLLM } from "@/utils/enhanceTOCWithLLM";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { rawText } = req.body;
    console.log("[enhance-toc] Received rawText:", rawText);
    if (!rawText || typeof rawText !== "string") {
      return res.status(400).json({ error: "rawText is required" });
    }
    // Pass the compact string directly to the LLM enhancer
    const enhanced = await enhanceTOCWithLLM(rawText);
    return res.status(200).json({ chapters: enhanced });
  } catch (error: unknown) {
    console.error("/api/enhance-toc error:", error);
    function isErrorWithMessage(err: unknown): err is { message: string } {
      return (
        typeof err === "object" &&
        err !== null &&
        "message" in err &&
        typeof (err as { message: unknown }).message === "string"
      );
    }
    let message = "Internal server error";
    if (isErrorWithMessage(error)) {
      message = error.message;
    }
    return res.status(500).json({ error: message });
  }
}
