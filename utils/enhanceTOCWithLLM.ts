import Together from "together-ai";
import { jsonrepair } from "jsonrepair"; // npm install jsonrepair
export interface TOCItemLLM {
  title: string;
  pageNumber: number;
  level: number;
  children?: TOCItemLLM[];
}

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

export async function enhanceTOCWithLLM(
  rawText: string
): Promise<TOCItemLLM[]> {
  const apiKey = process.env.TOGETHER_API_KEY;
  if (!apiKey) {
    throw new Error("TOGETHER_API_KEY is not set in environment variables");
  }

  // Build the prompt directly from the compact string
  const prompt = `Below is a flat string representation of a book's table of contents, where each entry is formatted as: title|page|l<level>.
${rawText}

Parse this into a compact JSON array where each chapter is an object with keys: c (chapter title), p (page), lv (level), t (topics array if any), and section (if exists). If a chapter contains subchapters or topics, always use the key t (an array) for them. Do not use other keys like topics or children. All chapters and topics, at any level, should be objects with the same structure: {c, p, lv, t?}. Only output the JSON, no explanation, no beautification.`;

  const together = new Together({ apiKey });
  let mergedResults: TOCItemLLM[] = [];
  let truncated = false;

  console.log("Prompt sent to LLM:\n", prompt);

  // Set max_tokens to 4000 for the chunk
  const maxTokens = 4000;

  const response = await together.chat.completions.create({
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "meta-llama/Llama-3.3-70B-Instruct-Turbo-Free",
    stream: false,
    max_tokens: maxTokens,
  });

  const llmContent = response.choices?.[0]?.message?.content;
  console.log(`LLM raw output:\n`, llmContent);

  // Log the output received from the LLM
  console.log("Output received from LLM:\n", llmContent);

  try {
    if (typeof llmContent !== "string") {
      throw new Error("LLM response content is not a string");
    }
    let jsonString = llmContent.trim();
    if (!jsonString.startsWith("[") && !jsonString.startsWith("{")) {
      jsonString = extractJsonBlock(jsonString);
    }
    jsonString = jsonrepair(jsonString);
    const parsed: unknown = JSON.parse(jsonString);
    if (Array.isArray(parsed)) {
      mergedResults = mergedResults.concat(parsed);
    } else if (
      parsed &&
      typeof parsed === "object" &&
      "chapters" in parsed &&
      Array.isArray((parsed as { chapters: unknown }).chapters)
    ) {
      const chunkResp = parsed as {
        chapters: unknown[];
        truncated?: boolean;
      };
      mergedResults = mergedResults.concat(chunkResp.chapters as TOCItemLLM[]);
      if (chunkResp.truncated) truncated = true;
    }
  } catch (e) {
    console.error(
      `Failed to parse LLM response (expected compact JSON):`,
      llmContent,
      e
    );
    // Continue with next chunk
  }

  if (truncated) {
    console.warn("LLM output was truncated.");
  }

  return mergedResults;
}
