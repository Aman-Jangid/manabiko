import type { NextApiRequest, NextApiResponse } from "next";
import { enhanceTOCWithLLM, TOCItemLLM } from "@/utils/enhanceTOCWithLLM";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const tocItems: TOCItemLLM[] = req.body;
    if (!Array.isArray(tocItems)) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const enhanced = await enhanceTOCWithLLM(tocItems);
    return res.status(200).json({ chapters: enhanced });
  } catch (error: unknown) {
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
