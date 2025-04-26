import type { NextApiRequest, NextApiResponse } from "next";
import Together from "together-ai";
import {
  fetchBookDataByISBN,
  enrichBookInfoWithOpenLibraryData,
  fetchBookDataByTitleAuthor,
} from "../../services/openLibraryService";

// Helper to extract JSON block from LLM output
function extractJsonBlock(content: string): string {
  // Try to match ```json ... ```
  const match = content.match(/```json\s*([\s\S]*?)```/i);
  if (match) return match[1].trim();
  // Try to match ``` ... ```
  const match2 = content.match(/```([\s\S]*?)```/);
  if (match2) return match2[1].trim();
  // Fallback: try to find the first { ... }
  const firstBrace = content.indexOf("{");
  const lastBrace = content.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace !== -1) {
    return content.slice(firstBrace, lastBrace + 1);
  }
  return content.trim();
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { rawText } = req.body;
    if (!rawText || typeof rawText !== "string") {
      return res.status(400).json({ error: "rawText is required" });
    }
    const apiKey = process.env.TOGETHER_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "TOGETHER_API_KEY is not set" });
    }
    const prompt = `Below is the raw text from the first 5 pages of a book. Extract the book's metadata as a compact JSON object with the following fields if available: title, author, publisher, year, isbn, description. IMPORTANT: Only return a single ISBN as a string (preferably ISBN-13 if available), not an array or object. Only output the JSON, no explanation, no beautification.\n\n${rawText}`;
    console.log("Prompt sent to LLM (get-info):\n", prompt);
    const together = new Together({ apiKey });
    const response = await together.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
      stream: false,
      max_tokens: 2000,
    });
    const llmContent = response.choices?.[0]?.message?.content;
    console.log("LLM output (get-info):\n", llmContent);
    if (typeof llmContent !== "string") {
      return res
        .status(500)
        .json({ error: "LLM response content is not a string" });
    }
    let info;
    try {
      const jsonString = extractJsonBlock(llmContent);
      info = JSON.parse(jsonString);
    } catch {
      return res
        .status(500)
        .json({ error: "Failed to parse LLM response as JSON", llmContent });
    }

    console.log("LLM extracted info:", info);

    let olData = null;
    if (info.isbn) {
      olData = await fetchBookDataByISBN(info.isbn);
      console.log("OpenLibrary data for ISBN:", olData);
    }
    // Always try OpenLibrary by title/author if no ISBN, even if other info is missing
    if ((!info.isbn || !olData) && (info.title || info.author)) {
      olData = await fetchBookDataByTitleAuthor(info.title, info.author);
      console.log("OpenLibrary data for title/author:", olData);
    }

    // Always enrich if we have OpenLibrary data
    if (olData) {
      let enrichedInfo = { ...info };
      let usedOpenLibrary = false;
      enrichedInfo = enrichBookInfoWithOpenLibraryData(enrichedInfo, olData);
      usedOpenLibrary = true;
      console.log("Enriched info after OpenLibrary:", enrichedInfo);
      return res.status(200).json({ info: enrichedInfo, usedOpenLibrary });
    }
    return res.status(200).json({ info: info, usedOpenLibrary: false });
  } catch (error) {
    console.error("/api/get-info error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
